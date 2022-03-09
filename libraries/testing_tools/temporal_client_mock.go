package testing_tools

import (
	"fmt"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"go.temporal.io/sdk/testsuite"
	"testing"
)

type MockWorkflow struct {
	args   []interface{}
	method interface{}
	client *mocks.Client
}

func NewMockWorkflowWithArgs(client *mocks.Client, method interface{}, args ...interface{}) *MockWorkflow {
	var ret []interface{}

	ret = append(ret, mock.Anything)
	ret = append(ret, mock.Anything)
	ret = append(ret, mock.IsType(method))
	ret = append(ret, args...)

	m := &MockWorkflow{
		args:   args,
		method: method,
		client: client,
	}

	m.onWorkflowExecution().Return(&mocks.WorkflowRun{}, nil)

	return m
}

func (m *MockWorkflow) onWorkflowExecution() *mock.Call {
	var ret []interface{}

	ret = append(ret, mock.Anything)
	ret = append(ret, mock.Anything)
	ret = append(ret, mock.IsType(m.method))
	ret = append(ret, m.args...)

	return m.client.On("FindAndExecuteWorkflow", ret...)
}

func (m *MockWorkflow) getArgumentsForWorkflowCall() ([]interface{}, error) {
	funcName := GetFunctionName(m.method)

	for _, c := range m.client.Calls {
		if c.Method == "FindAndExecuteWorkflow" {
			if funcName == GetFunctionName(c.Arguments[2]) {

				var ret []interface{}
				ret = append(ret, mock.Anything)
				ret = append(ret, mock.Anything)
				ret = append(ret, mock.Anything)
				ret = append(ret, m.args...)

				_, diffCount := c.Arguments.Diff(ret)
				if diffCount == 0 {
					return c.Arguments[3:], nil
				}
			}
		}
	}

	return nil, fmt.Errorf("function call: %s not called during execution. double check your function name / test", funcName)
}

func (m *MockWorkflow) FindAndExecuteWorkflow(t *testing.T, env *testsuite.TestWorkflowEnvironment) {

	args, err := m.getArgumentsForWorkflowCall()

	require.NoError(t, err)

	env.ExecuteWorkflow(m.method, args...)
}
