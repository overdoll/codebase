package user

import (
	eva "overdoll/applications/eva/proto"
)

type User struct {
	id       string
	username string
	avatar   string
	roles    []string
	verified bool
	isGuest  bool
}

func UnmarshalFromProto(proto *eva.User) *User {
	return NewUser(
		proto.Id,
		proto.Username,
		proto.Avatar,
		proto.Roles,
		proto.Verified,
	)
}

func NewUser(id string, username string, avatar string, roles []string, verified bool) *User {
	return &User{
		id:       id,
		username: username,
		avatar:   avatar,
		roles:    roles,
		verified: verified,
		isGuest:  false,
	}
}

func (user *User) ID() string {
	return user.id
}

func (user *User) Username() string {
	return user.username
}

func (user *User) Avatar() string {
	return user.avatar
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
