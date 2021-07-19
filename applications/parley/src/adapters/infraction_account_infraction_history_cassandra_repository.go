package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/src/domain/infraction"
	"overdoll/libraries/paging"
)

var accountInfractionHistoryTable = table.New(table.Metadata{
	Name: "account_infraction_history",
	Columns: []string{
		"id",
		"account_id",
		"reason",
		"expiration",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"id"},
})

type accountInfractionHistory struct {
	Id         string    `db:"id"`
	AccountId  string    `db:"account_id"`
	Reason     string    `db:"reason"`
	Expiration time.Time `db:"expiration"`
}

func marshalAccountInfractionHistoryToDatabase(infractionHistory *infraction.AccountInfractionHistory) *accountInfractionHistory {
	return &accountInfractionHistory{
		Id:         infractionHistory.ID(),
		AccountId:  infractionHistory.AccountId(),
		Reason:     infractionHistory.Reason(),
		Expiration: infractionHistory.Expiration(),
	}
}

func (r InfractionCassandraRepository) DeleteAccountInfractionHistory(ctx context.Context, userId, id string) error {

	deleteAccountInfraction := r.session.
		Query(accountInfractionHistoryTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountInfractionHistory{Id: id, AccountId: userId})

	if err := deleteAccountInfraction.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}

func (r InfractionCassandraRepository) GetAccountInfractionHistoryById(ctx context.Context, userId, id string) (*infraction.AccountInfractionHistory, error) {

	infractionHistoryQuery := r.session.
		Query(accountInfractionHistoryTable.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountInfractionHistory{Id: id, AccountId: userId})

	var dbUserInfractionHistory accountInfractionHistory

	if err := infractionHistoryQuery.Get(&dbUserInfractionHistory); err != nil {
		return nil, err
	}

	return infraction.UnmarshalAccountInfractionHistoryFromDatabase(dbUserInfractionHistory.Id, dbUserInfractionHistory.AccountId, dbUserInfractionHistory.Reason, dbUserInfractionHistory.Expiration), nil
}

func (r InfractionCassandraRepository) GetAccountInfractionHistory(ctx context.Context, cursor *paging.Cursor, accountId string) ([]*infraction.AccountInfractionHistory, *paging.Info, error) {

	infractionHistoryQuery := r.session.
		Query(accountInfractionHistoryTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountInfractionHistory{AccountId: accountId})

	var dbUserInfractionHistory []accountInfractionHistory

	if err := infractionHistoryQuery.Select(&dbUserInfractionHistory); err != nil {
		return nil, nil, err
	}

	var infractionHistory []*infraction.AccountInfractionHistory
	for _, infractionHist := range dbUserInfractionHistory {
		infractionHistory = append(infractionHistory, infraction.UnmarshalAccountInfractionHistoryFromDatabase(infractionHist.Id, infractionHist.AccountId, infractionHist.Reason, infractionHist.Expiration))
	}

	return infractionHistory, nil, nil
}

func (r InfractionCassandraRepository) CreateUserInfractionHistory(ctx context.Context, infractionHistory *infraction.AccountInfractionHistory) error {

	infractionHistoryQuery := r.session.
		Query(accountInfractionHistoryTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalAccountInfractionHistoryToDatabase(infractionHistory))

	if err := infractionHistoryQuery.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	return nil
}
