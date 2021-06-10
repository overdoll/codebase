package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/infraction"
)

type UserInfractionHistory struct {
	Id         string    `db:"id"`
	UserId     string    `db:"user_id"`
	Reason     string    `db:"reason"`
	Expiration time.Time `db:"expiration"`
}

func marshalUserInfractionHistoryToDatabase(infractionHistory *infraction.UserInfractionHistory) *UserInfractionHistory {
	return &UserInfractionHistory{
		Id:         infractionHistory.ID(),
		UserId:     infractionHistory.UserId(),
		Reason:     infractionHistory.Reason(),
		Expiration: infractionHistory.Expiration(),
	}
}

func (r InfractionCassandraRepository) GetUserInfractionHistory(ctx context.Context, userId string) ([]*infraction.UserInfractionHistory, error) {

	infractionHistoryQuery := qb.Select("users_infraction_history").
		Columns("id", "reason", "user_id", "expiration").
		Where(qb.Eq("user_id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&UserInfractionHistory{UserId: userId})

	var dbUserInfractionHistory []UserInfractionHistory

	if err := infractionHistoryQuery.Select(&dbUserInfractionHistory); err != nil {
		return nil, err
	}

	var infractionHistory []*infraction.UserInfractionHistory
	for _, infractionHist := range dbUserInfractionHistory {
		infractionHistory = append(infractionHistory, infraction.UnmarshalUserInfractionHistoryFromDatabase(infractionHist.Id, infractionHist.UserId, infractionHist.Reason, infractionHist.Expiration))
	}

	return infractionHistory, nil
}

func (r InfractionCassandraRepository) CreateUserInfractionHistory(ctx context.Context, infractionHistory *infraction.UserInfractionHistory) error {

	insertInfractionHistory := qb.Insert("users_infraction_history").
		Columns(
			"id",
			"user_id",
			"reason",
			"expiration",
		).
		Query(r.session).
		BindStruct(marshalUserInfractionHistoryToDatabase(infractionHistory)).
		Consistency(gocql.One)

	if err := insertInfractionHistory.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}
