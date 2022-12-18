package media

import (
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
	"github.com/jellydator/ttlcache/v3"
	"go.uber.org/zap"
	"net/url"
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/support"
	"strings"
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

var paramsToSearch = []string{
	"Policy",
	"Signature",
	"Expires",
	"Key-Pair-Id",
}

func (c *Serializer) createSignedUrl(policy SerializerPolicy) (string, error) {

	usesWildcard := policy.UseWildcardCacheKey != ""

	if usesWildcard {

		item := cache.Get(policy.UseWildcardCacheKey)

		if item != nil {

			if policy.UsePrefix {

				parsedQuery, err := url.ParseQuery(item.Value())

				if err != nil {
					return "", errors.Wrap(err, "failed to parse query")
				}

				for _, param := range paramsToSearch {
					if parsedQuery.Has(param) {
						parsedQuery.Add("OD-"+param, parsedQuery.Get(param))
					}
				}

				return policy.URI + "?" + parsedQuery.Encode(), nil
			}

			// if we use a wildcard, the wildcard only saved the query params, so we must reconstruct them
			if strings.Contains(policy.URI, "?") {
				return policy.URI + "&" + item.Value(), nil
			}

			return policy.URI + "?" + item.Value(), nil
		}

	} else {
		item := cache.Get(policy.URI)

		if item != nil {
			return item.Value(), nil
		}
	}

	timestamp := time.Now()

	year := timestamp.Year()
	month := timestamp.Month()
	day := timestamp.Day()

	loc, err := time.LoadLocation("UTC")

	if err != nil {
		return "", err
	}

	if day > 15 {
		if month == time.December {
			month = time.January
			year += 1
		} else {
			month += 1
		}
	}

	// make expiry at the end of the month
	newTimestamp := time.Date(year, month, 1, 0, 0, 0, 0, loc)
	newTimestamp = newTimestamp.AddDate(0, 1, -1)

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
			return "", errors.Wrap(err, "could not generate signed url with canned policies")
		}
	}

	if policy.UsePrefix {

		parsed, err := url.Parse(signedUrl)

		if err != nil {
			return "", errors.Wrap(err, "failed to parse url")
		}

		for _, param := range paramsToSearch {
			if parsed.Query().Has(param) {
				parsed.Query().Add("OD-"+param, parsed.Query().Get(param))
			}
		}

		signedUrl = parsed.String()
	}

	cacheTTL := newTimestamp.Sub(time.Now()) - time.Hour*24

	// uses a wildcard policy, we just cache the query params
	if usesWildcard {

		parsed, err := url.Parse(signedUrl)

		if err != nil {
			return "", errors.Wrap(err, "failed to parse url")
		}

		finalCacheKey := ""

		for i, param := range paramsToSearch {
			if parsed.Query().Has(param) {
				paramValue := param + "=" + parsed.Query().Get(param)
				if i == len(paramsToSearch)-1 {
					finalCacheKey += paramValue
				} else {
					finalCacheKey += paramValue + "&"
				}
			}
		}

		// put signed url into cache
		cache.Set(policy.UseWildcardCacheKey, finalCacheKey, cacheTTL)
		return signedUrl, nil
	}

	// put signed url into cache
	cache.Set(policy.URI, signedUrl, cacheTTL)

	return signedUrl, nil
}
