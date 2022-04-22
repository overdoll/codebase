package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/money"
	"overdoll/libraries/principal"
	"time"
)

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
		"club_payout_ids",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

var clubPaymentsByTransactionTable = table.New(table.Metadata{
	Name: "club_payments_by_transaction_id",
	Columns: []string{
		"account_transaction_id",
		"id",
	},
	PartKey: []string{"account_transaction_id"},
	SortKey: []string{},
})

var clubReadyPaymentsTable = table.New(table.Metadata{
	Name: "club_ready_payments",
	Columns: []string{
		"club_id",
		"payment_id",
		"currency",
		"is_deduction",
		"final_amount",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{"payment_id"},
})

var clubPaymentsByPayoutTable = table.New(table.Metadata{
	Name: "club_payments_by_payout",
	Columns: []string{
		"payout_id",
		"payment_id",
	},
	PartKey: []string{"payout_id"},
	SortKey: []string{"payment_id"},
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

func canViewSensitive(ctx context.Context, stella query.StellaService, requester *principal.Principal, clubId string) error {

	if requester.IsStaff() {
		return nil
	}

	canView, err := stella.CanAccountCreatePostUnderClub(ctx, requester.AccountId(), clubId)

	if err != nil {
		return err
	}

	if !canView {
		return principal.ErrNotAuthorized
	}

	return nil
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
		marshalled.AccountTransactionId,
		marshalled.DestinationClubId,
		marshalled.Currency,
		marshalled.BaseAmount,
		marshalled.PlatformFeeAmount,
		marshalled.FinalAmount,
		marshalled.IsDeduction,
		marshalled.DeductionSourcePaymentId,
		marshalled.Timestamp,
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

func (r PaymentCassandraRepository) getClubPaymentById(ctx context.Context, paymentId string) (*payment.ClubPayment, error) {

	var clubPay clubPayment

	if err := r.session.
		Query(clubPaymentsTable.Get()).
		BindStruct(clubPayment{Id: paymentId}).
		Get(&clubPay); err != nil {
		if err == gocql.ErrNotFound {
			return nil, payment.ErrClubPaymentNotFound
		}
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

func (r PaymentCassandraRepository) GetClubPaymentById(ctx context.Context, requester *principal.Principal, paymentId string) (*payment.ClubPayment, error) {

	pay, err := r.getClubPaymentById(ctx, paymentId)

	if err != nil {
		return nil, err
	}

	if err := canViewSensitive(ctx, r.stella, requester, pay.DestinationClubId()); err != nil {
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

func (r PaymentCassandraRepository) UpdateClubPaymentsCompleted(ctx context.Context, paymentIds []string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// batch update all payments
	for _, id := range paymentIds {
		stmt, _ := clubPaymentsTable.Update("status")
		batch.Query(stmt,
			id,
			payment.Complete.String(),
		)
	}

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to update club payments completed: %v", err)
	}

	return nil
}
func (r PaymentCassandraRepository) updateClubPayment(ctx context.Context, paymentId string, updateFn func(pay *payment.ClubPayment) error, columns []string) (*payment.ClubPayment, error) {
	pay, err := r.GetClubPaymentByIdOperator(ctx, paymentId)

	if err != nil {
		return nil, err
	}

	if err = updateFn(pay); err != nil {
		return nil, err
	}

	marshalled, err := marshalPaymentToDatabase(ctx, pay)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(clubPaymentsTable.Update(columns...)).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update club payment status: %v", err)
	}

	return pay, nil
}

func (r PaymentCassandraRepository) UpdateClubPaymentStatus(ctx context.Context, paymentId string, updateFn func(pay *payment.ClubPayment) error) (*payment.ClubPayment, error) {
	return r.updateClubPayment(ctx, paymentId, updateFn, []string{"status"})
}

func (r PaymentCassandraRepository) UpdateClubPaymentPayoutId(ctx context.Context, paymentId string, updateFn func(pay *payment.ClubPayment) error) (*payment.ClubPayment, error) {
	return r.updateClubPayment(ctx, paymentId, updateFn, []string{"club_payout_ids"})
}

func (r PaymentCassandraRepository) AddClubPaymentToClubReadyList(ctx context.Context, payment *payment.ClubPayment) error {

	if err := r.session.
		Query(clubReadyPaymentsTable.Insert()).
		BindMap(
			map[string]interface{}{
				"club_id":      payment.DestinationClubId(),
				"payment_id":   payment.Id(),
				"currency":     payment.Currency().String(),
				"is_deduction": payment.IsDeduction(),
				"final_amount": payment.FinalAmount(),
			},
		).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to add club payment to club ready list: %v", err)
	}

	return nil
}

func (r PaymentCassandraRepository) ScanClubReadyPaymentsList(ctx context.Context, clubId string, scanFn func(paymentId string, amount int64, isDeduction bool, currency money.Currency)) error {

	var page []byte

	itr := r.session.
		Query(clubReadyPaymentsTable.Select()).
		BindMap(map[string]interface{}{
			"club_id": clubId,
		}).
		WithContext(ctx).
		PageSize(100).
		PageState(page).
		Iter()

	defer itr.Close()

	page = itr.PageState()
	scanner := itr.Scanner()

	for scanner.Next() {
		pay := &clubPayment{}

		if err := scanner.Scan(
			&pay.DestinationClubId,
			&pay.Id,
			&pay.Currency,
			&pay.FinalAmount,
			&pay.IsDeduction,
		); err != nil {
			return err
		}

		cr, err := money.CurrencyFromString(pay.Currency)

		if err != nil {
			return err
		}

		scanFn(pay.Id, pay.FinalAmount, pay.IsDeduction, cr)
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	return nil
}

func (r PaymentCassandraRepository) AddClubPaymentsToPayout(ctx context.Context, payoutId string, paymentIds []string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := clubPaymentsByPayoutTable.Insert()

	for _, id := range paymentIds {
		batch.Query(stmt,
			payoutId,
			id,
		)
	}

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create new club payment: %v", err)
	}

	return nil
}

func (r PaymentCassandraRepository) ScanClubPaymentsListForPayout(ctx context.Context, payoutId string, scanFn func(paymentIds []string) error) error {

	var page []byte

	itr := r.session.
		Query(clubPaymentsByPayoutTable.Select()).
		BindMap(map[string]interface{}{
			"payout_id": payoutId,
		}).
		WithContext(ctx).
		PageSize(100).
		PageState(page).
		Iter()

	defer itr.Close()

	page = itr.PageState()
	scanner := itr.Scanner()

	var ids []string

	for scanner.Next() {

		var id *string

		if err := scanner.Scan(
			nil,
			&id,
		); err != nil {
			return err
		}

		ids = append(ids, *id)
	}

	if err := scanner.Err(); err != nil {
		return err
	}

	if err := scanFn(ids); err != nil {
		return err
	}

	return nil
}

func (r PaymentCassandraRepository) UpdateClubPlatformFee(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(fee *payment.ClubPlatformFee) error) (*payment.ClubPlatformFee, error) {

	pay, err := r.GetPlatformFeeForClub(ctx, requester, clubId)

	if err != nil {
		return nil, err
	}

	if err = updateFn(pay); err != nil {
		return nil, err
	}

	if err := r.session.
		Query(clubPlatformFeeTable.Insert()).
		BindStruct(&clubPlatformFee{
			ClubId:  pay.ClubId(),
			Percent: pay.Percent(),
		}).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update club platform fee: %v", err)
	}

	return pay, nil
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

func (r PaymentCassandraRepository) GetPlatformFeeForClubOperator(ctx context.Context, clubId string) (*payment.ClubPlatformFee, error) {
	return r.getPlatformFeeForClub(ctx, clubId)
}

func (r PaymentCassandraRepository) GetPlatformFeeForClub(ctx context.Context, requester *principal.Principal, clubId string) (*payment.ClubPlatformFee, error) {

	fee, err := r.getPlatformFeeForClub(ctx, clubId)

	if err != nil {
		return nil, err
	}

	if err := canViewSensitive(ctx, r.stella, requester, clubId); err != nil {
		return nil, err
	}

	return fee, nil
}
