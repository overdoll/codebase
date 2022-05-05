package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
)

func TestClubOverChargebackThresholdTest(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	clubId := uuid.New().String()
	email := generateEmail("carrier-" + clubId)

	_, err := client.ClubOverChargebackThreshold(context.Background(), &carrier.ClubOverChargebackThresholdRequest{
		Club:      &carrier.Club{Id: clubId},
		Threshold: 0.005,
	})

	require.NoError(t, err, "no error for sending club over chargeback threshold")

	doc := waitForEmailAndGetDocument(t, email)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Club Over Chargeback Threshold", title.Text(), "has the correct email title")
}
