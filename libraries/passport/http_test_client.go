package passport

import (
	"context"
	"net/http"
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

func (a *memoryPassportStore) UpdateDeviceLanguageEvent(ctx context.Context, res *http.Response, sessionId string) error {
	a.pocket.passport = FromContext(ctx)
	return nil
}

func (a *memoryPassportStore) GetDeviceDataFromRequest(req *http.Request) (deviceId string, ip string, userAgent string, language string, error error) {
	return a.pocket.passport.DeviceID(), a.pocket.passport.IP(), a.pocket.passport.UserAgent(), a.pocket.passport.Language().Locale(), nil
}

func (a *memoryPassportStore) ResponseEvent(ctx context.Context, res *http.Response) error {
	//a.pocket.passport = FromContext(ctx)
	return nil
}

func (a *memoryPassportStore) GetSessionDataFromRequest(req *http.Request) (string, string, error) {

	if err := a.pocket.passport.Authenticated(); err != nil {
		return "", "", nil
	}

	return a.pocket.passport.SessionID(), a.pocket.passport.AccountID(), nil
}

// make into a regular passport
func (a *memoryPassportStore) RevokedAccountSessionEvent(ctx context.Context, res *http.Response, sessionId string) error {
	a.pocket.passport = FromContext(ctx)
	return nil
}

func (a *memoryPassportStore) NewAccountSessionEvent(ctx context.Context, res *http.Response, accountId string) error {
	a.pocket.passport = FromContext(ctx)
	return nil
}

// NewHTTPTestClientWithPassport Custom HTTP client that stores passport in memory so it can be used in testing
// since tests don't use a proxy to set the passport
func NewHTTPTestClientWithPassport(accountId *string) (*http.Client, *Pocket) {

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
	}, pocket
}
