package adapters

import (
	"context"
	"encoding/json"
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

var accountSavedPaymentMethodTable = table.New(table.Metadata{
	Name: "account_saved_payment_methods",
	Columns: []string{
		"account_id",
		"id",

		"encrypted_payment_method",

		"ccbill_subscription_id",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"id"},
})

var accountClubsSupportTable = table.New(table.Metadata{
	Name: "account_clubs_support",
	Columns: []string{
		"account_id",
		"club_id",
		"status",
		"supporter_since",
		"last_billing_date",
		"next_billing_date",
		"billing_amount",
		"billing_currency",

		"encrypted_payment_method",

		"id",
		"ccbill_subscription_id",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"club_id", "id"},
})

var accountTransactionHistoryTable = table.New(table.Metadata{
	Name: "account_clubs_support",
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

type accountSavedPaymentMethod struct {
	AccountId string `db:"account_id"`
	Id        string `db:"id"`

	EncryptedPaymentMethod string `db:"encrypted_payment_method"`

	CCBillSubscriptionId string `db:"ccbill_subscription_id"`
}

type accountClubSupport struct {
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
}

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

type BillingCassandraRepository struct {
	session gocqlx.Session
}

func NewBillingCassandraRepository(session gocqlx.Session) BillingCassandraRepository {
	return BillingCassandraRepository{session: session}
}

func (r BillingCassandraRepository) EnsureUniqueCCBillClubSupporterSubscription(ctx context.Context, paymentLink *billing.CCBillClubSupporterPaymentLink) error {
	return nil
}

func (r BillingCassandraRepository) CreateAccountSavedPaymentMethod(ctx context.Context, savedPaymentMethod *billing.SavedPaymentMethod) error {

	encrypted, err := encryptPaymentMethod(savedPaymentMethod.PaymentMethod())

	if err != nil {
		return err
	}

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Insert()).
		BindStruct(&accountSavedPaymentMethod{
			AccountId:              savedPaymentMethod.AccountId(),
			Id:                     savedPaymentMethod.Id(),
			EncryptedPaymentMethod: encrypted,
			CCBillSubscriptionId:   savedPaymentMethod.CCBillSubscriptionId(),
		}).
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

		savedMethod := billing.UnmarshalSavedPaymentMethodFromDatabase(savedPay.AccountId, savedPay.Id, savedPay.CCBillSubscriptionId, decrypt)
		savedMethod.Node = paging.NewNode(savedPay.Id)
		savedPayments = append(savedPayments, savedMethod)
	}

	return savedPayments, nil
}

func (r BillingCassandraRepository) CreateAccountClubSupport(ctx context.Context, accountClubSupp *billing.AccountClubSupport) error {

	encrypted, err := encryptPaymentMethod(accountClubSupp.PaymentMethod())

	if err != nil {
		return err
	}

	if err := r.session.
		Query(accountSavedPaymentMethodTable.Insert()).
		BindStruct(&accountClubSupport{
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
		}).
		ExecRelease(); err != nil {
		return err
	}

	return nil
}

func (r BillingCassandraRepository) GetAccountClubSupport(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*billing.AccountClubSupport, error) {

	if err := billing.CanViewAccountClubSupport(requester, accountId); err != nil {
		return nil, err
	}

	var accountClubSupported []*accountClubSupport

	builder := accountClubsSupportTable.SelectBuilder()

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "club_id", true); err != nil {
			return nil, err
		}
	}

	if err := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountClubSupport{
			AccountId: accountId,
		}).
		Select(&accountClubSupported); err != nil {
		return nil, fmt.Errorf("failed to get account club support: %v", err)
	}

	var accountSupport []*billing.AccountClubSupport

	for _, support := range accountClubSupported {

		decrypt, err := decryptPaymentMethod(support.EncryptedPaymentMethod)

		if err != nil {
			return nil, err
		}

		supportItem := billing.UnmarshalAccountClubSupportFromDatabase(
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
		)

		supportItem.Node = paging.NewNode(support.ClubId)
		accountSupport = append(accountSupport, supportItem)
	}

	return accountSupport, nil
}

func (r BillingCassandraRepository) CreateAccountTransactionHistory(ctx context.Context, accountHistory *billing.AccountTransactionHistory) error {

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

func (r BillingCassandraRepository) GetAccountTransactionHistory(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *billing.AccountTransactionHistoryFilters) ([]*billing.AccountTransactionHistory, error) {

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
