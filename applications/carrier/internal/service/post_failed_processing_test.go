package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	sting "overdoll/applications/sting/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/post_failed_processing_test.html
var postFailedProcessingHtml string

//go:embed file_fixtures/post_failed_processing_test.txt
var postFailedProcessingText string

func TestPostFailedProcessing(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	postId := "2DrcfzDIGh5WEtrmjOMuBCKWrjc"
	clubId := uuid.New().String()

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: "test user"}, nil).Once()
	application.StingClient.On("GetPost", mock.Anything, &sting.PostRequest{Id: postId}).Return(&sting.Post{AccountId: accountId, ClubId: clubId}, nil).Once()
	application.StingClient.On("GetClubById", mock.Anything, &sting.GetClubByIdRequest{ClubId: clubId}).Return(&sting.GetClubByIdResponse{Club: &sting.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	_, err := client.PostFailedProcessing(context.Background(), &carrier.PostFailedProcessingRequest{
		Post: &carrier.Post{Id: postId},
	})

	require.NoError(t, err, "no error for sending post failed processing")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("post_failed_processing_test.html", content.Html)
		generateEmailFileFixture("post_failed_processing_test.txt", content.Text)
	} else {
		require.Equal(t, "Post failed processing", content.Subject, "correct subject for the email")
		require.Equal(t, postFailedProcessingHtml, content.Html, "correct content for the email html")
		require.Equal(t, postFailedProcessingText, content.Text, "correct content for the email text")
	}
}
