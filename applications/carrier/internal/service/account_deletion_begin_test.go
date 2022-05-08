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

func TestAccountDeletionBegin(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	timestampFrom := time.Now()

	accountId := uuid.New().String()
	email := generateEmail("carrier-" + accountId)

	_, err := client.AccountDeletionBegin(context.Background(), &carrier.AccountDeletionBeginRequest{
		Account:      &carrier.Account{Id: accountId},
		DeletionDate: timestamppb.New(time.Now()),
	})

	require.NoError(t, err, "no error for sending account deletion begin request")

	doc := waitForEmailAndGetDocument(t, email, timestampFrom)

	title := doc.Find("head").Find("title").First()
	require.Equal(t, "Account Deletion Begin", title.Text(), "has the correct email title")
}
