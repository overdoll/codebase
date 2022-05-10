package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"math"
	"time"

	elastic "github.com/olivere/elastic/v7"
	gocqlx "github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/scan"
)

type postDocument struct {
	Id                              string            `json:"id"`
	State                           string            `json:"state"`
	SupporterOnlyStatus             string            `json:"supporter_only_status"`
	ContentResourceIds              []string          `json:"content_resource_ids"`
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
	PostedAt                        *time.Time        `json:"posted_at"`
}

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

const PostIndexName = "posts"

func unmarshalPostDocument(hit *elastic.SearchHit) (*post.Post, error) {

	var pst postDocument

	err := json.Unmarshal(hit.Source, &pst)

	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal post: %v", err)
	}

	var audience *string

	if pst.AudienceId != "" {
		audience = &pst.AudienceId
	}

	createdPost := post.UnmarshalPostFromDatabase(
		pst.Id,
		pst.State,
		pst.SupporterOnlyStatus,
		pst.Likes,
		pst.ContributorId,
		pst.ContentResourceIds,
		pst.ContentSupporterOnly,
		pst.ContentSupporterOnlyResourceIds,
		pst.ClubId,
		audience,
		pst.CharacterIds,
		pst.SeriesIds,
		pst.CategoryIds,
		pst.CreatedAt,
		pst.PostedAt,
	)

	createdPost.Node = paging.NewNode(hit.Sort)

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

	for _, cont := range pst.Content() {
		contentResourceIds = append(contentResourceIds, cont.ResourceId())
		contentSupporterOnly[cont.ResourceId()] = cont.IsSupporterOnly()
		if cont.IsSupporterOnly() {
			contentSupporterOnlyResourceIds[cont.ResourceId()] = cont.ResourceIdHidden()
		}
	}

	return &postDocument{
		Id:                              pst.ID(),
		Likes:                           pst.Likes(),
		SupporterOnlyStatus:             pst.SupporterOnlyStatus().String(),
		State:                           pst.State().String(),
		AudienceId:                      audience,
		ClubId:                          pst.ClubId(),
		ContributorId:                   pst.ContributorId(),
		ContentResourceIds:              contentResourceIds,
		ContentSupporterOnly:            contentSupporterOnly,
		ContentSupporterOnlyResourceIds: contentSupporterOnlyResourceIds,
		CategoryIds:                     pst.CategoryIds(),
		CharacterIds:                    pst.CharacterIds(),
		SeriesIds:                       pst.SeriesIds(),
		CreatedAt:                       pst.CreatedAt(),
		PostedAt:                        pst.PostedAt(),
	}, nil
}

func (r PostsCassandraElasticsearchRepository) RefreshPostIndex(ctx context.Context) error {

	_, err := r.client.
		Refresh().
		Index(PostIndexName).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to refresh post index: %v", err)
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
		Index(PostIndexName).
		Id(post.ID()).
		BodyJson(*pst).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index post: %v", err)
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalLikesForCharacterOperator(ctx context.Context, character *post.Character) (int, error) {

	response, err := r.client.Search().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("character_ids", character.ID()),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalPostsForCharacterOperator(ctx context.Context, character *post.Character) (int, error) {

	count, err := r.client.Count().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("character_ids", character.ID()),
			)).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	return int(count), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalLikesForAudienceOperator(ctx context.Context, audience *post.Audience) (int, error) {

	response, err := r.client.Search().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("audience_id", audience.ID()),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalPostsForAudienceOperator(ctx context.Context, audience *post.Audience) (int, error) {

	count, err := r.client.Count().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("audience_id", audience.ID()),
			)).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	return int(count), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalLikesForSeriesOperator(ctx context.Context, series *post.Series) (int, error) {

	response, err := r.client.Search().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("series_ids", series.ID()),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalPostsForSeriesOperator(ctx context.Context, series *post.Series) (int, error) {

	count, err := r.client.Count().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("series_ids", series.ID()),
			)).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	return int(count), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalLikesForCategoryOperator(ctx context.Context, category *post.Category) (int, error) {

	response, err := r.client.Search().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("category_ids", category.ID()),
			)).
		Aggregation("total_likes", elastic.NewSumAggregation().Field("likes")).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	sm, _ := response.Aggregations.Sum("total_likes")

	return int(math.Round(*sm.Value)), nil
}

func (r PostsCassandraElasticsearchRepository) GetTotalPostsForCategoryOperator(ctx context.Context, category *post.Category) (int, error) {

	count, err := r.client.Count().
		Index(PostIndexName).
		Query(elastic.NewBoolQuery().
			Filter(
				elastic.NewTermsQueryFromStrings("category_ids", category.ID()),
			)).
		Do(ctx)

	if err != nil {
		return 0, nil
	}

	return int(count), nil
}

func (r PostsCassandraElasticsearchRepository) ClubMembersPostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	if err := cursor.BuildElasticsearch(builder, "created_at", "id", true); err != nil {
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
		return nil, fmt.Errorf("failed to search posts: %v", err)
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := unmarshalPostDocument(hit)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts, nil
}

func (r PostsCassandraElasticsearchRepository) PostsFeed(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.Feed) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
	}

	suspendedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	if err := cursor.BuildElasticsearch(builder, "_score", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewFunctionScoreQuery()

	// decay from initial post time
	postedTimeFunc := elastic.
		NewGaussDecayFunction().
		FieldName("posted_at").
		Scale("1d").
		Decay(0.5)

	// multiply by likes for this post
	likesFunc := elastic.
		NewFieldValueFactorFunction().
		Field("likes").
		Factor(1).
		Modifier("none")

	query.Add(elastic.NewTermQuery("state", post.Published.String()), postedTimeFunc)
	query.Add(elastic.NewTermsQueryFromStrings("supporter_only_status", post.None.String(), post.Partial.String()), postedTimeFunc)

	query.Add(elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("club_id", suspendedClubIds...)), postedTimeFunc)

	if len(filter.AudienceIds()) > 0 {
		query.Add(
			elastic.NewTermsQueryFromStrings("audience_id", filter.AudienceIds()...),
			likesFunc,
		)
	} else {
		query.AddScoreFunc(likesFunc)
	}

	// multiply results
	query.ScoreMode("multiply")

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search posts: %v", err)
	}

	if err != nil {
		return nil, err
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := unmarshalPostDocument(hit)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts, nil
}

func (r PostsCassandraElasticsearchRepository) SearchPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post.Filters) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostIndexName)

	if cursor == nil {
		return nil, fmt.Errorf("cursor must be present")
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

	if !filter.ShowSuspendedClubs() {
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

	if filterQueries != nil {
		query.Filter(filterQueries...)
	}

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search posts: %v", err)
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := unmarshalPostDocument(hit)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	return posts, nil
}

func (r PostsCassandraElasticsearchRepository) indexAllPosts(ctx context.Context) error {

	scanner := scan.New(r.session,
		scan.Config{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, postTable, func(iter *gocqlx.Iterx) error {

		var p posts

		for iter.StructScan(&p) {

			var audienceId string

			if p.AudienceId != nil {
				audienceId = *p.AudienceId
			}

			doc := postDocument{
				Id:                              p.Id,
				State:                           p.State,
				SupporterOnlyStatus:             p.SupporterOnlyStatus,
				ContentResourceIds:              p.ContentResourceIds,
				ContentSupporterOnly:            p.ContentSupporterOnly,
				ContentSupporterOnlyResourceIds: p.ContentSupporterOnlyResourceIds,
				Likes:                           p.Likes,
				ContributorId:                   p.ContributorId,
				ClubId:                          p.ClubId,
				AudienceId:                      audienceId,
				CategoryIds:                     p.CategoryIds,
				CharacterIds:                    p.CharacterIds,
				SeriesIds:                       p.SeriesIds,
				CreatedAt:                       p.CreatedAt,
				PostedAt:                        p.PostedAt,
			}

			_, err := r.client.
				Index().
				Index(PostIndexName).
				Id(p.Id).
				BodyJson(doc).
				Do(ctx)

			if err != nil {
				return fmt.Errorf("failed to index post: %v", err)
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

	if _, err := r.client.Delete().Index(PostIndexName).Id(id).Do(ctx); err != nil {
		return fmt.Errorf("failed to delete post document: %v", err)
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) deletePostIndex(ctx context.Context) error {

	exists, err := r.client.IndexExists(PostIndexName).Do(ctx)

	if err != nil {
		return err
	}

	if exists {
		if _, err := r.client.DeleteIndex(PostIndexName).Do(ctx); err != nil {
			// Handle error
			return err
		}
	}

	if _, err := r.client.CreateIndex(PostIndexName).BodyString(postIndex).Do(ctx); err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) DeleteAndRecreatePostIndex(ctx context.Context) error {

	if err := r.deletePostIndex(ctx); err != nil {
		return err
	}

	return r.indexAllPosts(ctx)
}
