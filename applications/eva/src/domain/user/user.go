package user

import (
	"errors"
	"os"
	"time"
)

type UserRole string
type LockReason string

const (
	Artist      UserRole = "artist"
	Contributor UserRole = "contributor"
	Moderator   UserRole = "moderator"
	Staff       UserRole = "staff"
)

const (
	PostInfraction LockReason = "post_infraction"
)

type User struct {
	id string

	username  string
	email     string
	roles     []UserRole
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
	ErrUserNotFound      = errors.New("user not found")
)

func UnmarshalUserFromDatabase(id, username, email string, roles []string, verified bool, avatar string, locked bool, lockedUntil int, lockedReason string) *User {

	var newRoles []UserRole

	for _, role := range roles {
		newRoles = append(newRoles, UserRole(role))
	}

	return &User{
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

func NewUser(id, username, email string) (*User, error) {

	// TODO: add some validation for the user creation (username, etc...)

	return &User{
		id:        id,
		username:  username,
		email:     email,
		unclaimed: email == "",
	}, nil
}

func (u *User) ID() string {
	return u.id
}

func (u *User) Email() string {
	return u.email
}

func (u *User) Username() string {
	return u.username
}

func (u *User) Verified() bool {
	return u.verified
}

func (u *User) Avatar() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/avatars/" + u.avatar
}

func (u *User) RawAvatar() string {
	return u.avatar
}

func (u *User) LockedUntil() int {
	return u.lockedUntil
}

func (u *User) CanUnlock() bool {

	if u.lockedUntil == -1 {
		return true
	}

	return time.Now().After(time.Unix(int64(u.lockedUntil), 0))
}

func (u *User) IsLocked() bool {
	return u.locked
}

func (u *User) LockedReason() string {
	return string(u.lockedReason)
}

func (u *User) IsUnclaimed() bool {
	return u.unclaimed
}

func (u *User) LockUser(duration int, reason string) error {
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

func (u *User) UserRolesAsString() []string {
	var n []string

	for _, role := range u.roles {
		n = append(n, string(role))
	}

	return n
}
