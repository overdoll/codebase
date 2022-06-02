package bootstrap

import (
	"os"
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
		// USEFUL FOR DEBUGGING QUERIES!
		//elastic.SetErrorLog(log.New(os.Stderr, "ELASTIC ", log.LstdFlags)),
		//elastic.SetInfoLog(log.New(os.Stdout, "", log.LstdFlags)),
		//elastic.SetTraceLog(log.New(os.Stderr, "[[ELASTIC]]", 0)),
	)

	if err != nil {
		zap.S().Fatalw("es session failed", zap.Error(err))
	}

	return client
}
