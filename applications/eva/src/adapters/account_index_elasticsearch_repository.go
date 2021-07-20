package adapters

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/eva/src/domain/account"
	search "overdoll/libraries/elasticsearch"
	"overdoll/libraries/paging"
	"overdoll/libraries/scan"
)

type accountDocument struct {
	Id       string   `json:"id"`
	Avatar   string   `json:"avatar"`
	Username string   `json:"username"`
	Verified bool     `json:"verified"`
	Roles    []string `json:"roles"`
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
				"type": "text",
				"analyzer": "english"
			},
			"verified": {
				"type": "bool",
			},
			"Roles": {
				"type": "bool",
			}
		}
	}
}`

const searchAccounts = `
	"query" : {
		"multi_match" : {
			"query" : %q,
			"fields" : ["username^100"],
			"operator" : "and"
		}
	},
	"size" : 5`

const allAccounts = `
	"query" : { "match_all" : {} },
	"size" : 5`

const accountIndexName = "accounts"

type AccountIndexElasticSearchRepository struct {
	session gocqlx.Session
	store   *search.Store
}

func NewAccountIndexElasticSearchRepository(session gocqlx.Session, store *search.Store) AccountIndexElasticSearchRepository {
	return AccountIndexElasticSearchRepository{session: session, store: store}
}

func (r AccountIndexElasticSearchRepository) SearchAccounts(ctx context.Context, cursor *paging.Cursor, username string, artist bool) ([]*account.Account, *paging.Info, error) {
	var query string

	if username == "" {
		query = allAccounts
	} else {
		query = fmt.Sprintf(searchAccounts, query)
	}

	response, err := r.store.Search(accountIndexName, query)

	if err != nil {
		return nil, nil, err
	}

	var accounts []*account.Account

	for _, cat := range response.Hits {

		var ac accountDocument

		err := json.Unmarshal(cat, &ac)

		if err != nil {
			return nil, nil, err
		}

		// note that the index only contains partial info for the account so it should never be used for domain objects
		acc := account.UnmarshalAccountFromDatabase(ac.Id, ac.Username, "", ac.Roles, ac.Verified, ac.Avatar, false, 0, "", false)
		acc.Node = paging.NewNode(ac.Id)

		accounts = append(accounts, acc)

	}

	return accounts, nil, nil
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

		if err := r.store.CreateBulkIndex(accountIndex); err != nil {
			return err
		}

		var a accounts

		for iter.StructScan(&a) {
			if err := r.store.AddToBulkIndex(a.Id, accountDocument{
				Id:       a.Id,
				Avatar:   a.Avatar,
				Username: a.Username,
				Verified: a.Verified,
				Roles:    a.Roles,
			}); err != nil {
				return err
			}
		}

		if err := r.store.CloseBulkIndex(); err != nil {
			return fmt.Errorf("unexpected error: %s", err)
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r AccountIndexElasticSearchRepository) DeleteAccountIndex(ctx context.Context) error {
	err := r.store.DeleteIndex(accountIndexName)

	if err != nil {

	}

	err = r.store.CreateIndex(accountIndexName, accountIndex)

	if err != nil {
		return fmt.Errorf("failed to create account index: %s", err)
	}

	return nil
}
