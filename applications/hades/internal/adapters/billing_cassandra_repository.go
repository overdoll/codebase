package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/crypt"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
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

		"ccbill_subscription_id",

		"updated_at",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"id"},
})

type accountSavedPaymentMethod struct {
	AccountId string `db:"account_id"`
	Id        string `db:"id"`

	EncryptedPaymentMethod string `db:"encrypted_payment_method"`

	CCBillSubscriptionId string `db:"ccbill_subscription_id"`

	UpdatedAt time.Time `db:"updated_at"`
}

var accountClubSupporterSubscriptionsTable = table.New(table.Metadata{
	Name: "account_club_supporter_subscriptions",
	Columns: []string{
		"account_id",
		"club_id",
		"id",
		"status",
		"supporter_since",
		"last_billing_date",
		"next_billing_date",
		"billing_amount",
		"billing_currency",

		"encrypted_payment_method",

		"ccbill_subscription_id",

		"updated_at",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"club_id", "id"},
})

type accountClubSupporterSubscription struct {
	AccountId              string     `db:"account_id"`
	ClubId                 string     `db:"club_id"`
	Status                 string     `db:"status"`
	SupporterSince         time.Time  `db:"supporter_since"`
	LastBillingDate        time.Time  `db:"last_billing_date"`
	NextBillingDate        time.Time  `db:"next_billing_date"`
	BillingAmount          float64    `db:"billing_amount"`
	BillingCurrency        string     `db:"billing_currency"`
	Id                     string     `db:"id"`
	CancelledAt            *time.Time `db:"cancelled_at"`
	EncryptedPaymentMethod string     `db:"encrypted_payment_method"`
	CCBillSubscriptionId   string     `db:"ccbill_subscription_id"`
	UpdatedAt              time.Time  `db:"updated_at"`
}

var accountTransactionHistoryTable = table.New(table.Metadata{
	Name: "account_transaction_history",
	Columns: []string{
		"account_id",
		"bucket",
		"id",

		"timestamp",

		"transaction_type",

		"supporting_club_id",

		"amount",
		"currency",

		"is_recurring",

		"billing_failure_retry_date",

		"billed_at_date",
		"next_billing_date",

		"encrypted_payment_method",

		"ccbill_error_text",
		"ccbill_error_code",
		"ccbill_reason",
		"ccbill_subscription_id",
		"ccbill_transaction_id",
	},
	PartKey: []string{"account_id", "bucket"},
	SortKey: []string{"id"},
})

type accountTransactionHistory struct {
	AccountId string `db:"account_id"`
	Bucket    int    `db:"bucket"`
	Id        string `db:"id"`

	Timestamp time.Time `db:"timestamp"`

	TransactionType string `db:"transaction_type"`

	SupportedClubId        *string `db:"supported_club_id"`
	EncryptedPaymentMethod *string `db:"encrypted_payment_method"`

	Amount   *float64 `db:"amount"`
	Currency *string  `db:"currency"`

	IsRecurring *bool `db:"is_recurring"`

	BillingFailureRetryDate *time.Time `db:"billing_failure_retry_date"`

	BilledAtDate    *time.Time `db:"billed_at_date"`
	NextBillingDate *time.Time `db:"next_billing_date"`

	CCBillErrorText      *string `db:"ccbill_error_text"`
	CCBillErrorCode      *string `db:"ccbill_error_code"`
	CCBillReason         *string `db:"ccbill_reason"`
	CCBillSubscriptionId string  `db:"ccbill_subscription_id"`
	CCBillTransactionId  *string `db:"ccbill_transaction_id"`
}

var ccbillSubscriptionDetailsTable = table.New(table.Metadata{
	Name: "ccbill_subscriptions",
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

		"idempotency_key",
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

	SubscriptionInitialPrice   float64 `db:"subscription_initial_price"`
	SubscriptionRecurringPrice float64 `db:"subscription_recurring_price"`
	SubscriptionCurrency       string  `db:"subscription_currency"`

	BilledInitialPrice   float64 `db:"billed_initial_price"`
	BilledRecurringPrice float64 `db:"billed_recurring_price"`
	BilledCurrency       string  `db:"billed_currency"`

	AccountingInitialPrice   float64 `db:"accounting_initial_price"`
	AccountingRecurringPrice float64 `db:"accounting_recurring_price"`
	AccountingCurrency       string  `db:"accounting_currency"`

	IdempotencyKey string `db:"idempotency_key"`
}

func encryptPaymentMethod(payM *billing.PaymentMethod) (string, error) {

	u, err := json.Marshal(&paymentMethod{
		AddressLine1:   payM.BillingAddress().AddressLine1(),
		City:           payM.BillingAddress().City(),
		State:          payM.BillingAddress().State(),
		Country:        payM.BillingAddress().Country(),
		PostalCode:     payM.BillingAddress().PostalCode(),
		FirstName:      payM.BillingContact().FirstName(),
		LastName:       payM.BillingContact().LastName(),
		PhoneNumber:    payM.BillingContact().PhoneNumber(),
		Email:          payM.BillingContact().Email(),
		CardBin:        payM.Card().BIN(),
		CardType:       payM.Card().Type().String(),
		CardLast4:      payM.Card().Last4(),
		CardExpiration: payM.Card().Expiration(),
	})

	if err != nil {
		return "", err
	}

	encryptedPaymentMethod, err := crypt.Encrypt(string(u))
	if err != nil {
		return "", err
	}

	return encryptedPaymentMethod, nil
}

func decryptPaymentMethod(payM string) (*billing.PaymentMethod, error) {

	var newPaymentMethod *paymentMethod

	if err := json.Unmarshal([]byte(payM), newPaymentMethod); err != nil {
		return nil, err
	}

	return billing.UnmarshalPaymentMethodFromDatabase(
		billing.UnmarshalCardFromDatabase(newPaymentMethod.CardBin, newPaymentMethod.CardType, newPaymentMethod.CardLast4, newPaymentMethod.CardExpiration),
		billing.UnmarshalContactFromDatabase(newPaymentMethod.FirstName, newPaymentMethod.LastName, newPaymentMethod.Email, newPaymentMethod.PhoneNumber),
		billing.UnmarshalAddressFromDatabase(newPaymentMethod.AddressLine1, newPaymentMethod.City, newPaymentMethod.State, newPaymentMethod.Country, newPaymentMethod.PostalCode),
	), nil
}

func marshalAccountClubSubscriptionToDatabase(accountClubSupp *billing.AccountClubSupporterSubscription) (*accountClubSupporterSubscription, error) {

	encrypted, err := encryptPaymentMethod(accountClubSupp.PaymentMethod())

	if err != nil {
		return nil, err
	}

	return &accountClubSupporterSubscription{
		AccountId:              accountClubSupp.AccountId(),
		ClubId:                 accountClubSupp.ClubId(),
		Status:                 accountClubSupp.Status().String(),
		SupporterSince:         accountClubSupp.SupporterSince(),
		LastBillingDate:        accountClubSupp.LastBillingDate(),
		NextBillingDate:        accountClubSupp.NextBillingDate(),
		CancelledAt:            accountClubSupp.CancelledAt(),
		BillingAmount:          accountClubSupp.BillingAmount(),
		BillingCurrency:        accountClubSupp.BillingCurrency().String(),
		EncryptedPaymentMethod: encrypted,
		Id:                     accountClubSupp.Id(),
		CCBillSubscriptionId:   accountClubSupp.CCBillSubscriptionId(),
		UpdatedAt:              accountClubSupp.UpdatedAt(),
	}, nil
}

func marshalCCBillSubscriptionToDatabase(subscription *billing.CCBillSubscriptionDetails) (*ccbillSubscriptionDetails, error) {

	encrypted, err := encryptPaymentMethod(subscription.PaymentMethod())

	if err != nil {
		return nil, err
	}

	return &ccbillSubscriptionDetails{
		CCBillSubscriptionId:   subscription.CCBillSubscriptionId(),
		InitiatorAccountId:     subscription.AccountId(),
		SupportingClubId:       subscription.ClubId(),
		EncryptedPaymentMethod: encrypted,
		UpdatedAt:              subscription.UpdatedAt(),
		IdempotencyKey:         subscription.IdempotencyKey(),

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
		CCBillSubscriptionId:   savedPaymentMethod.CCBillSubscriptionId(),
		UpdatedAt:              savedPaymentMethod.UpdatedAt(),
	}, nil
}

type BillingCassandraRepository struct {
	session gocqlx.Session
}

func NewBillingCassandraRepository(session gocqlx.Session) BillingCassandraRepository {
	return BillingCassandraRepository{session: session}
}

func (r BillingCassandraRepository) CreateAccountSavedPaymentMethodOperator(ctx context.Context, savedPaymentMethod *billing.SavedPaymentMethod) error {

	marshalled, err := marshalAccountSavedPaymentMethodToDatabase(savedPaymentMethod)

	if err != nil {
		return err
	}

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Insert()).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraRepository) DeleteAccountSavedPaymentMethodById(ctx context.Context, requester *principal.Principal, accountId, id string) error {

	if err := requester.BelongsToAccount(accountId); err != nil {
		return err
	}

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountSavedPaymentMethod{Id: id, AccountId: accountId}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete saved payment method by id: %v", err)
	}

	return nil
}

func (r BillingCassandraRepository) GetAccountSavedPaymentMethods(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*billing.SavedPaymentMethod, error) {

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
		BindStruct(&accountSavedPaymentMethod{
			AccountId: accountId,
		}).
		Select(&accountSavedPayments); err != nil {

		return nil, fmt.Errorf("failed to get saved payment methods for account: %v", err)
	}

	var savedPayments []*billing.SavedPaymentMethod

	for _, savedPay := range accountSavedPayments {

		decrypt, err := decryptPaymentMethod(savedPay.EncryptedPaymentMethod)

		if err != nil {
			return nil, err
		}

		savedMethod := billing.UnmarshalSavedPaymentMethodFromDatabase(savedPay.AccountId, savedPay.Id, savedPay.CCBillSubscriptionId, decrypt, savedPay.UpdatedAt)
		savedMethod.Node = paging.NewNode(savedPay.Id)
		savedPayments = append(savedPayments, savedMethod)
	}

	return savedPayments, nil
}

func (r BillingCassandraRepository) GetAccountSavedPaymentMethodByIdOperator(ctx context.Context, accountId, id string) (*billing.SavedPaymentMethod, error) {

	var savedPay accountSavedPaymentMethod

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Get()).
		BindStruct(&accountSavedPaymentMethod{AccountId: accountId, Id: id}).
		Get(&savedPay); err != nil {
		return nil, err
	}

	decrypt, err := decryptPaymentMethod(savedPay.EncryptedPaymentMethod)

	if err != nil {
		return nil, err
	}

	return billing.UnmarshalSavedPaymentMethodFromDatabase(savedPay.AccountId, savedPay.Id, savedPay.CCBillSubscriptionId, decrypt, savedPay.UpdatedAt), nil
}

func (r BillingCassandraRepository) UpdateAccountSavedPaymentMethodOperator(ctx context.Context, accountId, id string, updateFn func(savedPaymentMethod *billing.SavedPaymentMethod) error) (*billing.SavedPaymentMethod, error) {

	savedPaymentMethod, err := r.GetAccountSavedPaymentMethodByIdOperator(ctx, accountId, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(savedPaymentMethod)

	if err != nil {
		return nil, err
	}

	marshalled, err := marshalAccountSavedPaymentMethodToDatabase(savedPaymentMethod)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Update("encrypted_payment_method")).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update account saved payment method: %v", err)
	}

	return savedPaymentMethod, nil
}

func (r BillingCassandraRepository) CreateAccountClubSupporterSubscriptionOperator(ctx context.Context, accountClubSupp *billing.AccountClubSupporterSubscription) error {

	marshalled, err := marshalAccountClubSubscriptionToDatabase(accountClubSupp)

	if err != nil {
		return err
	}

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Insert()).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraRepository) DeleteAccountSavedPaymentMethod(ctx context.Context, requester *principal.Principal, accountId, id string) error {

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

func (r BillingCassandraRepository) DeleteAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId, id string) error {

	if err := accountClubSupporterSubscriptionsTable.
		DeleteBuilder().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountClubSupporterSubscription{
			AccountId: accountId,
			ClubId:    clubId,
			Id:        id,
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete account club support subscription: %v", err)
	}

	return nil
}

func (r BillingCassandraRepository) GetAccountClubSupporterSubscriptionByIdOperator(ctx context.Context, accountId, clubId, id string) (*billing.AccountClubSupporterSubscription, error) {

	var accountClubSupported *accountClubSupporterSubscription

	if err := accountClubSupporterSubscriptionsTable.
		SelectBuilder().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountClubSupporterSubscription{
			AccountId: accountId,
			ClubId:    clubId,
			Id:        id,
		}).
		Get(&accountClubSupported); err != nil {
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
		accountClubSupported.UpdatedAt,
	), nil
}

func (r BillingCassandraRepository) GetAccountClubSupporterSubscriptionById(ctx context.Context, requester *principal.Principal, accountId, clubId, id string) (*billing.AccountClubSupporterSubscription, error) {

	subscription, err := r.GetAccountClubSupporterSubscriptionByIdOperator(ctx, accountId, clubId, id)

	if err != nil {
		return nil, err
	}

	if err := subscription.CanView(requester); err != nil {
		return nil, err
	}

	return subscription, nil
}

func (r BillingCassandraRepository) updateAccountClubSupporterSubscription(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *billing.AccountClubSupporterSubscription) error, columns []string) (*billing.AccountClubSupporterSubscription, error) {

	subscription, err := r.GetAccountClubSupporterSubscriptionByIdOperator(ctx, accountId, clubId, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(subscription)

	if err != nil {
		return nil, err
	}

	marshalled, err := marshalAccountClubSubscriptionToDatabase(subscription)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(accountClubSupporterSubscriptionsTable.Update(columns...)).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update club support subscription: %v", err)
	}

	return subscription, nil
}

func (r BillingCassandraRepository) UpdateAccountClubSupporterBillingDateOperator(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *billing.AccountClubSupporterSubscription) error) (*billing.AccountClubSupporterSubscription, error) {
	return r.updateAccountClubSupporterSubscription(ctx, accountId, clubId, id, updateFn, []string{"next_billing_date"})
}

func (r BillingCassandraRepository) UpdateAccountClubSupporterSubscriptionStatusOperator(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *billing.AccountClubSupporterSubscription) error) (*billing.AccountClubSupporterSubscription, error) {
	return r.updateAccountClubSupporterSubscription(ctx, accountId, clubId, id, updateFn, []string{"cancelled_at", "status", "next_billing_date"})
}

func (r BillingCassandraRepository) UpdateAccountClubSupporterPaymentMethodOperator(ctx context.Context, accountId, clubId, id string, updateFn func(subscription *billing.AccountClubSupporterSubscription) error) (*billing.AccountClubSupporterSubscription, error) {
	return r.updateAccountClubSupporterSubscription(ctx, accountId, clubId, id, updateFn, []string{"encrypted_payment_method"})
}

func (r BillingCassandraRepository) HasExistingAccountClubSupporterSubscriptionOperator(ctx context.Context, accountId, clubId string) (*billing.AccountClubSupporterSubscription, error) {

	var accountClubSupporting []*accountClubSupporterSubscription

	if err := accountClubSupporterSubscriptionsTable.
		SelectBuilder().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountClubSupporterSubscription{
			AccountId: accountId,
			ClubId:    clubId,
		}).
		Select(&accountClubSupporting); err != nil {
		return nil, fmt.Errorf("failed to get account club support by account and club id: %v", err)
	}

	if len(accountClubSupporting) == 0 {
		return nil, billing.ErrAccountClubSupportSubscriptionNotFound
	}

	accountClubSupported := accountClubSupporting[0]

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
		accountClubSupported.UpdatedAt,
	), nil
}

func (r BillingCassandraRepository) GetAccountClubSupporterSubscriptions(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*billing.AccountClubSupporterSubscription, error) {

	if err := billing.CanViewAccountClubSupporterSubscription(requester, accountId); err != nil {
		return nil, err
	}

	var accountClubSupported []*accountClubSupporterSubscription

	builder := accountClubSupporterSubscriptionsTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "club_id", true); err != nil {
			return nil, err
		}
	}

	if err := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountClubSupporterSubscription{
			AccountId: accountId,
		}).
		Select(&accountClubSupported); err != nil {
		return nil, fmt.Errorf("failed to get account club support: %v", err)
	}

	var accountSupport []*billing.AccountClubSupporterSubscription

	for _, support := range accountClubSupported {

		decrypt, err := decryptPaymentMethod(support.EncryptedPaymentMethod)

		if err != nil {
			return nil, err
		}

		supportItem := billing.UnmarshalAccountClubSupporterSubscriptionFromDatabase(
			support.Id,
			support.AccountId,
			support.ClubId,
			support.Status,
			support.SupporterSince,
			support.LastBillingDate,
			support.NextBillingDate,
			support.BillingAmount,
			support.BillingCurrency,
			decrypt,
			support.CCBillSubscriptionId,
			support.CancelledAt,
			support.UpdatedAt,
		)

		supportItem.Node = paging.NewNode(support.ClubId)
		accountSupport = append(accountSupport, supportItem)
	}

	return accountSupport, nil
}

func (r BillingCassandraRepository) CreateAccountTransactionHistoryOperator(ctx context.Context, accountHistory *billing.AccountTransactionHistory) error {

	var encrypted *string

	if accountHistory.PaymentMethod() != nil {

		enc, err := encryptPaymentMethod(accountHistory.PaymentMethod())

		if err != nil {
			return err
		}

		encrypted = &enc
	}

	var currency *string

	if accountHistory.Currency() != nil {
		cr := accountHistory.Currency().String()
		currency = &cr
	}

	if err := r.session.
		Query(accountTransactionHistoryTable.Insert()).
		BindStruct(&accountTransactionHistory{
			AccountId:               accountHistory.AccountId(),
			Bucket:                  0,
			Id:                      accountHistory.Id(),
			TransactionType:         accountHistory.Transaction().String(),
			SupportedClubId:         accountHistory.SupportedClubId(),
			EncryptedPaymentMethod:  encrypted,
			Amount:                  accountHistory.Amount(),
			Currency:                currency,
			Timestamp:               accountHistory.Timestamp(),
			IsRecurring:             accountHistory.IsRecurring(),
			BillingFailureRetryDate: accountHistory.BillingFailureNextRetryDate(),
			BilledAtDate:            accountHistory.BilledAtDate(),
			NextBillingDate:         accountHistory.NextBillingDate(),
			CCBillErrorText:         accountHistory.CCBillErrorText(),
			CCBillErrorCode:         accountHistory.CCBillErrorCode(),
			CCBillReason:            accountHistory.CCBillReason(),
			CCBillSubscriptionId:    accountHistory.CCBillSubscriptionId(),
			CCBillTransactionId:     accountHistory.CCBillTransactionId(),
		}).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraRepository) SearchAccountTransactionHistory(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *billing.AccountTransactionHistoryFilters) ([]*billing.AccountTransactionHistory, error) {

	if err := billing.CanViewAccountTransactionHistory(requester, filters.AccountId()); err != nil {
		return nil, err
	}

	var accountTransactions []*accountTransactionHistory

	builder := accountTransactionHistoryTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", true); err != nil {
			return nil, err
		}
	}

	if err := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountTransactionHistory{
			AccountId: filters.AccountId(),
			Bucket:    0,
		}).
		Select(&accountTransactions); err != nil {
		return nil, fmt.Errorf("failed to get account transaction history: %v", err)
	}

	var accountTransactionsMorphed []*billing.AccountTransactionHistory

	for _, transaction := range accountTransactions {

		var paymentMethod *billing.PaymentMethod

		if transaction.EncryptedPaymentMethod != nil {
			decrypt, err := decryptPaymentMethod(*transaction.EncryptedPaymentMethod)

			if err != nil {
				return nil, err
			}

			paymentMethod = decrypt
		}

		transactionItem := billing.UnmarshalAccountTransactionHistoryFromDatabase(
			transaction.AccountId,
			transaction.Id,
			transaction.Timestamp,
			transaction.TransactionType,
			transaction.SupportedClubId,
			paymentMethod,
			transaction.Amount,
			transaction.Currency,
			transaction.IsRecurring,
			transaction.BillingFailureRetryDate,
			transaction.BilledAtDate,
			transaction.NextBillingDate,
			transaction.CCBillSubscriptionId,
			transaction.CCBillTransactionId,
			transaction.CCBillErrorText,
			transaction.CCBillErrorCode,
			transaction.CCBillReason,
		)

		transactionItem.Node = paging.NewNode(transaction.Id)
		accountTransactionsMorphed = append(accountTransactionsMorphed, transactionItem)
	}

	return accountTransactionsMorphed, nil
}

func (r BillingCassandraRepository) GetCCBillSubscriptionDetailsByIdOperator(ctx context.Context, ccbillSubscriptionId string) (*billing.CCBillSubscriptionDetails, error) {

	var ccbillSubscription *ccbillSubscriptionDetails

	if err := r.session.
		Query(ccbillSubscriptionDetailsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&ccbillSubscriptionDetails{
			CCBillSubscriptionId: ccbillSubscriptionId,
		}).
		Get(&ccbillSubscription); err != nil {
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
		ccbillSubscription.IdempotencyKey,
	), nil
}

func (r BillingCassandraRepository) CreateCCBillSubscriptionDetailsOperator(ctx context.Context, subscription *billing.CCBillSubscriptionDetails) error {

	marshalled, err := marshalCCBillSubscriptionToDatabase(subscription)

	if err != nil {
		return err
	}

	applied, err := ccbillSubscriptionDetailsTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		BindStruct(marshalled).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to create ccbill subscription: %v", err)
	}

	if !applied {
		return errors.New("could not create ccbill subscription")
	}

	return nil
}

func (r BillingCassandraRepository) UpdateCCBillSubscriptionDetailsPaymentMethodOperator(ctx context.Context, ccbillSubscriptionId string, updateFn func(subscription *billing.CCBillSubscriptionDetails) error) (*billing.CCBillSubscriptionDetails, error) {

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
		BindStruct(marshalled).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to updated ccbill subscription: %v", err)
	}

	return ccbillSubscription, nil
}

func (r BillingCassandraRepository) GetCCBillSubscriptionDetailsById(ctx context.Context, requester *principal.Principal, ccbillSubscriptionId string) (*billing.CCBillSubscriptionDetails, error) {

	ccbillSubscription, err := r.GetCCBillSubscriptionDetailsByIdOperator(ctx, ccbillSubscriptionId)

	if err != nil {
		return nil, err
	}

	if err := ccbillSubscription.CanView(requester); err != nil {
		return nil, err
	}

	return ccbillSubscription, nil

}
