package account

import (
	eva "overdoll/applications/eva/proto"
)

type Account struct {
	id       string
	username string
	roles    []string
	verified bool
	locked   bool
	email    string
}

func UnmarshalFromProto(proto *eva.Account) *Account {
	return NewAccount(
		proto.Id,
		proto.Username,
		proto.Email,
		proto.Roles,
		proto.Verified,
		proto.Locked,
	)
}

func NewUserOnlyIdAndUsername(id, username string) *Account {
	return &Account{
		id:       id,
		username: username,
	}
}

func NewAccount(id, username, email string, roles []string, verified, locked bool) *Account {
	return &Account{
		id:       id,
		username: username,
		email:    email,
		roles:    roles,
		verified: verified,
		locked:   locked,
	}
}

func (user *Account) ID() string {
	return user.id
}

func (user *Account) Username() string {
	return user.username
}

func (user *Account) Email() string {
	return user.email
}

func (user *Account) IsVerified() bool {
	return user.verified == true
}

func (user *Account) IsLocked() bool {
	return user.locked
}

func (user *Account) IsStaff() bool {
	return user.hasRoles([]string{"staff"})
}

func (user *Account) IsModerator() bool {
	return (user.hasRoles([]string{"moderator"}) || user.IsStaff()) && !user.IsLocked()
}

func (user *Account) hasRoles(roles []string) bool {
	for _, role := range user.roles {
		for _, requiredRole := range roles {
			if role == requiredRole {
				return true
			}
		}
	}

	return false
}
