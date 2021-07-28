package principal

import (
	eva "overdoll/applications/eva/proto"
)

type Principal struct {
	accountId string
	username  string
	roles     []string
	verified  bool
	locked    bool
	email     string
}

func NewPrincipal(accountId, username, email string, roles []string, verified, locked bool) *Principal {
	return &Principal{
		accountId: accountId,
		username:  username,
		roles:     roles,
		verified:  verified,
		locked:    locked,
		email:     email,
	}
}

// helper to unmarshal from eva proto, as the principal will most often be grabbed from the eva service
func UnmarshalFromEvaProto(proto *eva.Account) *Principal {
	return &Principal{
		accountId: proto.Id,
		username:  proto.Username,
		roles:     proto.Roles,
		verified:  proto.Verified,
		locked:    proto.Locked,
		email:     proto.Email,
	}
}

func (user *Principal) AccountId() string {
	return user.accountId
}

func (user *Principal) Username() string {
	return user.username
}

func (user *Principal) Email() string {
	return user.email
}

func (user *Principal) IsVerified() bool {
	return user.verified == true
}

func (user *Principal) IsLocked() bool {
	return user.locked
}

func (user *Principal) IsStaff() bool {
	return user.hasRoles([]string{"staff"})
}

func (user *Principal) IsModerator() bool {
	return (user.hasRoles([]string{"moderator"}) || user.IsStaff()) && !user.IsLocked()
}

func (user *Principal) hasRoles(roles []string) bool {
	for _, role := range user.roles {
		for _, requiredRole := range roles {
			if role == requiredRole {
				return true
			}
		}
	}

	return false
}
