package app

import (
	"github.com/gorilla/securecookie"
	"github.com/gorilla/sessions"
	"net/http"
	"overdoll/applications/puppy/internal/domain/session"
	"overdoll/libraries/passport"
	"strings"
)

type Application struct {
	Session session.Repository
	Codecs  []securecookie.Codec
}

func (s *Application) Get(r *http.Request, name string) (*sessions.Session, error) {
	return sessions.GetRegistry(r).Get(s, name)
}

func (s *Application) New(r *http.Request, name string) (*sessions.Session, error) {
	var (
		err error
	)
	// make a copy
	session := sessions.NewSession(s, name)
	options := *session.Options
	session.Options = &options
	session.IsNew = true
	if c, errCookie := r.Cookie(session.Name()); errCookie == nil {
		err = securecookie.DecodeMulti(session.Name(), c.Value, &session.ID, s.Codecs...)
		if err == nil {
			ss, err := s.Session.Load(r.Context(), session)
			if err != nil {
				return nil, err
			}

			return ss, nil
		}
	}
	return session, err
}

func (s *Application) Save(r *http.Request, w http.ResponseWriter, session *sessions.Session) error {
	// Marked for deletion.
	if session.Options.MaxAge <= 0 {
		if err := s.Session.Delete(r.Context(), session); err != nil {
			return err
		}
		http.SetCookie(w, sessions.NewCookie(session.Name(), "", session.Options))
	} else {
		// Build an alphanumeric key for the redis store.
		ss, err := s.Session.Save(r.Context(), session)

		// reassign
		session = ss

		if err != nil {
			return err
		}
		encoded, err := securecookie.EncodeMulti(session.Name(), session.ID, s.Codecs...)
		if err != nil {
			return err
		}
		http.SetCookie(w, sessions.NewCookie(session.Name(), encoded, session.Options))
	}
	return nil
}

func NewHttpClient(store sessions.Store) *http.Client {
	return &http.Client{
		Transport: &headerTransport{
			base:  http.DefaultTransport,
			store: store,
		},
	}
}

type headerTransport struct {
	base  http.RoundTripper
	store sessions.Store
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

	p, err := passport.IssuePassport(
		session.ID,
		ip,
		userAgent,
		accountId,
	)

	if err != nil {
		return nil, err
	}

	// issue new passport for this request
	if err := passport.AddToRequest(req, p); err != nil {
		return nil, err
	}

	res, err := http.DefaultTransport.RoundTrip(req)

	pass, err := passport.FromResponse(res)

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
