package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
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

	clubId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6_suspended"
	email := generateEmail("carrier-" + clubId)

	tm, err := time.Parse(time.RFC3339, "2022-03-01 03:27:56 +0000 UTC")
	require.NoError(t, err, "no error parsing time")

	_, err = client.ClubSuspended(context.Background(), &carrier.ClubSuspendedRequest{
		Club:    &carrier.Club{Id: clubId},
		EndTime: timestamppb.New(tm),
	})

	require.NoError(t, err, "no error for sending club suspended")

	content := waitForEmailAndGetResponse(t, email, timestampFrom)

	require.Equal(t, "Suspension for testclub", content.Subject, "correct subject for the email")
	require.Equal(t, clubSuspendedHtml, content.Html, "correct content for the email html")
	require.Equal(t, clubSuspendedText, content.Text, "correct content for the email text")
}
