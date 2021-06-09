package user

import (
	"errors"
	"os"
	"time"
)

type UserRole string

const (
	Artist      UserRole = "artist"
	Contributor UserRole = "contributor"
	Moderator   UserRole = "moderator"
	Staff       UserRole = "staff"
)

type User struct {
	id string

	username  string
	email     string
	roles     []UserRole
	verified  bool
	avatar    string
	unclaimed bool

	lockedUntil time.Time
}

var (
	ErrUsernameNotUnique = errors.New("username is not unique")
	ErrEmailNotUnique    = errors.New("email is not unique")
	ErrUserNotFound      = errors.New("user not found")
)

func UnmarshalUserFromDatabase(id, username, email string, roles []string, verified bool, avatar string) *User {

	var newRoles []UserRole

	for _, role := range roles {
		newRoles = append(newRoles, UserRole(role))
	}

	return &User{
		id:          id,
		username:    username,
		email:       email,
		roles:       newRoles,
		verified:    verified,
		avatar:      avatar,
		lockedUntil: time.Time{},
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

func (u User) ID() string {
	return u.id
}

func (u User) Email() string {
	return u.email
}

func (u User) Username() string {
	return u.username
}

func (u User) Verified() bool {
	return u.verified
}

func (u User) Avatar() string {
	var staticURL = os.Getenv("STATIC_URL")
	return staticURL + "/avatars/" + u.avatar
}

func (u User) RawAvatar() string {
	return u.avatar
}

func (u User) LockedUntil() time.Time {
	return u.lockedUntil
}

func (u User) IsLocked() bool {
	return u.lockedUntil.After(time.Now())
}

func (u User) IsUnclaimed() bool {
	return u.unclaimed
}

func (u User) LockUser(duration int) {
	u.lockedUntil = time.Now().Add(time.Duration(duration) * time.Millisecond)
}

func (u User) UserRolesAsString() []string {
	var n []string

	for _, role := range u.roles {
		n = append(n, string(role))
	}

	return n
}
