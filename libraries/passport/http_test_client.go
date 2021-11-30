package passport

import (
	"net/http"
	"net/http/cookiejar"
)

type ClientPassport struct {
	passport *Passport
}

type headerTestTransport struct {
	base           http.RoundTripper
	headers        map[string]string
	clientPassport *ClientPassport
}

func issueTestingPassport(id *string) *Passport {

	accountId := ""

	if id != nil {
		accountId = *id
	}

	return issuePassport("", "", "", accountId)
}

// A custom HTTP client
// Useful for when running GraphQL requests, and you need to attach some sort of authorization

// the client "kind of" simulates a request in and out of the graphql gateway, in that it will add a passport to
// the request, and modify the passport, when a new one is placed in the header
// this makes it perfect for testing and ensuring your passport modifications were correct
func NewHTTPTestClientWithPassport(accountId *string) (*http.Client, *ClientPassport) {
	jar, _ := cookiejar.New(nil)

	clientPassport := &ClientPassport{
		passport: issueTestingPassport(accountId),
	}

	transport := &headerTestTransport{
		base:           http.DefaultTransport,
		headers:        make(map[string]string),
		clientPassport: clientPassport,
	}

	return &http.Client{
		Transport: transport,
		Jar:       jar,
	}, clientPassport
}

func NewHTTPTestClientWithCustomHeaders(headers map[string]string) *http.Client {
	jar, _ := cookiejar.New(nil)

	transport := &headerTestTransport{
		base:           http.DefaultTransport,
		headers:        headers,
		clientPassport: nil,
	}

	return &http.Client{
		Transport: transport,
		Jar:       jar,
	}
}

func (h *ClientPassport) GetPassport() *Passport {
	return h.passport
}

func (h *headerTestTransport) RoundTrip(req *http.Request) (*http.Response, error) {

	if err := addToRequest(req, h.clientPassport.passport); err != nil {
		return nil, err
	}

	resp, err := h.base.RoundTrip(req)

	if err != nil {
		return nil, err
	}

	nw, err := fromResponse(resp)

	if err != nil {
		return nil, err
	}

	if nw != nil {
		h.clientPassport.passport = nw
	}

	return resp, err
}
