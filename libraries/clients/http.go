package clients

import (
	"fmt"
	"net/http"
	"net/http/cookiejar"

	"overdoll/libraries/passport"
)

type ClientPassport struct {
	passport *passport.Passport
}

type headerTransport struct {
	base           http.RoundTripper
	headers        map[string]string
	clientPassport *ClientPassport
}

// A custom HTTP client
// Useful for when running GraphQL requests, and you need to attach some sort of authorization

// the client "kind of" simulates a request in and out of the graphql gateway, in that it will add a passport to
// the request, and modify the passport, when a new one is placed in the header
// this makes it perfect for testing and ensuring your passport modifications were correct
func NewHTTPClientWithHeaders(pass *passport.Passport) (*http.Client, *ClientPassport) {
	jar, _ := cookiejar.New(nil)

	clientPassport := &ClientPassport{
		passport: pass,
	}

	transport := &headerTransport{
		base:           http.DefaultTransport,
		headers:        make(map[string]string),
		clientPassport: clientPassport,
	}

	return &http.Client{
		Transport: transport,
		Jar:       jar,
	}, clientPassport
}

func (h *ClientPassport) GetPassport() *passport.Passport {
	return h.passport
}

func (h *headerTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	req2 := CloneRequest(req, h.clientPassport.passport)
	for key, val := range h.headers {
		req2.Header.Set(key, val)
	}
	resp, err := h.base.RoundTrip(req2)

	if err != nil {
		return nil, err
	}

	nw := passport.FromResponse(resp)

	fmt.Println(nw)

	if nw != nil {
		h.clientPassport.passport = &*nw
	}

	return resp, err
}

// CloneRequest and CloneHeader copied from https://github.com/kubernetes/apimachinery/blob/master/pkg/util/net/http.go#L424

// CloneRequest creates a shallow copy of the request along with a deep copy of the Headers.
func CloneRequest(req *http.Request, pass *passport.Passport) *http.Request {
	r := new(http.Request)

	// shallow clone
	*r = *req

	if pass != nil {
		err := passport.AddToBody(r, pass)

		if err != nil {
			panic(err)
		}
	}

	// deep copy headers
	r.Header = CloneHeader(req.Header)

	return r
}

// CloneHeader creates a deep copy of an http.Header.
func CloneHeader(in http.Header) http.Header {
	out := make(http.Header, len(in))
	for key, values := range in {
		newValues := make([]string, len(values))
		copy(newValues, values)
		out[key] = newValues
	}
	return out
}
