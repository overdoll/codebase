package models

import (
	"time"

	"github.com/gocql/gocql"
)

type AuthenticationCookie struct {
	Cookie     gocql.UUID `db:"cookie"`
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
	Email  string     `db:"email"`
	UserId gocql.UUID `db:"user_id"`
}

type UserRole string

const (
	Artist      UserRole = "artist"
	Contributor UserRole = "contributor"
	Moderator   UserRole = "moderator"
	Staff       UserRole = "staff"
)

type User struct {
	Id       gocql.UUID `db:"id"`
	Username string     `db:"username"`
	Email    string     `db:"email"`
	Roles    []string   `db:"roles"`
	Verified bool       `db:"boolean"`
}

type UserUsername struct {
	Username string     `db:"username"`
	Id       gocql.UUID `db:"user_id"`
}
