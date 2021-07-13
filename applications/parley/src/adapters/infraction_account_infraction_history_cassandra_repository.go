package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/parley/src/domain/infraction"
)

type AccountInfractionHistory struct {
	Id         string    `db:"id"`
	AccountId  string    `db:"account_id"`
	Reason     string    `db:"reason"`
	Expiration time.Time `db:"expiration"`
}

func marshalAccountInfractionHistoryToDatabase(infractionHistory *infraction.AccountInfractionHistory) *AccountInfractionHistory {
	return &AccountInfractionHistory{
		Id:         infractionHistory.ID(),
		AccountId:  infractionHistory.AccountId(),
		Reason:     infractionHistory.Reason(),
		Expiration: infractionHistory.Expiration(),
	}
}

func (r InfractionCassandraRepository) DeleteAccountInfractionHistory(ctx context.Context, userId, id string) error {

	deleteAccountInfraction := qb.Delete("account_infraction_history").
		Where(qb.Eq("id"), qb.Eq("account_id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&AccountInfractionHistory{Id: id, AccountId: userId})

	if err := deleteAccountInfraction.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r InfractionCassandraRepository) GetAccountInfractionHistoryById(ctx context.Context, userId, id string) (*infraction.AccountInfractionHistory, error) {

	infractionHistoryQuery := qb.Select("account_infraction_history").
		Columns("id", "reason", "account_id", "expiration").
		Where(qb.Eq("id"), qb.Eq("account_id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&AccountInfractionHistory{Id: id, AccountId: userId})

	var dbUserInfractionHistory AccountInfractionHistory

	if err := infractionHistoryQuery.Get(&dbUserInfractionHistory); err != nil {
		return nil, err
	}

	return infraction.UnmarshalAccountInfractionHistoryFromDatabase(dbUserInfractionHistory.Id, dbUserInfractionHistory.AccountId, dbUserInfractionHistory.Reason, dbUserInfractionHistory.Expiration), nil
}

func (r InfractionCassandraRepository) GetAccountInfractionHistory(ctx context.Context, accountId string) ([]*infraction.AccountInfractionHistory, error) {

	infractionHistoryQuery := qb.Select("account_infraction_history").
		Columns("id", "reason", "account_id", "expiration").
		Where(qb.Eq("account_id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&AccountInfractionHistory{AccountId: accountId})

	var dbUserInfractionHistory []AccountInfractionHistory

	if err := infractionHistoryQuery.Select(&dbUserInfractionHistory); err != nil {
		return nil, err
	}

	var infractionHistory []*infraction.AccountInfractionHistory
	for _, infractionHist := range dbUserInfractionHistory {
		infractionHistory = append(infractionHistory, infraction.UnmarshalAccountInfractionHistoryFromDatabase(infractionHist.Id, infractionHist.AccountId, infractionHist.Reason, infractionHist.Expiration))
	}

	return infractionHistory, nil
}

func (r InfractionCassandraRepository) CreateUserInfractionHistory(ctx context.Context, infractionHistory *infraction.AccountInfractionHistory) error {

	insertInfractionHistory := qb.Insert("account_infraction_history").
		Columns(
			"id",
			"account_id",
			"reason",
			"expiration",
		).
		Query(r.session).
		BindStruct(marshalAccountInfractionHistoryToDatabase(infractionHistory)).
		Consistency(gocql.One)

	if err := insertInfractionHistory.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}
