package bootstrap

import (
	"os"

	"github.com/olivere/elastic/v7"
	"go.uber.org/zap"
)

func InitializeElasticSearchSession() *elastic.Client {

	client, err := elastic.NewClient(
		elastic.SetURL(os.Getenv("ELASTICSEARCH_URL")),
		// USEFUL FOR DEBUGGING QUERIES!
		//elastic.SetErrorLog(log.New(os.Stderr, "ELASTIC ", log.LstdFlags)),
		//elastic.SetInfoLog(log.New(os.Stdout, "", log.LstdFlags)),
		//elastic.SetTraceLog(log.New(os.Stderr, "[[ELASTIC]]", 0)),
	)

	if err != nil {
		zap.S().Fatal("es session failed", zap.Error(err))
	}

	return client
}
