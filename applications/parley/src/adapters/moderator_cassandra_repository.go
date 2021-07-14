package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/moderator"
)

type Moderator struct {
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

func marshaModeratorToDatabase(mod *moderator.Moderator) *Moderator {
	return &Moderator{
		AccountId:    mod.ID(),
		LastSelected: mod.LastSelected(),
		Bucket:       0,
	}
}

func (r ModeratorCassandraRepository) GetModerator(ctx context.Context, id string) (*moderator.Moderator, error) {

	moderatorQuery := qb.Select("moderators").
		Where(qb.Eq("bucket"), qb.Eq("account_id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&Moderator{AccountId: id, Bucket: 0})

	var mod Moderator

	if err := moderatorQuery.Get(&mod); err != nil {

		if err == gocql.ErrNotFound {
			return nil, moderator.ErrModeratorNotFound
		}

		return nil, err
	}

	return moderator.UnmarshalModeratorFromDatabase(mod.AccountId, mod.LastSelected), nil
}

func (r ModeratorCassandraRepository) GetModerators(ctx context.Context) ([]*moderator.Moderator, error) {

	moderatorQuery := qb.Select("moderators").
		Where(qb.Eq("bucket")).
		Columns("account_id", "last_selected").
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&Moderator{Bucket: 0})

	var dbModerators []Moderator

	if err := moderatorQuery.Select(&dbModerators); err != nil {
		return nil, err
	}

	var moderators []*moderator.Moderator
	for _, dbMod := range dbModerators {
		moderators = append(moderators, moderator.UnmarshalModeratorFromDatabase(dbMod.AccountId, dbMod.LastSelected))
	}

	return moderators, nil
}

func (r ModeratorCassandraRepository) AddModerator(ctx context.Context, mod *moderator.Moderator) error {

	insertModerator := qb.Insert("moderators").
		Columns("account_id", "last_selected", "bucket").
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&Moderator{
			AccountId:    mod.ID(),
			LastSelected: time.Now(),
			Bucket:       0,
		})

	if err := insertModerator.ExecRelease(); err != nil {
		return fmt.Errorf("insert() failed: '%s", err)
	}

	return nil
}

func (r ModeratorCassandraRepository) UpdateModerator(ctx context.Context, id string, updateFn func(moderator *moderator.Moderator) error) (*moderator.Moderator, error) {

	currentMod, err := r.GetModerator(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentMod)

	if err != nil {
		return nil, err
	}

	updateMod := qb.Update("moderators").
		Set(
			"last_selected",
		).
		Where(qb.Eq("bucket"), qb.Eq("account_id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshaModeratorToDatabase(currentMod))

	if err := updateMod.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return currentMod, nil
}

func (r ModeratorCassandraRepository) RemoveModerator(ctx context.Context, accountId string) error {
	updateMod := qb.Delete("moderators").
		Where(qb.Eq("bucket"), qb.Eq("account_id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&Moderator{
			AccountId: accountId,
			Bucket:    0,
		})

	if err := updateMod.ExecRelease(); err != nil {
		return fmt.Errorf("update() failed: '%s", err)
	}

	return nil
}
