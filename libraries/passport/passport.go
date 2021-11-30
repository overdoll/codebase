package passport

import (
	"context"
	"encoding/base64"
	"errors"
	"github.com/golang/protobuf/proto"
	"go.uber.org/zap"
	libraries_passport_v1 "overdoll/libraries/passport/proto"
	"sync"
)

type MutationType string

const (
	MutationKey = "PassportContextKey"
)

var (
	ErrNotAuthenticated = errors.New("not authenticated")
)

type Passport struct {
	passport        *libraries_passport_v1.Passport
	sessionId       string
	recentlyMutated bool
	passportMu      sync.Mutex
}

func (p *Passport) Authenticated() error {
	if p.passport.Account != nil {
		return nil
	}

	return ErrNotAuthenticated
}

func (p *Passport) AccountID() string {
	return p.passport.Account.AccountId
}

func (p *Passport) SessionId() string {
	return p.sessionId
}

// Revoke the currently authenticated user from the passport
func (p *Passport) RevokeAccount() error {
	p.passport = &libraries_passport_v1.Passport{Account: nil}
	return nil
}

func (p *Passport) SetAccount(id string) {
	p.passport.Account = &libraries_passport_v1.AccountInfo{AccountId: id}
}

func (p *Passport) setSessionId(id string) {
	p.sessionId = id
}

func (p *Passport) SerializeToBaseString() string {
	msg, err := proto.Marshal(p.passport)

	if err != nil {
		return ""
	}

	return base64.StdEncoding.EncodeToString(msg)
}

func MutatePassport(ctx context.Context, updateFn func(*Passport) error) error {
	p := FromContext(ctx)
	p.passportMu.Lock()
	defer p.passportMu.Unlock()

	p.recentlyMutated = true

	return updateFn(p)
}

func (p *Passport) hasBeenRecentlyMutated() bool {
	return p.recentlyMutated
}

func FreshPassport() *Passport {
	return &Passport{passport: &libraries_passport_v1.Passport{Account: nil, Header: &libraries_passport_v1.Header{
		SessionId: "test",
		Created:   0,
		Expires:   0,
	}}, sessionId: "", recentlyMutated: false}
}

func FreshPassportWithAccount(id string) *Passport {

	pass := &Passport{passport: &libraries_passport_v1.Passport{Account: nil}, sessionId: "", recentlyMutated: false}

	pass.SetAccount(id)

	return pass
}

func fromString(raw string) *Passport {

	// empty passport in string - use fresh one
	if raw == "" {
		return FreshPassport()
	}

	sDec, err := base64.StdEncoding.DecodeString(raw)

	if err != nil {
		zap.S().Errorf("could not decode passport: %s", err)
		return FreshPassport()
	}

	var msg libraries_passport_v1.Passport

	err = proto.Unmarshal(sDec, &msg)

	if err != nil {
		zap.S().Errorf("could not unmarshal passport proto: %s", err)
		return FreshPassport()
	}

	return &Passport{passport: &msg, sessionId: ""}

}

func FromContext(ctx context.Context) *Passport {

	raw, ok := ctx.Value(MutationType(MutationKey)).(*Passport)

	if !ok {
		return nil
	}

	return raw
}
