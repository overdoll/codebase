package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
	"time"
)

type clubMembersDocument struct {
	Id              string     `json:"id"`
	ClubId          string     `json:"club_id"`
	MemberAccountId string     `json:"member_account_id"`
	JoinedAt        time.Time  `json:"joined_at"`
	IsSupporter     bool       `json:"is_supporter"`
	SupporterSince  *time.Time `json:"supporter_since"`
}

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

const ClubMembersIndexName = "club_members"

func marshalClubMemberToDocument(cat *club.Member) (*clubMembersDocument, error) {
	return &clubMembersDocument{
		Id:              cat.ClubId() + "-" + cat.AccountId(),
		ClubId:          cat.ClubId(),
		MemberAccountId: cat.AccountId(),
		JoinedAt:        cat.JoinedAt(),
		IsSupporter:     cat.IsSupporter(),
		SupporterSince:  cat.SupporterSince(),
	}, nil
}

func (r ClubCassandraElasticsearchRepository) getClubsSupporterMembershipCount(ctx context.Context, clubId string) (int64, error) {
	builder := r.client.Count().
		Index(ClubMembersIndexName)

	query := elastic.NewBoolQuery()

	query.Filter(elastic.NewTermQuery("club_id", clubId))
	query.Filter(elastic.NewTermQuery("is_supporter", true))

	builder.Query(query)

	count, err := builder.ErrorTrace(true).Pretty(true).Do(ctx)

	if err != nil {
		return 0, fmt.Errorf("failed to get club memberships supporter count: %v", err)
	}

	return count, nil
}

func (r ClubCassandraElasticsearchRepository) SearchClubMembers(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *club.MemberFilters) ([]*club.Member, error) {

	builder := r.client.Search().
		Index(ClubMembersIndexName)

	if cursor == nil {
		return nil, errors.New("cursor required")
	}

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	var sortingColumn string
	var sortingAscending bool

	if filters.SortBy() == club.MemberNewSort {
		sortingColumn = "joined_at"
		sortingAscending = true
	}

	if err := cursor.BuildElasticsearch(builder, sortingColumn, "id", sortingAscending); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	if filters.AccountId() == nil && filters.ClubId() == nil {
		return nil, errors.New("can only search by either club or account")
	}

	if filters.AccountId() != nil {
		query.Filter(elastic.NewTermQuery("member_account_id", *filters.AccountId()))
	}

	if filters.ClubId() != nil {
		query.Filter(elastic.NewTermQuery("club_id", *filters.ClubId()))
	}

	if filters.Supporter() == true {

		query.Filter(elastic.NewTermQuery("is_supporter", filters.Supporter()))

		if !requester.IsStaff() {

			if filters.ClubId() != nil {

				club, err := r.getClubById(ctx, *filters.ClubId())

				if err != nil {
					return nil, err
				}

				if err := requester.BelongsToAccount(club.OwnerAccountId); err != nil {
					return nil, err
				}
			}

			if filters.AccountId() != nil {
				if err := requester.BelongsToAccount(*filters.AccountId()); err != nil {
					return nil, err
				}
			}
		}
	}

	builder.Query(query)

	response, err := builder.ErrorTrace(true).Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed search club members: %v", err)
	}

	var members []*club.Member

	for _, hit := range response.Hits.Hits {

		var clb clubMembersDocument

		err := json.Unmarshal(hit.Source, &clb)

		if err != nil {
			return nil, fmt.Errorf("failed search club members - unmarshal: %v", err)
		}

		member := club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince)
		member.Node = paging.NewNode(hit.Sort)

		members = append(members, member)
	}

	return members, nil
}

func (r ClubCassandraElasticsearchRepository) indexClubMember(ctx context.Context, club *club.Member) error {

	clb, err := marshalClubMemberToDocument(club)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(ClubMembersIndexName).
		Id(clb.Id).
		BodyJson(*clb).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index club member: %v", err)
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) indexAllClubMembers(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, clubMembersTable, func(iter *gocqlx.Iterx) error {

		var m clubMember

		for iter.StructScan(&m) {

			doc := clubMembersDocument{
				Id:              m.ClubId + "-" + m.MemberAccountId,
				ClubId:          m.ClubId,
				MemberAccountId: m.MemberAccountId,
				JoinedAt:        m.JoinedAt,
				IsSupporter:     m.IsSupporter,
				SupporterSince:  m.SupporterSince,
			}

			_, err := r.client.
				Index().
				Index(ClubMembersIndexName).
				Id(doc.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index club members: %v", err)
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) DeleteAndRecreateClubMembersIndex(ctx context.Context) error {
	if err := r.deleteClubMembersIndex(ctx); err != nil {
		return err
	}

	return r.indexAllClubMembers(ctx)
}

func (r ClubCassandraElasticsearchRepository) deleteClubMembersIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(ClubMembersIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(ClubMembersIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(ClubMembersIndexName).BodyString(clubMembersIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) deleteClubMemberIndexById(ctx context.Context, clubId, accountId string) error {

	if _, err := r.client.Delete().Index(ClubMembersIndexName).Id(clubId + "-" + accountId).Do(ctx); err != nil {
		return fmt.Errorf("failed to delete club member document: %v", err)
	}

	return nil
}
