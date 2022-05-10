package service_test

import (
	"bytes"
	"context"
	"github.com/PuerkitoBio/goquery"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"net/http"
	"os"
	"reflect"
	"strings"
	"testing"
	"time"
	"unicode"
)

const (
	testmailApiEndpoint = "https://api.testmail.app/api/graphql"
)

type Content struct {
	Subject string
	Html    string
	Text    string
}

type Inbox struct {
	Inbox struct {
		Result string
		Count  int
		Emails []*Content
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

func stripSpaces(str string) string {
	return strings.Map(func(r rune) rune {
		if unicode.IsSpace(r) {
			// if the character is a space, drop it
			return -1
		}
		// else keep it in the string
		return r
	}, str)
}

func waitForEmailAndGetResponse(t *testing.T, email string, timestampFrom time.Time) *Content {

	parts := strings.Split(email, "@")
	main := strings.Split(parts[0], ".")
	tag := strings.Join(main[1:], ".")

	client := &http.Client{Transport: &addHeaderTransport{}}

	gClient := graphql.NewClient(testmailApiEndpoint, client)

	var queryInbox Inbox

	err := gClient.Query(context.Background(), &queryInbox, map[string]interface{}{
		"namespace":      graphql.String(os.Getenv("TESTMAIL_NAMESPACE")),
		"tag":            graphql.String(tag),
		"timestamp_from": graphql.Float(timestampFrom.UnixMilli()),
	})

	require.NoError(t, err, "no error for waiting for email to arrive")
	require.Equal(t, 1, queryInbox.Inbox.Count)
	require.Equal(t, "success", queryInbox.Inbox.Result)

	return queryInbox.Inbox.Emails[0]
}

func compareHtml(t *testing.T, expected string, actual string) bool {

	expectedReader := bytes.NewReader([]byte(expected))
	expectedDoc, err := goquery.NewDocumentFromReader(expectedReader)
	require.NoError(t, err, "no error for parsing html document for expected")

	actualReader := bytes.NewReader([]byte(actual))
	actualDoc, err := goquery.NewDocumentFromReader(actualReader)
	require.NoError(t, err, "no error for parsing html document for actual")

	return reflect.DeepEqual(expectedDoc, actualDoc)
}
