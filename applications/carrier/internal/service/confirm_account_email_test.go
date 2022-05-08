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

func TestConfirmAccountEmail(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()
	timestampFrom := time.Now()

	email := generateEmail("carrier-confirm_account_email")
	token := uuid.New().String()
	secret := uuid.New().String()

	_, err := client.ConfirmAccountEmail(context.Background(), &carrier.ConfirmAccountEmailRequest{
		Account: &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"}, Email: email, Id: token, Secret: secret})

	require.NoError(t, err, "no error for sending confirm account email")

	doc := waitForEmailAndGetDocument(t, email, timestampFrom)

	link := doc.Find("a").First()

	val, exists := link.Attr("href")
	require.True(t, exists)

	require.Contains(t, os.Getenv("APP_URL")+"/confirm-email?id="+token+"&secret="+secret, val)
}
