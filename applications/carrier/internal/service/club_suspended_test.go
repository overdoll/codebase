package service_test

import (
	"context"
	_ "embed"
	"fmt"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
	eva "overdoll/applications/eva/proto"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/club_suspended_test.html
var clubSuspendedHtml string

//go:embed file_fixtures/club_suspended_test.txt
var clubSuspendedText string

func TestClubSuspended(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	accountId := uuid.New().String()
	clubId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{Id: accountId, Email: email, Username: accountId}, nil).Once()
	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId, Slug: "test-club", Name: "test a club"}}, nil).Once()

	tm, _ := time.Parse(time.RFC3339, "2022-03-01 03:27:56 +0000 UTC")
	fmt.Println(tm.String())

	_, err := client.ClubSuspended(context.Background(), &carrier.ClubSuspendedRequest{
		Club:    &carrier.Club{Id: clubId},
		EndTime: timestamppb.New(tm),
	})

	require.NoError(t, err, "no error for sending club suspended")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	if generateEmailFileFixturesRequest() {
		generateEmailFileFixture("club_suspended_test.html", content.Html)
		generateEmailFileFixture("club_suspended_test.txt", content.Text)
	} else {
		require.Equal(t, "Suspension for test a club", content.Subject, "correct subject for the email")
		require.Equal(t, clubSuspendedHtml, content.Html, "correct content for the email html")
		require.Equal(t, clubSuspendedText, content.Text, "correct content for the email text")
	}
}
