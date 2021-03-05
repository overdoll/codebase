package models

import (
	"time"

	"overdoll/libraries/ksuid"
)

type AuthenticationCookie struct {
	Cookie     ksuid.UUID `db:"cookie"`
	Email      string     `db:"email"`
	Redeemed   int        `db:"redeemed"`
	Expiration time.Time  `db:"expiration"`
	Session    string     `db:"session"`
}

type RegisteredUser struct {
	Username string `db:"username"`
	Email    string `db:"email"`
}

type UserEmail struct {
	UserId ksuid.UUID `db:"user_id"`
	Email  string     `db:"email"`
}

type UserRole string

const (
	Artist      UserRole = "artist"
	Contributor UserRole = "contributor"
	Moderator   UserRole = "moderator"
	Staff       UserRole = "staff"
)

type User struct {
	Id       ksuid.UUID `db:"id"`
	Username string     `db:"username"`
	Email    string     `db:"email"`
	Roles    []string   `db:"roles"`
	Verified bool       `db:"verified"`
}

type UserUsername struct {
	Id       ksuid.UUID `db:"user_id"`
	Username string     `db:"username"`
}
