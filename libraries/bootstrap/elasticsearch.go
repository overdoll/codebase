package bootstrap

import (
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
	"time"

	"github.com/olivere/elastic/v7"
	"go.uber.org/zap"
)

func InitializeElasticSearchSession() *elastic.Client {
	client, err := elastic.NewClient(
		elastic.SetURL(os.Getenv("ELASTICSEARCH_URL")),
		elastic.SetRetrier(
			elastic.NewBackoffRetrier(
				elastic.NewExponentialBackoff(100*time.Millisecond, 7*time.Second),
			),
		),
		elastic.SetRetryStatusCodes(429, 504),
		elastic.SetHttpClient(sentry_support.NewElasticObserverHttpClient()),
		// USEFUL FOR DEBUGGING QUERIES!
		//elastic.SetErrorLog(zap_adapters.NewElasticZapAdapter(zap.S(), false)),
		//elastic.SetInfoLog(zap_adapters.NewElasticZapAdapter(zap.S(), true)),
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "elastic session failed"))
		zap.S().Fatalw("elastic session failed", zap.Error(err))
	}

	return client
}
