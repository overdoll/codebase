package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/hades/internal/domain/billing"
	bucket2 "overdoll/libraries/bucket"
	"overdoll/libraries/crypt"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/support"
	"time"
)

type paymentMethod struct {
	AddressLine1 string `json:"address_line_1"`
	City         string `json:"city"`
	State        string `json:"state"`
	Country      string `json:"country"`
	PostalCode   string `json:"postal_code"`

	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	PhoneNumber string `json:"phone_number"`
	Email       string `json:"email"`

	CardBin        string `json:"card_bin"`
	CardType       string `json:"card_type"`
	CardLast4      string `json:"card_last4"`
	CardExpiration string `json:"card_expiration"`
}

var accountSavedPaymentMethodTable = table.New(table.Metadata{
	Name: "account_saved_payment_methods",
	Columns: []string{
		"account_id",
		"id",

		"encrypted_payment_method",

		"currency",

		"ccbill_subscription_id",

		"updated_at",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"id"},
})

type accountSavedPaymentMethod struct {
	AccountId              string    `db:"account_id"`
	Id                     string    `db:"id"`
	EncryptedPaymentMethod string    `db:"encrypted_payment_method"`
	Currency               string    `db:"currency"`
	CCBillSubscriptionId   *string   `db:"ccbill_subscription_id"`
	UpdatedAt              time.Time `db:"updated_at"`
}

var accountActiveOrCancelledSupporterSubscriptionsTable = table.New(table.Metadata{
	Name: "acc_active_or_cancelled_supporter_subs",
	Columns: []string{
		"account_id",
		"club_id",
		"id",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"club_id", "id"},
})

var clubActiveSupporterSubscriptionsTable = table.New(table.Metadata{
	Name: "club_active_supporter_subscriptions",
	Columns: []string{
		"bucket",
		"club_id",
		"id",
		"ccbill_subscription_id",
	},
	PartKey: []string{"bucket", "club_id"},
	SortKey: []string{"id"},
})

var clubActiveSupporterSubscriptionsBucketsTable = table.New(table.Metadata{
	Name: "club_active_supporter_subscriptions_buckets",
	Columns: []string{
		"club_id",
		"bucket",
	},
	PartKey: []string{"club_id", "bucket"},
	SortKey: []string{},
})

type clubActiveSupporterSubscriptions struct {
	ClubId               string  `db:"club_id"`
	Id                   string  `db:"id"`
	Bucket               int     `db:"bucket"`
	CCBillSubscriptionId *string `db:"ccbill_subscription_id"`
}

var accountClubSupporterSubscriptionLockTable = table.New(table.Metadata{
	Name: "account_club_supporter_subscription_lock",
	Columns: []string{
		"account_id",
		"club_id",
		"ccbill_subscription_id",
		"account_club_supporter_subscription_id",
	},
	PartKey: []string{"account_id", "club_id"},
	SortKey: []string{},
})

type accountClubSupporterSubscriptionLock struct {
	ClubId                             string  `db:"club_id"`
	AccountId                          string  `db:"account_id"`
	CCBillSubscriptionId               *string `db:"ccbill_subscription_id"`
	AccountClubSupporterSubscriptionId string  `db:"account_club_supporter_subscription_id"`
}

var accountClubSupporterSubscriptionsTable = table.New(table.Metadata{
	Name: "account_club_supporter_subscriptions",
	Columns: []string{
		"id",
		"account_id",
		"club_id",
		"status",
		"supporter_since",
		"last_billing_date",
		"next_billing_date",
		"billing_amount",
		"billing_currency",

		"created_at",
		"cancelled_at",
		"expired_at",

		"failed_at",
		"ccbill_error_text",
		"ccbill_error_code",
		"billing_failure_next_retry_date",

		"encrypted_payment_method",

		"ccbill_subscription_id",

		"updated_at",

		"cancellation_reason_id",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type accountClubSupporterSubscription struct {
	AccountId       string    `db:"account_id"`
	ClubId          string    `db:"club_id"`
	Status          string    `db:"status"`
	SupporterSince  time.Time `db:"supporter_since"`
	LastBillingDate time.Time `db:"last_billing_date"`
	NextBillingDate time.Time `db:"next_billing_date"`
	BillingAmount   uint64    `db:"billing_amount"`
	BillingCurrency string    `db:"billing_currency"`

	CreatedAt   time.Time  `db:"created_at"`
	CancelledAt *time.Time `db:"cancelled_at"`
	ExpiredAt   *time.Time `db:"expired_at"`

	FailedAt                    *time.Time `db:"failed_at"`
	CCBillErrorText             *string    `db:"ccbill_error_text"`
	CCBillErrorCode             *string    `db:"ccbill_error_code"`
	BillingFailureNextRetryDate *time.Time `db:"billing_failure_next_retry_date"`

	Id                     string    `db:"id"`
	EncryptedPaymentMethod string    `db:"encrypted_payment_method"`
	CCBillSubscriptionId   *string   `db:"ccbill_subscription_id"`
	UpdatedAt              time.Time `db:"updated_at"`
	CancellationReasonId   *string   `db:"cancellation_reason_id"`
}

var expiredAccountClubSupporterSubscriptionsByAccountTable = table.New(table.Metadata{
	Name: "exp_account_club_supporter_subscriptions_by_acc",
	Columns: []string{
		"account_id",
		"club_id",
		"supporter_since",
		"expired_at",
		"cancelled_at",
		"ccbill_subscription_id",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"club_id"},
})

type expiredAccountClubSupporterSubscription struct {
	AccountId            string    `db:"account_id"`
	ClubId               string    `db:"club_id"`
	SupporterSince       time.Time `db:"supporter_since"`
	CancelledAt          time.Time `db:"cancelled_at"`
	ExpiredAt            time.Time `db:"expired_at"`
	CCBillSubscriptionId *string   `db:"ccbill_subscription_id"`
}

var accountTransactionByCcbillTransactionIdTable = table.New(table.Metadata{
	Name: "account_transaction_by_ccbill_transaction_id",
	Columns: []string{
		"ccbill_transaction_id",
		"id",
	},
	PartKey: []string{"ccbill_transaction_id"},
	SortKey: []string{},
})

var accountTransactionsTable = table.New(table.Metadata{
	Name: "account_transactions",
	Columns: []string{
		"id",
		"account_id",

		"created_at",

		"transaction_type",

		"club_supporter_subscription_id",

		"encrypted_payment_method",

		"amount",
		"currency",

		"voided_at",
		"void_reason",

		"billed_at_date",
		"next_billing_date",

		"ccbill_subscription_id",
		"ccbill_transaction_id",

		"events",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type accountTransactionEvent struct {
	Id        string
	CreatedAt time.Time
	Amount    uint64
	Currency  string
	Reason    string
}

type accountTransactions struct {
	AccountId string `db:"account_id"`
	Id        string `db:"id"`

	CreatedAt time.Time `db:"created_at"`

	TransactionType string `db:"transaction_type"`

	ClubSupporterSubscriptionId *string `db:"club_supporter_subscription_id"`
	EncryptedPaymentMethod      string  `db:"encrypted_payment_method"`

	Amount   uint64 `db:"amount"`
	Currency string `db:"currency"`

	VoidedAt   *time.Time `db:"voided_at"`
	VoidReason *string    `db:"void_reason"`

	BilledAtDate    time.Time `db:"billed_at_date"`
	NextBillingDate time.Time `db:"next_billing_date"`

	CCBillSubscriptionId *string `db:"ccbill_subscription_id"`
	CCBillTransactionId  *string `db:"ccbill_transaction_id"`

	Events []string `db:"events"`
}

var ccbillSubscriptionDetailsTable = table.New(table.Metadata{
	Name: "ccbill_subscription_details",
	Columns: []string{
		"ccbill_subscription_id",
		"supporting_club_id",
		"initiator_account_id",
		"encrypted_payment_method",
		"updated_at",

		"subscription_initial_price",
		"subscription_recurring_price",
		"subscription_currency",

		"billed_initial_price",
		"billed_recurring_price",
		"billed_currency",

		"accounting_initial_price",
		"accounting_recurring_price",
		"accounting_currency",

		"account_club_supporter_subscription_id",

		"duplicate",
	},
	PartKey: []string{"ccbill_subscription_id"},
	SortKey: []string{},
})

type ccbillSubscriptionDetails struct {
	CCBillSubscriptionId   string    `db:"ccbill_subscription_id"`
	InitiatorAccountId     string    `db:"initiator_account_id"`
	SupportingClubId       string    `db:"supporting_club_id"`
	EncryptedPaymentMethod string    `db:"encrypted_payment_method"`
	UpdatedAt              time.Time `db:"updated_at"`

	SubscriptionInitialPrice   uint64 `db:"subscription_initial_price"`
	SubscriptionRecurringPrice uint64 `db:"subscription_recurring_price"`
	SubscriptionCurrency       string `db:"subscription_currency"`

	BilledInitialPrice   uint64 `db:"billed_initial_price"`
	BilledRecurringPrice uint64 `db:"billed_recurring_price"`
	BilledCurrency       string `db:"billed_currency"`

	AccountingInitialPrice   uint64 `db:"accounting_initial_price"`
	AccountingRecurringPrice uint64 `db:"accounting_recurring_price"`
	AccountingCurrency       string `db:"accounting_currency"`

	AccountClubSupporterSubscriptionId string `db:"account_club_supporter_subscription_id"`
	Duplicate                          bool   `db:"duplicate"`
}

func encryptPaymentMethod(payM *billing.PaymentMethod) (string, error) {

	payment := paymentMethod{
		CardBin:        payM.Card().BIN(),
		CardType:       payM.Card().Type().String(),
		CardLast4:      payM.Card().Last4(),
		CardExpiration: payM.Card().Expiration(),
	}

	if payM.BillingAddress() != nil {
		payment.AddressLine1 = payM.BillingAddress().AddressLine1()
		payment.City = payM.BillingAddress().City()
		payment.State = payM.BillingAddress().State()
		payment.Country = payM.BillingAddress().Country()
		payment.PostalCode = payM.BillingAddress().PostalCode()
	}

	if payM.BillingContact() != nil {
		payment.FirstName = payM.BillingContact().FirstName()
		payment.LastName = payM.BillingContact().LastName()
		payment.PhoneNumber = payM.BillingContact().PhoneNumber()
		payment.Email = payM.BillingContact().Email()
	}

	u, err := json.Marshal(&payment)

	if err != nil {
		return "", err
	}

	encryptedPaymentMethod, err := crypt.Encrypt(string(u))
	if err != nil {
		return "", fmt.Errorf("failed to encrypt payment method: %v", err)
	}

	return encryptedPaymentMethod, nil
}

func decryptPaymentMethod(payM string) (*billing.PaymentMethod, error) {

	decrypted, err := crypt.Decrypt(payM)
	if err != nil {
		return nil, fmt.Errorf("failed to decrypt payment method: %v", err)
	}

	var newPaymentMethod paymentMethod

	if err := json.Unmarshal([]byte(decrypted), &newPaymentMethod); err != nil {
		return nil, fmt.Errorf("failed to unmarshal payment method: %s", err)
	}

	var contact *billing.Contact
	var address *billing.Address

	if newPaymentMethod.City != "" {
		address = billing.UnmarshalAddressFromDatabase(newPaymentMethod.AddressLine1, newPaymentMethod.City, newPaymentMethod.State, newPaymentMethod.Country, newPaymentMethod.PostalCode)
	}

	if newPaymentMethod.FirstName != "" {
		contact = billing.UnmarshalContactFromDatabase(newPaymentMethod.FirstName, newPaymentMethod.LastName, newPaymentMethod.Email, newPaymentMethod.PhoneNumber)
	}

	return billing.UnmarshalPaymentMethodFromDatabase(
		billing.UnmarshalCardFromDatabase(newPaymentMethod.CardBin, newPaymentMethod.CardType, newPaymentMethod.CardLast4, newPaymentMethod.CardExpiration),
		contact,
		address,
	), nil
}

func marshalAccountClubSubscriptionToDatabase(accountClubSupp *billing.AccountClubSupporterSubscription) (*accountClubSupporterSubscription, error) {

	encrypted, err := encryptPaymentMethod(accountClubSupp.PaymentMethod())

	if err != nil {
		return nil, err
	}

	return &accountClubSupporterSubscription{
		AccountId:                   accountClubSupp.AccountId(),
		ClubId:                      accountClubSupp.ClubId(),
		Status:                      accountClubSupp.Status().String(),
		SupporterSince:              accountClubSupp.SupporterSince(),
		LastBillingDate:             accountClubSupp.LastBillingDate(),
		CreatedAt:                   accountClubSupp.CreatedAt(),
		NextBillingDate:             accountClubSupp.NextBillingDate(),
		CancelledAt:                 accountClubSupp.CancelledAt(),
		BillingAmount:               accountClubSupp.BillingAmount(),
		BillingCurrency:             accountClubSupp.BillingCurrency().String(),
		EncryptedPaymentMethod:      encrypted,
		Id:                          accountClubSupp.Id(),
		CCBillSubscriptionId:        accountClubSupp.CCBillSubscriptionId(),
		UpdatedAt:                   accountClubSupp.UpdatedAt(),
		CancellationReasonId:        accountClubSupp.CancellationReasonId(),
		ExpiredAt:                   accountClubSupp.ExpiredAt(),
		FailedAt:                    accountClubSupp.FailedAt(),
		CCBillErrorText:             accountClubSupp.CCBillErrorText(),
		CCBillErrorCode:             accountClubSupp.CCBillErrorCode(),
		BillingFailureNextRetryDate: accountClubSupp.BillingFailureNextRetryDate(),
	}, nil
}

func marshalCCBillSubscriptionToDatabase(subscription *billing.CCBillSubscriptionDetails) (*ccbillSubscriptionDetails, error) {

	encrypted, err := encryptPaymentMethod(subscription.PaymentMethod())

	if err != nil {
		return nil, err
	}

	return &ccbillSubscriptionDetails{
		CCBillSubscriptionId:               subscription.CCBillSubscriptionId(),
		InitiatorAccountId:                 subscription.AccountId(),
		SupportingClubId:                   subscription.ClubId(),
		EncryptedPaymentMethod:             encrypted,
		UpdatedAt:                          subscription.UpdatedAt(),
		AccountClubSupporterSubscriptionId: subscription.AccountClubSupporterSubscriptionId(),

		SubscriptionInitialPrice:   subscription.SubscriptionInitialPrice(),
		SubscriptionRecurringPrice: subscription.SubscriptionRecurringPrice(),
		SubscriptionCurrency:       subscription.SubscriptionCurrency().String(),

		BilledInitialPrice:   subscription.BilledInitialPrice(),
		BilledRecurringPrice: subscription.BilledRecurringPrice(),
		BilledCurrency:       subscription.BilledCurrency().String(),

		AccountingInitialPrice:   subscription.AccountingInitialPrice(),
		AccountingRecurringPrice: subscription.AccountingRecurringPrice(),
		AccountingCurrency:       subscription.AccountingCurrency().String(),
	}, nil
}

func marshalAccountSavedPaymentMethodToDatabase(savedPaymentMethod *billing.SavedPaymentMethod) (*accountSavedPaymentMethod, error) {
	encrypted, err := encryptPaymentMethod(savedPaymentMethod.PaymentMethod())

	if err != nil {
		return nil, err
	}

	return &accountSavedPaymentMethod{
		AccountId:              savedPaymentMethod.AccountId(),
		Id:                     savedPaymentMethod.Id(),
		EncryptedPaymentMethod: encrypted,
		Currency:               savedPaymentMethod.Currency().String(),
		CCBillSubscriptionId:   savedPaymentMethod.CCBillSubscriptionId(),
		UpdatedAt:              savedPaymentMethod.UpdatedAt(),
	}, nil
}

func marshalAccountTransactionToDatabase(transaction *billing.AccountTransaction) (*accountTransactions, error) {

	enc, err := encryptPaymentMethod(transaction.PaymentMethod())

	if err != nil {
		return nil, fmt.Errorf("failed to encrypt payment method: %s", err)
	}

	var events []string

	for _, e := range transaction.Events() {

		res, err := json.Marshal(accountTransactionEvent{
			Id:        e.Id(),
			CreatedAt: e.CreatedAt(),
			Amount:    e.Amount(),
			Currency:  e.Currency().String(),
			Reason:    e.Reason(),
		})

		if err != nil {
			return nil, err
		}

		events = append(events, string(res))
	}

	return &accountTransactions{
		AccountId:                   transaction.AccountId(),
		Id:                          transaction.Id(),
		CreatedAt:                   transaction.CreatedAt(),
		TransactionType:             transaction.Type().String(),
		ClubSupporterSubscriptionId: transaction.ClubSupporterSubscriptionId(),
		EncryptedPaymentMethod:      enc,
		Amount:                      transaction.Amount(),
		Currency:                    transaction.Currency().String(),
		VoidedAt:                    transaction.VoidedAt(),
		VoidReason:                  transaction.VoidReason(),
		BilledAtDate:                transaction.BilledAtDate(),
		NextBillingDate:             transaction.NextBillingDate(),
		CCBillSubscriptionId:        transaction.CCBillSubscriptionId(),
		CCBillTransactionId:         transaction.CCBillTransactionId(),
		Events:                      events,
	}, nil
}

type BillingCassandraElasticsearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

func NewBillingCassandraRepository(session gocqlx.Session, client *elastic.Client) BillingCassandraElasticsearchRepository {
	return BillingCassandraElasticsearchRepository{session: session, client: client}
}

func (r BillingCassandraElasticsearchRepository) CreateAccountSavedPaymentMethodOperator(ctx context.Context, savedPaymentMethod *billing.SavedPaymentMethod) error {

	marshalled, err := marshalAccountSavedPaymentMethodToDatabase(savedPaymentMethod)

	if err != nil {
		return err
	}

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Insert()).
		WithContext(ctx).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create saved payment method: %v", err)
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) DeleteAccountSavedPaymentMethodById(ctx context.Context, requester *principal.Principal, accountId, id string) error {

	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Delete()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountSavedPaymentMethod{Id: id, AccountId: accountId}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete saved payment method by id: %v", err)
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) GetAccountSavedPaymentMethods(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*billing.SavedPaymentMethod, error) {

	if err := billing.CanViewAccountSavedPaymentMethods(requester, accountId); err != nil {
		return nil, err
	}

	var accountSavedPayments []*accountSavedPaymentMethod

	builder := accountSavedPaymentMethodTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", true); err != nil {
			return nil, err
		}
	}

	if err := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		WithContext(ctx).
		BindStruct(&accountSavedPaymentMethod{
			AccountId: accountId,
		}).
		SelectRelease(&accountSavedPayments); err != nil {

		return nil, fmt.Errorf("failed to get saved payment methods for account: %v", err)
	}

	var savedPayments []*billing.SavedPaymentMethod

	for _, savedPay := range accountSavedPayments {

		decrypt, err := decryptPaymentMethod(savedPay.EncryptedPaymentMethod)

		if err != nil {
			return nil, err
		}

		savedMethod := billing.UnmarshalSavedPaymentMethodFromDatabase(savedPay.AccountId, savedPay.Id, savedPay.CCBillSubscriptionId, decrypt, savedPay.UpdatedAt, savedPay.Currency)
		savedMethod.Node = paging.NewNode(savedPay.Id)
		savedPayments = append(savedPayments, savedMethod)
	}

	return savedPayments, nil
}

func (r BillingCassandraElasticsearchRepository) GetAccountSavedPaymentMethodById(ctx context.Context, requester *principal.Principal, accountId, id string) (*billing.SavedPaymentMethod, error) {

	paymentMethod, err := r.GetAccountSavedPaymentMethodByIdOperator(ctx, accountId, id)

	if err != nil {
		return nil, err
	}

	if err := paymentMethod.CanView(requester); err != nil {
		return nil, err
	}

	return paymentMethod, nil
}

func (r BillingCassandraElasticsearchRepository) GetAccountSavedPaymentMethodByIdOperator(ctx context.Context, accountId, id string) (*billing.SavedPaymentMethod, error) {

	var savedPay accountSavedPaymentMethod

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Get()).
		WithContext(ctx).
		BindStruct(&accountSavedPaymentMethod{AccountId: accountId, Id: id}).
		GetRelease(&savedPay); err != nil {
		return nil, err
	}

	decrypt, err := decryptPaymentMethod(savedPay.EncryptedPaymentMethod)

	if err != nil {
		return nil, err
	}

	return billing.UnmarshalSavedPaymentMethodFromDatabase(savedPay.AccountId, savedPay.Id, savedPay.CCBillSubscriptionId, decrypt, savedPay.UpdatedAt, savedPay.Currency), nil
}

func (r BillingCassandraElasticsearchRepository) UpdateAccountSavedPaymentMethodOperator(ctx context.Context, accountId, id string, updateFn func(savedPaymentMethod *billing.SavedPaymentMethod) error) (*billing.SavedPaymentMethod, error) {

	savedPaymentMethod, err := r.GetAccountSavedPaymentMethodByIdOperator(ctx, accountId, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(savedPaymentMethod); err != nil {
		return nil, err
	}

	marshalled, err := marshalAccountSavedPaymentMethodToDatabase(savedPaymentMethod)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Update("encrypted_payment_method")).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update account saved payment method: %v", err)
	}

	return savedPaymentMethod, nil
}

func (r BillingCassandraElasticsearchRepository) getActiveClubSupporterSubscriptionsBuckets(ctx context.Context, clubId string) ([]int, error) {

	var buckets []clubActiveSupporterSubscriptions

	if err := r.session.Query(clubActiveSupporterSubscriptionsBucketsTable.Select()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(clubActiveSupporterSubscriptions{
			ClubId: clubId,
		}).
		SelectRelease(&buckets); err != nil {
		return nil, fmt.Errorf("failed to get club active supporter subscription buckets: %v", err)
	}

	var final []int

	for _, b := range buckets {
		final = append(final, b.Bucket)
	}

	return final, nil
}

func (r BillingCassandraElasticsearchRepository) GetActiveClubSupporterSubscriptionsForClub(ctx context.Context, clubId string) ([]string, error) {

	var subscriptionIds []string

	buckets, err := r.getActiveClubSupporterSubscriptionsBuckets(ctx, clubId)

	if err != nil {
		return nil, err
	}

	// iterate through all buckets starting from x bucket until we have enough values
	for _, bucketId := range buckets {

		var subs []clubActiveSupporterSubscriptions

		if err := qb.Select(clubActiveSupporterSubscriptionsTable.Name()).
			Where(qb.Eq("bucket"), qb.Eq("club_id")).
			Query(r.session).
			WithContext(ctx).
			BindStruct(clubActiveSupporterSubscriptions{
				Bucket: bucketId,
				ClubId: clubId,
			}).
			SelectRelease(&subs); err != nil {
			return nil, fmt.Errorf("failed to get club active supporter subscriptions: %v", err)
		}

		for _, l := range subs {
			subscriptionIds = append(subscriptionIds, l.Id)
		}
	}

	return subscriptionIds, nil
}

func (r BillingCassandraElasticsearchRepository) CreateAccountClubSupporterSubscriptionOperator(ctx context.Context, accountClubSupp *billing.AccountClubSupporterSubscription) error {

	target, err := marshalAccountClubSubscriptionToDatabase(accountClubSupp)

	if err != nil {
		return err
	}

	bucket := bucket2.MakeMonthlyBucketFromTimestamp(target.CreatedAt)

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	stmt, names := accountClubSupporterSubscriptionsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		target,
	)

	stmt, names = clubActiveSupporterSubscriptionsTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		clubActiveSupporterSubscriptions{
			ClubId:               target.ClubId,
			Id:                   target.Id,
			Bucket:               bucket,
			CCBillSubscriptionId: target.CCBillSubscriptionId,
		},
	)

	stmt, names = clubActiveSupporterSubscriptionsBucketsTable.Insert()

	batch.Query(stmt,
		target.ClubId,
		bucket,
	)

	stmt, _ = accountActiveOrCancelledSupporterSubscriptionsTable.Insert()

	batch.Query(stmt,
		target.AccountId,
		target.ClubId,
		target.Id,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create account club supporter subscription: %v", err)
	}

	if err := r.indexAccountClubSupporterSubscription(ctx, accountClubSupp); err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) DeleteAccountSavedPaymentMethod(ctx context.Context, requester *principal.Principal, accountId, id string) error {

	savedPaymentMethod, err := r.GetAccountSavedPaymentMethodByIdOperator(ctx, accountId, id)

	if err != nil {
		return err
	}

	if err := savedPaymentMethod.CanDelete(requester); err != nil {
		return err
	}

	if err := accountSavedPaymentMethodTable.
		DeleteBuilder().
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountClubSupporterSubscription{
			AccountId: accountId,
			Id:        id,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete account saved payment method: %v", err)
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) GetAccountClubSupporterSubscriptionByIdOperator(ctx context.Context, id string) (*billing.AccountClubSupporterSubscription, error) {

	var accountClubSupported accountClubSupporterSubscription

	if err := r.session.Query(accountClubSupporterSubscriptionsTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountClubSupporterSubscription{
			Id: id,
		}).
		GetRelease(&accountClubSupported); err != nil {

		if err == gocql.ErrNotFound {
			return nil, billing.ErrAccountClubSupportSubscriptionNotFound
		}

		return nil, fmt.Errorf("failed to get account club support by id: %v", err)
	}

	decrypt, err := decryptPaymentMethod(accountClubSupported.EncryptedPaymentMethod)

	if err != nil {
		return nil, err
	}

	return billing.UnmarshalAccountClubSupporterSubscriptionFromDatabase(
		accountClubSupported.Id,
		accountClubSupported.AccountId,
		accountClubSupported.ClubId,
		accountClubSupported.Status,
		accountClubSupported.SupporterSince,
		accountClubSupported.LastBillingDate,
		accountClubSupported.NextBillingDate,
		accountClubSupported.BillingAmount,
		accountClubSupported.BillingCurrency,
		decrypt,
		accountClubSupported.CCBillSubscriptionId,
		accountClubSupported.CancelledAt,
		accountClubSupported.CreatedAt,
		accountClubSupported.UpdatedAt,
		accountClubSupported.CancellationReasonId,
		accountClubSupported.ExpiredAt,
		accountClubSupported.FailedAt,
		accountClubSupported.CCBillErrorText,
		accountClubSupported.CCBillErrorCode,
		accountClubSupported.BillingFailureNextRetryDate,
	), nil
}

func (r BillingCassandraElasticsearchRepository) GetAccountClubSupporterSubscriptionById(ctx context.Context, requester *principal.Principal, id string) (*billing.AccountClubSupporterSubscription, error) {

	subscription, err := r.GetAccountClubSupporterSubscriptionByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	if err := subscription.CanView(requester); err != nil {
		return nil, err
	}

	return subscription, nil
}

func (r BillingCassandraElasticsearchRepository) updateAccountClubSupporterSubscription(ctx context.Context, id string, updateFn func(subscription *billing.AccountClubSupporterSubscription) error, columns []string) (*billing.AccountClubSupporterSubscription, error) {

	subscription, err := r.GetAccountClubSupporterSubscriptionByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(subscription); err != nil {
		return nil, err
	}

	marshalled, err := marshalAccountClubSubscriptionToDatabase(subscription)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(accountClubSupporterSubscriptionsTable.Update(columns...)).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update club support subscription: %v", err)
	}

	if err := r.indexAccountClubSupporterSubscription(ctx, subscription); err != nil {
		return nil, err
	}

	return subscription, nil
}

func (r BillingCassandraElasticsearchRepository) UpdateAccountClubSupporterCancelOperator(ctx context.Context, id string, updateFn func(subscription *billing.AccountClubSupporterSubscription) error) (*billing.AccountClubSupporterSubscription, error) {
	return r.updateAccountClubSupporterSubscription(ctx, id, updateFn, []string{"cancellation_reason_id"})
}

func (r BillingCassandraElasticsearchRepository) UpdateAccountClubSupporterBillingDateOperator(ctx context.Context, id string, updateFn func(subscription *billing.AccountClubSupporterSubscription) error) (*billing.AccountClubSupporterSubscription, error) {
	return r.updateAccountClubSupporterSubscription(ctx, id, updateFn, []string{"next_billing_date", "last_billing_date"})
}

func (r BillingCassandraElasticsearchRepository) UpdateAccountClubSupporterSubscriptionStatusOperator(ctx context.Context, id string, updateFn func(subscription *billing.AccountClubSupporterSubscription) error) (*billing.AccountClubSupporterSubscription, error) {

	s, err := r.updateAccountClubSupporterSubscription(ctx, id, updateFn, []string{"cancelled_at", "status", "next_billing_date", "expired_at", "failed_at", "ccbill_error_text", "ccbill_error_code", "billing_failure_next_retry_date"})

	if err != nil {
		return nil, err
	}

	// cancelled subscription, remove from active list
	if s.CancelledAt() != nil {
		if err := r.session.
			Query(clubActiveSupporterSubscriptionsTable.Delete()).
			Consistency(gocql.LocalQuorum).
			WithContext(ctx).
			BindStruct(clubActiveSupporterSubscriptions{
				ClubId:               s.ClubId(),
				Id:                   s.Id(),
				Bucket:               bucket2.MakeMonthlyBucketFromTimestamp(s.CreatedAt()),
				CCBillSubscriptionId: s.CCBillSubscriptionId(),
			}).
			ExecRelease(); err != nil {
			return nil, fmt.Errorf("failed to delete club active supporter subscriptions: %v", err)
		}
	}

	if s.ExpiredAt() != nil {
		// subscription expired, release lock
		if err := r.session.Query(accountClubSupporterSubscriptionLockTable.Delete()).
			Consistency(gocql.LocalQuorum).
			WithContext(ctx).
			BindStruct(accountClubSupporterSubscriptionLock{ClubId: s.ClubId(), AccountId: s.AccountId()}).
			ExecRelease(); err != nil {
			return nil, fmt.Errorf("failed to release lock on account club supporter subscription: %v", err)
		}

		// also delete from active or cancelled list
		if err := r.session.Query(accountActiveOrCancelledSupporterSubscriptionsTable.Delete()).
			Consistency(gocql.LocalQuorum).
			WithContext(ctx).
			BindStruct(accountClubSupporterSubscription{ClubId: s.ClubId(), AccountId: s.AccountId(), Id: s.Id()}).
			ExecRelease(); err != nil {
			return nil, fmt.Errorf("failed to delete club active or cancelled supporter subscription: %v", err)
		}
	}

	return s, nil
}

func (r BillingCassandraElasticsearchRepository) UpdateAccountClubSupporterPaymentMethodOperator(ctx context.Context, id string, updateFn func(subscription *billing.AccountClubSupporterSubscription) error) (*billing.AccountClubSupporterSubscription, error) {
	return r.updateAccountClubSupporterSubscription(ctx, id, updateFn, []string{"encrypted_payment_method"})
}

func (r BillingCassandraElasticsearchRepository) HasExistingAccountClubSupporterSubscription(ctx context.Context, requester *principal.Principal, accountId, clubId string) (*billing.AccountClubSupporterSubscription, error) {

	subscription, err := r.HasExistingAccountClubSupporterSubscriptionOperator(ctx, accountId, clubId)

	if err != nil {
		return nil, err
	}

	if err := subscription.CanView(requester); err != nil {
		return nil, err
	}

	return subscription, nil
}

func (r BillingCassandraElasticsearchRepository) HasActiveOrCancelledAccountClubSupporterSubscriptions(ctx context.Context, requester *principal.Principal, accountId string) (*bool, error) {

	if requester != nil {
		if err := billing.CanViewAccountClubSupporterSubscription(requester, &accountId, nil); err != nil {
			return nil, err
		}
	}

	type activeOrCancelledCount struct {
		Count int `db:"count"`
	}

	var clubMemberCounter activeOrCancelledCount

	if err := accountActiveOrCancelledSupporterSubscriptionsTable.
		SelectBuilder().
		CountAll().
		Where(qb.Eq("account_id")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindMap(map[string]interface{}{
			"account_id": accountId,
		}).
		GetRelease(&clubMemberCounter); err != nil {
		return nil, fmt.Errorf("failed to get has active or cancelled account club supporter subscriptions: %v", err)
	}

	value := clubMemberCounter.Count > 0

	return &value, nil
}

func (r BillingCassandraElasticsearchRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	hasActive, err := r.HasActiveOrCancelledAccountClubSupporterSubscriptions(ctx, nil, accountId)

	if err != nil {
		return err
	}

	if *hasActive {
		return errors.New("cannot delete account data for account that has active or cancelled subscriptions")
	}

	// delete any saved payment methods
	if err := r.session.Query(
		qb.Delete(accountSavedPaymentMethodTable.Name()).
			Where(qb.Eq("account_id")).
			ToCql()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountSavedPaymentMethod{AccountId: accountId}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete saved payment methods for account: %v", err)
	}

	// delete expired subscriptions
	if err := r.session.Query(
		qb.Delete(expiredAccountClubSupporterSubscriptionsByAccountTable.Name()).
			Where(qb.Eq("account_id")).
			ToCql()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(expiredAccountClubSupporterSubscription{AccountId: accountId}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete expired account club supporter subscriptions for account: %v", err)
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) HasExistingAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId string) (*billing.AccountClubSupporterSubscription, error) {

	var lockedSub accountClubSupporterSubscriptionLock

	if err := r.session.Query(accountClubSupporterSubscriptionLockTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountClubSupporterSubscriptionLock{ClubId: clubId, AccountId: accountId}).
		GetRelease(&lockedSub); err != nil {

		if err == gocql.ErrNotFound {
			return nil, billing.ErrAccountClubSupportSubscriptionNotFound
		}

		return nil, fmt.Errorf("failed to get locked account club supporter subscription: %v", err)
	}

	var accountClubSupported accountClubSupporterSubscription

	if err := r.session.Query(accountClubSupporterSubscriptionsTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountClubSupporterSubscription{
			Id: lockedSub.AccountClubSupporterSubscriptionId,
		}).
		GetRelease(&accountClubSupported); err != nil {
		if err == gocql.ErrNotFound {
			return nil, billing.ErrAccountClubSupportSubscriptionNotFound
		}

		return nil, fmt.Errorf("failed to get account club support by id: %v", err)
	}

	decrypt, err := decryptPaymentMethod(accountClubSupported.EncryptedPaymentMethod)

	if err != nil {
		return nil, err
	}

	return billing.UnmarshalAccountClubSupporterSubscriptionFromDatabase(
		accountClubSupported.Id,
		accountClubSupported.AccountId,
		accountClubSupported.ClubId,
		accountClubSupported.Status,
		accountClubSupported.SupporterSince,
		accountClubSupported.LastBillingDate,
		accountClubSupported.NextBillingDate,
		accountClubSupported.BillingAmount,
		accountClubSupported.BillingCurrency,
		decrypt,
		accountClubSupported.CCBillSubscriptionId,
		accountClubSupported.CancelledAt,
		accountClubSupported.CreatedAt,
		accountClubSupported.UpdatedAt,
		accountClubSupported.CancellationReasonId,
		accountClubSupported.ExpiredAt,
		accountClubSupported.FailedAt,
		accountClubSupported.CCBillErrorText,
		accountClubSupported.CCBillErrorCode,
		accountClubSupported.BillingFailureNextRetryDate,
	), nil
}

func (r BillingCassandraElasticsearchRepository) GetExpiredAccountClubSupporterSubscriptionsByAccount(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*billing.ExpiredAccountClubSupporterSubscription, error) {

	if err := billing.CanViewExpiredAccountClubSupporterSubscription(requester, accountId); err != nil {
		return nil, err
	}

	var expiredSubscriptions []*expiredAccountClubSupporterSubscription

	builder := expiredAccountClubSupporterSubscriptionsByAccountTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "club_id", true); err != nil {
			return nil, err
		}
	}

	if err := r.session.Query(builder.ToCql()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&expiredAccountClubSupporterSubscription{
			AccountId: accountId,
		}).
		SelectRelease(&expiredSubscriptions); err != nil {
		return nil, fmt.Errorf("failed to get expired account club supporter subscriptions: %v", err)
	}

	var accountExpired []*billing.ExpiredAccountClubSupporterSubscription

	for _, expired := range expiredSubscriptions {

		supportItem := billing.UnmarshalExpiredAccountClubSupporterSubscriptionFromDatabase(
			expired.AccountId,
			expired.ClubId,
			expired.CCBillSubscriptionId,
			expired.SupporterSince,
			expired.CancelledAt,
			expired.ExpiredAt,
		)

		supportItem.Node = paging.NewNode(expired.ClubId)
		accountExpired = append(accountExpired, supportItem)
	}

	return accountExpired, nil
}

func (r BillingCassandraElasticsearchRepository) GetExpiredAccountClubSupporterSubscriptionByAccountAndClubIdOperator(ctx context.Context, accountId, clubId string) (*billing.ExpiredAccountClubSupporterSubscription, error) {

	var accountExpired []*expiredAccountClubSupporterSubscription

	if err := expiredAccountClubSupporterSubscriptionsByAccountTable.
		SelectBuilder().
		Where(qb.Eq("account_id"), qb.Eq("club_id")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&expiredAccountClubSupporterSubscription{
			AccountId: accountId,
			ClubId:    clubId,
		}).
		SelectRelease(&accountExpired); err != nil {
		return nil, fmt.Errorf("failed to get expired account club support by account and club id: %v", err)
	}

	if len(accountExpired) == 0 {
		return nil, billing.ErrExpiredAccountClubSupportSubscriptionNotFound
	}

	expired := accountExpired[0]

	return billing.UnmarshalExpiredAccountClubSupporterSubscriptionFromDatabase(
		expired.AccountId,
		expired.ClubId,
		expired.CCBillSubscriptionId,
		expired.SupporterSince,
		expired.CancelledAt,
		expired.ExpiredAt,
	), nil
}

func (r BillingCassandraElasticsearchRepository) DeleteExpiredAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId string) error {

	if err := expiredAccountClubSupporterSubscriptionsByAccountTable.
		DeleteBuilder().
		Where(qb.Eq("account_id"), qb.Eq("club_id")).
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&expiredAccountClubSupporterSubscription{
			AccountId: accountId,
			ClubId:    clubId,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete expired account club support by account and club id: %v", err)
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) CreateExpiredAccountClubSupporterSubscriptionOperator(ctx context.Context, expired *billing.ExpiredAccountClubSupporterSubscription) error {

	if err := r.session.Query(expiredAccountClubSupporterSubscriptionsByAccountTable.Insert()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&expiredAccountClubSupporterSubscription{
			AccountId:            expired.AccountId(),
			ClubId:               expired.ClubId(),
			SupporterSince:       expired.SupporterSince(),
			CancelledAt:          expired.CancelledAt(),
			ExpiredAt:            expired.ExpiredAt(),
			CCBillSubscriptionId: expired.CCBillSubscriptionId(),
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create expired account club supporter: %v", err)
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) GetAccountTransactionByCCBillTransactionIdOperator(ctx context.Context, ccbillTransactionId string) (*billing.AccountTransaction, error) {

	var transaction accountTransactions

	if err := r.session.
		Query(accountTransactionByCcbillTransactionIdTable.Get()).
		WithContext(ctx).
		BindStruct(&accountTransactions{
			CCBillTransactionId: &ccbillTransactionId,
		}).
		GetRelease(&transaction); err != nil {

		if err == gocql.ErrNotFound {
			return nil, billing.ErrAccountTransactionNotFound
		}

		return nil, fmt.Errorf("failed to account transaction by ccbill transaction id: %v", err)
	}

	return r.GetAccountTransactionByIdOperator(ctx, transaction.Id)
}

func (r BillingCassandraElasticsearchRepository) GetAccountTransactionById(ctx context.Context, requester *principal.Principal, transactionHistoryId string) (*billing.AccountTransaction, error) {

	transaction, err := r.GetAccountTransactionByIdOperator(ctx, transactionHistoryId)

	if err != nil {
		return nil, err
	}

	if err := transaction.CanView(requester); err != nil {
		return nil, err
	}

	return transaction, nil
}

func (r BillingCassandraElasticsearchRepository) GetAccountTransactionByIdOperator(ctx context.Context, transactionHistoryId string) (*billing.AccountTransaction, error) {

	var transaction accountTransactions

	if err := r.session.
		Query(accountTransactionsTable.Get()).
		WithContext(ctx).
		BindStruct(&accountTransactions{
			Id: transactionHistoryId,
		}).
		GetRelease(&transaction); err != nil {

		if err == gocql.ErrNotFound {
			return nil, billing.ErrAccountTransactionNotFound
		}

		return nil, fmt.Errorf("failed to account transaction history: %v", err)
	}

	decrypt, err := decryptPaymentMethod(transaction.EncryptedPaymentMethod)

	if err != nil {
		return nil, err
	}

	var events []*billing.AccountTransactionEvent

	for _, e := range transaction.Events {

		var unmarshal accountTransactionEvent

		if err := json.Unmarshal([]byte(e), &unmarshal); err != nil {
			return nil, err
		}

		events = append(events, billing.UnmarshalAccountTransactionEventFromDatabase(
			unmarshal.Id,
			unmarshal.CreatedAt,
			unmarshal.Amount,
			unmarshal.Currency,
			unmarshal.Reason,
		))
	}

	return billing.UnmarshalAccountTransactionFromDatabase(
		transaction.AccountId,
		transaction.Id,
		transaction.CreatedAt,
		transaction.TransactionType,
		decrypt,
		transaction.Amount,
		transaction.Currency,
		transaction.BilledAtDate,
		transaction.NextBillingDate,
		transaction.CCBillSubscriptionId,
		transaction.CCBillTransactionId,
		transaction.ClubSupporterSubscriptionId,
		transaction.VoidedAt,
		transaction.VoidReason,
		events,
	), nil
}

func (r BillingCassandraElasticsearchRepository) CreateAccountTransactionOperator(ctx context.Context, transaction *billing.AccountTransaction) error {

	marshalled, err := marshalAccountTransactionToDatabase(transaction)

	if err != nil {
		return err
	}

	if err := r.session.
		Query(accountTransactionsTable.Insert()).
		WithContext(ctx).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create account transaction: %v", err)
	}

	if marshalled.CCBillTransactionId != nil {
		// create a table that will be used to look up the transaction by a ccbill transaction
		if err := r.session.
			Query(accountTransactionByCcbillTransactionIdTable.Insert()).
			WithContext(ctx).
			BindStruct(marshalled).
			ExecRelease(); err != nil {
			return fmt.Errorf("failed to create account transaction by ccbill transaction id: %v", err)
		}
	}

	if err := r.indexAccountTransaction(ctx, transaction); err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) UpdateAccountTransactionOperator(ctx context.Context, id string, updateFn func(transaction *billing.AccountTransaction) error) (*billing.AccountTransaction, error) {

	transaction, err := r.GetAccountTransactionByIdOperator(ctx, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(transaction); err != nil {
		return nil, err
	}

	marshalled, err := marshalAccountTransactionToDatabase(transaction)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(accountTransactionsTable.Update(
			"transaction_type",
			"voided_at",
			"void_reason",
			"events",
		)).
		WithContext(ctx).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update account transaction: %v", err)
	}

	if err := r.indexAccountTransaction(ctx, transaction); err != nil {
		return nil, err
	}

	return transaction, nil
}

func (r BillingCassandraElasticsearchRepository) GetCCBillSubscriptionDetailsByIdOperator(ctx context.Context, ccbillSubscriptionId string) (*billing.CCBillSubscriptionDetails, error) {

	var ccbillSubscription ccbillSubscriptionDetails

	if err := r.session.
		Query(ccbillSubscriptionDetailsTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&ccbillSubscriptionDetails{
			CCBillSubscriptionId: ccbillSubscriptionId,
		}).
		GetRelease(&ccbillSubscription); err != nil {

		if err == gocql.ErrNotFound {
			return nil, billing.ErrCCBillSubscriptionNotFound
		}

		return nil, fmt.Errorf("failed to get ccbill subscription: %v", err)
	}

	decrypt, err := decryptPaymentMethod(ccbillSubscription.EncryptedPaymentMethod)

	if err != nil {
		return nil, err
	}

	return billing.UnmarshalCCBillSubscriptionDetailsFromDatabase(
		ccbillSubscription.InitiatorAccountId,
		ccbillSubscription.SupportingClubId,
		ccbillSubscriptionId,
		decrypt,
		ccbillSubscription.UpdatedAt,
		ccbillSubscription.SubscriptionInitialPrice,
		ccbillSubscription.SubscriptionRecurringPrice,
		ccbillSubscription.SubscriptionCurrency,
		ccbillSubscription.BilledInitialPrice,
		ccbillSubscription.BilledRecurringPrice,
		ccbillSubscription.BilledCurrency,
		ccbillSubscription.AccountingInitialPrice,
		ccbillSubscription.AccountingRecurringPrice,
		ccbillSubscription.AccountingCurrency,
		ccbillSubscription.AccountClubSupporterSubscriptionId,
		ccbillSubscription.Duplicate,
	), nil
}

func (r BillingCassandraElasticsearchRepository) CreateCCBillSubscriptionDetailsOperator(ctx context.Context, subscription *billing.CCBillSubscriptionDetails) error {

	marshalled, err := marshalCCBillSubscriptionToDatabase(subscription)

	if err != nil {
		return err
	}

	var lockedSub accountClubSupporterSubscriptionLock

	err = r.session.Query(accountClubSupporterSubscriptionLockTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountClubSupporterSubscriptionLock{ClubId: marshalled.SupportingClubId, AccountId: marshalled.InitiatorAccountId}).
		GetRelease(&lockedSub)

	if err != nil && err != gocql.ErrNotFound {
		return fmt.Errorf("failed to get locked account club supporter subscription: %v", err)
	}

	if err == nil {
		// LOCKED subscription, still create the subscription, but update the "duplicate" field
		if lockedSub.AccountClubSupporterSubscriptionId != subscription.AccountClubSupporterSubscriptionId() {

			marshalled.Duplicate = true
			subscription.UpdateDuplicate(true)

			if err := r.session.Query(ccbillSubscriptionDetailsTable.Insert()).
				WithContext(ctx).
				BindStruct(marshalled).
				ExecRelease(); err != nil {
				return fmt.Errorf("failed to create ccbill subscription: %v", err)
			}

			return billing.ErrAccountClubSupportSubscriptionDuplicate
		}
	}

	// if we did find the subscription, it would still create it
	if err == gocql.ErrNotFound {
		// no locked subscription
		applied, err := accountClubSupporterSubscriptionLockTable.InsertBuilder().
			Unique().
			Query(r.session).
			WithContext(ctx).
			Consistency(gocql.LocalQuorum).
			BindStruct(accountClubSupporterSubscriptionLock{
				ClubId:                             marshalled.SupportingClubId,
				AccountId:                          marshalled.InitiatorAccountId,
				CCBillSubscriptionId:               &marshalled.CCBillSubscriptionId,
				AccountClubSupporterSubscriptionId: marshalled.AccountClubSupporterSubscriptionId,
			}).
			ExecCASRelease()

		if err != nil {
			return fmt.Errorf("failed to lock account club supporter subscription: %v", err)
		}

		if !applied {
			return fmt.Errorf("failed to lock account club supporter subscription")
		}
	}

	if err := r.session.Query(ccbillSubscriptionDetailsTable.Insert()).
		WithContext(ctx).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create ccbill subscription: %v", err)
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) UpdateCCBillSubscriptionDetailsPaymentMethodOperator(ctx context.Context, ccbillSubscriptionId string, updateFn func(subscription *billing.CCBillSubscriptionDetails) error) (*billing.CCBillSubscriptionDetails, error) {

	ccbillSubscription, err := r.GetCCBillSubscriptionDetailsByIdOperator(ctx, ccbillSubscriptionId)

	if err != nil {
		return nil, err
	}

	err = updateFn(ccbillSubscription)

	if err != nil {
		return nil, err
	}

	marshalled, err := marshalCCBillSubscriptionToDatabase(ccbillSubscription)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(ccbillSubscriptionDetailsTable.Update("encrypted_payment_method")).
		WithContext(ctx).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to updated ccbill subscription: %v", err)
	}

	return ccbillSubscription, nil
}

func (r BillingCassandraElasticsearchRepository) GetCCBillSubscriptionDetailsById(ctx context.Context, requester *principal.Principal, ccbillSubscriptionId string) (*billing.CCBillSubscriptionDetails, error) {

	ccbillSubscription, err := r.GetCCBillSubscriptionDetailsByIdOperator(ctx, ccbillSubscriptionId)

	if err != nil {
		return nil, err
	}

	if err := ccbillSubscription.CanView(requester); err != nil {
		return nil, err
	}

	return ccbillSubscription, nil
}
