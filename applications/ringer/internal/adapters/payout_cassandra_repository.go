package adapters

import (
	"context"
	"encoding/json"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/bucket"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"time"
)

var accountPayoutMethodTable = table.New(table.Metadata{
	Name: "account_payout_method",
	Columns: []string{
		"account_id",
		"method",
		"paxum_email",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{},
})

type accountPayoutMethod struct {
	AccountId  string  `db:"account_id"`
	Method     string  `db:"method"`
	PaxumEmail *string `db:"paxum_email"`
}

var clubPayoutsTable = table.New(table.Metadata{
	Name: "club_payouts",
	Columns: []string{
		"id",
		"status",
		"deposit_date",
		"club_id",
		"currency",
		"amount",
		"cover_fee_amount",
		"total_amount",
		"payout_account_id",
		"deposit_request_id",
		"created_at",
		"events",
		"temporal_workflow_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type clubPayoutEvent struct {
	Id        string
	CreatedAt time.Time
	Error     string
}

type clubPayout struct {
	Id                 string    `db:"id"`
	Status             string    `db:"status"`
	DepositDate        time.Time `db:"deposit_date"`
	ClubId             string    `db:"club_id"`
	Currency           string    `db:"currency"`
	Amount             uint64    `db:"amount"`
	CoverFeeAmount     uint64    `db:"cover_fee_amount"`
	TotalAmount        uint64    `db:"total_amount"`
	PayoutAccountId    string    `db:"payout_account_id"`
	DepositRequestId   string    `db:"deposit_request_id"`
	CreatedAt          time.Time `db:"created_at"`
	Events             []string  `db:"events"`
	TemporalWorkflowId string    `db:"temporal_workflow_id"`
}

var clubLockedPayoutTable = table.New(table.Metadata{
	Name: "club_locked_payout",
	Columns: []string{
		"club_id",
		"payout_id",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{},
})

type clubLockedPayout struct {
	ClubId   string `db:"club_id"`
	PayoutId string `db:"payout_id"`
}

var depositRequestsColumns = []string{
	"bucket",
	"id",
	"last_date_for_deposit",
	"base_amount",
	"estimated_fee_amount",
	"total_amount",
	"currency",
	"payout_method",
	"payout_ids",
	"created_at",
	"last_insert_id",
}

var depositRequestsTable = table.New(table.Metadata{
	Name:    "deposit_requests",
	Columns: depositRequestsColumns,
	PartKey: []string{"id"},
	SortKey: []string{},
})

var depositRequestsByMonthTable = table.New(table.Metadata{
	Name:    "deposit_requests_by_month",
	Columns: depositRequestsColumns,
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

var depositRequestsUniqueInsertsTable = table.New(table.Metadata{
	Name: "deposit_requests_unique_inserts",
	Columns: []string{
		"bucket",
		"payout_method",
	},
	PartKey: []string{"bucket", "payout_method"},
	SortKey: []string{},
})

var depositRequestsByMonthBucketsTable = table.New(table.Metadata{
	Name: "deposit_requests_by_month_buckets",
	Columns: []string{
		"init",
		"bucket",
	},
	PartKey: []string{"init"},
	SortKey: []string{"bucket"},
})

type depositRequestsBuckets struct {
	Init   int `db:"init"`
	Bucket int `db:"bucket"`
}

type depositRequests struct {
	Bucket             int        `db:"bucket"`
	Id                 string     `db:"id"`
	LastDateForDeposit time.Time  `db:"last_date_for_deposit"`
	BaseAmount         uint64     `db:"base_amount"`
	EstimatedFeeAmount uint64     `db:"estimated_fee_amount"`
	TotalAmount        uint64     `db:"total_amount"`
	Currency           string     `db:"currency"`
	PayoutMethod       string     `db:"payout_method"`
	PayoutIds          []string   `db:"payout_ids"`
	CreatedAt          time.Time  `db:"created_at"`
	LastInsertId       gocql.UUID `db:"last_insert_id"`
}

type PayoutCassandraElasticsearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

func NewPayoutCassandraElasticsearchRepository(session gocqlx.Session, client *elastic.Client) PayoutCassandraElasticsearchRepository {
	return PayoutCassandraElasticsearchRepository{session: session, client: client}
}

func marshalClubPayoutToDatabase(ctx context.Context, pay *payout.ClubPayout) (*clubPayout, error) {
	var events []string

	for _, e := range pay.Events() {

		data, err := json.Marshal(clubPayoutEvent{
			Id:        e.Id(),
			CreatedAt: e.CreatedAt(),
			Error:     e.Error(),
		})

		if err != nil {
			return nil, errors.Wrap(err, "failed to marshal club payout event")
		}

		events = append(events, string(data))
	}

	return &clubPayout{
		Id:                 pay.Id(),
		Status:             pay.Status().String(),
		DepositDate:        pay.DepositDate(),
		ClubId:             pay.ClubId(),
		Currency:           pay.Currency().String(),
		Amount:             pay.Amount(),
		CoverFeeAmount:     pay.CoverFeeAmount(),
		TotalAmount:        pay.TotalAmount(),
		PayoutAccountId:    pay.PayoutAccountId(),
		DepositRequestId:   pay.DepositRequestId(),
		CreatedAt:          pay.CreatedAt(),
		Events:             events,
		TemporalWorkflowId: pay.TemporalWorkflowId(),
	}, nil
}

func (r PayoutCassandraElasticsearchRepository) UpdateAccountPayoutMethod(ctx context.Context, pay *payout.AccountPayoutMethod) error {

	if err := r.session.Query(accountPayoutMethodTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountPayoutMethod{
			AccountId:  pay.AccountId(),
			Method:     pay.Method().String(),
			PaxumEmail: pay.PaxumEmail(),
		}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to update account payout method")
	}

	return nil
}

func (r PayoutCassandraElasticsearchRepository) DeleteAccountPayoutMethodOperator(ctx context.Context, accountId string) error {
	return r.deleteAccountPayoutMethod(ctx, accountId)
}

func (r PayoutCassandraElasticsearchRepository) deleteAccountPayoutMethod(ctx context.Context, payoutMethodId string) error {

	if err := r.session.Query(accountPayoutMethodTable.Delete()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountPayoutMethod{
			AccountId: payoutMethodId,
		}).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete account payout method")
	}

	return nil
}

func (r PayoutCassandraElasticsearchRepository) DeleteAccountPayoutMethod(ctx context.Context, requester *principal.Principal, pay *payout.AccountPayoutMethod) error {

	if err := pay.CanDelete(requester); err != nil {
		return err
	}

	return r.deleteAccountPayoutMethod(ctx, pay.AccountId())
}

func (r PayoutCassandraElasticsearchRepository) GetAccountPayoutMethodById(ctx context.Context, requester *principal.Principal, accountId string) (*payout.AccountPayoutMethod, error) {

	pay, err := r.GetAccountPayoutMethodByIdOperator(ctx, accountId)

	if err != nil {
		return nil, err
	}

	if err := pay.CanView(requester); err != nil {
		return nil, err
	}

	return pay, nil
}

func (r PayoutCassandraElasticsearchRepository) GetAccountPayoutMethodByIdOperator(ctx context.Context, accountId string) (*payout.AccountPayoutMethod, error) {

	var accountPayout accountPayoutMethod

	if err := r.session.Query(accountPayoutMethodTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountPayoutMethod{
			AccountId: accountId,
		}).
		GetRelease(&accountPayout); err != nil {

		if err == gocql.ErrNotFound {
			return nil, payout.ErrAccountPayoutMethodNotFound
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get account payout method by id")
	}

	return payout.UnmarshalAccountPayoutMethodFromDatabase(accountPayout.AccountId, accountPayout.Method, accountPayout.PaxumEmail), nil
}

func (r PayoutCassandraElasticsearchRepository) CreateClubPayout(ctx context.Context, payout *payout.ClubPayout) error {

	var lockedPay clubLockedPayout

	err := r.session.Query(clubLockedPayoutTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubLockedPayout{ClubId: payout.ClubId()}).
		GetRelease(&lockedPay)

	if err != nil && err != gocql.ErrNotFound {
		return errors.Wrap(support.NewGocqlError(err), "failed to get club locked payout")
	}

	if err == nil {
		if lockedPay.PayoutId != payout.Id() {
			return errors.New("payout locked - must first wait for current to complete")
		}
	}

	if err == gocql.ErrNotFound {
		// no locked payout, do an insert
		applied, err := clubLockedPayoutTable.InsertBuilder().
			Unique().
			Query(r.session).
			WithContext(ctx).
			Consistency(gocql.LocalQuorum).
			BindStruct(clubLockedPayout{ClubId: payout.ClubId(), PayoutId: payout.Id()}).
			ExecCASRelease()

		if err != nil {
			return errors.Wrap(support.NewGocqlError(err), "failed to lock club payout")
		}

		if !applied {
			return errors.Wrap(support.NewGocqlTransactionError(), "failed to lock club payout")
		}
	}

	marshalled, err := marshalClubPayoutToDatabase(ctx, payout)

	if err != nil {
		return err
	}

	if err := r.session.Query(clubPayoutsTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalled).
		ExecRelease(); err != nil {

		return errors.Wrap(support.NewGocqlError(err), "failed to insert club payout")
	}

	if err := r.indexClubPayout(ctx, payout); err != nil {
		return err
	}

	return nil
}

func (r PayoutCassandraElasticsearchRepository) GetClubPayoutById(ctx context.Context, requester *principal.Principal, payoutId string) (*payout.ClubPayout, error) {

	pay, err := r.GetClubPayoutByIdOperator(ctx, payoutId)

	if err != nil {
		return nil, err
	}

	if err := canViewSensitive(ctx, requester, pay.ClubId()); err != nil {
		return nil, err
	}

	return pay, nil
}

func (r PayoutCassandraElasticsearchRepository) GetClubPayoutByIdOperator(ctx context.Context, payoutId string) (*payout.ClubPayout, error) {

	var clubPay clubPayout

	if err := r.session.Query(clubPayoutsTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubPayout{
			Id: payoutId,
		}).
		GetRelease(&clubPay); err != nil {
		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("club payout", payoutId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get club payout by id")
	}

	var events []*payout.ClubPayoutEvent

	for _, event := range clubPay.Events {
		var unmarshal clubPayoutEvent

		if err := json.Unmarshal([]byte(event), &unmarshal); err != nil {
			return nil, errors.Wrap(err, "failed to unmarshal club payout event")
		}

		events = append(events, payout.UnmarshalClubPayoutEventFromDatabase(
			unmarshal.Id,
			unmarshal.CreatedAt,
			unmarshal.Error,
		))
	}

	return payout.UnmarshalClubPayoutFromDatabase(
		clubPay.Id,
		clubPay.Status,
		clubPay.ClubId,
		clubPay.Currency,
		clubPay.Amount,
		clubPay.CoverFeeAmount,
		clubPay.TotalAmount,
		clubPay.DepositDate,
		clubPay.PayoutAccountId,
		clubPay.DepositRequestId,
		clubPay.CreatedAt,
		events,
		clubPay.TemporalWorkflowId,
	), nil
}

func (r PayoutCassandraElasticsearchRepository) updateClubPayout(ctx context.Context, payoutId string, updateFn func(pay *payout.ClubPayout) error, columns []string) (*payout.ClubPayout, error) {

	pay, err := r.GetClubPayoutByIdOperator(ctx, payoutId)

	if err != nil {
		return nil, err
	}

	if err = updateFn(pay); err != nil {
		return nil, err
	}

	marshalled, err := marshalClubPayoutToDatabase(ctx, pay)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(clubPayoutsTable.Update(columns...)).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update club payout")
	}

	if err := r.indexClubPayout(ctx, pay); err != nil {
		return nil, err
	}

	return pay, nil
}

func (r PayoutCassandraElasticsearchRepository) UpdateClubPayoutStatus(ctx context.Context, payoutId string, updateFn func(pay *payout.ClubPayout) error) (*payout.ClubPayout, error) {
	pay, err := r.updateClubPayout(ctx, payoutId, updateFn, []string{"status", "temporal_workflow_id"})

	if err != nil {
		return nil, err
	}

	// release lock if the final status is one of these
	if pay.Status() == payout.Cancelled || pay.Status() == payout.Deposited || pay.Status() == payout.Failed {
		if err := r.session.Query(clubLockedPayoutTable.Delete()).
			WithContext(ctx).
			Idempotent(true).
			Consistency(gocql.LocalQuorum).
			BindStruct(clubLockedPayout{ClubId: pay.ClubId()}).
			ExecRelease(); err != nil {
			return nil, errors.Wrap(support.NewGocqlError(err), "failed to release payout lock")
		}
	}

	return pay, nil
}

func (r PayoutCassandraElasticsearchRepository) UpdateClubPayoutDepositDate(ctx context.Context, payoutId string, updateFn func(pay *payout.ClubPayout) error) (*payout.ClubPayout, error) {
	return r.updateClubPayout(ctx, payoutId, updateFn, []string{"deposit_date"})
}

func (r PayoutCassandraElasticsearchRepository) UpdateClubPayoutEvents(ctx context.Context, payoutId string, updateFn func(pay *payout.ClubPayout) error) (*payout.ClubPayout, error) {
	return r.updateClubPayout(ctx, payoutId, updateFn, []string{"events"})
}

func (r PayoutCassandraElasticsearchRepository) CanInitiateClubPayout(ctx context.Context, requester *principal.Principal, clubId string) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	var lock clubLockedPayout

	if err := r.session.Query(clubLockedPayoutTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubLockedPayout{ClubId: clubId}).
		GetRelease(&lock); err != nil {
		// can initiate - no lock found
		if err == gocql.ErrNotFound {
			return nil
		}

		return errors.Wrap(support.NewGocqlError(err), "failed to get payout lock")
	}

	return domainerror.NewValidation("payout is locked - an existing payout is already pending")
}

func (r PayoutCassandraElasticsearchRepository) CreateDepositRequest(ctx context.Context, deposit *payout.DepositRequest) error {

	marshalled := depositRequests{
		Bucket:             bucket.MakeMonthlyBucketFromTimestamp(deposit.Timestamp()),
		Id:                 deposit.Id(),
		LastDateForDeposit: deposit.LastDateForDeposit(),
		BaseAmount:         deposit.BaseAmount(),
		EstimatedFeeAmount: deposit.EstimatedFeeAmount(),
		TotalAmount:        deposit.TotalAmount(),
		Currency:           deposit.Currency().String(),
		PayoutMethod:       deposit.AccountPayoutMethodKind().String(),
		PayoutIds:          deposit.PayoutIds(),
		CreatedAt:          deposit.Timestamp(),
		LastInsertId:       gocql.UUIDFromTime(deposit.Timestamp()),
	}

	// make sure that the deposit request we create will be a unique one in terms of bucket + payout method
	applied, err := depositRequestsUniqueInsertsTable.InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalled).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique deposit request for month")
	}

	if !applied {
		return errors.Wrap(support.NewGocqlTransactionError(), "failed to create unique deposit request for month")
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, names := depositRequestsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalled,
	)

	stmt, names = depositRequestsByMonthTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		marshalled,
	)

	stmt, _ = depositRequestsByMonthBucketsTable.Insert()

	batch.Query(stmt,
		0,
		marshalled.Bucket,
	)

	support.MarkBatchIdempotent(batch)

	if err := r.session.ExecuteBatch(batch); err != nil {

		applied, newErr := depositRequestsUniqueInsertsTable.DeleteBuilder().
			Existing().
			Query(r.session).
			WithContext(ctx).
			Consistency(gocql.LocalQuorum).
			BindStruct(marshalled).
			ExecCASRelease()

		if newErr != nil {
			return errors.Wrap(support.NewGocqlError(newErr), "failed to delete unique deposit request for month")
		}

		if !applied {
			return errors.Wrap(support.NewGocqlTransactionError(), "failed to delete unique deposit request for month")
		}

		return errors.Wrap(err, "failed to create new deposit request")
	}

	return nil
}

func (r PayoutCassandraElasticsearchRepository) getDepositRequestById(ctx context.Context, id string) (*depositRequests, error) {

	var deposit depositRequests

	if err := r.session.Query(depositRequestsTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(depositRequests{Id: id}).
		GetRelease(&deposit); err != nil {
		if err == gocql.ErrNotFound {
			return nil, payout.ErrDepositRequestNotFound
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get deposit request by id")
	}

	return &deposit, nil
}

func (r PayoutCassandraElasticsearchRepository) getDepositRequestBuckets(ctx context.Context) ([]int, error) {

	var buckets []depositRequestsBuckets

	if err := r.session.Query(depositRequestsByMonthBucketsTable.Select()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(depositRequestsBuckets{
			Init: 0,
		}).
		SelectRelease(&buckets); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get deposit request buckets")
	}

	var final []int

	for _, b := range buckets {
		final = append(final, b.Bucket)
	}

	return final, nil
}

func (r PayoutCassandraElasticsearchRepository) GetDepositRequestByIdOperator(ctx context.Context, id string) (*payout.DepositRequest, error) {
	deposit, err := r.getDepositRequestById(ctx, id)

	if err != nil {
		return nil, err
	}

	return payout.UnmarshalDepositRequestFromDatabase(
		deposit.Id,
		deposit.LastDateForDeposit,
		deposit.BaseAmount,
		deposit.EstimatedFeeAmount,
		deposit.TotalAmount,
		deposit.PayoutIds,
		deposit.Currency,
		deposit.PayoutMethod,
		deposit.CreatedAt,
	), nil
}

func (r PayoutCassandraElasticsearchRepository) GetDepositRequestById(ctx context.Context, requester *principal.Principal, id string) (*payout.DepositRequest, error) {

	deposit, err := r.GetDepositRequestByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	if err := deposit.CanView(requester); err != nil {
		return nil, err
	}

	return deposit, nil
}

func (r PayoutCassandraElasticsearchRepository) GetDepositRequests(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*payout.DepositRequest, error) {

	if err := payout.CanViewDepositRequests(requester); err != nil {
		return nil, err
	}

	var depositResults []*payout.DepositRequest

	buckets, err := r.getDepositRequestBuckets(ctx)

	if err != nil {
		return nil, err
	}
	for _, bucketId := range buckets {

		info := map[string]interface{}{
			"bucket": bucketId,
		}

		builder := depositRequestsByMonthTable.SelectBuilder()

		if err := cursor.BuildCassandra(builder, "id", false); err != nil {
			return nil, err
		}

		var results []*depositRequests

		if err := r.session.
			Query(builder.ToCql()).
			WithContext(ctx).
			Idempotent(true).
			BindMap(info).
			SelectRelease(&results); err != nil {
			return nil, errors.Wrap(support.NewGocqlError(err), "failed to search deposit requests")
		}

		for _, request := range results {

			result := payout.UnmarshalDepositRequestFromDatabase(
				request.Id,
				request.LastDateForDeposit,
				request.BaseAmount,
				request.EstimatedFeeAmount,
				request.TotalAmount,
				request.PayoutIds,
				request.Currency,
				request.PayoutMethod,
				request.CreatedAt,
			)

			result.Node = paging.NewNode(request.Id)
			depositResults = append(depositResults, result)
		}

		if len(depositResults) >= cursor.GetLimit() {
			break
		}
	}

	return depositResults, nil
}

func (r PayoutCassandraElasticsearchRepository) GetDepositRequestsForMonth(ctx context.Context, time time.Time) ([]*payout.DepositRequest, error) {

	var depositResults []*payout.DepositRequest

	var results []*depositRequests

	if err := r.session.
		Query(depositRequestsByMonthTable.Select()).
		WithContext(ctx).
		Idempotent(true).
		BindStruct(&depositRequests{Bucket: bucket.MakeMonthlyBucketFromTimestamp(time)}).
		SelectRelease(&results); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to search deposit requests")
	}

	for _, request := range results {

		result := payout.UnmarshalDepositRequestFromDatabase(
			request.Id,
			request.LastDateForDeposit,
			request.BaseAmount,
			request.EstimatedFeeAmount,
			request.TotalAmount,
			request.PayoutIds,
			request.Currency,
			request.PayoutMethod,
			request.CreatedAt,
		)

		result.Node = paging.NewNode(request.Id)
		depositResults = append(depositResults, result)
	}

	return depositResults, nil
}

func (r PayoutCassandraElasticsearchRepository) UpdateDepositRequestAmount(ctx context.Context, depositRequestId string, updateFn func(pay *payout.DepositRequest) error) (*payout.DepositRequest, error) {

	deposit, err := r.getDepositRequestById(ctx, depositRequestId)

	if err != nil {
		return nil, err
	}

	depositRequest := payout.UnmarshalDepositRequestFromDatabase(
		deposit.Id,
		deposit.LastDateForDeposit,
		deposit.BaseAmount,
		deposit.EstimatedFeeAmount,
		deposit.TotalAmount,
		deposit.PayoutIds,
		deposit.Currency,
		deposit.PayoutMethod,
		deposit.CreatedAt,
	)

	if err = updateFn(depositRequest); err != nil {
		return nil, err
	}

	marshalled := depositRequests{
		Bucket:             deposit.Bucket,
		Id:                 deposit.Id,
		BaseAmount:         depositRequest.BaseAmount(),
		EstimatedFeeAmount: depositRequest.EstimatedFeeAmount(),
		TotalAmount:        depositRequest.TotalAmount(),
		PayoutIds:          depositRequest.PayoutIds(),
		LastInsertId:       gocql.TimeUUID(),
	}

	columns := []string{"last_insert_id", "payout_ids", "estimated_fee_amount", "total_amount", "base_amount"}

	applied, err := depositRequestsTable.UpdateBuilder(columns...).
		If(qb.EqLit("last_insert_id", deposit.LastInsertId.String())).
		Query(r.session).
		WithContext(ctx).
		BindStruct(marshalled).
		SerialConsistency(gocql.Serial).
		ExecCASRelease()

	if err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update deposit request")
	}

	if !applied {
		return nil, errors.Wrap(support.NewGocqlTransactionError(), "failed to update deposit request")
	}

	applied, err = depositRequestsByMonthTable.UpdateBuilder(columns...).
		If(qb.EqLit("last_insert_id", deposit.LastInsertId.String())).
		Query(r.session).
		WithContext(ctx).
		BindStruct(marshalled).
		SerialConsistency(gocql.Serial).
		ExecCASRelease()

	if err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update deposit request by month")
	}

	if !applied {
		return nil, errors.Wrap(support.NewGocqlTransactionError(), "failed to update deposit request by month")
	}

	return depositRequest, nil
}
