package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/localization"
)

const characterIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"slug": {
		"type": "keyword"
	},
	"thumbnail_resource": {
		"type": "keyword"
	},
	"name": ` + localization.ESIndex + `
	"created_at": {
		"type": "date"
	},
	"total_likes": {
		"type": "integer"
	},
	"total_posts": {
		"type": "integer"
	},
	"series": {
		"type": "nested",
		"properties": ` + seriesIndexProperties + ` 
	},
	"updated_at": {
		"type": "date"
	}
}
`

const characterIndex = `
{
    "settings": { ` + localization.ESSettings + ` },
	"mappings": {
		"dynamic": "strict",
		"properties": ` + characterIndexProperties + `
	}
}`

func createCharacterIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.CharacterIndexName).BodyString(characterIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
