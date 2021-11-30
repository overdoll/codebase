package passport

import (
	"github.com/gorilla/sessions"
	"net/http"
	"net/http/cookiejar"
	"strings"
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

	userAgent := strings.Join(req.Header["User-Agent"], ",")

	forwarded := req.Header.Get("X-FORWARDED-FOR")

	ip := ""

	if forwarded != "" {
		ip = forwarded
	} else {
		ip = req.RemoteAddr
	}

	accountId := ""

	if val, ok := session.Values["accountId"]; ok {
		accountId = val.(string)
	}

	// issue new passport for this request
	if err := addToRequest(req,
		issuePassport(
			session.ID,
			ip,
			userAgent,
			accountId,
		)); err != nil {
		return nil, err
	}

	res, err := h.base.RoundTrip(req)

	pass, err := fromResponse(res)

	if err != nil {
		return nil, err
	}

	// if passport was found in response
	if pass != nil {
		currentAccountId := session.Values["accountId"]

		// some logic around revoking account, etc...
		if pass.Authenticated() == nil {
			if currentAccountId != pass.AccountID() {
				// account ID was revoked here
				if pass.AccountID() == "" {

					// since account was revoked, regenerate the session
					session.Options.MaxAge = -1
					//if err := session.Save(req, res.Body); err != nil {
					//}

					return res, nil
				}

				// no account revoke - account was added
				session.Values["accountId"] = pass.AccountID()
				//if err := session.Save(req, res.Body); err != nil {
				//
				//}
			}
		}
	}

	return res, err
}
