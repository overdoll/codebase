package session

import (
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/location"
	domainerror2 "overdoll/libraries/errors/domainerror"
	"overdoll/libraries/uuid"
	"time"

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
	ErrSessionsNotFound = domainerror2.NewValidation("sessions not found")
	defaultDuration     = int64(1209600)
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

func NewSession(account *account.Account, userAgent, ip string, location *location.Location) (*Session, error) {

	if account.IsDeleted() {
		return nil, domainerror2.NewAuthorization("cannot create session for deleted account")
	}

	return &Session{
		id:        uuid.New().String() + ":account:" + account.ID(),
		device:    userAgent,
		ip:        ip,
		location:  location,
		current:   false,
		created:   time.Now(),
		lastSeen:  time.Now(),
		accountId: account.ID(),
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
		return domainerror2.NewValidation("cannot revoke current session")
	}

	return nil
}

func GetSearchTermForAccounts(accountId string) string {
	return "*:account:" + accountId
}
