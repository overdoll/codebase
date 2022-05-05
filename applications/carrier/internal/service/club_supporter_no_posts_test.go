package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
)

func TestClubSupporterNoPosts(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	clubId := uuid.New().String()
	email := generateEmail("carrier-" + clubId)

	_, err := client.ClubSupporterNoPosts(context.Background(), &carrier.ClubSupporterNoPostsRequest{
		Club: &carrier.Club{Id: clubId},
	})

	require.NoError(t, err, "no error for sending club supporter no posts")

	doc := waitForEmailAndGetDocument(t, email)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Supporter No Posts", title.Text(), "has the correct email title")
}
