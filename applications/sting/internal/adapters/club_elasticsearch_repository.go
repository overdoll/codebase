package adapters

import (
	"context"
	"encoding/json"
	"go.uber.org/zap"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/media"
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
	Links                       []string          `json:"links"`
	SlugAliases                 []string          `json:"slug_aliases"`
	ThumbnailResource           string            `json:"thumbnail_resource"`
	ThumbnailMedia              *string           `json:"thumbnail_media"`
	BannerResource              string            `json:"banner_resource"`
	BannerMedia                 *string           `json:"banner_media"`
	HeaderMedia                 *string           `json:"header_media"`
	SupporterOnlyPostsDisabled  bool              `json:"supporter_only_posts_disabled"`
	CharactersEnabled           bool              `json:"characters_enabled"`
	CharactersLimit             int               `json:"characters_limit"`
	TotalLikes                  int               `json:"total_likes"`
	TotalPosts                  int               `json:"total_posts"`
	Name                        map[string]string `json:"name"`
	Blurb                       map[string]string `json:"blurb"`
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

var ClubsReaderIndex = cache.ReadAlias(CachePrefix, ClubsIndexName)
var clubsWriterIndex = cache.WriteAlias(CachePrefix, ClubsIndexName)

func marshalClubToDocument(cat *club.Club) (*clubDocument, error) {

	marshalledThumbnail, err := media.MarshalMediaToDatabase(cat.ThumbnailMedia())

	if err != nil {
		return nil, err
	}

	marshalledBanner, err := media.MarshalMediaToDatabase(cat.BannerMedia())

	if err != nil {
		return nil, err
	}

	marshalledHeader, err := media.MarshalMediaToDatabase(cat.HeaderMedia())

	if err != nil {
		return nil, err
	}

	var bannerResource string

	if cat.BannerMedia() != nil {
		bannerResource = cat.BannerMedia().LegacyResource()
	}

	var thumbnailResource string

	if cat.ThumbnailMedia() != nil {
		thumbnailResource = cat.ThumbnailMedia().LegacyResource()
	}

	return &clubDocument{
		Id:                          cat.ID(),
		Slug:                        cat.Slug(),
		SlugAliases:                 cat.SlugAliases(),
		ThumbnailResource:           thumbnailResource,
		BannerResource:              bannerResource,
		BannerMedia:                 marshalledBanner,
		ThumbnailMedia:              marshalledThumbnail,
		HeaderMedia:                 marshalledHeader,
		SupporterOnlyPostsDisabled:  cat.SupporterOnlyPostsDisabled(),
		Name:                        localization.MarshalTranslationToDatabase(cat.Name()),
		Blurb:                       localization.MarshalTranslationToDatabase(cat.Blurb()),
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
		CharactersLimit:             cat.CharactersLimit(),
		CharactersEnabled:           cat.CharactersEnabled(),
		TotalLikes:                  cat.TotalLikes(),
		TotalPosts:                  cat.TotalPosts(),
		Links:                       cat.Links(),
	}, nil
}

func unmarshalClubDocument(ctx context.Context, source json.RawMessage, sort []interface{}) (*club.Club, error) {
	var bd clubDocument

	err := json.Unmarshal(source, &bd)

	if err != nil {
		return nil, errors.Wrap(err, "failed search clubs - unmarshal")
	}

	unmarshalledThumbnail, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, bd.ThumbnailResource, bd.ThumbnailMedia)

	if err != nil {
		return nil, err
	}

	unmarshalledBanner, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, bd.BannerResource, bd.BannerMedia)

	if err != nil {
		return nil, err
	}

	unmarshalledHeader, err := media.UnmarshalMediaWithLegacyResourceFromDatabase(ctx, "", bd.HeaderMedia)

	if err != nil {
		return nil, err
	}

	newBrand := club.UnmarshalClubFromDatabase(
		bd.Id,
		bd.Slug,
		bd.SlugAliases,
		bd.Name,
		bd.Blurb,
		unmarshalledThumbnail,
		unmarshalledBanner,
		unmarshalledHeader,
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
		bd.CharactersEnabled,
		bd.CharactersLimit,
		bd.TotalLikes,
		bd.TotalPosts,
		bd.Links,
	)

	if sort != nil {
		newBrand.Node = paging.NewNode(sort)
	}

	return newBrand, nil
}

func (r ClubCassandraElasticsearchRepository) IndexClub(ctx context.Context, postId string) error {

	pst, err := r.GetClubById(ctx, postId)

	if err != nil {
		return err
	}

	if err := r.indexClub(ctx, pst); err != nil {
		return err
	}

	return nil
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

func (r ClubCassandraElasticsearchRepository) GetClubsByIds(ctx context.Context, clubIds []string) ([]*club.Club, error) {

	var clubs []*club.Club

	if len(clubIds) == 0 {
		return clubs, nil
	}

	builder := r.client.MultiGet().Realtime(false)

	for _, clubId := range clubIds {
		builder.Add(elastic.NewMultiGetItem().Id(clubId).Index(ClubsReaderIndex))
	}

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search clubs")
	}

	for _, hit := range response.Docs {

		if !hit.Found {
			return nil, apperror.NewNotFoundError("club", hit.Id)
		}

		result, err := unmarshalClubDocument(ctx, hit.Source, nil)

		if err != nil {
			return nil, err
		}

		clubs = append(clubs, result)
	}

	return clubs, nil
}

func (r ClubCassandraElasticsearchRepository) addClubWeightsToESQuery(ctx context.Context, query *elastic.BoolQuery) error {
	return addClubWeightsToESQuery(r.session, ctx, "_id", query)
}

func (r ClubCassandraElasticsearchRepository) DiscoverClubs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*club.Club, error) {

	builder := r.client.Search().
		Index(ClubsReaderIndex)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	if err := cursor.BuildElasticsearch(builder, "_score", "id", false); err != nil {
		return nil, err
	}

	var clubMembershipIds []string

	if requester != nil {
		clubMembershipIds = requester.ClubExtension().ClubMembershipIds()
	}

	query := elastic.NewBoolQuery()

	if err := r.addClubWeightsToESQuery(ctx, query); err != nil {
		return nil, err
	}

	query.Filter(elastic.NewBoolQuery().
		// don't include clubs in the discovery if you are already a member of that club
		MustNot(elastic.NewTermsQueryFromStrings("id", clubMembershipIds...)),
	)

	// only show clubs that have made at least 1 post
	query.Filter(elastic.NewRangeQuery("total_posts").Gt(0))
	query.Filter(elastic.NewTermQuery("terminated", false))

	// total posts should be a priority
	query.Must(elastic.NewFunctionScoreQuery().AddScoreFunc(elastic.NewFieldValueFactorFunction().Field("total_posts").Factor(2)))
	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to discover clubs")
	}

	var brands []*club.Club

	for _, hit := range response.Hits.Hits {

		newBrand, err := unmarshalClubDocument(ctx, hit.Source, hit.Sort)

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

	if filter.ExcludeEmpty() {
		query.Must(elastic.NewRangeQuery("total_posts").Gt(0))
	}

	if filter.CanSupport() != nil {
		if *filter.CanSupport() {
			query.Filter(elastic.NewTermQuery("terminated", false))
			query.Filter(elastic.NewTermQuery("suspended", false))
			query.Filter(elastic.NewTermQuery("has_created_supporter_only_post", true))
		} else {
			query.Filter(elastic.NewTermQuery("has_created_supporter_only_post", false))
		}
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search clubs")
	}

	var brands []*club.Club

	for _, hit := range response.Hits.Hits {

		newBrand, err := unmarshalClubDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		brands = append(brands, newBrand)
	}

	return brands, nil
}

func (r ClubCassandraElasticsearchRepository) IndexAllClubs(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, clubTable, func(iter *gocqlx.Iterx) error {

		var m clubs

		for iter.StructScan(&m) {

			unmarshalled, err := r.unmarshalClubFromDatabase(ctx, &m)

			if err != nil {
				return err
			}

			marshalled, err := marshalClubToDocument(unmarshalled)

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(clubsWriterIndex).
				Id(marshalled.Id).
				OpType("create").
				BodyJson(marshalled).
				Do(ctx)

			e, ok := err.(*elastic.Error)
			if ok && e.Details.Type == "version_conflict_engine_exception" {
				zap.S().Infof("skipping document [%s] due to conflict", marshalled.Id)
			} else {
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
