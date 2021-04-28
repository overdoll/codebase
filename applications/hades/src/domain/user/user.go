package user

import (
	"context"

	"overdoll/libraries/common"
)

type User struct {
	id       string
	username string
	roles    []string
	verified bool
	isGuest  bool
}

func NewGuestUser() *User {
	return &User{
		id:       "",
		username: "",
		roles:    nil,
		verified: false,
		isGuest:  true,
	}
}

func NewUserFromUser(usr *common.User) *User {
	return &User{
		id:       usr.Id,
		username: usr.Username,
		roles:    usr.Roles,
		verified: usr.Verified,
		isGuest:  false,
	}
}

func (user *User) IsVerified() bool {

	if user.IsGuest() {
		return false
	}

	return user.verified == true
}

func (user *User) IsGuest() bool {
	return user.isGuest
}

func FromContext(ctx context.Context) *User {
	raw, _ := ctx.Value("UserContextKey").(*User)
	return raw
}

func (user *User) HasRoles(roles []string) bool {

	if user.IsGuest() {
		return false
	}

	for _, role := range user.roles {
		for _, requiredRole := range roles {
			if role == requiredRole {
				return true
			}
		}
	}

	return false
}
