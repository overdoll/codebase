package principal

import (
	"errors"

	eva "overdoll/applications/eva/proto"
)

var (
	ErrNotAuthorized = errors.New("not authorized")
	ErrLocked        = errors.New("account is locked")
)

// principal contains all methods required for authorization checks
// it's purposely bare to ensure that it's used properly

// Principal it's recommended that each service builds their own middleware that will grab the current account in the request,
// which can be parsed from the passport in order to save on additional calls due to graphql nesting
// see "eva" or "sting" for implementation examples
type Principal struct {
	accountId string
	roles     []string
	email     string
	verified  bool
	locked    bool
	secure    bool

	clubExtension *ClubExtension
}

func NewPrincipal(accountId, email string, roles []string, verified, locked, secure bool) *Principal {
	return &Principal{
		accountId: accountId,
		email:     email,
		roles:     roles,
		verified:  verified,
		locked:    locked,
		secure:    secure,
	}
}

// UnmarshalFromEvaProto helper to unmarshal from eva proto, as the principal will most often be grabbed from the eva service
func UnmarshalFromEvaProto(proto *eva.Account) *Principal {
	return &Principal{
		accountId: proto.Id,
		roles:     proto.Roles,
		verified:  proto.Verified,
		locked:    proto.Locked,
		email:     proto.Email,
		secure:    proto.Secure,
	}
}

// BelongsToAccount basically a simple check to make sure this principal is a specific account
func (p *Principal) BelongsToAccount(accountId string) error {

	if p.accountId != accountId {
		return ErrNotAuthorized
	}

	return nil
}

func (p *Principal) AccountId() string {
	return p.accountId
}

func (p *Principal) Email() string {
	return p.email
}

func (p *Principal) IsVerified() bool {
	return p.verified == true
}

func (p *Principal) IsLocked() bool {
	return p.locked
}

func (p *Principal) IsSecure() bool {
	return p.secure
}

func (p *Principal) IsStaff() bool {
	return p.hasRoles([]string{"STAFF"})
}

func (p *Principal) IsModerator() bool {
	return p.hasRoles([]string{"MODERATOR"})
}

func (p *Principal) IsArtist() bool {
	return p.hasRoles([]string{"ARTIST"})
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
