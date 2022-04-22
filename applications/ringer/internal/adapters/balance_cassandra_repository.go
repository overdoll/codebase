package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/money"
	"overdoll/libraries/principal"
)

var balanceColumns = []string{
	"club_id",
	"currency",
	"amount",
	"last_insert_id",
}

var clubPendingBalanceTable = table.New(table.Metadata{
	Name:    "club_pending_balance",
	Columns: balanceColumns,
	PartKey: []string{"club_id"},
	SortKey: []string{},
})

var clubBalanceTable = table.New(table.Metadata{
	Name:    "club_balance",
	Columns: balanceColumns,
	PartKey: []string{"club_id"},
	SortKey: []string{},
})

type clubBalance struct {
	ClubId       string     `db:"club_id"`
	Currency     string     `db:"currency"`
	Amount       int64      `db:"amount"`
	LastInsertId gocql.UUID `db:"last_insert_id"`
}

type BalanceCassandraRepository struct {
	session gocqlx.Session
	stella  query.StellaService
}

func NewBalanceCassandraRepository(session gocqlx.Session, stella query.StellaService) BalanceCassandraRepository {
	return BalanceCassandraRepository{session: session, stella: stella}
}

func (r BalanceCassandraRepository) getBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string, table *table.Table) (*balance.ClubBalance, error) {

	var clubBal clubBalance

	if err := r.session.
		Query(table.Get()).
		BindStruct(clubBalance{ClubId: clubId}).
		Get(&clubBal); err != nil {

		if err == gocql.ErrNotFound {
			return balance.NewDefaultBalance(clubId)
		}

		return nil, fmt.Errorf("failed to get balance for club: %v", err)
	}

	if err := canViewSensitive(ctx, r.stella, requester, clubId); err != nil {
		return nil, err
	}

	return balance.UnmarshalClubBalanceFromDatabase(clubBal.ClubId, clubBal.Amount, clubBal.Currency, clubBal.LastInsertId.Time()), nil
}

func (r BalanceCassandraRepository) GetPendingBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*balance.ClubBalance, error) {
	return r.getBalanceForClub(ctx, requester, clubId, clubPendingBalanceTable)
}

func (r BalanceCassandraRepository) GetBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*balance.ClubBalance, error) {
	return r.getBalanceForClub(ctx, requester, clubId, clubBalanceTable)
}

func (r BalanceCassandraRepository) getClubPaymentById(ctx context.Context, paymentId string) (*payment.ClubPayment, error) {

	var clubPay clubPayment

	if err := r.session.
		Query(clubPaymentsTable.Get()).
		BindStruct(clubPayment{Id: paymentId}).
		Get(&clubPay); err != nil {
		return nil, fmt.Errorf("failed to get club payment by id: %v", err)
	}

	return payment.UnmarshalClubPaymentFromDatabase(
		clubPay.Id,
		clubPay.Source,
		clubPay.Status,
		clubPay.SourceAccountId,
		clubPay.AccountTransactionId,
		clubPay.DestinationClubId,
		clubPay.Currency,
		clubPay.BaseAmount,
		clubPay.PlatformFeeAmount,
		clubPay.FinalAmount,
		clubPay.IsDeduction,
		clubPay.DeductionSourcePaymentId,
		clubPay.Timestamp,
		clubPay.SettlementDate,
		clubPay.ClubPayoutIds,
	), nil
}

func (r BalanceCassandraRepository) getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx context.Context, table *table.Table, clubId string, amount int64, currency money.Currency, increment bool) error {

	var b clubBalance

	// basically here, we try to get the club balance
	// if we can't find it, we create a new one, using a unique insert on purpose
	err := r.session.
		Query(table.Get()).
		BindStruct(clubBalance{ClubId: clubId}).
		Get(&b)

	if err != nil && err != gocql.ErrNotFound {
		return fmt.Errorf("failed to get club balance: %v", err)
	}

	if err == gocql.ErrNotFound {

		b = clubBalance{
			ClubId:       clubId,
			Currency:     currency.String(),
			Amount:       0,
			LastInsertId: gocql.TimeUUID(),
		}

		applied, err := table.InsertBuilder().
			Unique().
			Query(r.session).
			SerialConsistency(gocql.Serial).
			BindStruct(b).
			ExecCAS()

		if err != nil {
			return fmt.Errorf("failed to create club balance: %v", err)
		}

		if !applied {
			return fmt.Errorf("failed to insert unique club balance: %v", err)
		}
	}

	finalBalance := b.Amount

	if increment {
		finalBalance += amount
	} else {
		finalBalance -= amount
	}

	// now, do an increment or decrement of the balance
	ok, err := table.UpdateBuilder("last_insert_id", "amount").
		If(qb.EqLit("last_insert_id", b.LastInsertId.String())).
		Query(r.session).
		BindStruct(clubBalance{ClubId: clubId, LastInsertId: gocql.TimeUUID(), Amount: finalBalance}).
		SerialConsistency(gocql.Serial).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to update balance: %v", err)
	}

	if !ok {
		return fmt.Errorf("failed to execute transaction to update balance: %v", err)
	}

	return nil
}

func (r BalanceCassandraRepository) IncrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error {
	return r.getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx, clubPendingBalanceTable, clubId, amount, currency, true)
}

func (r BalanceCassandraRepository) DecrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error {
	return r.getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx, clubPendingBalanceTable, clubId, amount, currency, false)
}

func (r BalanceCassandraRepository) IncrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error {
	return r.getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx, clubBalanceTable, clubId, amount, currency, true)
}

func (r BalanceCassandraRepository) DecrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error {
	return r.getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx, clubBalanceTable, clubId, amount, currency, false)
}
