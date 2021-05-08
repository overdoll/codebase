package adapters

import (
	"context"

	"go.temporal.io/sdk/client"
)

type TemporalRepository struct {
	client client.Client
}

func NewTemporalRepository(client client.Client) TemporalRepository {
	return TemporalRepository{client: client}
}

// An adapter for executing workflows
func (r TemporalRepository) ExecuteWorkflow(ctx context.Context, args ...interface{}) (client.WorkflowRun, error) {
	return r.client.ExecuteWorkflow(ctx, args...)
}
