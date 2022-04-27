package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"os"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
	"testing"
)

func TestNewLoginTokenEmail(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	email := generateEmail("carrier-new_login_token")
	token := uuid.New().String()
	secret := uuid.New().String()

	_, err := client.NewLoginToken(context.Background(), &carrier.NewLoginTokenRequest{Email: email, Token: token, Secret: secret})

	require.NoError(t, err, "no error for sending login token email")

	doc := waitForEmailAndGetDocument(t, email)

	link := doc.Find("a").First()

	val, exists := link.Attr("href")
	require.True(t, exists)

	require.Contains(t, os.Getenv("APP_URL")+"/verify-token?token="+token+"&secret="+secret, val)
}
