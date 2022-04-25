package support

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/libraries/uuid"
)

func GenerateUniqueIdForWorkflow(ctx workflow.Context) (*string, error) {
	uniqueIdGenerator := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
		return uuid.New().String()
	})

	var uniqueId *string

	if err := uniqueIdGenerator.Get(&uniqueId); err != nil {
		return nil, err
	}

	return uniqueId, nil
}
