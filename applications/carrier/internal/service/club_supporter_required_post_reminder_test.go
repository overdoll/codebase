package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

func TestClubSupporterRequiredPostReminder(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	clubId := uuid.New().String()
	email := generateEmail("carrier-" + clubId)

	_, err := client.ClubSupporterRequiredPostReminder(context.Background(), &carrier.ClubSupporterRequiredPostReminderRequest{
		Club:       &carrier.Club{Id: clubId},
		TimePassed: 1651849358004,
	})

	require.NoError(t, err, "no error for sending club supporter required post reminder")

	doc := waitForEmailAndGetDocument(t, email, timestampFrom)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Supporter Post Required", title.Text(), "has the correct email title")
}
