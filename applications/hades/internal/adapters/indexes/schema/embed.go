package schema

import (
	_ "embed"
)

//go:embed account_transactions.json
var AccountTransactionsSchema string

//go:embed account_club_supporter_subscriptions.json
var AccountClubSupporterSubscriptionsSchema string
