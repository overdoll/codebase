package user

import (
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
