package adapters

import (
	"context"
	"github.com/go-redis/redis/v8"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/paging"
	"overdoll/libraries/support"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	moderator "overdoll/applications/parley/internal/domain/moderator"
	"overdoll/libraries/principal"
)

const (
	moderatorNotificationCooldown = "moderatorPostInQueueNotification:"
)

var accountPostModeratorsQueueTable = table.New(table.Metadata{
	Name: "account_post_moderators_queue",
	Columns: []string{
		"account_id",
		"sort_key",
		"post_id",
		"placed_at",
		"reassignment_at",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"sort_key"},
})

var postModeratorsTable = table.New(table.Metadata{
	Name: "post_moderators",
	Columns: []string{
		"post_id",
		"account_id",
		"sort_key",
		"placed_at",
		"reassignment_at",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{},
})

type postModerators struct {
	AccountId      string     `db:"account_id"`
	PostId         string     `db:"post_id"`
	SortKey        gocql.UUID `db:"sort_key"`
	PlacedAt       time.Time  `db:"placed_at"`
	ReassignmentAt time.Time  `db:"reassignment_at"`
}

var moderatorTable = table.New(table.Metadata{
	Name: "moderators",
	Columns: []string{
		"account_id",
		"last_selected",
		"bucket",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"account_id"},
})

type moderators struct {
	AccountId    string    `db:"account_id"`
	LastSelected time.Time `db:"last_selected"`
	Bucket       int       `db:"bucket"`
}

type ModeratorCassandraRedisRepository struct {
	session gocqlx.Session
	cache   *redis.Client
}

func NewModeratorCassandraRepository(session gocqlx.Session, cache *redis.Client) ModeratorCassandraRedisRepository {
	return ModeratorCassandraRedisRepository{session: session, cache: cache}
}

func marshaModeratorToDatabase(mod *moderator.Moderator) *moderators {
	return &moderators{
		AccountId:    mod.ID(),
		LastSelected: mod.LastSelected(),
		Bucket:       0,
	}
}

func (r ModeratorCassandraRedisRepository) getModerator(ctx context.Context, id string) (*moderator.Moderator, error) {

	var md moderators

	if err := r.session.
		Query(moderatorTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&moderators{AccountId: id, Bucket: 0}).
		GetRelease(&md); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("moderator", id)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get moderators")
	}

	return moderator.UnmarshalModeratorFromDatabase(md.AccountId, md.LastSelected), nil
}

func (r ModeratorCassandraRedisRepository) GetPostModeratorByPostId(ctx context.Context, requester *principal.Principal, postId string) (*moderator.PostModerator, error) {

	var postModerator postModerators

	if err := r.session.Query(postModeratorsTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postModerators{
			PostId: postId,
		}).
		GetRelease(&postModerator); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("post moderator", postId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post moderator by post id")
	}

	return moderator.UnmarshalPostModeratorFromDatabase(postModerator.AccountId, postModerator.PostId, postModerator.PlacedAt, postModerator.ReassignmentAt), nil
}

func (r ModeratorCassandraRedisRepository) CreatePostModerator(ctx context.Context, queue *moderator.PostModerator) error {

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	postModerator := &postModerators{
		AccountId:      queue.AccountId(),
		PostId:         queue.PostId(),
		PlacedAt:       queue.PlacedAt(),
		ReassignmentAt: queue.ReassignmentAt(),
		SortKey:        gocql.UUIDFromTime(queue.PlacedAt()),
	}

	stmt, names := accountPostModeratorsQueueTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		postModerator,
	)

	stmt, names = postModeratorsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		postModerator,
	)

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create post moderator queue")
	}

	return nil
}

func (r ModeratorCassandraRedisRepository) SearchPostModerator(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*moderator.PostModerator, error) {

	if err := moderator.CanViewPostModerator(requester, accountId); err != nil {
		return nil, err
	}

	var postModeratorQueueItems []*postModerators

	builder := accountPostModeratorsQueueTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "sort_key", false); err != nil {
			return nil, err
		}
	}

	if err := builder.Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postModerators{
			AccountId: accountId,
		}).
		SelectRelease(&postModeratorQueueItems); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post moderators for account")
	}

	var postQueue []*moderator.PostModerator

	for _, item := range postModeratorQueueItems {
		queueItem := moderator.UnmarshalPostModeratorFromDatabase(item.AccountId, item.PostId, item.PlacedAt, item.ReassignmentAt)
		queueItem.Node = paging.NewNode(item.SortKey)
		postQueue = append(postQueue, queueItem)
	}

	return postQueue, nil
}

func (r ModeratorCassandraRedisRepository) getPostModeratorByPostId(ctx context.Context, postId string) (*postModerators, error) {

	var item postModerators

	if err := r.session.Query(postModeratorsTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postModerators{
			PostId: postId,
		}).
		GetRelease(&item); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("post moderator", postId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get post moderator queue for account")
	}

	return &item, nil
}

func (r ModeratorCassandraRedisRepository) GetPostModeratorByPostIdOperator(ctx context.Context, postId string) (*moderator.PostModerator, error) {

	item, err := r.getPostModeratorByPostId(ctx, postId)

	if err != nil {
		return nil, err
	}

	return moderator.UnmarshalPostModeratorFromDatabase(item.AccountId, item.PostId, item.PlacedAt, item.ReassignmentAt), nil
}

func (r ModeratorCassandraRedisRepository) DeletePostModeratorByPostId(ctx context.Context, postId string) error {

	postModerator, err := r.getPostModeratorByPostId(ctx, postId)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, _ := accountPostModeratorsQueueTable.Delete()

	batch.Query(stmt,
		postModerator.AccountId,
		postModerator.SortKey,
	)

	stmt, _ = postModeratorsTable.Delete()

	batch.Query(stmt,
		postModerator.PostId,
	)

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete post moderator")
	}

	// delete cache key if moderator was removed from post
	_, err = r.cache.WithContext(ctx).Del(ctx, moderatorNotificationCooldown+postModerator.AccountId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil
		}

		return errors.Wrap(err, "failed to delete moderator notification cooldown")
	}

	return nil
}

func (r ModeratorCassandraRedisRepository) HasModeratorNotificationCache(ctx context.Context, accountId string) (bool, error) {

	_, err := r.cache.WithContext(ctx).Get(ctx, moderatorNotificationCooldown+accountId).Result()

	if err != nil {

		if err == redis.Nil {
			return false, nil
		}

		return false, errors.Wrap(err, "failed to get moderator notification cache")
	}

	return true, nil
}

func (r ModeratorCassandraRedisRepository) CreateModeratorNotificationCache(ctx context.Context, accountId string) error {
	// cache for 24 hours
	_, err := r.cache.WithContext(ctx).Set(ctx, moderatorNotificationCooldown+accountId, true, time.Hour*24).Result()

	if err != nil {
		return errors.Wrap(err, "failed to cache moderator notification")
	}

	return nil
}

func (r ModeratorCassandraRedisRepository) GetModerator(ctx context.Context, requester *principal.Principal, accountId string) (*moderator.Moderator, error) {

	moderator, err := r.getModerator(ctx, accountId)

	if err != nil {
		return nil, err
	}

	if err := moderator.CanView(requester); err != nil {
		return nil, err
	}

	return moderator, nil
}

func (r ModeratorCassandraRedisRepository) GetModerators(ctx context.Context) ([]*moderator.Moderator, error) {

	var dbModerators []moderators

	if err := r.session.
		Query(moderatorTable.Select()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&moderators{Bucket: 0}).
		SelectRelease(&dbModerators); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get moderators")
	}

	var moderators []*moderator.Moderator
	for _, dbMod := range dbModerators {
		moderators = append(moderators, moderator.UnmarshalModeratorFromDatabase(dbMod.AccountId, dbMod.LastSelected))
	}

	return moderators, nil
}

func (r ModeratorCassandraRedisRepository) CreateModerator(ctx context.Context, mod *moderator.Moderator) error {

	if err := r.session.
		Query(moderatorTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshaModeratorToDatabase(mod)).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create moderators")
	}

	return nil
}

func (r ModeratorCassandraRedisRepository) UpdateModerator(ctx context.Context, id string, updateFn func(moderator *moderator.Moderator) error) (*moderator.Moderator, error) {

	currentMod, err := r.getModerator(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentMod)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(moderatorTable.Update("last_selected")).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshaModeratorToDatabase(currentMod)).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update moderators")
	}

	return currentMod, nil
}

func (r ModeratorCassandraRedisRepository) RemoveModerator(ctx context.Context, requester *principal.Principal, accountId string) error {

	_, err := r.GetModerator(ctx, requester, accountId)

	if err != nil {
		return err
	}

	if err := r.session.
		Query(moderatorTable.Delete()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&moderators{
			AccountId: accountId,
			Bucket:    0,
		}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to remove moderators")
	}

	return nil
}
