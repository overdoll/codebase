package adapters

import (
	"github.com/olivere/elastic/v7"
	"github.com/scylladb/gocqlx/v2"
	"time"
)

type BillingIndexElasticSearchRepository struct {
	session gocqlx.Session
	client  *elastic.Client
}

type accountTransactionDocument struct {
	AccountId                   string     `json:"account_id"`
	Bucket                      int64      `json:"bucket"`
	Id                          string     `json:"id"`
	Timestamp                   time.Time  `json:"timestamp"`
	TransactionType             string     `json:"transaction_type"`
	ClubSupporterSubscriptionId *string    `json:"club_supporter_subscription_id"`
	EncryptedPaymentMethod      string     `json:"encrypted_payment_method"`
	Amount                      int64      `json:"amount"`
	Currency                    int64      `json:"text"`
	IsRecurring                 bool       `json:"is_recurring"`
	VoidedAt                    *time.Time `json:"voided_at"`
	VoidReason                  *string    `json:"void_reason"`
	BilledAtDate                time.Time  `json:"billed_at_date"`
	NextBillingDate             time.Time  `json:"next_billing_date"`
	CCBillSubscriptionId        string     `json:"ccbill_subscription_id"`
	CCBillTransactionId         string     `json:"ccbill_transaction_id"`
	Events                      []string   `json:"events"`
}

const AccountTransactionsIndexName = "account_transactions"

func NewBillingIndexElasticSearchRepository(client *elastic.Client, session gocqlx.Session) BillingIndexElasticSearchRepository {
	return BillingIndexElasticSearchRepository{client: client, session: session}
}
