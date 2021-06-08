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
	locked   bool
}

func UnmarshalFromProto(proto *eva.User) *User {
	return NewUser(
		proto.Id,
		proto.Username,
		proto.Avatar,
		proto.Roles,
		proto.Verified,
		proto.Locked,
	)
}

func NewUser(id, username, avatar string, roles []string, verified, locked bool) *User {
	return &User{
		id:       id,
		username: username,
		avatar:   avatar,
		roles:    roles,
		verified: verified,
		locked:   locked,
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
	return user.verified == true
}

func (user *User) IsLocked() bool {
	return user.locked
}

func (user *User) HasRoles(roles []string) bool {
	for _, role := range user.roles {
		for _, requiredRole := range roles {
			if role == requiredRole {
				return true
			}
		}
	}

	return false
}
