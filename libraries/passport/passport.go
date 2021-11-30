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

// Revoke the currently authenticated user from the passport
func (p *Passport) RevokeAccount() error {
	p.passport = &libraries_passport_v1.Passport{Account: nil}
	return nil
}

func (p *Passport) SetAccount(id string) {
	p.passport.Account = &libraries_passport_v1.AccountInfo{AccountId: id}
}

func MutatePassport(ctx context.Context, updateFn func(*Passport) error) error {
	p := FromContext(ctx)
	p.passportMu.Lock()
	defer p.passportMu.Unlock()

	return updateFn(p)
}

func issuePassport(sessionId, ip, userAgent, accountId string) *Passport {

	var account *libraries_passport_v1.AccountInfo

	if accountId != "" {
		account = &libraries_passport_v1.AccountInfo{AccountId: accountId}
	}

	created := time.Now()

	header := &libraries_passport_v1.Header{
		SessionId: sessionId,
		Created:   created.Unix(),
		// passports expire 5 minutes after creation
		Expires: created.Add(time.Minute * 5).Unix(),
	}

	device := &libraries_passport_v1.DeviceInfo{
		Ip:        ip,
		UserAgent: userAgent,
	}

	integrity := &libraries_passport_v1.Integrity{
		Version: 0,
		KeyName: "",
		Hmac:    nil,
	}

	return &Passport{passport: &libraries_passport_v1.Passport{
		Account:    account,
		Header:     header,
		DeviceInfo: device,
		Integrity:  integrity,
	}}
}
