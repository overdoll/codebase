package passport

import (
	"bytes"
	"fmt"
	"github.com/gorilla/sessions"
	"io/ioutil"
	"net/http"
	"net/http/cookiejar"
)

type headerTransport struct {
	base    http.RoundTripper
	headers map[string]string
	store   sessions.Store
}

func NewHTTPClientWithStore(store sessions.Store) *http.Client {
	jar, _ := cookiejar.New(nil)
	return &http.Client{
		Transport: &headerTransport{
			base:  http.DefaultTransport,
			store: store,
		},
		Jar: jar,
	}
}

func (h *headerTransport) RoundTrip(req *http.Request) (*http.Response, error) {

	session, err := h.store.Get(req, "session")

	if err != nil {
		return nil, err
	}

	// new sessions obviously don't have a passport
	if val, ok := session.Values["passport"]; ok {

		passResult := fromString(val.(string))
		passResult.setSessionId(session.ID)

		if err := addToRequest(req, passResult); err != nil {
			return nil, err
		}
	} else {
		if err := addToRequest(req, FreshPassport()); err != nil {
			return nil, err
		}
	}

	resp, err := h.base.RoundTrip(req)

	b, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	fmt.Println("roundtrip")
	fmt.Println(string(b))

	if err := resp.Body.Close(); err != nil {
		return nil, err
	}

	resp.Body = ioutil.NopCloser(bytes.NewReader(b))

	return resp, err
}
