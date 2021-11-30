package service_test

import (
	"bytes"
	"context"
	"github.com/PuerkitoBio/goquery"
	"github.com/segmentio/ksuid"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"os"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/passport"
	"strings"
	"testing"
	"time"
)

const (
	testmailApiEndpoint = "https://api.testmail.app/api/graphql"
)

var (
	timestampFrom = time.Now()
)

type Inbox struct {
	Inbox struct {
		Result string
		Count  int
		Emails []struct {
			Subject string
			Html    string
			Text    string
		}
	} `graphql:"inbox(namespace: $namespace, tag: $tag, timestamp_from: $timestamp_from, livequery: true)"`
}

func generateEmail(name string) string {
	return os.Getenv("TESTMAIL_NAMESPACE") + "." + name + "@inbox.testmail.app"
}

func waitForEmailAndGetDocument(t *testing.T, email string) *goquery.Document {

	parts := strings.Split(email, "@")
	main := strings.Split(parts[0], ".")
	tag := main[1]

	headers := make(map[string]string)
	headers["Authorization"] = "Bearer: " + os.Getenv("TESTMAIL_API_KEY")

	client := passport.NewHTTPTestClientWithCustomHeaders(headers)
	gClient := graphql.NewClient(testmailApiEndpoint, client)

	var queryInbox Inbox

	err := gClient.Query(context.Background(), &queryInbox, map[string]interface{}{
		"namespace":      graphql.String(os.Getenv("TESTMAIL_NAMESPACE")),
		"tag":            graphql.String(tag),
		"timestamp_from": graphql.Int(timestampFrom.Unix()),
	})

	require.NoError(t, err, "no error for waiting for email to arrive")
	require.Equal(t, 1, queryInbox.Inbox.Count)
	require.Equal(t, "success", queryInbox.Inbox.Result)

	// convert byte slice to io.Reader
	reader := bytes.NewReader([]byte(queryInbox.Inbox.Emails[0].Html))

	doc, err := goquery.NewDocumentFromReader(reader)

	require.NoError(t, err, "no error for parsing html document")

	return doc
}

func TestConfirmAccountEmail(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	email := generateEmail("carrier.confirm_account_email")
	token := ksuid.New().String()

	_, err := client.ConfirmAccountEmail(context.Background(), &carrier.ConfirmAccountEmailRequest{Account: &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"}, Email: email, Token: token})

	require.NoError(t, err, "no error for sending confirm account email")

	doc := waitForEmailAndGetDocument(t, email)

	link := doc.Find("a").First()

	require.Contains(t, os.Getenv("APP_URL")+"/confirmation?id="+token, link.Text())
}

func TestNewLoginTokenEmail(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	email := generateEmail("carrier.new_login_token")
	token := ksuid.New().String()

	_, err := client.NewLoginToken(context.Background(), &carrier.NewLoginTokenRequest{Email: email, Language: "en-US", Token: token})

	require.NoError(t, err, "no error for sending login token email")

	doc := waitForEmailAndGetDocument(t, email)

	link := doc.Find("a").First()

	require.Contains(t, os.Getenv("APP_URL")+"/join?id="+token, link.Text())
}
