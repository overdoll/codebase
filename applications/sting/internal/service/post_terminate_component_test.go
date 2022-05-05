package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/uuid"
	"testing"
)

func TestAddClubAndRemoveClubFromTerminatedList(t *testing.T) {
	t.Parallel()

	grpcClient := getGrpcClient(t)

	testingAccountId := newFakeAccount(t)
	clubId := uuid.New().String()
	publishedPost := seedPublishedPost(t, clubId)
	postId := publishedPost.ID()

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	pst := getPost(t, client, postId)

	require.NotNil(t, pst.Post, "post is not nil")

	// add club to terminated list
	_, err := grpcClient.AddTerminatedClub(context.Background(), &sting.AddTerminatedClubRequest{ClubId: clubId})
	require.NoError(t, err, "no error terminating club")

	pst = getPost(t, client, postId)
	// post should no longer be visible after terminating
	require.Nil(t, pst.Post, "post should be nil")

	_, err = grpcClient.RemoveTerminatedClub(context.Background(), &sting.RemoveTerminatedClubRequest{ClubId: clubId})
	require.NoError(t, err, "no error terminating club")

	pst = getPost(t, client, postId)
	// post should now be visible once again
	require.NotNil(t, pst.Post, "post is not nil")
}
