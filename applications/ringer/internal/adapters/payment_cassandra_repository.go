package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/domain/payment"
	"overdoll/libraries/errors"
	"overdoll/libraries/money"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
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
		"created_at",
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
	BaseAmount               uint64    `db:"base_amount"`
	PlatformFeeAmount        uint64    `db:"platform_fee_amount"`
	FinalAmount              uint64    `db:"final_amount"`
	IsDeduction              bool      `db:"is_deduction"`
	DeductionSourcePaymentId *string   `db:"deduction_source_payment_id"`
	CreatedAt                time.Time `db:"created_at"`
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
	Percent uint64 `db:"percent"`
}

type PaymentCassandraElasticsearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

func NewPaymentCassandraRepository(session gocqlx.Session, client *elastic.Client) PaymentCassandraElasticsearchRepository {
	return PaymentCassandraElasticsearchRepository{session: session, client: client}
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
		CreatedAt:                pay.CreatedAt(),
		ClubPayoutIds:            pay.ClubPayoutIds(),
	}, nil
}

func canViewSensitive(ctx context.Context, requester *principal.Principal, clubId string) error {

	if requester.IsStaff() {
		return nil
	}

	if err := requester.CheckClubOwner(clubId); err != nil {
		return err
	}

	return nil
}

func (r PaymentCassandraElasticsearchRepository) CreateNewClubPayment(ctx context.Context, payment *payment.ClubPayment) error {

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	marshalled, err := marshalPaymentToDatabase(ctx, payment)

	if err != nil {
		return err
	}

	stmt, names := clubPaymentsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalled,
	)

	stmt, names = clubPaymentsByTransactionTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalled,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(err, "failed to create new club payment")
	}

	if err := r.indexClubPayment(ctx, payment); err != nil {
		return err
	}

	return nil
}

func (r PaymentCassandraElasticsearchRepository) getClubPaymentById(ctx context.Context, paymentId string) (*payment.ClubPayment, error) {

	var clubPay clubPayment

	if err := r.session.
		Query(clubPaymentsTable.Get()).
		WithContext(ctx).
		BindStruct(clubPayment{Id: paymentId}).
		GetRelease(&clubPay); err != nil {
		if err == gocql.ErrNotFound {
			return nil, payment.ErrClubPaymentNotFound
		}
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

func (r PaymentCassandraElasticsearchRepository) GetClubPaymentById(ctx context.Context, requester *principal.Principal, paymentId string) (*payment.ClubPayment, error) {

	pay, err := r.getClubPaymentById(ctx, paymentId)

	if err != nil {
		return nil, err
	}

	if err := canViewSensitive(ctx, requester, pay.DestinationClubId()); err != nil {
		return nil, err
	}

	return pay, nil
}

func (r PaymentCassandraElasticsearchRepository) GetClubPaymentByIdOperator(ctx context.Context, paymentId string) (*payment.ClubPayment, error) {
	return r.getClubPaymentById(ctx, paymentId)
}

func (r PaymentCassandraElasticsearchRepository) GetClubPaymentByAccountTransactionId(ctx context.Context, accountTransactionId string) (*payment.ClubPayment, error) {

	var clubPay clubPayment

	if err := r.session.
		Query(clubPaymentsByTransactionTable.Get()).
		WithContext(ctx).
		BindStruct(clubPayment{AccountTransactionId: accountTransactionId}).
		GetRelease(&clubPay); err != nil {
		return nil, errors.Wrap(err, "failed to get club payment by transaction id")
	}

	return r.getClubPaymentById(ctx, clubPay.Id)
}

func (r PaymentCassandraElasticsearchRepository) UpdateClubPaymentsCompleted(ctx context.Context, paymentIds []string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	// batch update all payments
	for _, id := range paymentIds {
		stmt, _ := clubPaymentsTable.Update("status")
		batch.Query(stmt,
			payment.Complete.String(),
			id,
		)
	}

	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(err, "failed to update club payments completed")
	}

	if err := r.updateIndexClubPaymentsCompleted(ctx, paymentIds); err != nil {
		return err
	}

	return nil
}

func (r PaymentCassandraElasticsearchRepository) RemoveClubPaymentsFromClubReadyList(ctx context.Context, clubId string, paymentIds []string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	// batch update all payments
	for _, id := range paymentIds {
		stmt, _ := clubReadyPaymentsTable.Delete()
		batch.Query(stmt,
			clubId,
			id,
		)
	}

	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(err, "failed to remove club payments from ready list")
	}

	return nil
}

func (r PaymentCassandraElasticsearchRepository) updateClubPayment(ctx context.Context, paymentId string, updateFn func(pay *payment.ClubPayment) error, columns []string) (*payment.ClubPayment, error) {
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
		WithContext(ctx).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(err, "failed to update club payment status")
	}

	if err := r.indexClubPayment(ctx, pay); err != nil {
		return nil, err
	}

	return pay, nil
}

func (r PaymentCassandraElasticsearchRepository) UpdateClubPaymentStatus(ctx context.Context, paymentId string, updateFn func(pay *payment.ClubPayment) error) (*payment.ClubPayment, error) {
	return r.updateClubPayment(ctx, paymentId, updateFn, []string{"status"})
}

func (r PaymentCassandraElasticsearchRepository) AddClubPaymentToClubReadyList(ctx context.Context, payment *payment.ClubPayment) error {

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
		return errors.Wrap(err, "failed to add club payment to club ready list")
	}

	return nil
}

func (r PaymentCassandraElasticsearchRepository) ScanClubReadyPaymentsList(ctx context.Context, clubId string, scanFn func(paymentId string, amount uint64, isDeduction bool, currency money.Currency)) error {

	var page []byte

	itr := r.session.
		Query(clubReadyPaymentsTable.Select()).
		WithContext(ctx).
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
		return errors.Wrap(err, "failed to ScanClubReadyPaymentsList")
	}

	return nil
}

func (r PaymentCassandraElasticsearchRepository) AddClubPaymentsToPayout(ctx context.Context, payoutId string, paymentIds []string) error {

	chunkSize := 100

	var chunks [][]string
	for i := 0; i < len(paymentIds); i += chunkSize {
		end := i + chunkSize

		// necessary check to avoid slicing beyond
		// slice capacity
		if end > len(paymentIds) {
			end = len(paymentIds)
		}

		chunks = append(chunks, paymentIds[i:end])
	}

	for _, chunk := range chunks {

		batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

		stmt, _ := clubPaymentsByPayoutTable.Insert()

		for _, id := range chunk {
			batch.Query(stmt,
				payoutId,
				id,
			)

			stmt, _ := clubPaymentsTable.UpdateBuilder().AddLit("club_payout_ids", `{'`+payoutId+`'}`).ToCql()
			batch.Query(stmt, id)
		}

		if err := r.session.ExecuteBatch(batch); err != nil {
			return errors.Wrap(err, "failed to append new club payment to payout")
		}

		// update our index to reflect changes
		if err := r.updateIndexPaymentPayoutId(ctx, payoutId, chunk); err != nil {
			return err
		}
	}

	return nil
}

func (r PaymentCassandraElasticsearchRepository) ScanClubPaymentsListForPayout(ctx context.Context, payoutId string, scanFn func(paymentIds []string) error) error {

	var page []byte

	itr := r.session.
		Query(clubPaymentsByPayoutTable.Select()).
		WithContext(ctx).
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
		return errors.Wrap(err, "failed to ScanClubPaymentsListForPayout")
	}

	if err := scanFn(ids); err != nil {
		return err
	}

	return nil
}

func (r PaymentCassandraElasticsearchRepository) UpdateClubPlatformFee(ctx context.Context, requester *principal.Principal, clubId string, updateFn func(fee *payment.ClubPlatformFee) error) (*payment.ClubPlatformFee, error) {

	pay, err := r.GetPlatformFeeForClub(ctx, requester, clubId)

	if err != nil {
		return nil, err
	}

	if err = updateFn(pay); err != nil {
		return nil, err
	}

	if err := r.session.
		Query(clubPlatformFeeTable.Insert()).
		WithContext(ctx).
		BindStruct(&clubPlatformFee{
			ClubId:  pay.ClubId(),
			Percent: pay.Percent(),
		}).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(err, "failed to update club platform fee")
	}

	return pay, nil
}

func (r PaymentCassandraElasticsearchRepository) getPlatformFeeForClub(ctx context.Context, clubId string) (*payment.ClubPlatformFee, error) {

	var platformFee clubPlatformFee

	if err := r.session.
		Query(clubPlatformFeeTable.Get()).
		WithContext(ctx).
		BindStruct(clubPlatformFee{ClubId: clubId}).
		GetRelease(&platformFee); err != nil {

		if err == gocql.ErrNotFound {
			return payment.NewDefaultPlatformFee(clubId)
		}

		return nil, errors.Wrap(err, "failed to get platform fee for club")
	}

	return payment.UnmarshalClubPlatformFeeFromDatabase(platformFee.ClubId, platformFee.Percent), nil
}

func (r PaymentCassandraElasticsearchRepository) GetPlatformFeeForClubOperator(ctx context.Context, clubId string) (*payment.ClubPlatformFee, error) {
	return r.getPlatformFeeForClub(ctx, clubId)
}

func (r PaymentCassandraElasticsearchRepository) GetPlatformFeeForClub(ctx context.Context, requester *principal.Principal, clubId string) (*payment.ClubPlatformFee, error) {

	fee, err := r.getPlatformFeeForClub(ctx, clubId)

	if err != nil {
		return nil, err
	}

	if err := canViewSensitive(ctx, requester, clubId); err != nil {
		return nil, err
	}

	return fee, nil
}
