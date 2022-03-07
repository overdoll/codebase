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
		"post_id",
		"placed_at",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"post_id"},
})

var postModeratorsTable = table.New(table.Metadata{
	Name: "post_moderators_queue",
	Columns: []string{
		"post_id",
		"account_id",
		"placed_at",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{"account_id"},
})

type postModeratorQueue struct {
	AccountId string    `db:"account_id"`
	PostId    string    `db:"post_id"`
	PlacedAt  time.Time `db:"placed_at"`
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

func (r ModeratorCassandraRepository) CreatePostModeratorQueue(ctx context.Context, queue *moderator.PostModeratorQueue) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := accountPostModeratorsQueueTable.Insert()

	postModerator := &postModeratorQueue{
		AccountId: queue.AccountId(),
		PostId:    queue.PostId(),
		PlacedAt:  queue.PlacedAt(),
	}

	batch.Query(stmt,
		postModerator.AccountId,
		postModerator.PostId,
		postModerator.PlacedAt,
	)

	stmt, _ = postModeratorsTable.Insert()

	batch.Query(stmt,
		postModerator.PostId,
		postModerator.AccountId,
		postModerator.PlacedAt,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create post moderator queue: %v", err)
	}

	return nil
}

func (r ModeratorCassandraRepository) SearchPostModeratorQueue(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*moderator.PostModeratorQueue, error) {

	if err := moderator.CanViewPostModeratorQueue(requester, accountId); err != nil {
		return nil, err
	}

	var postModeratorQueueItems []*postModeratorQueue

	builder := accountPostModeratorsQueueTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "post_id", false); err != nil {
			return nil, err
		}
	}

	if err := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postModeratorQueue{
			AccountId: accountId,
		}).
		Select(&postModeratorQueueItems); err != nil {
		return nil, fmt.Errorf("failed to get post moderator queue for account: %v", err)
	}

	var postQueue []*moderator.PostModeratorQueue

	for _, item := range postModeratorQueueItems {
		queueItem := moderator.UnmarshalPostModeratorQueueFromDatabase(item.AccountId, item.PostId, item.PlacedAt)
		queueItem.Node = paging.NewNode(item.PostId)
		postQueue = append(postQueue, queueItem)
	}

	return postQueue, nil
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
