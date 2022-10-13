package adapters

import (
	"context"
	"github.com/gocql/gocql"
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

func (r CurationCassandraRepository) GetCuratedPostsFeedData(ctx context.Context, requester *principal.Principal, accountId string) (*curation.PostsFeedData, error) {

	if err := requester.BelongsToAccount(accountId); err != nil {
		return nil, err
	}

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

func (r CurationCassandraRepository) GetCuratedPosts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*post.Post, error) {
	//TODO implement me
	panic("implement me")
}
