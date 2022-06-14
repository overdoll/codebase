package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/bootstrap"
)

const postIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
				"id": {
					"type": "keyword"
				},
				"state": {
					"type": "keyword"
				},
				"supporter_only_status": {
					"type": "keyword"
				},
				"likes": {
					"type": "integer"
				},
				"contributor_id": {
					"type": "keyword"
				},
				"audience_id": {
					"type": "keyword"
				},
                "club_id": {
					"type": "keyword"
				},
				"category_ids": {
					"type": "keyword"
				},
				"character_ids": {
					"type": "keyword"
				},
				"series_ids": {
					"type": "keyword"
				},
				"content_resource_ids": {
                     "type": "keyword"
				},
				"content_resources": {
                     "type": "object",
					 "dynamic": true
				},
				"content_supporter_only": {
                     "type": "object",
					 "dynamic": true
				},
				"content_supporter_only_resource_ids": {
                     "type": "object",
					 "dynamic": true
				},
				"created_at": {
                     "type": "date"
				},			
				"posted_at": {
                     "type": "date"
				},
				"reassignment_at": {
                     "type": "date"
				}
			}
	}
}`

func createPostsIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.PostIndexName).BodyString(postIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
