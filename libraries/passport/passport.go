package passport

import (
	"context"
	"errors"
	"github.com/segmentio/ksuid"
	libraries_passport_v1 "overdoll/libraries/passport/proto"

	"sync"
	"time"
)

var (
	ErrNotAuthenticated = errors.New("not authenticated")
	errExpired          = errors.New("passport expired")
)

type Passport struct {
	passport   *libraries_passport_v1.Passport
	passportMu sync.Mutex
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

func (p *Passport) SessionID() string {
	return p.passport.Header.SessionId
}

func (p *Passport) IP() string {
	return p.passport.DeviceInfo.Ip
}

func (p *Passport) UserAgent() string {
	return p.passport.DeviceInfo.UserAgent
}

func (p *Passport) RevokeAccount() error {
	p.passport.Account = nil
	p.passport.Actions = append(p.passport.Actions, &libraries_passport_v1.Action{Action: RevokeAccount.slug})
	return nil
}

func (p *Passport) AuthenticateAccount(id string) {
	p.passport.Account = &libraries_passport_v1.AccountInfo{AccountId: id}
	p.passport.Actions = append(p.passport.Actions, &libraries_passport_v1.Action{Action: AuthenticateAccount.slug})
}

func (p *Passport) hasActions() bool {
	return len(p.passport.Actions) > 0
}

func (p *Passport) performedAuthenticatedAccountAction() bool {

	for _, a := range p.passport.Actions {
		action := actionFromString(a.Action)
		if action == AuthenticateAccount {
			return true
		}
	}

	return false
}

func (p *Passport) performedRevokedAccountAction() bool {

	for _, a := range p.passport.Actions {
		action := actionFromString(a.Action)
		if action == RevokeAccount {
			return true
		}
	}

	return false
}

func MutatePassport(ctx context.Context, updateFn func(*Passport) error) error {
	p := FromContext(ctx)
	p.passportMu.Lock()
	defer p.passportMu.Unlock()

	if err := updateFn(p); err != nil {
		return err
	}

	// update signature after mutation
	if err := signPassport(
		p.passport,
	); err != nil {
		return err
	}

	return nil
}

func issuePassport(sessionId, ip, userAgent, accountId string) (*Passport, error) {

	if sessionId == "" {
		sessionId = ksuid.New().String()
	}

	var account *libraries_passport_v1.AccountInfo

	if accountId != "" {
		account = &libraries_passport_v1.AccountInfo{AccountId: accountId}
	}

	created := time.Now()

	p := &libraries_passport_v1.Passport{
		Account: account,
		Header: &libraries_passport_v1.Header{
			SessionId: sessionId,
			Created:   created.Unix(),
			// passports expire 5 minutes after creation
			Expires: created.Add(time.Minute * 5).Unix(),
		},
		DeviceInfo: &libraries_passport_v1.DeviceInfo{
			Ip:        ip,
			UserAgent: userAgent,
		},
	}

	// update signature after mutation
	if err := signPassport(
		p,
	); err != nil {
		return nil, err
	}

	return &Passport{passport: p}, nil
}

// helper to verify passport authenticity
func verifyPassport(p *libraries_passport_v1.Passport) error {

	// verify signature
	if err := verifySignature(p); err != nil {
		return err
	}

	// make sure passport isnt expired
	if time.Now().After(time.Unix(p.Header.Expires, 0)) {
		return errExpired
	}

	return nil
}
