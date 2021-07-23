package service_test

import (
	"context"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

// query is weird here because we query the entities field directly
type AccountModerator struct {
	Entities []struct {
		Account struct {
			ID        string
			Moderator *types.Moderator
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type _Any map[string]interface{}

func moderator(t *testing.T, client *graphql.Client, accountId string) *types.Moderator {
	var account AccountModerator

	err := client.Query(context.Background(), &account, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         accountId,
			},
		},
	})

	require.NoError(t, err)

	return account.Entities[0].Account.Moderator
}

type ToggleModeratorSettingsInQueue struct {
	ToggleModeratorSettingsInQueue types.ToggleModeratorSettingsInQueuePayload `graphql:"toggleModeratorSettingsInQueue()"`
}

// TestToggleModeratorStatus - toggle moderator status
func TestToggleModeratorStatus(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ5IyRTV0X4J27F3m5wGD5mj"))

	oldInQueue := moderator(t, client, "QWNjb3VudDoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=")

	var toggleModeratorStatus ToggleModeratorSettingsInQueue

	err := client.Mutate(context.Background(), &toggleModeratorStatus, nil)

	require.NoError(t, err)

	newInQueue := moderator(t, client, "QWNjb3VudDoxcTdNSjVJeVJUVjBYNEoyN0YzbTV3R0Q1bWo=")

	// compare that the old result of inqueue is the opposite of the new inqueue
	require.NotEqual(t, oldInQueue, newInQueue)

	err = client.Mutate(context.Background(), &toggleModeratorStatus, nil)

	require.NoError(t, err)
}
