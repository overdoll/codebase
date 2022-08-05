package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2/table"
	"hash/fnv"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"strings"
)

var postGamesTable = table.New(table.Metadata{
	Name: "post_games",
	Columns: []string{
		"slug",
		"post_id",
	},
	PartKey: []string{"slug"},
	SortKey: []string{"post_id"},
})

type postGames struct {
	Slug   string `db:"slug"`
	PostId string `db:"post_id"`
}

func (r PostsCassandraElasticsearchRepository) CreatePostsGame(ctx context.Context, slug string, postIds []string) error {

	for _, postId := range postIds {
		if err := r.session.
			Query(postGamesTable.Insert()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(postGames{Slug: strings.ToLower(slug), PostId: postId}).
			ExecRelease(); err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to create posts game")
		}
	}

	return nil
}

func (r PostsCassandraElasticsearchRepository) PostsGame(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, slug, seed string) ([]*post.Post, error) {

	var b []postGames

	if err := r.session.
		Query(postGamesTable.Select()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(postGames{Slug: strings.ToLower(slug)}).
		SelectRelease(&b); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("post_games", slug)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post games by slug")
	}

	var postIds []string

	for _, p := range b {
		postIds = append(postIds, p.PostId)
	}

	var posts []*post.Post

	if len(postIds) == 0 {
		return posts, nil
	}

	h := fnv.New32a()
	h.Write([]byte(seed))

	builder := r.client.Search(PostReaderIndex)

	builder.Query(
		elastic.NewFunctionScoreQuery().
			Add(
				elastic.NewMultiMatchQuery("id", postIds...),
				elastic.NewRandomFunction().
					Seed(int64(h.Sum32()))),
	)

	response, err := builder.Do(ctx)

	if err != nil {
		return nil, errors.Wrap(support.ParseElasticError(err), "failed to get post games")
	}

	for _, hit := range response.Hits.Hits {

		result, err := r.unmarshalPostDocument(ctx, hit.Source, hit.Sort)

		if err != nil {
			return nil, err
		}

		posts = append(posts, result)
	}

	return posts, nil
}
