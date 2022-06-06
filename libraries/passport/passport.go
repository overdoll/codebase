package passport

import (
	"context"
	"errors"
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

	if p.passport.AccountInfo != nil {

		if p.passport.AccountInfo.Id == "" {
			return ErrNotAuthenticated
		}

		return nil
	}

	return ErrNotAuthenticated
}

// AccountID - may throw nil pointer - make sure you check Authenticated() first
func (p *Passport) AccountID() string {
	return p.passport.AccountInfo.Id
}

// SessionID - may throw nil pointer - make sure you check Authenticated() first
func (p *Passport) SessionID() string {
	return p.passport.AccountInfo.SessionId
}

func (p *Passport) DeviceID() string {
	return p.passport.DeviceInfo.Id
}

func (p *Passport) IP() string {
	return p.passport.DeviceInfo.Ip
}

func (p *Passport) UserAgent() string {
	return p.passport.DeviceInfo.UserAgent
}

func (p *Passport) RevokeAccount() error {
	// keep session for reference
	p.passport.AccountInfo = &libraries_passport_v1.AccountInfo{
		SessionId: p.SessionID(),
	}
	p.passport.Actions = append(p.passport.Actions, &libraries_passport_v1.Action{Action: RevokeAccount.slug})
	return nil
}

func (p *Passport) AuthenticateAccount(id string) error {
	p.passport.AccountInfo = &libraries_passport_v1.AccountInfo{Id: id}
	p.passport.Actions = append(p.passport.Actions, &libraries_passport_v1.Action{Action: AuthenticateAccount.slug})
	return nil
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

func issuePassport(sessionId, deviceId, ip, userAgent, accountId string) (*Passport, error) {

	var account *libraries_passport_v1.AccountInfo

	if accountId != "" {
		account = &libraries_passport_v1.AccountInfo{
			Id:        accountId,
			SessionId: sessionId,
		}
	}

	created := time.Now()

	p := &libraries_passport_v1.Passport{
		AccountInfo: account,
		Header: &libraries_passport_v1.Header{
			Created: created.Unix(),
			// passports expire 5 minutes after creation
			Expires: created.Add(time.Minute * 5).Unix(),
		},
		DeviceInfo: &libraries_passport_v1.DeviceInfo{
			Id:        deviceId,
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
