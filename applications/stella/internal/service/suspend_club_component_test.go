package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"overdoll/applications/stella/internal/app/workflows"
	"overdoll/applications/stella/internal/ports/graphql/types"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/testing_tools"
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
	ID             string
	Reference      string
	Slug           string
	Name           string
	SuspensionLogs struct {
		Edges []struct {
			Node struct {
				ItemIssued  *types.ClubIssuedSuspensionLog  `graphql:"... on ClubIssuedSuspensionLog"`
				ItemRemoved *types.ClubRemovedSuspensionLog `graphql:"... on ClubRemovedSuspensionLog"`
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

	staffAccountId := "1q7MJ5IyRTV0X4J27F3m5wGD5mj"

	client := getGraphqlClientWithAuthenticatedAccount(t, staffAccountId)
	grpcClient := getGrpcClient(t)
	clb := seedClub(t, staffAccountId)
	relayId := convertClubIdToRelayId(clb.ID())
	clubId := clb.ID()

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.SuspendClub, mock.Anything)

	var suspendClub SuspendClub
	err := client.Mutate(context.Background(), &suspendClub, map[string]interface{}{
		"input": types.SuspendClubInput{
			ClubID:  relayId,
			EndTime: time.Now().Add(time.Hour * 24 * 30),
		},
	})

	require.NoError(t, err, "no error suspending club")

	env := getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	refreshClubESIndex(t)

	// make sure thumbnail is set
	updatedClb := getSuspensionClub(t, client, clb.Slug())
	require.NotNil(t, updatedClb.Club.Suspension, "club is suspended")
	require.Len(t, updatedClb.Club.SuspensionLogs.Edges, 1, "should have 1 suspension log")
	require.Equal(t, types.ClubSuspensionReasonManual, updatedClb.Club.SuspensionLogs.Edges[0].Node.ItemIssued.Reason, "should have 1 suspension log")

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.SuspendClub, mock.Anything)

	_, err = grpcClient.SuspendClub(context.Background(), &stella.SuspendClubRequest{
		ClubId:      clubId,
		EndTimeUnix: time.Now().Add(time.Hour * 24).Unix(),
	})

	require.NoError(t, err, "no error suspending club")

	env = getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.UnSuspendClub, mock.Anything)

	var unSuspendClub UnSuspendClub
	err = client.Mutate(context.Background(), &unSuspendClub, map[string]interface{}{
		"input": types.UnSuspendClubInput{
			ClubID: relayId,
		},
	})

	updatedClb = getSuspensionClub(t, client, clb.Slug())
	require.NotNil(t, updatedClb.Club.Suspension, "club is suspended")
	require.Len(t, updatedClb.Club.SuspensionLogs.Edges, 3, "should have 3 suspension logs")
	require.NotNil(t, updatedClb.Club.SuspensionLogs.Edges[2].Node.ItemRemoved, "should have a removed log type")

	require.NoError(t, err, "no error un suspending club")

	env = getWorkflowEnvironment(t)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	updatedClb = getSuspensionClub(t, client, clb.Slug())
	require.Nil(t, updatedClb.Club.Suspension, "club is no longer suspended")
}