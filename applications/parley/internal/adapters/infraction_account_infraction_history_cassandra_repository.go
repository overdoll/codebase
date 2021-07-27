package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/infraction"
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
		return fmt.Errorf("failed to delete account infraction history: %v", err)
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

		if err == gocql.ErrNotFound {
			return nil, infraction.ErrAccountInfractionHistoryNotFound
		}

		return nil, fmt.Errorf("failed to get account infraction history: %v", err)
	}

	return infraction.UnmarshalAccountInfractionHistoryFromDatabase(dbUserInfractionHistory.Id, dbUserInfractionHistory.AccountId, dbUserInfractionHistory.Reason, dbUserInfractionHistory.Expiration), nil
}

func (r InfractionCassandraRepository) GetAccountInfractionHistory(ctx context.Context, cursor *paging.Cursor, accountId string) ([]*infraction.AccountInfractionHistory, error) {

	builder := accountInfractionHistoryTable.SelectBuilder()

	data := &accountInfractionHistory{AccountId: accountId}

	if cursor != nil {
		cursor.BuildCassandra(builder, "id")
	}

	infractionHistoryQuery := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data)

	var dbUserInfractionHistory []accountInfractionHistory

	if err := infractionHistoryQuery.Select(&dbUserInfractionHistory); err != nil {
		return nil, fmt.Errorf("failed to get infraction history for account: %v", err)
	}

	var infractionHistory []*infraction.AccountInfractionHistory
	for _, infractionHist := range dbUserInfractionHistory {
		infract := infraction.UnmarshalAccountInfractionHistoryFromDatabase(infractionHist.Id, infractionHist.AccountId, infractionHist.Reason, infractionHist.Expiration)
		infract.Node = paging.NewNode(infractionHist.Id)
		infractionHistory = append(infractionHistory, infract)
	}

	return infractionHistory, nil
}

func (r InfractionCassandraRepository) CreateAccountInfractionHistory(ctx context.Context, infractionHistory *infraction.AccountInfractionHistory) error {

	infractionHistoryQuery := r.session.
		Query(accountInfractionHistoryTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalAccountInfractionHistoryToDatabase(infractionHistory))

	if err := infractionHistoryQuery.ExecRelease(); err != nil {
		return fmt.Errorf("failed to create account infraction: %v", err)
	}

	return nil
}
