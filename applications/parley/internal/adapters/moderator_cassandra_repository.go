package adapters

import (
	"context"
	"fmt"
	"overdoll/libraries/paging"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	moderator "overdoll/applications/parley/internal/domain/moderator"
	"overdoll/libraries/principal"
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

type ModeratorCassandraRepository struct {
	session gocqlx.Session
}

func NewModeratorCassandraRepository(session gocqlx.Session) ModeratorCassandraRepository {
	return ModeratorCassandraRepository{session: session}
}

func marshaModeratorToDatabase(mod *moderator.Moderator) *moderators {
	return &moderators{
		AccountId:    mod.ID(),
		LastSelected: mod.LastSelected(),
		Bucket:       0,
	}
}

func (r ModeratorCassandraRepository) getModerator(ctx context.Context, id string) (*moderator.Moderator, error) {

	var md moderators

	if err := r.session.
		Query(moderatorTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&moderators{AccountId: id, Bucket: 0}).
		Get(&md); err != nil {

		if err == gocql.ErrNotFound {
			return nil, moderator.ErrModeratorNotFound
		}

		return nil, fmt.Errorf("failed to get moderators: %v", err)
	}

	return moderator.UnmarshalModeratorFromDatabase(md.AccountId, md.LastSelected), nil
}

func (r ModeratorCassandraRepository) GetPostModeratorByPostId(ctx context.Context, requester *principal.Principal, postId string) (*moderator.PostModerator, error) {

	var postModerator postModerators

	if err := r.session.Query(postModeratorsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postModerators{
			PostId: postId,
		}).
		Get(&postModerator); err != nil {

		if err == gocql.ErrNotFound {
			return nil, moderator.ErrPostModeratorNotFound
		}

		return nil, fmt.Errorf("failed to get post moderator by post id: %v", err)
	}

	return moderator.UnmarshalPostModeratorFromDatabase(postModerator.AccountId, postModerator.PostId, postModerator.PlacedAt, postModerator.ReassignmentAt), nil
}

func (r ModeratorCassandraRepository) CreatePostModerator(ctx context.Context, queue *moderator.PostModerator) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	postModerator := &postModerators{
		AccountId:      queue.AccountId(),
		PostId:         queue.PostId(),
		PlacedAt:       queue.PlacedAt(),
		ReassignmentAt: queue.ReassignmentAt(),
		SortKey:        gocql.UUIDFromTime(time.Now()),
	}

	stmt, _ := accountPostModeratorsQueueTable.Insert()

	batch.Query(stmt,
		postModerator.AccountId,
		postModerator.SortKey,
		postModerator.PostId,
		postModerator.PlacedAt,
		postModerator.ReassignmentAt,
	)

	stmt, _ = postModeratorsTable.Insert()

	batch.Query(stmt,
		postModerator.PostId,
		postModerator.AccountId,
		postModerator.SortKey,
		postModerator.PlacedAt,
		postModerator.ReassignmentAt,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create post moderator queue: %v", err)
	}

	return nil
}

func (r ModeratorCassandraRepository) SearchPostModerator(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*moderator.PostModerator, error) {

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
		Consistency(gocql.LocalQuorum).
		BindStruct(&postModerators{
			AccountId: accountId,
		}).
		Select(&postModeratorQueueItems); err != nil {
		return nil, fmt.Errorf("failed to get post moderators for account: %v", err)
	}

	var postQueue []*moderator.PostModerator

	for _, item := range postModeratorQueueItems {
		queueItem := moderator.UnmarshalPostModeratorFromDatabase(item.AccountId, item.PostId, item.PlacedAt, item.ReassignmentAt)
		queueItem.Node = paging.NewNode(item.SortKey)
		postQueue = append(postQueue, queueItem)
	}

	return postQueue, nil
}

func (r ModeratorCassandraRepository) getPostModeratorByPostId(ctx context.Context, postId string) (*postModerators, error) {

	var item postModerators

	if err := r.session.Query(postModeratorsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postModerators{
			PostId: postId,
		}).
		Get(&item); err != nil {

		if err == gocql.ErrNotFound {
			return nil, moderator.ErrPostModeratorNotFound
		}

		return nil, fmt.Errorf("failed to get post moderator queue for account: %v", err)
	}

	return &item, nil
}

func (r ModeratorCassandraRepository) GetPostModeratorByPostIdOperator(ctx context.Context, postId string) (*moderator.PostModerator, error) {

	item, err := r.getPostModeratorByPostId(ctx, postId)

	if err != nil {
		return nil, err
	}

	return moderator.UnmarshalPostModeratorFromDatabase(item.AccountId, item.PostId, item.PlacedAt, item.ReassignmentAt), nil
}

func (r ModeratorCassandraRepository) DeletePostModeratorByPostId(ctx context.Context, postId string) error {

	postModerator, err := r.getPostModeratorByPostId(ctx, postId)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := accountPostModeratorsQueueTable.Delete()

	batch.Query(stmt,
		postModerator.AccountId,
		postModerator.SortKey,
	)

	stmt, _ = postModeratorsTable.Delete()

	batch.Query(stmt,
		postModerator.PostId,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete post moderator: %v", err)
	}

	return nil
}

func (r ModeratorCassandraRepository) GetModerator(ctx context.Context, requester *principal.Principal, accountId string) (*moderator.Moderator, error) {

	moderator, err := r.getModerator(ctx, accountId)

	if err != nil {
		return nil, err
	}

	if err := moderator.CanView(requester); err != nil {
		return nil, err
	}

	return moderator, nil
}

func (r ModeratorCassandraRepository) GetModerators(ctx context.Context) ([]*moderator.Moderator, error) {

	var dbModerators []moderators

	if err := r.session.
		Query(moderatorTable.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&moderators{Bucket: 0}).
		Select(&dbModerators); err != nil {
		return nil, fmt.Errorf("failed to get moderators: %v", err)
	}

	var moderators []*moderator.Moderator
	for _, dbMod := range dbModerators {
		moderators = append(moderators, moderator.UnmarshalModeratorFromDatabase(dbMod.AccountId, dbMod.LastSelected))
	}

	return moderators, nil
}

func (r ModeratorCassandraRepository) CreateModerator(ctx context.Context, mod *moderator.Moderator) error {

	if err := r.session.
		Query(moderatorTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshaModeratorToDatabase(mod)).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create moderators: %v", err)
	}

	return nil
}

func (r ModeratorCassandraRepository) UpdateModerator(ctx context.Context, id string, updateFn func(moderator *moderator.Moderator) error) (*moderator.Moderator, error) {

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
		Consistency(gocql.LocalQuorum).
		BindStruct(marshaModeratorToDatabase(currentMod)).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update moderators: %v", err)
	}

	return currentMod, nil
}

func (r ModeratorCassandraRepository) RemoveModerator(ctx context.Context, requester *principal.Principal, accountId string) error {

	_, err := r.GetModerator(ctx, requester, accountId)

	if err != nil {
		return err
	}

	if err := r.session.
		Query(moderatorTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&moderators{
			AccountId: accountId,
			Bucket:    0,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to remove moderators: %v", err)
	}

	return nil
}
