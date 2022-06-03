package sentry_support

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/getsentry/sentry-go"
	"io"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
)

func NewElasticObserverHttpClient() *http.Client {
	return &http.Client{Transport: &ElasticObserverTransport{}}
}

// ElasticObserverTransport for tracing Elastic operations.
type ElasticObserverTransport struct{}

// RoundTrip captures the request and starts an OpenTracing span
// for Elastic PerformRequest operation.
func (t *ElasticObserverTransport) RoundTrip(req *http.Request) (*http.Response, error) {

	start := time.Now()

	var bd []byte

	if req.Body != nil {
		var buf bytes.Buffer
		tee := io.TeeReader(req.Body, &buf)
		bd, _ = ioutil.ReadAll(tee)

		req.Body = ioutil.NopCloser(strings.NewReader(string(bd)))
	}

	resp, err := http.DefaultTransport.RoundTrip(req)

	if hub := sentry.GetHubFromContext(req.Context()); hub != nil {
		level := "info"
		if resp.StatusCode != 200 && resp.StatusCode != 201 {
			level = "error"
		}

		var data map[string]interface{}

		_ = json.Unmarshal(bd, &data)

		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Type:     "query",
			Category: "elastic.request",
			Message:  fmt.Sprintf("%s %s took %s", req.Method, req.URL.Path, time.Now().Sub(start).String()),
			Data:     data,
			Level:    sentry.Level(level),
		}, 10)
	}

	return resp, err
}
