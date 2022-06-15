package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	workflows "overdoll/applications/stella/internal/app/workflows"
	"overdoll/applications/stella/internal/ports/graphql/types"
	"overdoll/applications/stella/internal/service"
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

type ClubViewerMemberSupporters struct {
	MembersIsSupporterCount int
}

type ClubViewer struct {
	Club *ClubViewerMember `graphql:"club(slug: $slug)"`
}

type ClubViewerSupporters struct {
	Club *ClubViewerMemberSupporters `graphql:"club(slug: $slug)"`
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
	service.refreshClubMembersESIndex(t)

	var club ClubViewer

	err := client.Query(context.Background(), &club, map[string]interface{}{
		"slug": graphql.String(id),
	})

	require.NoError(t, err)

	return club
}

func getClubViewerWithSupportersCount(t *testing.T, client *graphql.Client, id string) ClubViewerSupporters {

	var club ClubViewerSupporters

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

	testingAccountId := service.newFakeAccount(t)
	service.mockAccountNormal(t, testingAccountId)
	ownerAccountId := uuid.New().String()
	service.mockAccountNormal(t, ownerAccountId)

	client := service.getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := service.seedClub(t, ownerAccountId)
	clubId := clb.ID()
	relayId := service.convertClubIdToRelayId(clb.ID())

	workflowExecution := testing_tools.NewMockWorkflowWithArgs(service.application.TemporalClient, workflows.AddClubMember, mock.Anything)

	// become a club member
	var joinClub JoinClub
	err := client.Mutate(context.Background(), &joinClub, map[string]interface{}{
		"input": types.JoinClubInput{ClubID: service.convertClubIdToRelayId(clubId)},
	})
	require.NoError(t, err, "no error becoming a club member")

	workflowExecution.FindAndExecuteWorkflow(t, service.getWorkflowEnvironment())

	service.refreshClubESIndex(t)

	// get club and check that the viewer is part of it
	clubViewer := getClubViewer(t, client, clb.Slug())
	require.NotNil(t, clubViewer.Club.ViewerMember, "club viewer is available")

	// make sure count is "2"
	require.Equal(t, 2, clubViewer.Club.MembersCount, "two club members total, including the original owner")

	clubViewerOwner := getClubViewerWithSupportersCount(t, service.getGraphqlClientWithAuthenticatedAccount(t, ownerAccountId), clb.Slug())
	require.Equal(t, 1, clubViewerOwner.Club.MembersIsSupporterCount, "no supporters")

	// grab account ID so we can look through club members
	accountId := clubViewer.Club.ViewerMember.Account.ID

	require.Len(t, clubViewer.Club.Members.Edges, 2, "should have 2 club members in club list")
	require.Equal(t, accountId, clubViewer.Club.Members.Edges[1].Node.Account.ID, "should have found the account in the club member list")

	// query accountPosts once more, make sure post is no longer visible
	var accountClubDetails AccountClubDetails

	err = client.Query(context.Background(), &accountClubDetails, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         service.convertAccountIdToRelayId(testingAccountId),
			},
		},
	})

	require.NoError(t, err, "no error viewing club details for account")
	require.Equal(t, 1, accountClubDetails.Entities[0].Account.ClubMembershipsCount, "one membership added")
	require.Len(t, accountClubDetails.Entities[0].Account.ClubMemberships.Edges, 1, "should have only 1 member")
	require.Equal(t, accountId, accountClubDetails.Entities[0].Account.ClubMemberships.Edges[0].Node.Account.ID, "should have found the club member in account's club membership list")

	// grpc: check the results are the same
	grpcClient := service.getGrpcClient(t)

	// check permissions
	res, err := grpcClient.GetAccountClubDigest(context.Background(), &stella.GetAccountClubDigestRequest{
		AccountId: testingAccountId,
	})

	require.NoError(t, err, "no error grabbing club memberships for account")
	require.Len(t, res.ClubMembershipIds, 1, "should have 1 club id")

	require.Equal(t, clubId, res.ClubMembershipIds[0], "should have a matching club ID")

	addSupporterWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(service.application.TemporalClient, workflows.AddClubSupporter, mock.Anything)

	// now, make this member a supporter
	_, err = grpcClient.AddClubSupporter(context.Background(), &stella.AddClubSupporterRequest{
		AccountId:   testingAccountId,
		ClubId:      clubId,
		SupportedAt: timestamppb.Now(),
	})
	require.NoError(t, err, "no error making a club member a supporter")

	// run supporter method
	addSupporterWorkflowExecution.FindAndExecuteWorkflow(t, service.getWorkflowEnvironment())

	clubViewer = getClubViewer(t, client, clb.Slug())
	require.True(t, clubViewer.Club.ViewerMember.IsSupporter, "should now be a supporter of club")

	clubViewerOwner = getClubViewerWithSupportersCount(t, service.getGraphqlClientWithAuthenticatedAccount(t, ownerAccountId), clb.Slug())
	require.Equal(t, 2, clubViewerOwner.Club.MembersIsSupporterCount, "2 supporters")

	removeSupporterWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(service.application.TemporalClient, workflows.RemoveClubSupporter, mock.Anything)

	// now, make this member a supporter
	_, err = grpcClient.RemoveClubSupporter(context.Background(), &stella.RemoveClubSupporterRequest{
		AccountId: testingAccountId,
		ClubId:    clubId,
	})
	require.NoError(t, err, "no error making a club member a supporter")

	// run supporter method
	removeSupporterWorkflowExecution.FindAndExecuteWorkflow(t, service.getWorkflowEnvironment())

	clubViewer = getClubViewer(t, client, clb.Slug())
	require.False(t, clubViewer.Club.ViewerMember.IsSupporter, "should no longer be a supporter of the club")

	clubViewerOwner = getClubViewerWithSupportersCount(t, service.getGraphqlClientWithAuthenticatedAccount(t, ownerAccountId), clb.Slug())
	require.Equal(t, 1, clubViewerOwner.Club.MembersIsSupporterCount, "no supporters")

	removeMemberWorkflowExecution := testing_tools.NewMockWorkflowWithArgs(service.application.TemporalClient, workflows.RemoveClubMember, mock.Anything)

	// withdraw club membership
	var leaveClub LeaveClub
	err = client.Mutate(context.Background(), &leaveClub, map[string]interface{}{
		"input": types.LeaveClubInput{ClubID: relayId},
	})
	require.NoError(t, err, "no error withdrawing club membership")

	removeMemberWorkflowExecution.FindAndExecuteWorkflow(t, service.getWorkflowEnvironment())

	service.refreshClubESIndex(t)

	// get club and check that the viewer is part of it
	clubViewer = getClubViewer(t, client, clb.Slug())
	require.Nil(t, clubViewer.Club.ViewerMember, "club viewer no longer available")

	// make sure count is 1
	require.Equal(t, 1, clubViewer.Club.MembersCount, "only 1 member, owner")
	require.Len(t, clubViewer.Club.Members.Edges, 1, "edges count is 1, owner only")

	workflowExecution = testing_tools.NewMockWorkflowWithArgs(service.application.TemporalClient, workflows.AddClubMember, mock.Anything)

	err = client.Mutate(context.Background(), &joinClub, map[string]interface{}{
		"input": types.JoinClubInput{ClubID: service.convertClubIdToRelayId(clubId)},
	})
	require.NoError(t, err, "no error becoming a club member")

	workflowExecution.FindAndExecuteWorkflow(t, service.getWorkflowEnvironment())

	_, err = grpcClient.DeleteAccountData(context.Background(), &stella.DeleteAccountDataRequest{AccountId: testingAccountId})
	require.NoError(t, err, "no error deleting account data")

	clubViewer = getClubViewer(t, client, clb.Slug())
	require.Nil(t, clubViewer.Club.ViewerMember, "should no longer be a member")
}
