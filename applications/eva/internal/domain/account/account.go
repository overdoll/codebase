package account

import (
	"errors"
	"os"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountRole string
type LockReason string

const (
	Staff    AccountRole = "staff"
	Moderator AccountRole = "moderator"
)

const (
	PostInfraction LockReason = "post_infraction"
)

type Account struct {
	*paging.Node

	id string

	username  string
	email     string
	roles     []AccountRole
	verified  bool
	avatar    string
	locked    bool

	lockedUntil  int
	lockedReason LockReason

	lastUsernameEdit int

	multiFactorEnabled bool
}

var (
	ErrUsernameNotUnique = errors.New("username is not unique")
	ErrEmailNotUnique    = errors.New("email is not unique")
	ErrEmailCodeInvalid  = errors.New("email confirmation expired or invalid")
	ErrAccountNotFound   = errors.New("account not found")
	ErrAccountPrivileged = errors.New("account is privileged")
)

func UnmarshalAccountFromDatabase(id, username, email string, roles []string, verified bool, avatar string, locked bool, lockedUntil int, lockedReason string, multiFactorEnabled bool) *Account {

	var newRoles []AccountRole

	for _, role := range roles {
		newRoles = append(newRoles, AccountRole(role))
	}

	return &Account{
		id:                 id,
		username:           username,
		email:              email,
		roles:              newRoles,
		verified:           verified,
		avatar:             avatar,
		lockedUntil:        lockedUntil,
		locked:             locked,
		lockedReason:       LockReason(lockedReason),
		multiFactorEnabled: multiFactorEnabled,
	}
}

func NewAccount(id, username, email string) (*Account, error) {

	if err := validateUsername(username); err != nil {
		return nil, err
	}

	return &Account{
		id:        id,
		username:  username,
		email:     strings.ToLower(email),
	}, nil
}

func (a *Account) ID() string {
	return a.id
}

func (a *Account) Email() string {
	return a.email
}

func (a *Account) Username() string {
	return a.username
}

func (a *Account) Verified() bool {
	return a.verified
}

func (a *Account) Avatar() string {
	return a.avatar
}

func (a *Account) ConvertAvatarToURI() graphql.URI {
	var staticURL = os.Getenv("STATIC_URL")
	return graphql.NewURI(staticURL + "/avatars/" + a.avatar)
}

func (a *Account) LockedUntil() int {
	return a.lockedUntil
}

func (a *Account) CanUnlock() bool {

	if a.lockedUntil == -1 {
		return true
	}

	return time.Now().After(time.Unix(int64(a.lockedUntil), 0))
}

func (a *Account) IsLocked() bool {
	return a.locked
}

func (a *Account) LockedReason() string {
	return string(a.lockedReason)
}

func (a *Account) IsLockedDueToPostInfraction() bool {
	return a.lockedReason == PostInfraction
}

func (a *Account) MultiFactorEnabled() bool {
	return a.multiFactorEnabled
}

func (a *Account) ToggleMultiFactor() error {

	if a.multiFactorEnabled && !a.CanDisableMultiFactor() {
		return ErrAccountPrivileged
	}

	a.multiFactorEnabled = !a.multiFactorEnabled
	return nil
}

func (a *Account) Lock(duration int, reason string) error {
	if duration == 0 {
		a.lockedUntil = 0
		a.lockedReason = ""
		a.locked = false
		return nil
	}

	a.lockedUntil = duration
	a.lockedReason = LockReason(reason)
	a.locked = true

	return nil
}

func (a *Account) Unlock() error {

	if !a.CanUnlock() {
		return errors.New("cannot unlock yet")
	}

	return a.Lock(0, "")
}

func (a *Account) LastUsernameEdit() int {
	return a.lastUsernameEdit
}

func (a *Account) CanDisableMultiFactor() bool {
	return !a.isPrivileged()
}

func (a *Account) isPrivileged() bool {
	return a.IsStaff() || a.IsModerator()
}

func (a *Account) IsStaff() bool {
	return a.hasRoles([]string{"staff"})
}

func (a *Account) IsModerator() bool {
	return (a.hasRoles([]string{"moderator"}) || a.IsStaff()) && !a.IsLocked()
}

func (a *Account) hasRoles(roles []string) bool {
	for _, role := range a.roles {
		for _, requiredRole := range roles {
			if string(role) == requiredRole {
				return true
			}
		}
	}

	return false
}

func (a *Account) EditUsername(username string) error {

	if err := validateUsername(username); err != nil {
		return err
	}

	a.username = username
	a.lastUsernameEdit = int(time.Now().Unix())

	return nil
}

func (a *Account) RolesAsString() []string {
	var n []string

	for _, role := range a.roles {
		n = append(n, string(role))
	}

	return n
}

func (a *Account) UpdateEmail(emails []*Email, email string) error {
	for _, current := range emails {
		if current.Email() == email {
			if current.IsConfirmed() {
				current.MakePrimary()
				a.email = email
				return nil
			}
		}
	}

	return ErrEmailNotConfirmed
}

func validateUsername(username string) error {
	err := validator.New().Var(username, "required,alphanum")

	if err != nil {
		return err
	}

	return nil
}

func (a *Account) CanMakeEmailPrimary(requester *principal.Principal) error {

	if err := requester.BelongsToAccount(a.id); err != nil {
		return err
	}

	return nil
}

func (a *Account) CanUpdateUsername(requester *principal.Principal) error {
	if err := requester.BelongsToAccount(a.id); err != nil {
		return err
	}

	return nil
}

// convert account to a principal for global usage
func ToPrincipal(acc *Account) *principal.Principal {
	return principal.NewPrincipal(acc.id, acc.RolesAsString(), acc.verified, acc.locked)
}
