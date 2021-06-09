package workflows

import (
	"time"

	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
)

var options = workflow.ActivityOptions{
	// Timeout options specify when to automatically timeout Activity functions.
	StartToCloseTimeout: time.Minute,
	// Optionally provide a customized RetryPolicy.
	// Temporal retries failures by default, this is just an example.
	RetryPolicy: &temporal.RetryPolicy{
		InitialInterval:    time.Second,
		BackoffCoefficient: 2.0,
		MaximumInterval:    time.Minute,
		MaximumAttempts:    500,
	},
}
