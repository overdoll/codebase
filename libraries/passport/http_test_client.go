package passport

import (
	"context"
	"net/http"
	"net/http/cookiejar"
)

type Pocket struct {
	passport *Passport
}

func (a *Pocket) GetPassport() *Passport {
	return a.passport
}

type memoryPassportStore struct {
	pocket *Pocket
}

func (a *memoryPassportStore) ResponseEvent(ctx context.Context, res *http.Response) error {
	return nil
}

func (a *memoryPassportStore) GetSessionDataFromRequest(req *http.Request) (string, string, error) {

	if err := a.pocket.passport.Authenticated(); err != nil {
		return a.pocket.passport.SessionID(), "", nil
	}

	return a.pocket.passport.SessionID(), a.pocket.passport.AccountID(), nil
}

// make into a regular passport
func (a *memoryPassportStore) RevokedAccountSessionEvent(ctx context.Context, res *http.Response, sessionId string) error {
	t := ""
	p, err := issueTestingPassport(&t)

	if err != nil {
		return err
	}

	a.pocket.passport = p
	return nil
}

func (a *memoryPassportStore) NewAccountSessionEvent(ctx context.Context, res *http.Response, accountId string) error {
	a.pocket.passport = FromContext(ctx)
	return nil
}

func issueTestingPassport(id *string) (*Passport, error) {

	accountId := ""

	if id != nil {
		accountId = *id
	}

	return issuePassport("testing-session-dont-use-lol", "127.0.0.1", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36", accountId)
}

// NewHTTPTestClientWithPassport Custom HTTP client that stores passport in memory so it can be used in testing
// since tests don't use a proxy to set the passport
func NewHTTPTestClientWithPassport(accountId *string) (*http.Client, *Pocket) {
	jar, _ := cookiejar.New(nil)

	p, err := issueTestingPassport(accountId)

	if err != nil {
		panic(err)
	}

	pocket := &Pocket{passport: p}

	newTransport := NewHttpRoundTripper(&memoryPassportStore{
		pocket: pocket,
	})

	return &http.Client{
		Transport: newTransport,
		Jar:       jar,
	}, pocket
}
