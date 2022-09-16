package media

import (
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
	"github.com/jellydator/ttlcache/v3"
	"go.uber.org/zap"
	"net/url"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/support"
	"time"
)

var serializer *Serializer
var cache *ttlcache.Cache[string, string]

func InitSerializer() {
	rsa, err := support.ParseRsaPrivateKeyFromPemEnvFile(os.Getenv("AWS_PRIVATE_MEDIA_KEY_PAIR_PRIVATE_KEY"))

	if err != nil {
		zap.S().Panicw("failed to parse RSA private key", zap.Error(err))
	}

	resourcesSigner := sign.NewURLSigner(os.Getenv("AWS_PRIVATE_MEDIA_KEY_PAIR_ID"), rsa)

	serializer = &Serializer{signer: resourcesSigner}

	// create a cache with a max # of urls
	// disable extending the cache
	cache = ttlcache.New[string, string](
		ttlcache.WithCapacity[string, string](100000),
		ttlcache.WithDisableTouchOnHit[string, string](),
	)

	go cache.Start() // starts automatic expired item deletion
}

type Serializer struct {
	signer *sign.URLSigner
}

type SerializerPolicy struct {
	// UsePrefix will add OD-xxx prefixes to keys, so services downstream can use them
	UsePrefix bool

	// URI the URI to create a signed URL for
	URI string

	// UseWildcardCacheKey will use a wildcard cache key. this will allow you to save URL params associated with this wildcard
	// cache key, and can be re-used as long as you pass the same key
	UseWildcardCacheKey string
}

func (c *Serializer) createSignedUrl(policy SerializerPolicy) (string, error) {

	usesWildcard := policy.UseWildcardCacheKey != ""

	cacheKey := ""

	if usesWildcard {
		cacheKey = policy.UseWildcardCacheKey
	} else {
		cacheKey = policy.URI
	}

	item := cache.Get(cacheKey)

	if item != nil {

		// if we use a wildcard, the wildcard only saved the query params, so we must reconstruct them
		if usesWildcard {
			return policy.URI + "&" + item.Value(), nil
		}

		return item.Value(), nil
	}

	timestamp := time.Now()

	year := timestamp.Year()
	month := timestamp.Month()
	day := timestamp.Day()

	loc, err := time.LoadLocation("UTC")

	if err != nil {
		return "", err
	}

	dayBucket := 7

	if day >= 6 {
		dayBucket = 14
	}

	if day >= 13 {
		dayBucket = 21
	}

	if day >= 20 {
		dayBucket = 28
	}

	if day >= 27 {
		day = 1

		if month == time.December {
			month = time.January
		} else {
			month += 1
		}
	}

	newTimestamp := time.Date(year, month, dayBucket, 0, 0, 0, 0, loc)

	var signedUrl string

	if usesWildcard {

		signedUrl, err = c.signer.SignWithPolicy(policy.URI, &sign.Policy{Statements: []sign.Statement{
			{
				Resource: policy.UseWildcardCacheKey,
				Condition: sign.Condition{
					DateLessThan: sign.NewAWSEpochTime(newTimestamp),
				},
			},
		}})

		if err != nil {
			return "", errors.Wrap(err, "could not generate signed url with custom policy")
		}

	} else {

		signedUrl, err = c.signer.Sign(policy.URI, newTimestamp)

		if err != nil {
			return "", errors.Wrap(err, "could not generate signed url")
		}
	}

	if policy.UsePrefix {

		parsed, err := url.Parse(signedUrl)

		if err != nil {
			return "", errors.Wrap(err, "failed to parse url")
		}

		paramsToSearch := []string{
			"Policy",
			"Signature",
			"Expires",
			"Key-Pair-Id",
		}

		for _, param := range paramsToSearch {
			if parsed.Query().Has(param) {
				parsed.Query().Add("OD-"+param, parsed.Query().Get(param))
			}
		}
	}

	if usesWildcard {

	} else {

	}

	paramsToCache := []string{
		"Policy",
		"Signature",
		"Expires",
		"Key-Pair-Id",
	}

	parsed.RawQuery

	// put signed url into cache
	cache.Set(cacheKey, signedUrl, newTimestamp.Sub(time.Now())-time.Hour*24)

	return signedUrl, nil
}
