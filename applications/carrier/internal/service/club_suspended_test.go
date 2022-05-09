package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/timestamppb"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

func TestClubSuspended(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	clubId := uuid.New().String()
	email := generateEmail("carrier-" + clubId)

	_, err := client.ClubSuspended(context.Background(), &carrier.ClubSuspendedRequest{
		Club:    &carrier.Club{Id: clubId},
		EndTime: timestamppb.New(time.Now()),
	})

	require.NoError(t, err, "no error for sending club suspended")

	doc := waitForEmailAndGetDocument(t, email, timestampFrom)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Club Suspended", title.Text(), "has the correct email title")
}
