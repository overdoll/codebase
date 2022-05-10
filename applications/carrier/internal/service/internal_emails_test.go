package service_test

import (
	"context"
	_ "embed"
	"github.com/stretchr/testify/require"
	"os"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

//go:embed file_fixtures/account_deleted_test.html
var clubOverChargebackThresholdHtml string

//go:embed file_fixtures/account_deleted_test.txt
var clubOverChargebackThresholdText string

//go:embed file_fixtures/account_deleted_test.html
var clubSupporterNoPostsHtml string

//go:embed file_fixtures/account_deleted_test.txt
var clubSupporterNoPostsText string

func TestInternalEmails(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	clubId := uuid.New().String()

	timestampFrom := time.Now()

	_, err := client.ClubOverChargebackThreshold(context.Background(), &carrier.ClubOverChargebackThresholdRequest{
		Club:      &carrier.Club{Id: clubId},
		Threshold: 0.005,
	})

	require.NoError(t, err, "no error for sending club over chargeback threshold")

	content := waitForEmailAndGetResponse(t, os.Getenv("STAFF_ADDRESS"), timestampFrom)

	require.Equal(t, "testclub has went over the chargeback threshold", content.Subject, "correct subject for the email")
	//require.Equal(t, clubOverChargebackThresholdHtml, content.Html, "correct content for the email html")
	require.Equal(t, clubOverChargebackThresholdText, content.Text, "correct content for the email text")

	// need a sleep function here or else the emails conflict
	time.Sleep(time.Second)

	timestampFrom = time.Now()

	_, err = client.ClubSupporterNoPosts(context.Background(), &carrier.ClubSupporterNoPostsRequest{
		Club: &carrier.Club{Id: clubId},
	})

	require.NoError(t, err, "no error for sending club supporter no posts")

	content = waitForEmailAndGetResponse(t, os.Getenv("STAFF_ADDRESS"), timestampFrom)

	require.Equal(t, "testclub has not posted any supporter-only content", content.Subject, "correct subject for the email")
	//	require.Equal(t, clubSupporterNoPostsHtml, content.Html, "correct content for the email html")
	require.Equal(t, clubSupporterNoPostsText, content.Text, "correct content for the email text")
}
