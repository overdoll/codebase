package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	workflows "overdoll/applications/stella/internal/app/workflows"
	"overdoll/applications/stella/internal/ports/graphql/types"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/testing_tools"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

type ClubMemberModified struct {
	ID       string
	JoinedAt time.Time
	Account  struct {
		ID string
	}
	Club struct {
		ID        string
		Reference string
	}
	IsSupporter bool
}

type ClubViewerMember struct {
	ID           string
	ViewerMember *ClubMemberModified
	MembersCount int
	Members      struct {
		Edges []struct {
			Node ClubMemberModified
		}
	}
}

type ClubViewer struct {
	Club *ClubViewerMember `graphql:"club(slug: $slug)"`
}

type AccountClubDetails struct {
	Entities []struct {
		Account struct {
			ID                   string
			ClubMembershipsCount int
			ClubMemberships      struct {
				Edges []struct {
					Node ClubMemberModified
				}
			}
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

func getClubViewer(t *testing.T, client *graphql.Client, id string) ClubViewer {
	var club ClubViewer

	err := client.Query(context.Background(), &club, map[string]interface{}{
		"slug": graphql.String(id),
	})

	require.NoError(t, err)

	return club
}

type JoinClub struct {
	JoinClub *struct {
		ClubMember *ClubMemberModified
	} `graphql:"joinClub(input: $input)"`
}

type LeaveClub struct {
	LeaveClub *struct {
		ClubMemberId string
	} `graphql:"leaveClub(input: $input)"`
}

// TestCreateClub_edit_name - create a club and edit the name
func TestCreateClub_become_member_and_withdraw(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t, uuid.New().String())
	clubId := clb.ID()
	relayId := convertClubIdToRelayId(clb.ID())

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.AddClubMember, mock.Anything)

	// become a club member
	var joinClub JoinClub
	err := client.Mutate(context.Background(), &joinClub, map[string]interface{}{
		"input": types.JoinClubInput{ClubID: relayId},
	})
	require.NoError(t, err, "no error becoming a club member")

	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.UpdateClubMemberTotalCount)
	workflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// get club and check that the viewer is part of it
	clubViewer := getClubViewer(t, client, clb.Slug())
	require.NotNil(t, clubViewer.Club.ViewerMember, "club viewer is available")

	// make sure count is "2"
	require.Equal(t, 2, clubViewer.Club.MembersCount, "two club members total, including the original owner")

	// grab account ID so we can look through club members
	accountId := clubViewer.Club.ViewerMember.Account.ID

	require.Equal(t, accountId, clubViewer.Club.Members.Edges[1].Node.Account.ID, "should have found the account in the club member list")

	// query accountPosts once more, make sure post is no longer visible
	var accountClubDetails AccountClubDetails

	err = client.Query(context.Background(), &accountClubDetails, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(testingAccountId),
			},
		},
	})

	require.NoError(t, err, "no error viewing club details for account")
	require.Equal(t, 1, accountClubDetails.Entities[0].Account.ClubMembershipsCount, "one membership added")
	require.Len(t, accountClubDetails.Entities[0].Account.ClubMemberships.Edges, 1, "should have only 1 member")
	require.Equal(t, accountId, accountClubDetails.Entities[0].Account.ClubMemberships.Edges[0].Node.Account.ID, "should have found the club member in account's club membership list")

	// grpc: check the results are the same
	grpcClient := getGrpcClient(t)

	// check permissions
	res, err := grpcClient.GetAccountClubMembershipIds(context.Background(), &stella.GetAccountClubMembershipIdsRequest{
		AccountId: testingAccountId,
	})

	require.NoError(t, err, "no error grabbing club memberships for account")
	require.Len(t, res.ClubIds, 1, "should have 1 club id")

	require.Equal(t, clubId, res.ClubIds[0], "should have a matching club ID")

	// now, make this member a supporter
	canBecomeSupporter, err := grpcClient.CanAccountBecomeClubSupporter(context.Background(), &stella.CanAccountBecomeClubSupporterRequest{
		AccountId: testingAccountId,
		ClubId:    clubId,
	})
	require.NoError(t, err, "no error getting permission for supporter")
	require.True(t, canBecomeSupporter.Allowed, "allowed to become a supporter")

	addSupporterWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.AddClubSupporter, mock.Anything)

	// now, make this member a supporter
	_, err = grpcClient.AddClubSupporter(context.Background(), &stella.AddClubSupporterRequest{
		AccountId:   testingAccountId,
		ClubId:      clubId,
		SupportedAt: timestamppb.Now(),
	})
	require.NoError(t, err, "no error making a club member a supporter")

	// run supporter method
	env = getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.UpdateClubMemberTotalCount)
	addSupporterWorkflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	clubViewer = getClubViewer(t, client, clb.Slug())
	require.True(t, clubViewer.Club.ViewerMember.IsSupporter, "should now be a supporter of club")

	removeSupporterWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.RemoveClubSupporter, mock.Anything)

	// now, make this member a supporter
	_, err = grpcClient.RemoveClubSupporter(context.Background(), &stella.RemoveClubSupporterRequest{
		AccountId: testingAccountId,
		ClubId:    clubId,
	})
	require.NoError(t, err, "no error making a club member a supporter")

	// run supporter method
	env = getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.UpdateClubMemberTotalCount)
	removeSupporterWorkflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	clubViewer = getClubViewer(t, client, clb.Slug())
	require.False(t, clubViewer.Club.ViewerMember.IsSupporter, "should no longer be a supporter of the club")

	removeMemberWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(temporalClientMock, workflows.RemoveClubMember, mock.Anything)

	// withdraw club membership
	var leaveClub LeaveClub
	err = client.Mutate(context.Background(), &leaveClub, map[string]interface{}{
		"input": types.LeaveClubInput{ClubID: relayId},
	})
	require.NoError(t, err, "no error withdrawing club membership")

	env = getWorkflowEnvironment(t)
	removeMemberWorkflowExecution.FindAndExecuteWorkflow(t, env)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// get club and check that the viewer is part of it
	clubViewer = getClubViewer(t, client, clb.Slug())
	require.Nil(t, clubViewer.Club.ViewerMember, "club viewer no longer available")

	// make sure count is 1
	require.Equal(t, 1, clubViewer.Club.MembersCount, "only 1 member, owner")
	require.Len(t, clubViewer.Club.Members.Edges, 1, "edges count is 1, owner only")
}
