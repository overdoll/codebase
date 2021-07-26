package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	mod "overdoll/applications/parley/internal/domain/moderator"
)

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

type moderator struct {
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

func marshaModeratorToDatabase(mod *mod.Moderator) *moderator {
	return &moderator{
		AccountId:    mod.ID(),
		LastSelected: mod.LastSelected(),
		Bucket:       0,
	}
}

func (r ModeratorCassandraRepository) GetModerator(ctx context.Context, id string) (*mod.Moderator, error) {

	moderatorQuery := r.session.
		Query(moderatorTable.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&moderator{AccountId: id, Bucket: 0})

	var md moderator

	if err := moderatorQuery.Get(&md); err != nil {

		if err == gocql.ErrNotFound {
			return nil, mod.ErrModeratorNotFound
		}

		return nil, err
	}

	return mod.UnmarshalModeratorFromDatabase(md.AccountId, md.LastSelected), nil
}

func (r ModeratorCassandraRepository) GetModerators(ctx context.Context) ([]*mod.Moderator, error) {

	moderatorQuery := r.session.
		Query(moderatorTable.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&moderator{Bucket: 0})

	var dbModerators []moderator

	if err := moderatorQuery.Select(&dbModerators); err != nil {
		return nil, err
	}

	var moderators []*mod.Moderator
	for _, dbMod := range dbModerators {
		moderators = append(moderators, mod.UnmarshalModeratorFromDatabase(dbMod.AccountId, dbMod.LastSelected))
	}

	return moderators, nil
}

func (r ModeratorCassandraRepository) CreateModerator(ctx context.Context, mod *mod.Moderator) error {

	insertModerator := r.session.
		Query(moderatorTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshaModeratorToDatabase(mod))

	if err := insertModerator.ExecRelease(); err != nil {
		return fmt.Errorf("insert() failed: '%s", err)
	}

	return nil
}

func (r ModeratorCassandraRepository) UpdateModerator(ctx context.Context, id string, updateFn func(moderator *mod.Moderator) error) (*mod.Moderator, error) {

	currentMod, err := r.GetModerator(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentMod)

	if err != nil {
		return nil, err
	}

	updateMod := r.session.
		Query(moderatorTable.Update("last_selected")).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshaModeratorToDatabase(currentMod))

	if err := updateMod.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return currentMod, nil
}

func (r ModeratorCassandraRepository) RemoveModerator(ctx context.Context, accountId string) error {

	updateMod := r.session.
		Query(moderatorTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&moderator{
			AccountId: accountId,
			Bucket:    0,
		})

	if err := updateMod.ExecRelease(); err != nil {
		return fmt.Errorf("update() failed: '%s", err)
	}

	return nil
}
