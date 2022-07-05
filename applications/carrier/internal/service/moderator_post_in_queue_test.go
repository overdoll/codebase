package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/moderator_post_in_queue.html
var moderatorPostInQueueHtml string

//go:embed file_fixtures/moderator_post_in_queue.txt
var moderatorPostInQueueText string

func TestModeratorPostInQueue(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: "test user"}, nil).Once()

	_, err := client.ModeratorPostInQueue(context.Background(), &carrier.ModeratorPostInQueueRequest{
		Account: &carrier.Account{Id: accountId},
	})

	require.NoError(t, err, "no error for sending moderator post in queue")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("moderator_post_in_queue.html", content.Html)
		generateEmailFileFixture("moderator_post_in_queue.txt", content.Text)
	} else {
		require.Equal(t, "Posts in moderation queue", content.Subject, "correct subject for the email")
		require.Equal(t, moderatorPostInQueueHtml, content.Html, "correct content for the email html")
		require.Equal(t, moderatorPostInQueueText, content.Text, "correct content for the email text")
	}
}
