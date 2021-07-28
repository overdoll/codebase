package principal

import (
	"errors"

	eva "overdoll/applications/eva/proto"
)

var (
	ErrNotAuthorized = errors.New("not authorized")
)

type Principal struct {
	accountId string
	roles     []string
	verified  bool
	locked    bool
}

func NewPrincipal(accountId string, roles []string, verified, locked bool) *Principal {
	return &Principal{
		accountId: accountId,
		roles:     roles,
		verified:  verified,
		locked:    locked,
	}
}

// helper to unmarshal from eva proto, as the principal will most often be grabbed from the eva service
func UnmarshalFromEvaProto(proto *eva.Account) *Principal {
	return &Principal{
		accountId: proto.Id,
		roles:     proto.Roles,
		verified:  proto.Verified,
		locked:    proto.Locked,
	}
}

// basically a simple check to make sure this principal is a specific account
func (p *Principal) IsAccount(accountId string) bool {
	return p.accountId == accountId
}

func (p *Principal) AccountId() string {
	return p.accountId
}

func (p *Principal) IsVerified() bool {
	return p.verified == true
}

func (p *Principal) IsLocked() bool {
	return p.locked
}

func (p *Principal) IsStaff() bool {
	return p.hasRoles([]string{"staff"})
}

func (p *Principal) IsModerator() bool {
	return (p.hasRoles([]string{"moderator"}) || p.IsStaff()) && !p.IsLocked()
}

func (p *Principal) hasRoles(roles []string) bool {
	for _, role := range p.roles {
		for _, requiredRole := range roles {
			if role == requiredRole {
				return true
			}
		}
	}

	return false
}
