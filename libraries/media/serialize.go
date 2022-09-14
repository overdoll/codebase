package media

import (
	"github.com/aws/aws-sdk-go/service/cloudfront/sign"
	"github.com/jellydator/ttlcache/v3"
	"go.uber.org/zap"
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

func (c *Serializer) createSignedUrl(url string) (string, error) {

	item := cache.Get(url)

	if item != nil {
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

	if day >= 24 {
		day = 1

		if month == time.December {
			month = time.January
		} else {
			month += 1
		}

	}

	dayBucket := 5

	if day >= 4 {
		dayBucket = 10
	}

	if day >= 9 {
		dayBucket = 15
	}

	if day >= 14 {
		dayBucket = 20
	}

	if day >= 19 {
		dayBucket = 25
	}

	newTimestamp := time.Date(year, month, dayBucket, 0, 0, 0, 0, loc)

	signedURL, err := c.signer.Sign(url, newTimestamp)

	if err != nil {
		return "", errors.Wrap(err, "could not generate signed url")
	}

	// put signed url into cache
	cache.Set(url, signedURL, newTimestamp.Sub(time.Now())-time.Minute*5)

	return signedURL, nil
}
