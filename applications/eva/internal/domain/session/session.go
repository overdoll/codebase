package session

import (
	"crypto/sha256"
	"encoding/hex"
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
	defaultDuration     = int64(28800000)
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

func NewSession(accountId, userAgent, ip string, location *location.Location) (*Session, error) {

	// account ID is hashed so you dont know who the session belongs to

	return &Session{
		id:        ksuid.New().String() + ":account:" + hashAccountId(accountId),
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

func (s *Session) Duration() int64 {
	return defaultDuration
}

func (s *Session) Touch() error {
	s.lastSeen = time.Now()
	return nil
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

func (s *Session) CanRevoke(requester *principal.Principal) error {
	if err := requester.BelongsToAccount(s.accountId); err != nil {
		return err
	}

	if s.current {
		return errors.New("cannot revoke current session")
	}

	return nil
}

func GetSearchTermForAccounts(accountId string) string {
	return "*:account:" + hashAccountId(accountId)
}

func hashAccountId(accountId string) string {
	hash := sha256.Sum256([]byte(accountId))
	return hex.EncodeToString(hash[:])
}
