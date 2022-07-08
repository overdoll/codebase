package schema

import (
	_ "embed"
)

//go:embed payments.json
var PaymentsSchema string

//go:embed payouts.json
var PayoutsSchema string
