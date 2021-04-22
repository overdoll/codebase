package user

import (
	"errors"
	"fmt"

	"overdoll/libraries/ksuid"
)

type UserRole string

const (
	Artist      UserRole = "artist"
	Contributor UserRole = "contributor"
	Moderator   UserRole = "moderator"
	Staff       UserRole = "staff"
)

type User struct {
	id ksuid.UUID

	username string
	email    string
	roles    []UserRole
	verified bool
	avatar   string
}

var (
	ErrUsernameNotUnique = errors.New("username is not unique")
	ErrEmailNotUnique    = errors.New("email is not unique")
)

type NotFoundError struct {
	Identifier string
}

func UnmarshalUserFromDatabase(id ksuid.UUID, username string, email string, roles []UserRole, verified bool, avatar string) *User {
	return &User{
		id:       id,
		username: username,
		email:    email,
		roles:    roles,
		verified: verified,
		avatar:   avatar,
	}
}

func (e NotFoundError) Error() string {
	return fmt.Sprintf("user '%s' not found", e.Identifier)
}

func NewUser(id ksuid.UUID, username string, email string) (*User, error) {

	// TODO: add some validation for the user creation (username, etc...)

	return &User{
		id:       id,
		username: username,
		email:    email,
	}, nil
}

func (u User) ID() ksuid.UUID {
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

func (u User) UserRolesAsString() []string {
	var n []string

	for _, role := range u.roles {
		n = append(n, string(role))
	}

	return n
}
