package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/moderator"
)

type Moderator struct {
	UserId               string    `db:"user_id"`
	PendingPostsShuffled int       `db:"pending_posts_shuffled"`
	LastSelected         time.Time `db:"last_selected"`
}

func marshaModeratorToDatabase(mod *moderator.Moderator) *Moderator {
	return &Moderator{
		UserId:               mod.ID(),
		LastSelected:         mod.LastSelected(),
		PendingPostsShuffled: mod.PendingPostsShuffled(),
	}
}

func (r CassandraRepository) GetModerator(ctx context.Context, id string) (*moderator.Moderator, error) {

	moderatorQuery := qb.Select("moderators").
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&Moderator{UserId: id})

	var mod Moderator

	if err := moderatorQuery.Get(&mod); err != nil {
		return nil, err
	}

	return moderator.UnmarshalModeratorFromDatabase(mod.UserId, mod.PendingPostsShuffled, mod.LastSelected), nil
}

func (r CassandraRepository) GetModerators(ctx context.Context) ([]*moderator.Moderator, error) {

	moderatorQuery := qb.Select("moderators").
		Columns("user_id", "pending_posts_shuffled", "last_selected").
		Query(r.session).
		Consistency(gocql.LocalQuorum)

	var dbModerators []Moderator

	if err := moderatorQuery.Select(&dbModerators); err != nil {
		return nil, err
	}

	var moderators []*moderator.Moderator
	for _, dbMod := range dbModerators {
		moderators = append(moderators, moderator.UnmarshalModeratorFromDatabase(dbMod.UserId, dbMod.PendingPostsShuffled, dbMod.LastSelected))
	}

	return moderators, nil
}

func (r CassandraRepository) UpdateModerator(ctx context.Context, id string, updateFn func(moderator *moderator.Moderator) (*moderator.Moderator, error)) (*moderator.Moderator, error) {

	currentMod, err := r.GetModerator(ctx, id)

	if err != nil {
		return nil, err
	}

	md, err := updateFn(currentMod)

	if err != nil {
		return nil, err
	}

	updateMod := qb.Update("moderators").
		Set(
			"pending_posts_shuffled",
			"last_selected",
		).
		Where(qb.Eq("user_id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshaModeratorToDatabase(md))

	if err := updateMod.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return md, nil
}
