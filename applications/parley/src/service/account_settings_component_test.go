package service_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

type ToggleModeratorStatus struct {
	ToggleModeratorStatus types.Response `graphql:"toggleModeratorStatus()"`
}

// TestToggleModeratorStatus - toggle moderator status
func TestToggleModeratorStatus(t *testing.T) {
	t.Parallel()

	client := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ5IyRTV0X4J27F3m5wGD5mj"))

	settings := qAccountSettings(t, client, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	oldInQueue := settings.Moderator.InQueue

	var toggleModeratorStatus ToggleModeratorStatus

	err := client.Mutate(context.Background(), &toggleModeratorStatus, nil)

	require.NoError(t, err)
	require.True(t, toggleModeratorStatus.ToggleModeratorStatus.Ok)

	settings = qAccountSettings(t, client, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	// compare that the old result of inqueue is the opposite of the new inqueue
	require.Equal(t, !oldInQueue, settings.Moderator.InQueue)
	oldInQueue = settings.Moderator.InQueue

	err = client.Mutate(context.Background(), &toggleModeratorStatus, nil)

	require.NoError(t, err)
	require.True(t, toggleModeratorStatus.ToggleModeratorStatus.Ok)

	settings = qAccountSettings(t, client, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	// same comparison, but we toggle off again
	require.Equal(t, !oldInQueue, settings.Moderator.InQueue)
}
