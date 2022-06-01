package adapters

import (
	"context"
	"encoding/json"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/domainerror"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
	"overdoll/libraries/support"
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

const ClubMembersIndexName = "club_members"

func marshalClubMemberToDocument(cat *club.Member) *clubMembersDocument {
	return &clubMembersDocument{
		Id:              cat.ClubId() + "-" + cat.AccountId(),
		ClubId:          cat.ClubId(),
		MemberAccountId: cat.AccountId(),
		JoinedAt:        cat.JoinedAt(),
		IsSupporter:     cat.IsSupporter(),
		SupporterSince:  cat.SupporterSince(),
	}
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
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get club memberships supporter count")
	}

	return count, nil
}

func (r ClubCassandraElasticsearchRepository) SearchClubMembers(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *club.MemberFilters) ([]*club.Member, error) {

	builder := r.client.Search().
		Index(ClubMembersIndexName)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
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
		return nil, domainerror.NewValidation("can only search by either club or account")
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
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search club members")
	}

	var members []*club.Member

	for _, hit := range response.Hits.Hits {

		var clb clubMembersDocument

		err := json.Unmarshal(hit.Source, &clb)

		if err != nil {
			return nil, errors.Wrap(err, "failed search club members - unmarshal")
		}

		member := club.UnmarshalMemberFromDatabase(clb.MemberAccountId, clb.ClubId, clb.JoinedAt, clb.IsSupporter, clb.SupporterSince)
		member.Node = paging.NewNode(hit.Sort)

		members = append(members, member)
	}

	return members, nil
}

func (r ClubCassandraElasticsearchRepository) indexClubMember(ctx context.Context, club *club.Member) error {

	clb := marshalClubMemberToDocument(club)

	_, err := r.client.
		Index().
		Index(ClubMembersIndexName).
		Id(clb.Id).
		BodyJson(*clb).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index club member")
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) IndexAllClubMembers(ctx context.Context) error {

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
				return errors.Wrap(support.ParseElasticError(err), "failed to index club members")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r ClubCassandraElasticsearchRepository) deleteClubMemberIndexById(ctx context.Context, clubId, accountId string) error {

	if _, err := r.client.Delete().Index(ClubMembersIndexName).Id(clubId + "-" + accountId).Do(ctx); err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to delete club member document")
	}

	return nil
}
