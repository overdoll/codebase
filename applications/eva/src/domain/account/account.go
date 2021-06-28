package account

import (
	"errors"
	"os"
	"time"
)

type AccountRole string
type LockReason string

const (
	Artist      AccountRole = "artist"
	Contributor AccountRole = "contributor"
	Moderator   AccountRole = "moderator"
	Staff       AccountRole = "staff"
)

const (
	PostInfraction LockReason = "post_infraction"
)

type Account struct {
	id string

	username  string
	email     string
	roles     []AccountRole
	verified  bool
	avatar    string
	unclaimed bool
	locked    bool

	lockedUntil  int
	lockedReason LockReason
}

var (
	ErrUsernameNotUnique = errors.New("username is not unique")
	ErrEmailNotUnique    = errors.New("email is not unique")
	ErrAccountNotFound   = errors.New("account not found")
)

func UnmarshalAccountFromDatabase(id, username, email string, roles []string, verified bool, avatar string, locked bool, lockedUntil int, lockedReason string) *Account {

	var newRoles []AccountRole

	for _, role := range roles {
		newRoles = append(newRoles, AccountRole(role))
	}

	return &Account{
		id:           id,
		username:     username,
		email:        email,
		roles:        newRoles,
		verified:     verified,
		avatar:       avatar,
		lockedUntil:  lockedUntil,
		locked:       locked,
		lockedReason: LockReason(lockedReason),
	}
}

func NewAccount(id, username, email string) (*Account, error) {

	// TODO: add some validation for the user creation (username, etc...)

	return &Account{
		id:        id,
		username:  username,
		email:     email,
		unclaimed: email == "",
	}, nil
}

func (u *Account) ID() string {
	return u.id
}

func (u *Account) Email() string {
	return u.email
}

func (u *Account) Username() string {
	return u.username
}

func (u *Account) Verified() bool {
	return u.verified
}

func (u *Account) Avatar() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/avatars/" + u.avatar
}

func (u *Account) RawAvatar() string {
	return u.avatar
}

func (u *Account) LockedUntil() int {
	return u.lockedUntil
}

func (u *Account) CanUnlock() bool {

	if u.lockedUntil == -1 {
		return true
	}

	return time.Now().After(time.Unix(int64(u.lockedUntil), 0))
}

func (u *Account) IsLocked() bool {
	return u.locked
}

func (u *Account) LockedReason() string {
	return string(u.lockedReason)
}

func (u *Account) IsUnclaimed() bool {
	return u.unclaimed
}

func (u *Account) Lock(duration int, reason string) error {
	if duration == 0 {
		u.lockedUntil = 0
		u.lockedReason = ""
		u.locked = false
		return nil
	}

	u.lockedUntil = duration
	u.lockedReason = LockReason(reason)
	u.locked = true

	return nil
}

func (u *Account) RolesAsString() []string {
	var n []string

	for _, role := range u.roles {
		n = append(n, string(role))
	}

	return n
}
