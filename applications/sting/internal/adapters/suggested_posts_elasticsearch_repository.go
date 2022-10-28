package adapters

import (
	"context"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/cache"
	"overdoll/libraries/database"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
)

const AccountActionsIndexName = "account_actions"

var AccountActionsReaderIndex = cache.ReadAlias(CachePrefix, AccountActionsIndexName)
var accountActionsWriterIndex = cache.WriteAlias(CachePrefix, AccountActionsIndexName)

type accountActionsDocument struct {
	LikedPostIds []string `json:"liked_post_ids"`
}

func (r PostsCassandraElasticsearchRepository) IndexAllActions(ctx context.Context) error {

	scanner := database.NewScan(r.session,
		database.ScanConfig{
			NodesInCluster: 1,
			CoresInNode:    2,
			SmudgeFactor:   3,
		},
	)

	err := scanner.RunIterator(ctx, postLikeTable, func(iter *gocqlx.Iterx) error {

		var postLike postLike

		for iter.StructScan(&postLike) {
			if err := r.likePost(ctx, post.UnmarshalLikeFromDatabase(postLike.LikedAccountId, postLike.PostId, postLike.LikedAt)); err != nil {
				return err
			}
		}

		return nil
	})

	if err != nil {
		return err
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) likePost(ctx context.Context, like *post.Like) error {

	_, err := r.client.UpdateByQuery(accountActionsWriterIndex).
		Query(elastic.NewTermsQuery("id", like.AccountId())).
		Script(elastic.NewScript(`

		if (ctx._source.liked_post_ids == null) {
			ctx._source.liked_post_ids = new ArrayList();
		}

		if (!ctx._source.liked_post_ids.contains(params.postId)) { 
			ctx._source.liked_post_ids.add(params.postId) 
		} 

	`).Param("postId", like.PostId()).Lang("painless")).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to append liked post id to account actions")
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) unLikePost(ctx context.Context, accountId, postId string) error {

	_, err := r.client.UpdateByQuery(accountActionsWriterIndex).
		Query(elastic.NewTermsQuery("id", accountId)).
		Script(elastic.NewScript(`

		if (ctx._source.liked_post_ids != null && ctx._source.liked_post_ids.contains(params.postId)) { 
			ctx._source.liked_post_ids.remove(params.postId) 
		} 

	`).Param("postId", postId).Lang("painless")).
		Do(ctx)

	if err != nil {
		return errors.Wrap(support.ParseElasticError(err), "failed to remove post like from account actions")
	}

	return nil
}

// new post suggestions, which uses significant terms
func (r PostsCassandraElasticsearchRepository) newSuggestedPostsByPost(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, pst *post.Post, filters *post.Feed) ([]*post.Post, error) {

	result, err := r.client.Search().
		Index(AccountActionsReaderIndex).
		Size(0).
		Query(elastic.NewMatchQuery("liked_post_ids", pst.ID())).
		Aggregation("posts_like_post", elastic.NewSignificantTermsAggregation().MinDocCount(1).Field("liked_post_ids")).Size(30).
		Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to get similar posts to post")
	}

	var postIds []string
	sigTerms, ok := result.Aggregations.SignificantTerms("posts_like_post")

	var buckets []string

	if ok {
		for _, sigTerm := range sigTerms.Buckets {
			buckets = append(buckets, sigTerm.Key)
		}
	}

	if err := cursor.BuildElasticsearchAggregate(buckets, func(index int, bucket string) {
		postIds = append(postIds, bucket)
	}); err != nil {
		return nil, err
	}

	if len(postIds) == 0 {
		return nil, nil
	}

	terminatedClubIds, err := r.getTerminatedClubIds(ctx)
	if err != nil {
		return nil, err
	}

	builder := r.client.Search().
		Index(PostReaderIndex)

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	filterQueries = append(filterQueries, elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("club_id", terminatedClubIds...)))
	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))

	query.Must(elastic.NewFunctionScoreQuery().AddScoreFunc(elastic.NewRandomFunction()))
	query.Filter(filterQueries...)
	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search posts for suggested posts")
	}

	var allPosts []*post.Post

	for _, hit := range response.Hits.Hits {
		createdPost, err := unmarshalPostDocument(ctx, hit.Source, hit.Sort)
		if err != nil {
			return nil, err
		}
		createdPost.Node = paging.NewNode(hit.Id)
		allPosts = append(allPosts, createdPost)
	}

	return allPosts, nil
}

func (r PostsCassandraElasticsearchRepository) legacySuggestedPostsByPost(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, pst *post.Post, filters *post.Feed) ([]*post.Post, error) {

	builder := r.client.Search().
		Index(PostReaderIndex)

	if err := cursor.BuildElasticsearch(builder, "_score", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	query.Should(
		elastic.
			NewBoolQuery().
			Should(
				elastic.NewTermsQueryFromStrings("category_ids", pst.CategoryIds()...).Boost(6),
			),
	)

	query.Should(
		elastic.
			NewBoolQuery().
			Should(
				elastic.NewTermsQueryFromStrings("character_ids", pst.CharacterIds()...).Boost(5),
			),
	)

	query.Should(
		elastic.
			NewBoolQuery().
			Should(
				elastic.NewTermQuery("audience_id", *pst.AudienceId()).Boost(3),
			),
	)

	seed, err := r.getRandomizerSeed(ctx, "suggestedPostsByPost:"+pst.ID())

	if err != nil {
		return nil, err
	}

	query.Must(elastic.NewFunctionScoreQuery().BoostMode("multiply").
		// add a score func to randomly multiply
		AddScoreFunc(elastic.NewRandomFunction().Seed(seed)))

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

	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))
	filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("supporter_only_status", post.None.String(), post.Partial.String()))

	// use curation profile when needed
	if len(filters.AudienceIds()) > 0 {
		filterQueries = append(filterQueries, elastic.NewTermsQueryFromStrings("audience_id", filters.AudienceIds()...))
	}

	query.Filter(filterQueries...)

	builder.Query(query)

	response, err := builder.Pretty(true).Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to search suggested posts by post")
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		createdPost, err := unmarshalPostDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		posts = append(posts, createdPost)
	}

	posts, err = r.getRandomPostWeighted(ctx, requester, cursor.GetLimit(), posts, filters.AudienceIds())
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func (r PostsCassandraElasticsearchRepository) SuggestedPostsByPost(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, pst *post.Post, filters *post.Feed) ([]*post.Post, error) {

	if !pst.IsPublished() {
		return nil, nil
	}

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	newSuggestions, err := r.newSuggestedPostsByPost(ctx, requester, cursor, pst, filters)
	if err != nil {
		return nil, err
	}

	if len(newSuggestions) != 0 {
		return newSuggestions, nil
	}

	return r.legacySuggestedPostsByPost(ctx, requester, cursor, pst, filters)
}
