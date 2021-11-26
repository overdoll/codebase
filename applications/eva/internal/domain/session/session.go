package session

import (
	"errors"
	"overdoll/applications/eva/internal/domain/location"
	"time"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type Session struct {
	*paging.Node

	id       string
	device   string
	location *location.Location
	created  string
	current  bool

	passport *passport.Passport
}

var (
	ErrSessionsNotFound = errors.New("sessions not found")
)

func UnmarshalSessionFromDatabase(id, pass, device, created string, current bool, location *location.Location) *Session {

	return &Session{
		id:       id,
		device:   device,
		location: location,
		created:  created,
		current:  current,
		passport: passport.FromString(pass),
	}
}

func NewSession(accountId, userAgent string, location *location.Location) *Session {
	return &Session{
		id:       ksuid.New().String(),
		device:   userAgent,
		location: location,
		current:  false,
		created:  time.Now().String(),
		passport: passport.FreshPassportWithAccount(accountId),
	}
}

func (s *Session) ID() string {
	return s.id
}

func (s *Session) Device() string {
	return s.device
}

func (s *Session) Location() *location.Location {
	return s.location
}

func (s *Session) Passport() *passport.Passport {
	return s.passport
}

func (s *Session) Created() string {
	return s.created
}

func (s *Session) CanView(requester *principal.Principal) error {
	if err := requester.BelongsToAccount(s.passport.AccountID()); err != nil {
		return err
	}

	return nil
}

func (s *Session) IsCurrent() bool {
	return s.current
}
