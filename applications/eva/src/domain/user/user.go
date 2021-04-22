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
