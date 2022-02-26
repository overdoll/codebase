package mocks

import (
	"context"
	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/mocks"
	"go.temporal.io/sdk/testsuite"
)

type TemporalClientMock struct {
	mocks.Client
	Activities interface{}
}

func (c *TemporalClientMock) ExecuteWorkflow(ctx context.Context, options client.StartWorkflowOptions, workflow interface{}, args ...interface{}) (client.WorkflowRun, error) {

	env := new(testsuite.WorkflowTestSuite).NewTestWorkflowEnvironment()
	//	env.RegisterActivity(c.Activities)
	env.RegisterWorkflow(workflow)
	env.ExecuteWorkflow(workflow, args)

	if err := env.GetWorkflowError(); err != nil {
		return nil, err
	}

	return nil, nil
}
