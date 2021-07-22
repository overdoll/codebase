package adapters

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
	"strings"
	"text/template"

	"github.com/scylladb/gocqlx/v2"
	"github.com/segmentio/ksuid"
	"overdoll/applications/eva/src/domain/account"
	search "overdoll/libraries/elasticsearch"
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
				"type": "keyword"
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

const searchAccounts = `
    "query" : {
		"bool": {
			"must": [
				{{.Cursor}}
			]
		}
	},
	{{.Size}}
    {{.Sort}}
	"track_total_hits": false
`

const accountIndexName = "accounts"

type AccountIndexElasticSearchRepository struct {
	session gocqlx.Session
	store   *search.Store
}

func NewAccountIndexElasticSearchRepository(session gocqlx.Session, store *search.Store) AccountIndexElasticSearchRepository {
	return AccountIndexElasticSearchRepository{session: session, store: store}
}

func (r AccountIndexElasticSearchRepository) SearchAccounts(ctx context.Context, cursor *paging.Cursor, username string, artist bool) ([]*account.Account, error) {

	t, err := template.New("searchAccount").Parse(searchAccounts)

	if err != nil {
		return nil, err
	}

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	curse, sort, count := cursor.BuildElasticsearch("created_at")

	data := struct {
		Cursor string
		Sort   string
		Size   string
	}{
		Size:   count,
		Sort:   sort,
		Cursor: strings.TrimRight(curse, ","),
	}

	var query bytes.Buffer

	if err := t.Execute(&query, data); err != nil {
		return nil, err
	}

	response, err := r.store.Search(accountIndexName, query.String())

	if err != nil {
		return nil, err
	}

	var accounts []*account.Account

	for _, cat := range response.Hits {

		var ac accountDocument

		err := json.Unmarshal(cat, &ac)

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

	if err := r.store.CreateBulkIndex(accountIndexName); err != nil {
		return err
	}

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

			if err := r.store.AddToBulkIndex(ctx, a.Id, accountDocument{
				Id:        a.Id,
				Avatar:    a.Avatar,
				Username:  a.Username,
				Verified:  a.Verified,
				Roles:     a.Roles,
				CreatedAt: strconv.FormatInt(parse.Time().Unix(), 10),
			}); err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	if err := r.store.CloseBulkIndex(ctx); err != nil {
		return fmt.Errorf("unexpected error: %s", err)
	}

	return nil
}

func (r AccountIndexElasticSearchRepository) DeleteAccountIndex(ctx context.Context) error {

	err := r.store.DeleteIndex(accountIndexName)

	if err != nil {
		return fmt.Errorf("failed to delete account index: %s", err)
	}

	err = r.store.CreateIndex(accountIndexName, accountIndex)

	if err != nil {
		return fmt.Errorf("failed to create account index: %s", err)
	}

	return nil
}
