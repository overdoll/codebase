package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/app/workflows"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"testing"
	"time"
)

type ClubMemberModifiedNoAccount struct {
	ID       string
	JoinedAt time.Time
	Account  struct {
		ID string
	}
}

type ClubMemberModified struct {
	ID       string
	JoinedAt time.Time
	Account  struct {
		ID                   string
		ClubMembershipsCount int
		ClubMemberships      struct {
			Edges []struct {
				Node ClubMemberModifiedNoAccount
			}
		}
	}
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

func getClubViewer(t *testing.T, client *graphql.Client, id string) ClubViewer {
	var club ClubViewer

	err := client.Query(context.Background(), &club, map[string]interface{}{
		"slug": graphql.String(id),
	})

	require.NoError(t, err)

	return club
}

type BecomeClubMember struct {
	BecomeClubMember *struct {
		ClubMember *ClubMemberModified
	} `graphql:"becomeClubMember(input: $input)"`
}

type WithdrawClubMembership struct {
	WithdrawClubMembership *struct {
		ClubMemberId string
	} `graphql:"withdrawClubMembership(input: $input)"`
}

// TestCreateClub_edit_name - create a club and edit the name
func TestCreateClub_become_member_and_withdraw(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)
	clb := seedClub(t)
	relayId := convertClubIdToRelayId(clb.ID())

	// become a club member
	var becomeClubMember BecomeClubMember
	err := client.Mutate(context.Background(), &becomeClubMember, map[string]interface{}{
		"input": types.BecomeClubMemberInput{ClubID: relayId},
	})
	require.NoError(t, err, "no error becoming a club member")

	env := getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.UpdateClubMemberTotalCount)
	// execute workflow manually since it won't be
	env.ExecuteWorkflow(workflows.AddClubMember, clb.ID(), testingAccountId)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// get club and check that the viewer is part of it
	clubViewer := getClubViewer(t, client, clb.Slug())
	require.NotNil(t, clubViewer.Club.ViewerMember, "club viewer is available")

	// make sure count is "1"
	require.Equal(t, 1, clubViewer.Club.MembersCount, "one club member added")
	require.Equal(t, 1, clubViewer.Club.ViewerMember.Account.ClubMembershipsCount, "one membership added")

	// grab account ID so we can look through club members
	accountId := clubViewer.Club.ViewerMember.Account.ID

	foundClubMember := false

	for _, member := range clubViewer.Club.Members.Edges {
		if member.Node.Account.ID == accountId {
			foundClubMember = true
			break
		}
	}

	require.True(t, foundClubMember, "should have found the account in the club member list")

	foundAccountClubMember := false

	for _, member := range clubViewer.Club.ViewerMember.Account.ClubMemberships.Edges {
		if member.Node.Account.ID == accountId {
			foundAccountClubMember = true
			break
		}
	}

	require.True(t, foundAccountClubMember, "should have found the club member in account's club membership list")

	// withdraw club membership
	var withdrawClubMembership WithdrawClubMembership
	err = client.Mutate(context.Background(), &withdrawClubMembership, map[string]interface{}{
		"input": types.WithdrawClubMembershipInput{ClubID: relayId},
	})
	require.NoError(t, err, "no error withdrawing club membership")

	env = getWorkflowEnvironment(t)
	env.RegisterWorkflow(workflows.UpdateClubMemberTotalCount)
	// execute workflow manually since it won't be
	env.ExecuteWorkflow(workflows.RemoveClubMember, clb.ID(), testingAccountId)
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())

	// get club and check that the viewer is part of it
	clubViewer = getClubViewer(t, client, clb.Slug())
	require.Nil(t, clubViewer.Club.ViewerMember, "club viewer no longer available")

	// make sure count is 0
	require.Equal(t, 0, clubViewer.Club.MembersCount, "no club members exist anymore")
	require.Len(t, clubViewer.Club.Members.Edges, 0, "empty members list")
}
