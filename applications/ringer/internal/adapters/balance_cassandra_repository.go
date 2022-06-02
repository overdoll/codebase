package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/domain/balance"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/errors"
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
		WithContext(ctx).
		Idempotent(true).
		BindStruct(clubBalance{ClubId: clubId}).
		GetRelease(&clubBal); err != nil {

		if err == gocql.ErrNotFound {
			return balance.NewDefaultBalance(clubId)
		}

		return nil, errors.Wrap(err, "failed to get balance for club")
	}

	if err := canViewSensitive(ctx, requester, clubId); err != nil {
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
		WithContext(ctx).
		Idempotent(true).
		BindStruct(clubPayment{Id: paymentId}).
		GetRelease(&clubPay); err != nil {
		return nil, errors.Wrap(err, "failed to get club payment by id")
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
		clubPay.CreatedAt,
		clubPay.SettlementDate,
		clubPay.ClubPayoutIds,
	), nil
}

func (r BalanceCassandraRepository) getOrCreateClubBalanceAndUpdate(ctx context.Context, table *table.Table, clubId string, updateFn func(*balance.ClubBalance) error) error {

	var b clubBalance

	// basically here, we try to get the club balance
	// if we can't find it, we create a new one, using a unique insert on purpose
	err := r.session.
		Query(table.Get()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(clubBalance{ClubId: clubId}).
		GetRelease(&b)

	if err != nil && err != gocql.ErrNotFound {
		return errors.Wrap(err, "failed to get club balance")
	}

	if err == gocql.ErrNotFound {

		b = clubBalance{
			ClubId:       clubId,
			Currency:     money.USD.String(),
			Amount:       0,
			LastInsertId: gocql.TimeUUID(),
		}

		applied, err := table.InsertBuilder().
			Unique().
			Query(r.session).
			WithContext(ctx).
			SerialConsistency(gocql.Serial).
			BindStruct(b).
			ExecCASRelease()

		if err != nil {
			return errors.Wrap(err, "failed to create club balance")
		}

		if !applied {
			return errors.New("failed to insert unique club balance")
		}
	}

	marshalled := balance.UnmarshalClubBalanceFromDatabase(b.ClubId, b.Amount, b.Currency, b.LastInsertId.Time())

	if err := updateFn(marshalled); err != nil {
		return err
	}

	// now, do an increment or decrement of the balance
	ok, err := table.UpdateBuilder("last_insert_id", "amount").
		If(qb.EqLit("last_insert_id", b.LastInsertId.String())).
		Query(r.session).
		WithContext(ctx).
		BindStruct(clubBalance{ClubId: clubId, LastInsertId: gocql.TimeUUID(), Amount: marshalled.Amount()}).
		SerialConsistency(gocql.Serial).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(err, "failed to update balance")
	}

	if !ok {
		return errors.Wrap(err, "failed to execute transaction to update balance")
	}

	return nil
}

func (r BalanceCassandraRepository) UpdateClubBalance(ctx context.Context, clubId string, updateFn func(*balance.ClubBalance) error) error {
	return r.getOrCreateClubBalanceAndUpdate(ctx, clubBalanceTable, clubId, updateFn)
}

func (r BalanceCassandraRepository) UpdateClubPendingBalance(ctx context.Context, clubId string, updateFn func(*balance.ClubBalance) error) error {
	return r.getOrCreateClubBalanceAndUpdate(ctx, clubPendingBalanceTable, clubId, updateFn)
}
