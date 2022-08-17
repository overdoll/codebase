package adapters

import (
	"context"
	"encoding/json"
	"go.uber.org/zap"
	"math"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/localization"
	"overdoll/libraries/resource"
	"overdoll/libraries/support"
	"time"

	elastic "github.com/olivere/elastic/v7"
	gocqlx "github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type postDocument struct {
	Id                              string            `json:"id"`
	State                           string            `json:"state"`
	Description                     map[string]string `json:"description"`
	SupporterOnlyStatus             string            `json:"supporter_only_status"`
	ContentResourceIds              []string          `json:"content_resource_ids"`
	ContentResources                map[string]string `json:"content_resources"`
	ContentSupporterOnly            map[string]bool   `json:"content_supporter_only"`
	ContentSupporterOnlyResourceIds map[string]string `json:"content_supporter_only_resource_ids"`
	Likes                           int               `json:"likes"`
	ContributorId                   string            `json:"contributor_id"`
	ClubId                          string            `json:"club_id"`
	AudienceId                      string            `json:"audience_id"`
	CategoryIds                     []string          `json:"category_ids"`
	CharacterIds                    []string          `json:"character_ids"`
	SeriesIds                       []string          `json:"series_ids"`
	CreatedAt                       time.Time         `json:"created_at"`
	UpdatedAt                       time.Time         `json:"updated_at"`
	PostedAt                        *time.Time        `json:"posted_at"`
}

const PostIndexName = "posts"

var PostReaderIndex = cache.ReadAlias(CachePrefix, PostIndexName)
var postWriterIndex = cache.WriteAlias(CachePrefix, PostIndexName)

func (r *PostsCassandraElasticsearchRepository) unmarshalPostDocument(ctx context.Context, source json.RawMessage, sort []interface{}) (*post.Post, error) {

	var pst postDocument

	err := json.Unmarshal(source, &pst)

	if err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal post")
	}

	var audience *string

	if pst.AudienceId != "" {
		audience = &pst.AudienceId
	}

	var valueString []string

	for _, r := range pst.ContentResources {
		valueString = append(valueString, r)
	}

	resources, err := r.resourceSerializer.UnmarshalResourcesFromDatabase(ctx, valueString)

	if err != nil {
		return nil, err
	}

	createdPost := post.UnmarshalPostFromDatabase(
		pst.Id,
		pst.State,
		pst.SupporterOnlyStatus,
		pst.Likes,
		pst.ContributorId,
		pst.ContentResourceIds,
		resources,
		pst.ContentSupporterOnly,
		pst.ContentSupporterOnlyResourceIds,
		pst.ClubId,
		audience,
		pst.CharacterIds,
		pst.SeriesIds,
		pst.CategoryIds,
		pst.CreatedAt,
		pst.UpdatedAt,
		pst.PostedAt,
		pst.Description,
	)

	if sort != nil {
		createdPost.Node = paging.NewNode(sort)
	}

	return createdPost, nil
}

func marshalPostToDocument(pst *post.Post) (*postDocument, error) {

	var audience string

	if pst.AudienceId() != nil {
		audience = *pst.AudienceId()
	}

	var contentResourceIds []string
	contentSupporterOnly := make(map[string]bool)
	contentSupporterOnlyResourceIds := make(map[string]string)
	contentResources := make(map[string]string)

	for _, cont := range pst.Content() {
		contentResourceIds = append(contentResourceIds, cont.Resource().ID())
		contentSupporterOnly[cont.Resource().ID()] = cont.IsSupporterOnly()
		if cont.IsSupporterOnly() && cont.ResourceHidden() != nil {
			contentSupporterOnlyResourceIds[cont.Resource().ID()] = cont.ResourceHidden().ID()
		}

		if cont.ResourceHidden() != nil {
			marshalled, err := resource.MarshalResourceToDatabase(cont.ResourceHidden())

			if err != nil {
				return nil, err
			}

			contentResources[cont.ResourceHidden().ID()] = marshalled
		}

		marshalled, err := resource.MarshalResourceToDatabase(cont.Resource())

		if err != nil {
			return nil, err
		}

		contentResources[cont.Resource().ID()] = marshalled
	}

	return &postDocument{
		Id:                              pst.ID(),
		Likes:                           pst.Likes(),
		SupporterOnlyStatus:             pst.SupporterOnlyStatus().String(),
		State:                           pst.State().String(),
		AudienceId:                      audience,
		ClubId:                          pst.ClubId(),
		ContributorId:                   pst.ContributorId(),
		ContentResources:                contentResources,
		ContentResourceIds:              contentResourceIds,
		ContentSupporterOnly:            contentSupporterOnly,
		ContentSupporterOnlyResourceIds: contentSupporterOnlyResourceIds,
		CategoryIds:                     pst.CategoryIds(),
		CharacterIds:                    pst.CharacterIds(),
		SeriesIds:                       pst.SeriesIds(),
		CreatedAt:                       pst.CreatedAt(),
		UpdatedAt:                       pst.UpdatedAt(),
		PostedAt:                        pst.PostedAt(),
		Description:                     localization.MarshalTranslationToDatabase(pst.Description()),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) RefreshPostIndex(ctx context.Context) error {

	_, err := r.client.
		Refresh().
		Index(PostReaderIndex).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to refresh post index")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) indexPost(ctx context.Context, post *post.Post) error {

	pst, err := marshalPostToDocument(post)

	if err != nil {
		return err
	}

	_, err = r.client.
		Index().
		Index(postWriterIndex).
		Id(post.ID()).
		BodyJson(*pst).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to index post")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalLikesForCharacterOperator(ctx context.Context, character *post.Character) (int, error) {

	response, err := r.client.Search().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("character_ids", character.ID()),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total likes for character")
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalPostsForCharacterOperator(ctx context.Context, character *post.Character) (int, error) {

	count, err := r.client.Count().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("character_ids", character.ID()),
			)).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total posts for character")
	}

	return int(count), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalLikesForAudienceOperator(ctx context.Context, audience *post.Audience) (int, error) {

	response, err := r.client.Search().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("audience_id", audience.ID()),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total likes for audience")
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalPostsForAudienceOperator(ctx context.Context, audience *post.Audience) (int, error) {

	count, err := r.client.Count().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("audience_id", audience.ID()),
			)).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total posts for audience")
	}

	return int(count), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalLikesForSeriesOperator(ctx context.Context, series *post.Series) (int, error) {

	response, err := r.client.Search().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("series_ids", series.ID()),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total likes for series")
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalPostsForSeriesOperator(ctx context.Context, series *post.Series) (int, error) {

	count, err := r.client.Count().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("series_ids", series.ID()),
			)).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total posts for series")
	}

	return int(count), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalPostsForClubOperator(ctx context.Context, clubId string) (int, error) {

	count, err := r.client.Count().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermQuery("club_id", clubId),
			)).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total posts for club")
	}

	return int(count), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalLikesForClubOperator(ctx context.Context, clubId string) (int, error) {

	response, err := r.client.Search().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermQuery("club_id", clubId),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total likes for club")
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalLikesForCategoryOperator(ctx context.Context, category *post.Category) (int, error) {

	response, err := r.client.Search().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("category_ids", category.ID()),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total likes for category")
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalPostsForCategoryOperator(ctx context.Context, category *post.Category) (int, error) {

	count, err := r.client.Count().
		Index(PostReaderIndex).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("category_ids", category.ID()),
			)).
		Do(ctx)

	if err != nil {
		return 0, errors.Wrap(support.ParseElasticError(err), "failed to get total posts for category")
	}

	return int(count), nil
}

func (r PostsCassandraElasticsearchRepository) GetPostsByIds(ctx context.Context, requester *principal.Principal, postIds []string) ([]*post.Post, error) {

	var posts []*post.Post

	if len(postIds) == 0 {
		return posts, nil
	}

	builder := r.client.MultiGet().Realtime(false)

	for _, postId := range postIds {
		builder.Add(elastic.NewMultiGetItem().Id(postId).Index(PostReaderIndex))
	}

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search posts")
	}

	for _, hit := range response.Docs {

		result, err := r.unmarshalPostDocument(ctx, hit.Source, nil)

		if err != nil {
			return nil, err
		}

		posts = append(posts, result)
	}

	return posts, nil
}

func (r PostsCassandraElasticsearchRepository) SuggestedPostsByPost(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, pst *post.Post, filters *post.Feed) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostReaderIndex)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	if err := cursor.BuildElasticsearch(builder, "created_at", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	query.Should(
		elastic.
			NewBoolQuery().
			Must(
				elastic.NewTermsQueryFromStrings("character_ids", pst.CategoryIds()...).Boost(6),
			),
	)

	query.Should(
		elastic.
			NewBoolQuery().
			Must(
				elastic.NewTermsQueryFromStrings("category_ids", pst.CategoryIds()...).Boost(5),
			),
	)

	query.Should(
		elastic.
			NewBoolQuery().
			Must(
				elastic.NewTermQuery("audience_id", pst.AudienceId()).Boost(2),
			),
	)

	query.Should(
		elastic.
			NewBoolQuery().
			Must(
				elastic.NewTermQuery("club_id", pst.ClubId()).Boost(1),
			),
	)

	seed, err := r.getRandomizerSeed(ctx, "suggestedPostsByPost")

	if err != nil {
		return nil, err
	}

	query.Must(elastic.NewFunctionScoreQuery().AddScoreFunc(elastic.NewRandomFunction().Seed(seed)))

	builder.Query(query)

	var filterQueries []elastic.Query

	terminatedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	filterQueries = append(filterQueries, elastic.NewBoolQuery().
		MustNot(elastic.NewTermsQueryFromStrings("club_id", terminatedClubIds...)).
		MustNot(elastic.NewTermsQueryFromStrings("id", pst.ID())),
	)

	filterQueries = append(filterQueries, elastic.NewTermQuery("audience_id", *pst.AudienceId()))
	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))
	filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("supporter_only_status", post.None.String(), post.Partial.String()))

	query.Filter(filterQueries...)

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search suggested posts by post")
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := r.unmarshalPostDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts, nil
}

func (r PostsCassandraElasticsearchRepository) ClubMembersPostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostReaderIndex)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	if err := cursor.BuildElasticsearch(builder, "created_at", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	suspendedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	filterQueries = append(filterQueries, elastic.NewBoolQuery().
		Must(elastic.NewTermsQueryFromStrings("club_id", requester.ClubExtension().ClubMembershipIds()...)).
		MustNot(elastic.NewTermsQueryFromStrings("club_id", suspendedClubIds...)),
	)
	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))
	filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("supporter_only_status", post.None.String(), post.Partial.String(), post.Full.String()))

	query.Filter(filterQueries...)

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search posts")
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := r.unmarshalPostDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts, nil
}

func (r PostsCassandraElasticsearchRepository) PostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.Feed) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostReaderIndex)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	terminatedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	if err := cursor.BuildElasticsearch(builder, "posted_at", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))

	filterQueries = append(filterQueries, elastic.NewBoolQuery().
		MustNot(elastic.NewTermsQueryFromStrings("club_id", terminatedClubIds...)),
	)

	if len(filter.AudienceIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("audience_id", filter.AudienceIds()...))
	}

	if filterQueries != nil {
		query.Filter(filterQueries...)
	}

	seed, err := r.getRandomizerSeed(ctx, "postsFeed")

	if err != nil {
		return nil, err
	}

	query.Must(elastic.NewFunctionScoreQuery().AddScoreFunc(elastic.NewRandomFunction().Seed(seed)))

	//scoreQuery := elastic.NewFunctionScoreQuery()

	// decay from initial post time
	//scoreQuery.AddScoreFunc(
	//	elastic.
	//		NewGaussDecayFunction().
	//		FieldName("posted_at").
	//		Scale("1d").
	//		Decay(0),
	//)

	// multiply by likes for this post
	//scoreQuery.AddScoreFunc(
	//	elastic.
	//		NewFieldValueFactorFunction().
	//		Field("likes").
	//		Factor(0).
	//		Modifier("none"),
	//)

	//query.Must(scoreQuery)
	//
	//// multiply results
	//scoreQuery.ScoreMode("multiply")

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search posts")
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := r.unmarshalPostDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts, nil
}

func (r PostsCassandraElasticsearchRepository) SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.Filters) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostReaderIndex)

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	var sortingColumn string
	var sortingAscending bool

	if filter.SortBy() == post.NewSort {

		sortingColumn = "created_at"

		// if viewing by published, then do posted_at
		if filter.State() == post.Published {
			sortingColumn = "posted_at"
		}

		sortingAscending = false
	} else if filter.SortBy() == post.TopSort {
		sortingColumn = "likes"
		sortingAscending = false
	} else if filter.SortBy() == post.AlgorithmSort {
		sortingColumn = "created_at"
		sortingAscending = false
	}

	suspendedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	if err := cursor.BuildElasticsearch(builder, sortingColumn, "id", sortingAscending); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	if !filter.ShowTerminatedClubs() {
		filterQueries = append(filterQueries, elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("club_id", suspendedClubIds...)))
	}

	if filter.State() != post.Unknown {
		filterQueries = append(filterQueries, elastic.NewTermQuery("state", filter.State().String()))
	}

	if len(filter.SupporterOnlyStatus()) > 0 {
		var supporterStatus []string
		for _, status := range filter.SupporterOnlyStatus() {
			supporterStatus = append(supporterStatus, status.String())
		}

		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("supporter_only_status", supporterStatus...))
	}

	if len(filter.ClubIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("club_id", filter.ClubIds()...))
	}

	if filter.ContributorId() != nil {
		filterQueries = append(filterQueries, elastic.NewTermQuery("contributor_id", *filter.ContributorId()))
	}

	if len(filter.CategoryIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("category_ids", filter.CategoryIds()...))
	}

	if len(filter.CharacterIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("character_ids", filter.CharacterIds()...))
	}

	if len(filter.SeriesIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("series_ids", filter.SeriesIds()...))
	}

	if len(filter.AudienceIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("audience_id", filter.AudienceIds()...))
	}

	if filter.SortBy() == post.AlgorithmSort {

		seed, err := r.getRandomizerSeed(ctx, "postsSearch")

		if err != nil {
			return nil, err
		}

		query.Must(elastic.NewFunctionScoreQuery().AddScoreFunc(elastic.NewRandomFunction().Seed(seed)))
	}

	if filterQueries != nil {
		query.Filter(filterQueries...)
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search posts")
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := r.unmarshalPostDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts, nil
}

func (r PostsCassandraElasticsearchRepository) IndexAllPosts(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, postTable, func(iter *gocqlx.Iterx) error {

		var p posts

		for iter.StructScan(&p) {

			unmarshalled, err := r.unmarshalPost(ctx, p)

			if err != nil {
				return err
			}

			doc, err := marshalPostToDocument(unmarshalled)

			if err != nil {
				return err
			}

			_, err = r.client.
				Index().
				Index(postWriterIndex).
				Id(doc.Id).
				BodyJson(doc).
				OpType("create").
				Do(ctx)

			if err != nil {
				e, ok := err.(*elastic.Error)
				if ok && e.Details.Type == "version_conflict_engine_exception" {
					zap.S().Infof("skipping document [%s] due to conflict", doc.Id)
				} else {
					return errors.Wrap(support.ParseElasticError(err), "failed to index post")
				}
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) deletePostIndexById(ctx context.Context, id string) error {

	if _, err := r.client.Delete().Index(postWriterIndex).Id(id).Do(ctx); err != nil {
		return errors.Wrap(err, "failed to delete post document")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetFirstTopPostWithoutOccupiedResources(ctx context.Context, characterId, categoryId, seriesId, audienceId *string) (*post.Post, error) {

	builder := r.client.Search().
		Index(PostReaderIndex)

	terminatedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	// get all occupied resources, so we can exclude them from search
	postIds, err := r.getPostOccupiedResourcesPostIds(ctx)

	if err != nil {
		return nil, err
	}

	builder.Sort("likes", false)
	builder.Sort("created_at", true)

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	filterQueries = append(filterQueries, elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("club_id", terminatedClubIds...)))
	filterQueries = append(filterQueries, elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("id", postIds...)))
	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))
	filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("supporter_only_status", post.Partial.String(), post.None.String()))

	if categoryId != nil {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("category_ids", *categoryId))
	}

	if characterId != nil {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("character_ids", *characterId))
	}

	if seriesId != nil {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("series_ids", *seriesId))
	}

	if audienceId != nil {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("audience_id", *audienceId))
	}

	query.Filter(filterQueries...)

	builder.Size(1)
	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search posts")
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := r.unmarshalPostDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	if len(posts) == 1 {
		return posts[0], nil
	}

	return nil, nil
}
