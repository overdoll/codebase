package bootstrap

import (
	"os"

	"github.com/olivere/elastic/v7"
)

func InitializeElasticSearchSession() (*elastic.Client, error) {

	client, err := elastic.NewClient(
		elastic.SetURL(os.Getenv("ELASTICSEARCH_URL")),
		//elastic.SetErrorLog(log.New(os.Stderr, "ELASTIC ", log.LstdFlags)),
		//elastic.SetInfoLog(log.New(os.Stdout, "", log.LstdFlags)),
		//elastic.SetTraceLog(log.New(os.Stderr, "[[ELASTIC]]", 0)),
	)

	if err != nil {
		return nil, err
	}

	return client, nil
}
