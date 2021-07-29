package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/paging"
	"overdoll/libraries/scan"
)

type accountDocument struct {
	Id        string   `json:"id"`
	Avatar    string   `json:"avatar"`
	Username  string   `json:"username"`
	Verified  bool     `json:"verified"`
	Roles     []string `json:"roles"`
	CreatedAt string   `json:"created_at"`
}

const accountIndex = `
{
	"mappings": {
		"dynamic": "strict",
		"properties": {
			"id": {
				"type": "keyword"
			},
			"avatar": {
				"type": "keyword"
			},
			"username": {
				"type": "text"
			},
			"verified": {
				"type": "boolean"
			},
			"roles": {
				"type": "keyword"
			},
			"created_at": {
				"type": "date"
			}
		}
	}
}`

const accountIndexName = "accounts"

type AccountIndexElasticSearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

func NewAccountIndexElasticSearchRepository(client *elastic.Client, session gocqlx.Session) AccountIndexElasticSearchRepository {
	return AccountIndexElasticSearchRepository{session: session, client: client}
}

func (r AccountIndexElasticSearchRepository) SearchAccounts(ctx context.Context, cursor *paging.Cursor, username string, artist bool) ([]*account.Account, error) {

	builder := r.client.Search().
		Index(accountIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	query := cursor.BuildElasticsearch(builder, "created_at")

	if username != "" {
		query.Must(elastic.NewMatchQuery("username", username))
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search accounts: %v", err)
	}

	var accounts []*account.Account

	for _, hit := range response.Hits.Hits {

		var ac accountDocument

		err := json.Unmarshal(hit.Source, &ac)

		if err != nil {
			return nil, err
		}

		// note that the index only contains partial info for the account so it should never be used for domain objects
		acc := account.UnmarshalAccountFromDatabase(ac.Id, ac.Username, "", ac.Roles, ac.Verified, ac.Avatar, false, 0, "", false)
		acc.Node = paging.NewNode(ac.CreatedAt)

		accounts = append(accounts, acc)

	}

	return accounts, nil
}

// Efficiently scan the accounts table and index it
func (r AccountIndexElasticSearchRepository) IndexAllAccounts(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(accountTable, func(iter *gocqlx.Iterx) error {

		var a accounts

		for iter.StructScan(&a) {

			parse, err := ksuid.Parse(a.Id)

			if err != nil {
				return err
			}

			doc := accountDocument{
				Id:        a.Id,
				Avatar:    a.Avatar,
				Username:  a.Username,
				Verified:  a.Verified,
				Roles:     a.Roles,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
			}

			_, err = r.client.
				Index().
				Index(accountIndexName).
				Id(a.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("could not index post: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r AccountIndexElasticSearchRepository) DeleteAccountIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(accountIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(accountIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(accountIndexName).BodyString(accountIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}