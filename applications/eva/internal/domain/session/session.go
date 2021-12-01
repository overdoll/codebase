package session

import (
	"errors"
	"overdoll/applications/eva/internal/domain/location"
	"time"

	"github.com/segmentio/ksuid"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Session struct {
	*paging.Node

	id       string
	device   string
	location *location.Location
	current  bool
	created  time.Time
	lastSeen time.Time

	ip string

	accountId string
}

var (
	ErrSessionsNotFound = errors.New("sessions not found")
)

func UnmarshalSessionFromDatabase(id, accountId, device, ip string, created, lastSeen int64, current bool, location *location.Location) *Session {

	return &Session{
		id:        id,
		device:    device,
		ip:        ip,
		location:  location,
		created:   time.Unix(created, 0),
		lastSeen:  time.Unix(lastSeen, 0),
		current:   current,
		accountId: accountId,
	}
}

func NewSession(p *principal.Principal, accountId, userAgent, ip string, location *location.Location) (*Session, error) {

	// only self can create own sessions
	if err := p.BelongsToAccount(accountId); err != nil {
		return nil, err
	}

	return &Session{
		id:        ksuid.New().String() + ":account:" + accountId,
		device:    userAgent,
		ip:        ip,
		location:  location,
		current:   false,
		created:   time.Now(),
		lastSeen:  time.Now(),
		accountId: accountId,
	}, nil
}

func (s *Session) ID() string {
	return s.id
}

func (s *Session) Device() string {
	return s.device
}

func (s *Session) IP() string {
	return s.ip
}

func (s *Session) AccountID() string {
	return s.accountId
}

func (s *Session) LastSeen() time.Time {
	return s.lastSeen
}

func (s *Session) Location() *location.Location {
	return s.location
}

func (s *Session) Created() time.Time {
	return s.created
}

func (s *Session) IsCurrent() bool {
	return s.current
}

func (s *Session) CanView(requester *principal.Principal) error {
	if err := requester.BelongsToAccount(s.accountId); err != nil {
		return err
	}

	return nil
}
