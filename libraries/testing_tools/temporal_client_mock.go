package testing_tools

import (
	"fmt"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/mocks"
	"testing"
)

func MockWorkflowWithArgs(t *testing.T, client *mocks.Client, method interface{}, args ...interface{}) *mock.Call {

	var ret []interface{}

	ret = append(ret, mock.Anything)
	ret = append(ret, mock.Anything)
	ret = append(ret, mock.IsType(method))
	ret = append(ret, args...)

	return client.On("ExecuteWorkflow", ret...)
}

func GetArgumentsForWorkflowCall(t *testing.T, client *mocks.Client, method interface{}, args ...interface{}) []interface{} {
	funcName := GetFunctionName(method)

	for _, c := range client.Calls {
		if c.Method == "ExecuteWorkflow" {
			if funcName == GetFunctionName(c.Arguments[2]) {

				var ret []interface{}
				ret = append(ret, mock.Anything)
				ret = append(ret, mock.Anything)
				ret = append(ret, mock.Anything)
				ret = append(ret, args...)

				_, diffCount := c.Arguments.Diff(ret)
				if diffCount == 0 {
					return c.Arguments[3:]
				}
			}
		}
	}

	require.Fail(t, fmt.Errorf("function call: %s not called during execution. double check your function name / test", funcName).Error())

	return nil
}
