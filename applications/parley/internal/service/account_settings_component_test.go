package service_test

import (
	"context"
	"overdoll/libraries/uuid"
	"testing"

	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/ports/graphql/types"
)

// query is weird here because we query the entities field directly

type AddModeratorToPostQueue struct {
	AddModeratorToPostQueue *struct {
		Account *struct {
			ID                string
			ModeratorSettings *types.ModeratorSettings
		}
	} `graphql:"addModeratorToPostQueue(input: $input)"`
}

type RemoveModeratorFromPostQueue struct {
	RemoveModeratorFromPostQueue *struct {
		Account *struct {
			ID                string
			ModeratorSettings *types.ModeratorSettings
		}
	} `graphql:"removeModeratorFromPostQueue(input: $input)"`
}

// TestToggleModeratorStatus - toggle moderator status from post queue
func TestToggleModeratorStatus(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()

	mockAccountModerator(t, accountId)

	client := getHttpClientWithAuthenticatedAccount(t, accountId)

	var addModeratorToPostQueue AddModeratorToPostQueue

	err := client.Mutate(context.Background(), &addModeratorToPostQueue, map[string]interface{}{
		"input": types.AddModeratorToPostQueueInput{
			AccountID: convertAccountIdToRelayId(accountId),
		},
	})

	require.NoError(t, err, "no error when setting moderator to post queue")
	require.True(t, addModeratorToPostQueue.AddModeratorToPostQueue.Account.ModeratorSettings.IsInModeratorQueue, "moderator should now be in post queue")

	var removeModeratorFromPostQueue RemoveModeratorFromPostQueue

	err = client.Mutate(context.Background(), &removeModeratorFromPostQueue, map[string]interface{}{
		"input": types.RemoveModeratorFromPostQueueInput{
			AccountID: "QWNjb3VudDoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=",
		},
	})

	require.NoError(t, err, "no error when removing moderator from post queue")
	require.False(t, removeModeratorFromPostQueue.RemoveModeratorFromPostQueue.Account.ModeratorSettings.IsInModeratorQueue, "moderator should not be in post queue")
}
