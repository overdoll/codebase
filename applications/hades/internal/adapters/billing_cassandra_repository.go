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

		"ccbill_subscription_id",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"club_id"},
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

func (r BillingCassandraRepository) updateAccountSavedPaymentMethod(ctx context.Context, savedPaymentMethod *billing.SavedPaymentMethod) error {
	return nil
}
