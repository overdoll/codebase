package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/domain/payout"
	"overdoll/libraries/bucket"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
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
		"payout_account_id",
		"deposit_request_id",
		"timestamp",
		"events",
		"temporal_workflow_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type clubPayoutEvent struct {
	Id        string
	Timestamp time.Time
	Error     string
}

type clubPayout struct {
	Id                 string    `db:"id"`
	Status             string    `db:"status"`
	DepositDate        time.Time `db:"deposit_date"`
	ClubId             string    `db:"club_id"`
	Currency           string    `db:"currency"`
	Amount             int64     `db:"amount"`
	PayoutAccountId    string    `db:"payout_account_id"`
	DepositRequestId   string    `db:"deposit_request_id"`
	Timestamp          time.Time `db:"timestamp"`
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
	"timestamp",
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

type depositRequests struct {
	Bucket             int        `db:"bucket"`
	Id                 string     `db:"id"`
	LastDateForDeposit time.Time  `db:"last_date_for_deposit"`
	BaseAmount         int64      `db:"base_amount"`
	EstimatedFeeAmount int64      `db:"estimated_fee_amount"`
	TotalAmount        int64      `db:"total_amount"`
	Currency           string     `db:"currency"`
	PayoutMethod       string     `db:"payout_method"`
	PayoutIds          []string   `db:"payout_ids"`
	Timestamp          time.Time  `db:"timestamp"`
	LastInsertId       gocql.UUID `db:"last_insert_id"`
}

type PayoutCassandraRepository struct {
	session gocqlx.Session
	stella  query.StellaService
}

func NewPayoutCassandraRepository(session gocqlx.Session) PayoutCassandraRepository {
	return PayoutCassandraRepository{session: session}
}

func marshalClubPayoutToDatabase(ctx context.Context, pay *payout.ClubPayout) (*clubPayout, error) {
	var events []string

	for _, e := range pay.Events() {

		data, err := json.Marshal(clubPayoutEvent{
			Id:        e.Id(),
			Timestamp: e.Timestamp(),
			Error:     e.Error(),
		})

		if err != nil {
			return nil, err
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
		PayoutAccountId:    pay.PayoutAccountId(),
		DepositRequestId:   pay.DepositRequestId(),
		Timestamp:          pay.Timestamp(),
		Events:             events,
		TemporalWorkflowId: pay.TemporalWorkflowId(),
	}, nil
}

func (r PayoutCassandraRepository) UpdateAccountPayoutMethod(ctx context.Context, pay *payout.AccountPayoutMethod) error {

	if err := r.session.Query(accountPayoutMethodTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountPayoutMethod{
			AccountId:  pay.AccountId(),
			Method:     pay.Method().String(),
			PaxumEmail: pay.PaxumEmail(),
		}).
		ExecRelease(); err != nil {

		return fmt.Errorf("failed to update account payout method: %v", err)
	}

	return nil
}

func (r PayoutCassandraRepository) DeleteAccountPayoutMethod(ctx context.Context, requester *principal.Principal, pay *payout.AccountPayoutMethod) error {

	if err := pay.CanDelete(requester); err != nil {
		return err
	}

	if err := r.session.Query(accountPayoutMethodTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountPayoutMethod{
			AccountId: pay.AccountId(),
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete account payout method: %v", err)
	}

	return nil
}

func (r PayoutCassandraRepository) GetAccountPayoutMethodById(ctx context.Context, requester *principal.Principal, accountId string) (*payout.AccountPayoutMethod, error) {

	pay, err := r.GetAccountPayoutMethodByIdOperator(ctx, accountId)

	if err != nil {
		return nil, err
	}

	if err := pay.CanView(requester); err != nil {
		return nil, err
	}

	return pay, nil
}

func (r PayoutCassandraRepository) GetAccountPayoutMethodByIdOperator(ctx context.Context, accountId string) (*payout.AccountPayoutMethod, error) {

	var accountPayout accountPayoutMethod

	if err := r.session.Query(accountPayoutMethodTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountPayoutMethod{
			AccountId: accountId,
		}).
		Get(&accountPayout); err != nil {

		if err == gocql.ErrNotFound {
			return nil, payout.ErrAccountPayoutMethodNotFound
		}

		return nil, fmt.Errorf("failed to get account payout method by id: %v", err)
	}

	return payout.UnmarshalAccountPayoutMethodFromDatabase(accountPayout.AccountId, accountPayout.Method, accountPayout.PaxumEmail), nil
}

func (r PayoutCassandraRepository) CreateClubPayout(ctx context.Context, payout *payout.ClubPayout) error {

	var lockedPay clubLockedPayout

	err := r.session.Query(clubLockedPayoutTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubLockedPayout{ClubId: payout.ClubId()}).
		Get(&lockedPay)

	if err != nil && err != gocql.ErrNotFound {
		return fmt.Errorf("failed to get club locked payout: %v", err)
	}

	if err == nil {
		if lockedPay.PayoutId != payout.Id() {
			return errors.New("payout locked - must first wait for current to complete")
		}
	}

	// no locked payout, do an insert
	applied, err := clubLockedPayoutTable.InsertBuilder().
		Unique().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubLockedPayout{ClubId: payout.ClubId(), PayoutId: payout.Id()}).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to lock club payout: %v", err)
	}

	if !applied {
		return fmt.Errorf("failed to lock club payout")
	}

	marshalled, err := marshalClubPayoutToDatabase(ctx, payout)

	if err != nil {
		return err
	}

	if err := r.session.Query(clubPayoutsTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalled).
		ExecRelease(); err != nil {

		return fmt.Errorf("failed to insert club payout: %v", err)
	}

	return nil
}

func (r PayoutCassandraRepository) GetClubPayoutById(ctx context.Context, requester *principal.Principal, payoutId string) (*payout.ClubPayout, error) {

	pay, err := r.GetClubPayoutByIdOperator(ctx, payoutId)

	if err != nil {
		return nil, err
	}

	if err := canViewSensitive(ctx, requester, pay.ClubId()); err != nil {
		return nil, err
	}

	return pay, nil
}

func (r PayoutCassandraRepository) GetClubPayoutByIdOperator(ctx context.Context, payoutId string) (*payout.ClubPayout, error) {

	var clubPay clubPayout

	if err := r.session.Query(clubPayoutsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubPayout{
			Id: payoutId,
		}).
		Get(&clubPay); err != nil {
		if err == gocql.ErrNotFound {
			return nil, payout.ErrClubPayoutNotFound
		}

		return nil, fmt.Errorf("failed to get club payout by id: %v", err)
	}

	var events []*payout.ClubPayoutEvent

	for _, event := range clubPay.Events {
		var unmarshal clubPayoutEvent

		if err := json.Unmarshal([]byte(event), &unmarshal); err != nil {
			return nil, err
		}

		events = append(events, payout.UnmarshalClubPayoutEventFromDatabase(
			unmarshal.Id,
			unmarshal.Timestamp,
			unmarshal.Error,
		))
	}

	return payout.UnmarshalClubPayoutFromDatabase(
		clubPay.Id,
		clubPay.Status,
		clubPay.ClubId,
		clubPay.Currency,
		clubPay.Amount,
		clubPay.DepositDate,
		clubPay.PayoutAccountId,
		clubPay.DepositRequestId,
		clubPay.Timestamp,
		events,
		clubPay.TemporalWorkflowId,
	), nil
}

func (r PayoutCassandraRepository) updateClubPayout(ctx context.Context, payoutId string, updateFn func(pay *payout.ClubPayout) error, columns []string) (*payout.ClubPayout, error) {

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
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update club payout: %v", err)
	}

	return pay, nil
}

func (r PayoutCassandraRepository) UpdateClubPayoutStatus(ctx context.Context, payoutId string, updateFn func(pay *payout.ClubPayout) error) (*payout.ClubPayout, error) {
	pay, err := r.updateClubPayout(ctx, payoutId, updateFn, []string{"status", "temporal_workflow_id"})

	if err != nil {
		return nil, err
	}

	// release lock if the final status is one of these
	if pay.Status() == payout.Cancelled || pay.Status() == payout.Deposited || pay.Status() == payout.Failed {
		if err := r.session.Query(clubLockedPayoutTable.Delete()).
			Consistency(gocql.LocalQuorum).
			BindStruct(clubLockedPayout{ClubId: pay.ClubId()}).
			ExecRelease(); err != nil {
			return nil, fmt.Errorf("failed to release payout lock: %v", err)
		}
	}

	return pay, nil
}

func (r PayoutCassandraRepository) UpdateClubPayoutDepositDate(ctx context.Context, payoutId string, updateFn func(pay *payout.ClubPayout) error) (*payout.ClubPayout, error) {
	return r.updateClubPayout(ctx, payoutId, updateFn, []string{"deposit_date"})
}

func (r PayoutCassandraRepository) UpdateClubPayoutEvents(ctx context.Context, payoutId string, updateFn func(pay *payout.ClubPayout) error) (*payout.ClubPayout, error) {
	return r.updateClubPayout(ctx, payoutId, updateFn, []string{"events"})
}

func (r PayoutCassandraRepository) CanInitiateClubPayout(ctx context.Context, requester *principal.Principal, clubId string) error {

	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	var lock clubLockedPayout

	if err := r.session.Query(clubLockedPayoutTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubLockedPayout{ClubId: clubId}).
		Get(&lock); err != nil {
		// can initiate - no lock found
		if err == gocql.ErrNotFound {
			return nil
		}

		return fmt.Errorf("failed to get payout lock: %v", err)
	}

	return errors.New("payout is locked - an existing payout is already pending")
}

func (r PayoutCassandraRepository) CreateDepositRequest(ctx context.Context, deposit *payout.DepositRequest) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

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
		Timestamp:          deposit.Timestamp(),
		LastInsertId:       gocql.UUIDFromTime(deposit.Timestamp()),
	}

	stmt, _ := depositRequestsTable.Insert()

	batch.Query(stmt,
		marshalled.Bucket,
		marshalled.Id,
		marshalled.LastDateForDeposit,
		marshalled.BaseAmount,
		marshalled.EstimatedFeeAmount,
		marshalled.TotalAmount,
		marshalled.Currency,
		marshalled.PayoutMethod,
		marshalled.PayoutIds,
		marshalled.Timestamp,
		marshalled.LastInsertId,
	)

	stmt, _ = depositRequestsByMonthTable.Insert()

	batch.Query(stmt,
		marshalled.Bucket,
		marshalled.Id,
		marshalled.LastDateForDeposit,
		marshalled.BaseAmount,
		marshalled.EstimatedFeeAmount,
		marshalled.TotalAmount,
		marshalled.Currency,
		marshalled.PayoutMethod,
		marshalled.PayoutIds,
		marshalled.Timestamp,
		marshalled.LastInsertId,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create new deposit request: %v", err)
	}

	return nil
}

func (r PayoutCassandraRepository) getDepositRequestById(ctx context.Context, id string) (*depositRequests, error) {

	var deposit depositRequests

	if err := r.session.Query(depositRequestsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(depositRequests{Id: id}).
		Get(&deposit); err != nil {
		if err == gocql.ErrNotFound {
			return nil, payout.ErrDepositRequestNotFound
		}

		return nil, fmt.Errorf("failed to get deposit request by id: %v", err)
	}

	return &deposit, nil
}

func (r PayoutCassandraRepository) GetDepositRequestByIdOperator(ctx context.Context, id string) (*payout.DepositRequest, error) {
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
		deposit.Timestamp,
	), nil
}

func (r PayoutCassandraRepository) GetDepositRequestById(ctx context.Context, requester *principal.Principal, id string) (*payout.DepositRequest, error) {

	deposit, err := r.GetDepositRequestByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	if err := deposit.CanView(requester); err != nil {
		return nil, err
	}

	return deposit, nil
}

func (r PayoutCassandraRepository) GetDepositRequests(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*payout.DepositRequest, error) {

	if err := payout.CanViewDepositRequests(requester); err != nil {
		return nil, err
	}

	var depositResults []*payout.DepositRequest

	startingBucket := bucket.MakeMonthlyBucketFromTimestamp(time.Now())
	endingBucket := 0

	for bucketId := startingBucket; bucketId >= endingBucket; bucketId-- {

		info := map[string]interface{}{
			"bucket": bucketId,
		}

		if cursor != nil {
			createdCursor, err := cursor.GetCursor()

			if err != nil {
				return nil, err
			}

			if createdCursor != nil {
				info["id"] = createdCursor[0].(string)
			}
		}

		builder := depositRequestsByMonthTable.SelectBuilder()

		if err := cursor.BuildCassandra(builder, "id", false); err != nil {
			return nil, err
		}

		var results []*depositRequests

		if err := r.session.
			Query(builder.ToCql()).
			BindMap(info).
			Select(&results); err != nil {
			return nil, fmt.Errorf("failed to search deposit requests %v", err)
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
				request.Timestamp,
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

func (r PayoutCassandraRepository) GetDepositRequestsForMonth(ctx context.Context, time time.Time) ([]*payout.DepositRequest, error) {

	var depositResults []*payout.DepositRequest

	var results []*depositRequests

	if err := r.session.
		Query(depositRequestsByMonthTable.Select()).
		BindStruct(&depositRequests{Bucket: bucket.MakeMonthlyBucketFromTimestamp(time)}).
		Select(&results); err != nil {
		return nil, fmt.Errorf("failed to search deposit requests %v", err)
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
			request.Timestamp,
		)

		result.Node = paging.NewNode(request.Id)
		depositResults = append(depositResults, result)
	}

	return depositResults, nil
}

func (r PayoutCassandraRepository) UpdateDepositRequestAmount(ctx context.Context, depositRequestId string, updateFn func(pay *payout.DepositRequest) error) (*payout.DepositRequest, error) {

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
		deposit.Timestamp,
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
		BindStruct(marshalled).
		SerialConsistency(gocql.Serial).
		ExecCAS()

	if err != nil {
		return nil, fmt.Errorf("failed to update deposit request: %v", err)
	}

	if !applied {
		return nil, fmt.Errorf("failed to update deposit request")
	}

	applied, err = depositRequestsByMonthTable.UpdateBuilder(columns...).
		If(qb.EqLit("last_insert_id", deposit.LastInsertId.String())).
		Query(r.session).
		BindStruct(marshalled).
		SerialConsistency(gocql.Serial).
		ExecCAS()

	if err != nil {
		return nil, fmt.Errorf("failed to update deposit request by month: %v", err)
	}

	if !applied {
		return nil, fmt.Errorf("failed to update deposit request by month")
	}

	return depositRequest, nil
}
