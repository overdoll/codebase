package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"os"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

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

	doc := waitForEmailAndGetDocument(t, os.Getenv("STAFF_ADDRESS"), timestampFrom)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Club Over Chargeback Threshold", title.Text(), "has the correct email title")

	// need a sleep function here or else the emails conflict
	time.Sleep(time.Second)

	timestampFrom = time.Now()

	_, err = client.ClubSupporterNoPosts(context.Background(), &carrier.ClubSupporterNoPostsRequest{
		Club: &carrier.Club{Id: clubId},
	})

	require.NoError(t, err, "no error for sending club supporter no posts")

	doc = waitForEmailAndGetDocument(t, os.Getenv("STAFF_ADDRESS"), timestampFrom)

	title = doc.Find("head").Find("title").First()
	require.Equal(t, "Supporter No Posts", title.Text(), "has the correct email title")
}
