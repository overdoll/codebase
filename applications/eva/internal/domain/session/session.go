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
	created  string
	current  bool

	ip string

	accountId string
}

var (
	ErrSessionsNotFound = errors.New("sessions not found")
)

func UnmarshalSessionFromDatabase(id, accountId, device, ip, created string, current bool, location *location.Location) *Session {

	return &Session{
		id:        id,
		device:    device,
		ip:        ip,
		location:  location,
		created:   created,
		current:   current,
		accountId: accountId,
	}
}

func NewSession(accountId, userAgent, ip string, location *location.Location) *Session {
	return &Session{
		id:        ksuid.New().String(),
		device:    userAgent,
		ip:        ip,
		location:  location,
		current:   false,
		created:   time.Now().String(),
		accountId: accountId,
	}
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

func (s *Session) HasLocation() bool {
	return s.location != nil
}

func (s *Session) Location() *location.Location {
	return s.location
}

func (s *Session) UpdateLocation(l *location.Location) error {
	s.location = l
	return nil
}

func (s *Session) Created() string {
	return s.created
}

func (s *Session) CanView(requester *principal.Principal) error {
	if err := requester.BelongsToAccount(s.accountId); err != nil {
		return err
	}

	return nil
}

func (s *Session) IsCurrent() bool {
	return s.current
}

func (s *Session) MergeWithSerializedData(serialized string) error {
	return nil
}

func Serialize(s *Session) string {
	return ""
}
