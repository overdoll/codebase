package service_test

import (
	"bytes"
	"context"
	"github.com/PuerkitoBio/goquery"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"net/http"
	"os"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/libraries/uuid"
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

// add testmail API key to header
type addHeaderTransport struct{}

func (adt *addHeaderTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	req.Header.Add("Authorization", "Bearer "+os.Getenv("TESTMAIL_API_KEY"))
	return http.DefaultTransport.RoundTrip(req)
}

func generateEmail(name string) string {
	return os.Getenv("TESTMAIL_NAMESPACE") + "." + name + "@inbox.testmail.app"
}

func waitForEmailAndGetDocument(t *testing.T, email string) *goquery.Document {

	parts := strings.Split(email, "@")
	main := strings.Split(parts[0], ".")
	tag := strings.Join(main[1:], ".")

	client := &http.Client{Transport: &addHeaderTransport{}}

	gClient := graphql.NewClient(testmailApiEndpoint, client)

	var queryInbox Inbox

	err := gClient.Query(context.Background(), &queryInbox, map[string]interface{}{
		"namespace":      graphql.String(os.Getenv("TESTMAIL_NAMESPACE")),
		"tag":            graphql.String(tag),
		"timestamp_from": graphql.Float(float64(timestampFrom.UnixMilli())),
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

	email := generateEmail("carrier-confirm_account_email")
	token := uuid.New().String()
	secret := uuid.New().String()

	_, err := client.ConfirmAccountEmail(context.Background(), &carrier.ConfirmAccountEmailRequest{Account: &carrier.Account{Id: "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"}, Email: email, Id: token, Secret: secret})

	require.NoError(t, err, "no error for sending confirm account email")

	doc := waitForEmailAndGetDocument(t, email)

	link := doc.Find("a").First()

	val, exists := link.Attr("href")
	require.True(t, exists)

	require.Contains(t, os.Getenv("APP_URL")+"/confirm-email?id="+token+"&secret="+secret, val)
}

func TestNewLoginTokenEmail(t *testing.T) {
	t.Parallel()

	client := getGrpcClient()

	email := generateEmail("carrier-new_login_token")
	token := uuid.New().String()
	secret := uuid.New().String()

	_, err := client.NewLoginToken(context.Background(), &carrier.NewLoginTokenRequest{Email: email, Language: "en", Token: token, Secret: secret})

	require.NoError(t, err, "no error for sending login token email")

	doc := waitForEmailAndGetDocument(t, email)

	link := doc.Find("a").First()

	val, exists := link.Attr("href")
	require.True(t, exists)

	require.Contains(t, os.Getenv("APP_URL")+"/verify-token?token="+token+"&secret="+secret, val)
}
