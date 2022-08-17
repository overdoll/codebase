package bootstrap

import (
	"os"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/zap_support/zap_adapters"
	"time"

	"github.com/olivere/elastic/v7"
	"go.uber.org/zap"
)

func InitializeElasticSearchSession() *elastic.Client {

	options := []elastic.ClientOptionFunc{
		elastic.SetURL(os.Getenv("ELASTICSEARCH_URL")),
		elastic.SetRetrier(
			elastic.NewBackoffRetrier(
				elastic.NewExponentialBackoff(100*time.Millisecond, 7*time.Second),
			),
		),
		elastic.SetRetryStatusCodes(429, 504),
		elastic.SetHttpClient(sentry_support.NewElasticObserverHttpClient()),
	}

	if os.Getenv("ENABLE_ELASTIC_TRACE_LOG") == "true" {
		options = append(options, elastic.SetTraceLog(zap_adapters.NewElasticZapAdapter(zap.S(), true)))
	}

	client, err := elastic.NewClient(options...)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "elastic session failed"))
		zap.S().Fatalw("elastic session failed", zap.Error(err))
	}

	return client
}
