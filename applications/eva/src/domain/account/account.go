package account

import (
	"errors"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
)

type AccountRole string
type LockReason string

const (
	Artist      AccountRole = "artist"
	Contributor AccountRole = "contributor"
	Moderator   AccountRole = "moderator"
	Staff       AccountRole = "staff"
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
	unclaimed bool
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
		unclaimed: email == "",
	}, nil
}

func (u *Account) ID() string {
	return u.id
}

func (u *Account) Email() string {
	return u.email
}

func (u *Account) Username() string {
	return u.username
}

func (u *Account) Verified() bool {
	return u.verified
}

func (u *Account) Avatar() string {
	return u.avatar
}

func (u *Account) ConvertAvatarToURI() graphql.URI {
	return graphql.NewURI("")
}

func (u *Account) LockedUntil() int {
	return u.lockedUntil
}

func (u *Account) CanUnlock() bool {

	if u.lockedUntil == -1 {
		return true
	}

	return time.Now().After(time.Unix(int64(u.lockedUntil), 0))
}

func (u *Account) IsLocked() bool {
	return u.locked
}

func (u *Account) LockedReason() string {
	return string(u.lockedReason)
}

func (u *Account) IsLockedDueToPostInfraction() bool {
	return u.lockedReason == PostInfraction
}

func (u *Account) IsUnclaimed() bool {
	return u.unclaimed
}

func (u *Account) MultiFactorEnabled() bool {
	return u.multiFactorEnabled
}

func (u *Account) ToggleMultiFactor() error {

	if u.multiFactorEnabled && !u.CanDisableMultiFactor() {
		return ErrAccountPrivileged
	}

	u.multiFactorEnabled = !u.multiFactorEnabled
	return nil
}

func (u *Account) Lock(duration int, reason string) error {
	if duration == 0 {
		u.lockedUntil = 0
		u.lockedReason = ""
		u.locked = false
		return nil
	}

	u.lockedUntil = duration
	u.lockedReason = LockReason(reason)
	u.locked = true

	return nil
}

func (u *Account) Unlock() error {

	if !u.CanUnlock() {
		return errors.New("cannot unlock yet")
	}

	return u.Lock(0, "")
}

func (u *Account) LastUsernameEdit() int {
	return u.lastUsernameEdit
}

func (u *Account) CanDisableMultiFactor() bool {
	return !u.isPrivileged()
}

func (u *Account) isPrivileged() bool {
	return u.IsStaff() || u.IsModerator()
}

func (u *Account) IsStaff() bool {
	return u.hasRoles([]string{"staff"})
}

func (u *Account) IsArtist() bool {
	return u.hasRoles([]string{"artist"})
}

func (u *Account) IsModerator() bool {
	return (u.hasRoles([]string{"moderator"}) || u.IsStaff()) && !u.IsLocked()
}

func (u *Account) hasRoles(roles []string) bool {
	for _, role := range u.roles {
		for _, requiredRole := range roles {
			if string(role) == requiredRole {
				return true
			}
		}
	}

	return false
}

func (u *Account) EditUsername(username string) error {

	if err := validateUsername(username); err != nil {
		return err
	}

	u.username = username
	u.lastUsernameEdit = int(time.Now().Unix())

	return nil
}

func (u *Account) RolesAsString() []string {
	var n []string

	for _, role := range u.roles {
		n = append(n, string(role))
	}

	return n
}

func (u *Account) UpdateEmail(emails []*Email, email string) error {
	for _, current := range emails {
		if current.Email() == email {
			if current.IsConfirmed() {
				current.MakePrimary()
				u.email = email
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
