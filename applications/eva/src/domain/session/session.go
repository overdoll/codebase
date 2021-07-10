package session

import (
	"errors"
	"time"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/passport"
)

type Session struct {
	id        string
	userAgent string
	ip        string
	created   string

	passport *passport.Passport
}

var (
	ErrSessionsNotFound = errors.New("sessions not found")
)

func UnmarshalSessionFromDatabase(id, pass, userAgent, ip, created string) *Session {

	return &Session{
		id:        id,
		userAgent: userAgent,
		ip:        ip,
		created:   created,
		passport:  passport.FromString(pass),
	}
}

func NewSession(accountId, userAgent, ip string) *Session {
	return &Session{
		id:        ksuid.New().String(),
		userAgent: userAgent,
		ip:        ip,
		created:   time.Now().String(),
		passport:  passport.FreshPassportWithAccount(accountId),
	}
}

func (s *Session) ID() string {
	return s.id
}

func (s *Session) UserAgent() string {
	return s.userAgent
}

func (s *Session) IP() string {
	return s.ip
}

func (s *Session) Passport() *passport.Passport {
	return s.passport
}

func (s *Session) Created() string {
	return s.created
}
