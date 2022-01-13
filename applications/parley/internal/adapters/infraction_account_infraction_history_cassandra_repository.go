package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var accountInfractionHistoryTable = table.New(table.Metadata{
	Name: "account_infraction_history",
	Columns: []string{
		"id",
		"account_id",
		"post_rejection_reason_id",
		"expiration",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"id"},
})

type accountInfractionHistory struct {
	Id                    string    `db:"id"`
	AccountId             string    `db:"account_id"`
	PostRejectionReasonId string    `db:"post_rejection_reason_id"`
	Expiration            time.Time `db:"expiration"`
}

func marshalAccountInfractionHistoryToDatabase(infractionHistory *infraction.AccountInfractionHistory) *accountInfractionHistory {
	return &accountInfractionHistory{
		Id:                    infractionHistory.ID(),
		AccountId:             infractionHistory.AccountId(),
		PostRejectionReasonId: infractionHistory.Reason().ID(),
		Expiration:            infractionHistory.Expiration(),
	}
}

func (r InfractionCassandraRepository) DeleteAccountInfractionHistory(ctx context.Context, requester *principal.Principal, userId, id string) error {

	history, err := r.getAccountInfractionHistoryById(ctx, requester, userId, id)

	if err != nil {
		return err
	}

	if err := history.CanDelete(requester); err != nil {
		return err
	}

	deleteAccountInfraction := r.session.
		Query(accountInfractionHistoryTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountInfractionHistory{Id: id, AccountId: userId})

	if err := deleteAccountInfraction.ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete account infraction history: %v", err)
	}

	return nil
}

func (r InfractionCassandraRepository) GetAccountInfractionHistoryById(ctx context.Context, requester *principal.Principal, userId, id string) (*infraction.AccountInfractionHistory, error) {

	history, err := r.getAccountInfractionHistoryById(ctx, requester, userId, id)

	if err != nil {
		return nil, err
	}

	if err := history.CanView(requester); err != nil {
		return nil, err
	}

	return history, nil
}

func (r InfractionCassandraRepository) getAccountInfractionHistoryById(ctx context.Context, requester *principal.Principal, userId, id string) (*infraction.AccountInfractionHistory, error) {

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

	rejectionReason, err := r.GetPostRejectionReason(ctx, requester, dbUserInfractionHistory.PostRejectionReasonId)

	if err != nil {
		return nil, err
	}

	return infraction.UnmarshalAccountInfractionHistoryFromDatabase(dbUserInfractionHistory.Id, dbUserInfractionHistory.AccountId, rejectionReason, dbUserInfractionHistory.Expiration), nil
}

func (r InfractionCassandraRepository) GetAccountInfractionHistory(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*infraction.AccountInfractionHistory, error) {

	if err := infraction.CanViewAccountInfractionHistory(requester); err != nil {
		return nil, err
	}

	builder := accountInfractionHistoryTable.SelectBuilder()

	data := &accountInfractionHistory{AccountId: accountId}

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", true); err != nil {
			return nil, err
		}
	}

	infractionHistoryQuery := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data)

	var dbUserInfractionHistory []accountInfractionHistory

	if err := infractionHistoryQuery.Select(&dbUserInfractionHistory); err != nil {
		return nil, fmt.Errorf("failed to get infraction history for account: %v", err)
	}

	rejectionReasonMap, err := r.getPostRejectionReasonsAsMap(ctx, requester)

	if err != nil {
		return nil, err
	}

	var infractionHistory []*infraction.AccountInfractionHistory
	for _, infractionHist := range dbUserInfractionHistory {
		if rejectionReason, ok := rejectionReasonMap[infractionHist.PostRejectionReasonId]; ok {
			infract := infraction.UnmarshalAccountInfractionHistoryFromDatabase(infractionHist.Id, infractionHist.AccountId, rejectionReason, infractionHist.Expiration)
			infract.Node = paging.NewNode(infractionHist.Id)
			infractionHistory = append(infractionHistory, infract)
		} else {
			return nil, infraction.ErrPostRejectionReasonNotFound
		}
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
