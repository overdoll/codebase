package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
	"time"
)

func TestAccountDeleted(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	_, err := client.AccountDeleted(context.Background(), &carrier.AccountDeletedRequest{
		Email:    email,
		Username: accountId,
	})

	require.NoError(t, err, "no error for sending account deleted")

	doc := waitForEmailAndGetDocument(t, email, timestampFrom)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Account Deleted", title.Text(), "has the correct email title")
}
