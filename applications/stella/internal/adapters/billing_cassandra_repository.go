package adapters

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/stella/internal/domain/billing"
)

var accountSavedPaymentMethodTable = table.New(table.Metadata{
	Name: "clubs",
	Columns: []string{
		"account_id",
		"id",
		"payment_type",

		"first_name",
		"last_name",
		"email",
		"phone_number",

		"address_line_1",
		"city",
		"state",
		"country",
		"postal_code",

		"card_bin",
		"card_type",
		"card_last4",
		"card_expiration",

		"is_ccbill",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"id"},
})

type accountSavedPaymentMethod struct {
	AccountId string `db:"account_id"`
	Id        string `db:"id"`

	PaymentType string `db:"payment_type"`

	FirstName   string `db:"first_name"`
	LastName    string `db:"last_name"`
	PhoneNumber string `db:"phone_number"`
	Email       string `db:"email"`

	AddressLine1 string `db:"address_line_1"`
	City         string `db:"city"`
	State        string `db:"state"`
	Country      string `db:"country"`
	PostalCode   string `db:"postal_code"`

	CardBin        string `db:"card_bin"`
	CardType       string `db:"card_type"`
	CardLast4      string `db:"card_last4"`
	CardExpiration string `db:"card_expiration"`

	IsCCBill bool `db:"is_ccbill"`
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
