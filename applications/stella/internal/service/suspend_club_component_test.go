package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/stella/internal/app/workflows"
	"overdoll/applications/stella/internal/ports/graphql/types"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type SuspendClub struct {
	SuspendClub *struct {
		Club *ClubModified
	} `graphql:"suspendClub(input: $input)"`
}

type UnSuspendClub struct {
	UnSuspendClub *struct {
		Club *ClubModified
	} `graphql:"unSuspendClub(input: $input)"`
}

type ClubSuspensionLogsModified struct {
	Id             string
	Reference      string
	Slug           string
	Name           string
	SuspensionLogs struct {
		Edges []struct {
			Node struct {
				ItemIssued struct {
					Id             relay.ID
					Reason         types.ClubSuspensionReason
					SuspendedUntil time.Time
				} `graphql:"... on ClubIssuedSuspensionLog"`
				ItemRemoved struct {
					Id relay.ID
				} `graphql:"... on ClubRemovedSuspensionLog"`
			}
		}
	}
	Suspension *types.ClubSuspension
}

type SuspensionClub struct {
	Club *ClubSuspensionLogsModified `graphql:"club(slug: $slug)"`
}

func getSuspensionClub(t *testing.T, client *graphql.Client, id string) SuspensionClub {

	var club SuspensionClub

	err := client.Query(context.Background(), &club, map[string]interface{}{
		"slug": graphql.String(id),
	})

	require.NoError(t, err, "no error viewing suspension logs")

	return club
}

func TestSuspendClub_and_unsuspend(t *testing.T) {
	t.Parallel()

	staffAccountId := uuid.New().String()
	mockAccountStaff(t, staffAccountId)

	client := getGraphqlClientWithAuthenticatedAccount(t, staffAccountId)
	grpcClient := getGrpcClient(t)
	clb := seedClub(t, staffAccountId)
	relayId := convertClubIdToRelayId(clb.ID())
	clubId := clb.ID()

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.SuspendClub, mock.Anything)

	var suspendClub SuspendClub
	err := client.Mutate(context.Background(), &suspendClub, map[string]interface{}{
		"input": types.SuspendClubInput{
			ClubID:  relayId,
			EndTime: time.Now().Add(time.Hour * 24 * 30),
		},
	})

	require.NoError(t, err, "no error suspending club")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	refreshClubESIndex(t)

	// make sure thumbnail is set
	updatedClb := getSuspensionClub(t, client, clb.Slug())
	require.NotNil(t, updatedClb.Club.Suspension, "club is suspended")
	require.Len(t, updatedClb.Club.SuspensionLogs.Edges, 1, "should have 1 suspension log")
	require.Equal(t, types.ClubSuspensionReasonManual, updatedClb.Club.SuspensionLogs.Edges[0].Node.ItemIssued.Reason, "should have 1 suspension log")

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.SuspendClub, mock.Anything)

	_, err = grpcClient.SuspendClub(context.Background(), &stella.SuspendClubRequest{
		ClubId:      clubId,
		EndTimeUnix: time.Now().Add(time.Hour * 24).Unix(),
	})

	require.NoError(t, err, "no error suspending club")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(application.TemporalClient, workflows.UnSuspendClub, mock.Anything)

	var unSuspendClub UnSuspendClub
	err = client.Mutate(context.Background(), &unSuspendClub, map[string]interface{}{
		"input": types.UnSuspendClubInput{
			ClubID: relayId,
		},
	})

	require.NoError(t, err, "no error un suspending club")

	workflowExecution.FindAndExecuteWorkflow(t, getWorkflowEnvironment())

	updatedClb = getSuspensionClub(t, client, clb.Slug())
	require.Nil(t, updatedClb.Club.Suspension, "club is suspended")
	require.Len(t, updatedClb.Club.SuspensionLogs.Edges, 3, "should have 3 suspension logs")
	require.NotNil(t, updatedClb.Club.SuspensionLogs.Edges[2].Node.ItemRemoved, "should have a removed log type")
}
