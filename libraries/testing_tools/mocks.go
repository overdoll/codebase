package testing_tools

import (
	"fmt"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"testing"
)

func GetArgumentsForMethodCallFromMockCalls(t *testing.T, method interface{}, calls []mock.Call) []interface{} {
	funcName := GetFunctionName(method)

	for _, c := range calls {
		if c.Method == funcName {
			return c.Arguments
		}
	}

	require.Fail(t, fmt.Errorf("function call: %s not called during execution. double check your function name / test", funcName).Error())

	return nil
}
