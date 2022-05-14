package migrations

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/libraries/bootstrap"
)

const clubMembersIndexProperties = `
{
	"id": {
		"type": "keyword"
	},
	"member_account_id": {
		"type": "keyword"
	},
	"club_id": {
		"type": "keyword"
	},
	"joined_at": {
		"type": "date"
	},
	"is_supporter": {
		"type": "boolean"
	},
	"supporter_since": {
		"type": "date"
	}
}
`

const clubMembersIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties":` + clubMembersIndexProperties + `
	}
}`

func createClubMembersIndex(ctx context.Context, session gocqlx.Session, ev migrate.CallbackEvent, name string) error {

	esClient := bootstrap.InitializeElasticSearchSession()

	_, err := esClient.CreateIndex(adapters.ClubMembersIndexName).BodyString(clubMembersIndex).Do(ctx)

	if err != nil {
		return err
	}

	return nil
}
