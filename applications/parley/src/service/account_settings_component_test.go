package service_test

import (
	"fmt"
	"testing"

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

	fmt.Println(settings.Entities)

	//var toggleModeratorStatus ToggleModeratorStatus
	//
	//// because this is an entity in apollo federation, we have to query the entities field
	//err := client.Mutate(context.Background(), &toggleModeratorStatus, nil)
	//
	//require.NoError(t, err)
	//
	//require.True(t, settings.AccountSettings.Moderator.InQueue)
}
