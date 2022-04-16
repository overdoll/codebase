package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/money"
	"overdoll/libraries/principal"
	"time"
)

var balanceColumns = []string{
	"club_id",
	"currency",
	"amount",
	"last_insert_id",
}

var clubPaymentsTable = table.New(table.Metadata{
	Name: "club_payments",
	Columns: []string{
		"id",
		"source",
		"status",
		"settlement_date",
		"source_account_id",
		"account_transaction_id",
		"destination_club_id",
		"currency",
		"base_amount",
		"platform_fee_amount",
		"final_amount",
		"is_deduction",
		"deduction_source_payment_id",
		"timestamp",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

var clubPaymentsByTransactionTable = table.New(table.Metadata{
	Name: "club_payments_by_transaction_id",
	Columns: []string{
		"account_transaction_id",
		"payment_id",
	},
	PartKey: []string{"account_transaction_id"},
	SortKey: []string{},
})

type clubPayment struct {
	Id                       string    `db:"id"`
	Source                   string    `db:"source"`
	Status                   string    `db:"status"`
	SettlementDate           time.Time `db:"settlement_date"`
	SourceAccountId          string    `db:"source_account_id"`
	AccountTransactionId     string    `db:"account_transaction_id"`
	DestinationClubId        string    `db:"destination_club_id"`
	Currency                 string    `db:"currency"`
	BaseAmount               int64     `db:"base_amount"`
	PlatformFeeAmount        int64     `db:"platform_fee_amount"`
	FinalAmount              int64     `db:"final_amount"`
	IsDeduction              bool      `db:"is_deduction"`
	DeductionSourcePaymentId *string   `db:"deduction_source_payment_id"`
	Timestamp                time.Time `db:"timestamp"`
	ClubPayoutIds            []string  `db:"club_payout_ids"`
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

var clubPlatformFeeTable = table.New(table.Metadata{
	Name: "club_platform_fee",
	Columns: []string{
		"club_id",
		"percent",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{},
})

type clubPlatformFee struct {
	ClubId  string `db:"club_id"`
	Percent int64  `db:"percent"`
}

type PaymentCassandraRepository struct {
	session gocqlx.Session
	stella  query.StellaService
}

func NewPaymentCassandraRepository(session gocqlx.Session, stella query.StellaService) PaymentCassandraRepository {
	return PaymentCassandraRepository{session: session, stella: stella}
}

func marshalPaymentToDatabase(ctx context.Context, pay *payment.ClubPayment) (*clubPayment, error) {
	return &clubPayment{
		Id:                       pay.Id(),
		Source:                   pay.Source().String(),
		Status:                   pay.Status().String(),
		SettlementDate:           pay.SettlementDate(),
		SourceAccountId:          pay.SourceAccountId(),
		AccountTransactionId:     pay.AccountTransactionId(),
		DestinationClubId:        pay.DestinationClubId(),
		Currency:                 pay.Currency().String(),
		BaseAmount:               pay.BaseAmount(),
		PlatformFeeAmount:        pay.PlatformFeeAmount(),
		FinalAmount:              pay.FinalAmount(),
		IsDeduction:              pay.IsDeduction(),
		DeductionSourcePaymentId: pay.DeductionSourcePaymentId(),
		Timestamp:                pay.Timestamp(),
		ClubPayoutIds:            pay.ClubPayoutIds(),
	}, nil
}

func (r PaymentCassandraRepository) canViewSensitive(ctx context.Context, requester *principal.Principal, clubId string) error {

	if requester.IsStaff() {
		return nil
	}

	canView, err := r.stella.CanAccountCreatePostUnderClub(ctx, requester.AccountId(), clubId)

	if err != nil {
		return err
	}

	if !canView {
		return principal.ErrNotAuthorized
	}

	return nil
}

func (r PaymentCassandraRepository) getPlatformFeeForClub(ctx context.Context, clubId string) (*payment.ClubPlatformFee, error) {

	var platformFee clubPlatformFee

	if err := r.session.
		Query(clubPlatformFeeTable.Get()).
		BindStruct(clubPlatformFee{ClubId: clubId}).
		Get(&platformFee); err != nil {

		if err == gocql.ErrNotFound {
			return payment.NewDefaultPlatformFee(clubId)
		}

		return nil, fmt.Errorf("failed to get platform fee for club: %v", err)
	}

	return payment.UnmarshalClubPlatformFeeFromDatabase(platformFee.ClubId, platformFee.Percent), nil
}

func (r PaymentCassandraRepository) GetPlatformFeeForClub(ctx context.Context, requester *principal.Principal, clubId string) (*payment.ClubPlatformFee, error) {

	fee, err := r.getPlatformFeeForClub(ctx, clubId)

	if err != nil {
		return nil, err
	}

	if err := r.canViewSensitive(ctx, requester, clubId); err != nil {
		return nil, err
	}

	return fee, nil
}

func (r PaymentCassandraRepository) GetPlatformFeeForClubOperator(ctx context.Context, clubId string) (*payment.ClubPlatformFee, error) {
	return r.getPlatformFeeForClub(ctx, clubId)
}

func (r PaymentCassandraRepository) CreateNewClubPayment(ctx context.Context, payment *payment.ClubPayment) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	marshalled, err := marshalPaymentToDatabase(ctx, payment)

	if err != nil {
		return err
	}

	stmt, _ := clubPaymentsTable.Insert()

	batch.Query(stmt,
		marshalled.Id,
		marshalled.Source,
		marshalled.Status,
		marshalled.SettlementDate,
		marshalled.SourceAccountId,
		marshalled.DestinationClubId,
		marshalled.Currency,
		marshalled.BaseAmount,
		marshalled.PlatformFeeAmount,
		marshalled.FinalAmount,
		marshalled.IsDeduction,
		marshalled.DeductionSourcePaymentId,
		marshalled.ClubPayoutIds,
	)

	stmt, _ = clubPaymentsByTransactionTable.Insert()

	batch.Query(stmt,
		marshalled.AccountTransactionId,
		marshalled.Id,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create new club payment: %v", err)
	}

	return nil
}

func (r PaymentCassandraRepository) getBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string, table *table.Table) (*payment.ClubBalance, error) {

	var clubBal clubBalance

	if err := r.session.
		Query(table.Get()).
		BindStruct(clubBalance{ClubId: clubId}).
		Get(&clubBal); err != nil {

		if err == gocql.ErrNotFound {
			return payment.NewDefaultBalance(clubId)
		}

		return nil, fmt.Errorf("failed to get balance for club: %v", err)
	}

	if err := r.canViewSensitive(ctx, requester, clubId); err != nil {
		return nil, err
	}

	return payment.UnmarshalClubBalanceFromDatabase(clubBal.ClubId, clubBal.Amount, clubBal.Currency), nil
}

func (r PaymentCassandraRepository) GetPendingBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*payment.ClubBalance, error) {
	return r.getBalanceForClub(ctx, requester, clubId, clubPendingBalanceTable)
}

func (r PaymentCassandraRepository) GetBalanceForClub(ctx context.Context, requester *principal.Principal, clubId string) (*payment.ClubBalance, error) {
	return r.getBalanceForClub(ctx, requester, clubId, clubBalanceTable)
}

func (r PaymentCassandraRepository) getClubPaymentById(ctx context.Context, paymentId string) (*payment.ClubPayment, error) {

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
		clubPay.SourceAccountId,
		clubPay.AccountTransactionId,
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

func (r PaymentCassandraRepository) GetClubPaymentById(ctx context.Context, requester *principal.Principal, paymentId string) (*payment.ClubPayment, error) {

	pay, err := r.getClubPaymentById(ctx, paymentId)

	if err != nil {
		return nil, err
	}

	if err := r.canViewSensitive(ctx, requester, pay.DestinationClubId()); err != nil {
		return nil, err
	}

	return pay, nil
}

func (r PaymentCassandraRepository) GetClubPaymentByIdOperator(ctx context.Context, paymentId string) (*payment.ClubPayment, error) {
	return r.getClubPaymentById(ctx, paymentId)
}

func (r PaymentCassandraRepository) GetClubPaymentByAccountTransactionId(ctx context.Context, accountTransactionId string) (*payment.ClubPayment, error) {

	var clubPay clubPayment

	if err := r.session.
		Query(clubPaymentsByTransactionTable.Get()).
		BindStruct(clubPayment{AccountTransactionId: accountTransactionId}).
		Get(&clubPay); err != nil {
		return nil, fmt.Errorf("failed to get club payment by transaction id: %v", err)
	}

	return r.getClubPaymentById(ctx, clubPay.Id)
}

func (r PaymentCassandraRepository) getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx context.Context, table *table.Table, clubId string, amount int64, currency money.Currency, increment bool) error {

	var balance clubBalance

	// basically here, we try to get the club balance
	// if we can't find it, we create a new one, using a unique insert on purpose
	if err := r.session.
		Query(table.Get()).
		BindStruct(clubBalance{ClubId: clubId}).
		Get(&balance); err != nil {

		if err == gocql.ErrNotFound {

			balance = clubBalance{
				ClubId:       clubId,
				Currency:     currency.String(),
				Amount:       0,
				LastInsertId: gocql.TimeUUID(),
			}

			applied, err := table.InsertBuilder().
				Unique().
				Query(r.session).
				SerialConsistency(gocql.Serial).
				BindStruct(balance).
				ExecCAS()

			if err != nil {
				return fmt.Errorf("failed to create club balance: %v", err)
			}

			if !applied {
				return fmt.Errorf("failed to insert unique club balance: %v", err)
			}
		}

		return fmt.Errorf("failed to get club balance: %v", err)
	}

	finalBalance := balance.Amount

	if increment {
		finalBalance += amount
	} else {
		finalBalance -= amount
	}

	// now, do an increment or decrement of the balance
	ok, err := table.UpdateBuilder("last_insert_id", "amount").
		If(qb.EqLit("last_insert_id", balance.LastInsertId.String())).
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

func (r PaymentCassandraRepository) IncrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error {
	return r.getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx, clubPendingBalanceTable, clubId, amount, currency, true)
}

func (r PaymentCassandraRepository) DecrementClubPendingBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error {
	return r.getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx, clubPendingBalanceTable, clubId, amount, currency, false)
}

func (r PaymentCassandraRepository) IncrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error {
	return r.getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx, clubBalanceTable, clubId, amount, currency, true)
}

func (r PaymentCassandraRepository) DecrementClubBalance(ctx context.Context, clubId string, amount int64, currency money.Currency) error {
	return r.getOrCreateClubBalanceAndIncrementOrDecrementAmount(ctx, clubBalanceTable, clubId, amount, currency, false)
}

func (r PaymentCassandraRepository) UpdateClubPaymentStatus(ctx context.Context, paymentId string, updateFn func(pay *payment.ClubPayment) error) (*payment.ClubPayment, error) {
	//TODO implement me
	panic("implement me")
}

func (r PaymentCassandraRepository) UpdateClubPlatformFee(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(fee *payment.ClubPlatformFee) error) (*payment.ClubPlatformFee, error) {
	//TODO implement me
	panic("implement me")
}

func (r PaymentCassandraRepository) AddClubPaymentToClubReadyList(ctx context.Context, payment *payment.ClubPayment) error {
	//TODO implement me
	panic("implement me")
}

func (r PaymentCassandraRepository) ScanClubReadyPaymentsList(ctx context.Context, clubId string, scanFn func(paymentId string, amount int64, isDeduction bool, currency money.Currency)) error {
	//TODO implement me
	panic("implement me")
}

func (r PaymentCassandraRepository) ScanClubPaymentsListForPayout(ctx context.Context, payoutId string, scanFn func(paymentIds []string) error) error {
	//TODO implement me
	panic("implement me")
}

func (r PaymentCassandraRepository) UpdateClubPaymentsCompleted(ctx context.Context, paymentIds []string) error {
	//TODO implement me
	panic("implement me")
}
