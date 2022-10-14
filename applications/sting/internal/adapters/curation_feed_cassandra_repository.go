package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"time"
)

var curatedPostsFeedDataTable = table.New(table.Metadata{
	Name: "curated_posts_feed_data",
	Columns: []string{
		"account_id",
		"generated_at",
		"next_regeneration_time",
		"was_viewed_since_generation",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{},
})

type curatedPostsFeedData struct {
	AccountId                string     `db:"account_id"`
	GeneratedAt              *time.Time `db:"generated_at"`
	NextRegenerationTime     *time.Time `db:"next_regeneration_time"`
	WasViewedSinceGeneration bool       `db:"was_viewed_since_generation"`
}

var curatedPostsFeedPostsTable = table.New(table.Metadata{
	Name: "curated_posts_feed_posts",
	Columns: []string{
		"account_id",
		"post_id",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{},
})

type curatedPostsFeedPosts struct {
	AccountId string `db:"account_id"`
	PostId    string `db:"post_id"`
}

func (r CurationCassandraRepository) GetCuratedPostsFeedData(ctx context.Context, requester *principal.Principal, accountId string) (*curation.PostsFeedData, error) {

	if err := requester.BelongsToAccount(accountId); err != nil {
		return nil, err
	}

	return r.GetCuratedPostsFeedDataOperator(ctx, accountId)
}

func (r CurationCassandraRepository) UpdateCuratedPostsFeedDataOperator(ctx context.Context, postsFeedData *curation.PostsFeedData) error {

	if err := r.session.
		Query(curationProfileTable.Update(
			"generated_at",
			"next_regeneration_time",
			"was_viewed_since_generation",
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&curatedPostsFeedData{
			AccountId:                postsFeedData.AccountId(),
			GeneratedAt:              postsFeedData.GeneratedAt(),
			NextRegenerationTime:     postsFeedData.NextRegenerationTime(),
			WasViewedSinceGeneration: postsFeedData.WasViewedSinceGeneration(),
		}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update curated posts feed data")
	}

	return nil
}

func (r CurationCassandraRepository) GetCuratedPostsFeedDataOperator(ctx context.Context, accountId string) (*curation.PostsFeedData, error) {

	var curatedPostsFeed curatedPostsFeedData

	if err := r.session.
		Query(curatedPostsFeedDataTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(curatedPostsFeedData{AccountId: accountId}).
		GetRelease(&curatedPostsFeed); err != nil {

		if err == gocql.ErrNotFound {
			return curation.UnmarshalPostsFeedData(accountId, nil, nil, false), nil
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get curated posts feed data by id")
	}

	return curation.UnmarshalPostsFeedData(
		curatedPostsFeed.AccountId,
		curatedPostsFeed.GeneratedAt,
		curatedPostsFeed.NextRegenerationTime,
		curatedPostsFeed.WasViewedSinceGeneration,
	), nil
}

func (r CurationCassandraRepository) UpdateCuratedPostsFeedData(ctx context.Context, requester *principal.Principal, postsFeedData *curation.PostsFeedData) error {

	if err := requester.BelongsToAccount(postsFeedData.AccountId()); err != nil {
		return err
	}

	return r.UpdateCuratedPostsFeedDataOperator(ctx, postsFeedData)
}

func (r PostsCassandraElasticsearchRepository) GetCuratedPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*post.Post, error) {

	if err := requester.BelongsToAccount(accountId); err != nil {
		return nil, err
	}

	var curatedPostsFeedPostsList []curatedPostsFeedPosts

	if err := r.session.
		Query(curatedPostsFeedPostsTable.Select()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(curatedPostsFeedPosts{AccountId: accountId}).
		SelectRelease(&curatedPostsFeedPostsList); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get curated posts")
	}

	var postIds []string

	for _, postId := range curatedPostsFeedPostsList {
		postIds = append(postIds, postId.PostId)
	}

	if cursor == nil {
		return nil, paging.ErrCursorNotPresent
	}

	builder := r.client.Search(PostReaderIndex)

	if err := cursor.BuildElasticsearch(builder, "posted_at", "id", false); err != nil {
		return nil, err
	}

	query := elastic.NewBoolQuery()

	var filterQueries []elastic.Query

	terminatedClubIds, err := r.getTerminatedClubIds(ctx)

	if err != nil {
		return nil, err
	}

	filterQueries = append(filterQueries, elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("id", postIds...)))
	filterQueries = append(filterQueries, elastic.NewTermQuery("state", post.Published.String()))
	filterQueries = append(filterQueries, elastic.NewBoolQuery().MustNot(elastic.NewTermsQueryFromStrings("club_id", terminatedClubIds...)))

	query.Filter(filterQueries...)

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed search posts for curation feed")
	}

	var posts []*post.Post

	for _, hit := range response.Hits.Hits {

		result, err := unmarshalPostDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		posts = append(posts, result)
	}

	return posts, nil
}
