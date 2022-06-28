package adapters

import (
	"context"
	"encoding/json"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/resource"
	"overdoll/libraries/support"
	"time"

	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type clubDocument struct {
	Id                          string            `json:"id"`
	Slug                        string            `json:"slug"`
	SlugAliases                 []string          `json:"slug_aliases"`
	ThumbnailResource           string            `json:"thumbnail_resource"`
	BannerResource              string            `json:"banner_resource"`
	SupporterOnlyPostsDisabled  bool              `json:"supporter_only_posts_disabled"`
	Name                        map[string]string `json:"name"`
	CreatedAt                   time.Time         `json:"created_at"`
	MembersCount                int               `json:"members_count"`
	OwnerAccountId              string            `json:"owner_account_id"`
	Suspended                   bool              `json:"suspended"`
	SuspendedUntil              *time.Time        `json:"suspended_until"`
	NextSupporterPostTime       *time.Time        `json:"next_supporter_post_time"`
	HasCreatedSupporterOnlyPost bool              `json:"has_created_supporter_only_post"`
	Terminated                  bool              `json:"terminated"`
	TerminatedByAccountId       *string           `json:"terminated_by_account_id"`
	UpdatedAt                   time.Time         `json:"updated_at"`
}

const ClubsIndexName = "clubs"

var ClubsReaderIndex = cache.ReadAlias(ClubsIndexName)
var clubsWriterIndex = cache.WriteAlias(ClubsIndexName)

func marshalClubToDocument(cat *club.Club) (*clubDocument, error) {

	marshalledThumbnail, err := resource.MarshalResourceToDatabase(cat.ThumbnailResource())

	if err != nil {
		return nil, err
	}

	marshalledBanner, err := resource.MarshalResourceToDatabase(cat.BannerResource())

	if err != nil {
		return nil, err
	}

	return &clubDocument{
		Id:                          cat.ID(),
		Slug:                        cat.Slug(),
		SlugAliases:                 cat.SlugAliases(),
		ThumbnailResource:           marshalledThumbnail,
		BannerResource:              marshalledBanner,
		SupporterOnlyPostsDisabled:  cat.SupporterOnlyPostsDisabled(),
		Name:                        localization.MarshalTranslationToDatabase(cat.Name()),
		CreatedAt:                   cat.CreatedAt(),
		UpdatedAt:                   cat.UpdatedAt(),
		MembersCount:                cat.MembersCount(),
		OwnerAccountId:              cat.OwnerAccountId(),
		Suspended:                   cat.Suspended(),
		SuspendedUntil:              cat.SuspendedUntil(),
		NextSupporterPostTime:       cat.NextSupporterPostTime(),
		HasCreatedSupporterOnlyPost: cat.HasCreatedSupporterOnlyPost(),
		Terminated:                  cat.Terminated(),
		TerminatedByAccountId:       cat.TerminatedByAccountId(),
	}, nil
}

func unmarshalClubDocument(ctx context.Context, hit *elastic.SearchHit, resourceSerializer *resource.Serializer) (*club.Club, error) {
	var bd clubDocument

	err := json.Unmarshal(hit.Source, &bd)

	if err != nil {
		return nil, errors.Wrap(err, "failed search clubs - unmarshal")
	}

	unmarshalledThumbnail, err := resourceSerializer.UnmarshalResourceFromDatabase(ctx, bd.ThumbnailResource)

	if err != nil {
		return nil, err
	}

	unmarshalledBanner, err := resourceSerializer.UnmarshalResourceFromDatabase(ctx, bd.BannerResource)

	if err != nil {
		return nil, err
	}

	newBrand := club.UnmarshalClubFromDatabase(
		bd.Id,
		bd.Slug,
		bd.SlugAliases,
		bd.Name,
		unmarshalledThumbnail,
		unmarshalledBanner,
		bd.MembersCount,
		bd.OwnerAccountId,
		bd.Suspended,
		bd.SuspendedUntil,
		bd.NextSupporterPostTime,
		bd.HasCreatedSupporterOnlyPost,
		bd.Terminated,
		bd.TerminatedByAccountId,
		bd.SupporterOnlyPostsDisabled,
		bd.CreatedAt,
		bd.UpdatedAt,
	)
	newBrand.Node = paging.NewNode(hit.Sort)

	return newBrand, nil
}

func (r ClubCassandraElasticsearchRepository) indexClub(ctx context.Context, club *club.Club) error {

	clb, err := marshalClubToDocument(club)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(clubsWriterIndex).
		Id(clb.Id).
		BodyJson(*clb).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index club")
	}

	return nil
}
func (r ClubCassandraElasticsearchRepository) DiscoverClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*club.Club, error) {

	builder := r.client.Search().
		Index(ClubsReaderIndex)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	if err := cursor.BuildElasticsearch(builder, "members_count", "id", false); err != nil {
		return nil, err
	}

	var clubMembershipIds []string

	if requester != nil {
		clubMembershipIds = requester.ClubExtension().ClubMembershipIds()
	}

	query := elastic.NewBoolQuery()

	query.Filter(elastic.NewBoolQuery().
		// don't include clubs in the discovery if you are already a member of that club
		MustNot(elastic.NewTermsQueryFromStrings("club_id", clubMembershipIds...)),
	)

	query.Filter(elastic.NewTermQuery("terminated", false))

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to discover clubs")
	}

	var brands []*club.Club

	for _, hit := range response.Hits.Hits {

		newBrand, err := unmarshalClubDocument(ctx, hit, r.resourceSerializer)

		if err != nil {
			return nil, err
		}

		brands = append(brands, newBrand)
	}

	return brands, nil
}

func (r ClubCassandraElasticsearchRepository) SearchClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *club.Filters) ([]*club.Club, error) {

	builder := r.client.Search().
		Index(ClubsReaderIndex)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	var sortingColumn string
	var sortingAscending bool

	if filter.SortBy() == club.PopularSort {
		sortingColumn = "members_count"
		sortingAscending = false
	}

	if err := cursor.BuildElasticsearch(builder, sortingColumn, "id", sortingAscending); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	if filter.Suspended() != nil && *filter.Suspended() {
		if requester == nil || (requester != nil && !requester.IsStaff()) {
			return nil, principal.ErrNotAuthorized
		}
	}

	if filter.Terminated() != nil && *filter.Terminated() {
		if requester == nil || (requester != nil && !requester.IsStaff()) {
			return nil, principal.ErrNotAuthorized
		}
	}

	if filter.Suspended() != nil {
		query.Filter(elastic.NewTermQuery("suspended", *filter.Suspended()))
	}

	if filter.Terminated() != nil {
		query.Filter(elastic.NewTermQuery("terminated", *filter.Terminated()))
	}

	if filter.OwnerAccountId() != nil {
		query.Filter(elastic.NewTermQuery("owner_account_id", *filter.OwnerAccountId()))
	}

	if filter.Search() != nil {
		query.Must(
			elastic.
				NewMultiMatchQuery(*filter.Search(), "name.en").
				Type("best_fields"),
		)
	}

	if len(filter.Slugs()) > 0 {
		for _, id := range filter.Slugs() {
			query.Filter(elastic.NewTermQuery("slug", id))
		}
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search clubs")
	}

	var brands []*club.Club

	for _, hit := range response.Hits.Hits {

		newBrand, err := unmarshalClubDocument(ctx, hit, r.resourceSerializer)

		if err != nil {
			return nil, err
		}

		brands = append(brands, newBrand)
	}

	return brands, nil
}

func (r ClubCassandraElasticsearchRepository) IndexAllClubs(ctx context.Context) error {

	scanner := database.New(r.session,
		database.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, clubTable, func(iter *gocqlx.Iterx) error {

		var m clubs

		for iter.StructScan(&m) {

			doc := clubDocument{
				Id:                          m.Id,
				Slug:                        m.Slug,
				SlugAliases:                 m.SlugAliases,
				ThumbnailResource:           m.ThumbnailResource,
				BannerResource:              m.BannerResource,
				SupporterOnlyPostsDisabled:  m.SupporterOnlyPostsDisabled,
				Name:                        m.Name,
				OwnerAccountId:              m.OwnerAccountId,
				CreatedAt:                   m.CreatedAt,
				MembersCount:                m.MembersCount,
				Suspended:                   m.Suspended,
				SuspendedUntil:              m.SuspendedUntil,
				HasCreatedSupporterOnlyPost: m.HasCreatedSupporterOnlyPost,
				NextSupporterPostTime:       m.NextSupporterPostTime,
				Terminated:                  m.Terminated,
				TerminatedByAccountId:       m.TerminatedByAccountId,
				UpdatedAt:                   m.UpdatedAt,
			}

			_, err := r.client.
				Index().
				Index(clubMembersWriterIndex).
				Id(m.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return errors.Wrap(support.ParseElasticError(err), "failed to index clubs")
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}
