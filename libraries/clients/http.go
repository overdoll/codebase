package clients

import (
	"net/http"
	"net/http/cookiejar"

	"overdoll/libraries/passport"
)

type headerTransport struct {
	base     http.RoundTripper
	headers  map[string]string
	passport *passport.Passport
}

// A custom HTTP client
// Useful for when running GraphQL requests, and you need to attach some sort of authorization
// In this case, it will be a passport object in the body
func NewHTTPClientWithHeaders(pass *passport.Passport) *http.Client {
	jar, _ := cookiejar.New(nil)

	if pass == nil {
		pass = passport.FreshPassport()
	}

	return &http.Client{
		Transport: &headerTransport{
			base:     http.DefaultTransport,
			headers:  make(map[string]string),
			passport: pass,
		},
		Jar: jar,
	}
}

func (h *headerTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	req2 := CloneRequest(req, h.passport)
	for key, val := range h.headers {
		req2.Header.Set(key, val)
	}
	return h.base.RoundTrip(req2)
}

// CloneRequest and CloneHeader copied from https://github.com/kubernetes/apimachinery/blob/master/pkg/util/net/http.go#L424

// CloneRequest creates a shallow copy of the request along with a deep copy of the Headers.
func CloneRequest(req *http.Request, pass *passport.Passport) *http.Request {
	r := new(http.Request)

	// shallow clone
	*r = *req

	err := passport.AddToBody(r, pass)

	if err != nil {
		panic(err)
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
