package account

import (
	"errors"
	"os"
	"overdoll/libraries/translations"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"overdoll/libraries/graphql"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Account struct {
	*paging.Node

	id string

	username string
	email    string
	roles    []Role
	verified bool
	avatar   string
	language *translations.Language

	locked       bool
	lockedUntil  int
	lockedReason LockReason

	lastUsernameEdit int

	multiFactorEnabled bool
}

var (
	ErrUsernameNotUnique     = errors.New("username is not unique")
	ErrEmailNotUnique        = errors.New("email is not unique")
	ErrEmailCodeInvalid      = errors.New("email confirmation expired or invalid")
	ErrAccountNotFound       = errors.New("account not found")
	ErrAccountPrivileged     = errors.New("account is privileged")
	ErrMultiFactorRequired   = errors.New("account needs to have multi factor enabled")
	ErrAccountAlreadyHasRole = errors.New("account is already the assigned role")
	ErrAccountNoRole         = errors.New("account does not have the assigned role")
)

func UnmarshalAccountFromDatabase(id, username, email string, roles []string, verified bool, avatar, locale string, locked bool, lockedUntil int, lockedReason string, multiFactorEnabled bool) *Account {

	var newRoles []Role

	for _, role := range roles {
		rl, _ := RoleFromString(role)
		newRoles = append(newRoles, rl)
	}

	lr, _ := LockReasonFromString(lockedReason)

	return &Account{
		id:                 id,
		username:           username,
		email:              email,
		roles:              newRoles,
		verified:           verified,
		avatar:             avatar,
		lockedUntil:        lockedUntil,
		locked:             locked,
		language:           translations.NewLanguage(locale),
		lockedReason:       lr,
		multiFactorEnabled: multiFactorEnabled,
	}
}

func NewAccount(lang *translations.Language, id, username, email string) (*Account, error) {

	if err := validateUsername(username); err != nil {
		return nil, err
	}

	return &Account{
		id:       id,
		username: username,
		language: lang,
		email:    email,
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

func (a *Account) IsUsername(usr string) bool {
	return strings.ToLower(a.username) == strings.ToLower(usr)
}

func (a *Account) Language() *translations.Language {
	return a.language
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

func (a *Account) LockedReason() LockReason {
	return a.lockedReason
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
		a.lockedReason = Unlocked
		a.locked = false
		return nil
	}

	rs, err := LockReasonFromString(reason)

	if err != nil {
		return nil
	}

	a.lockedUntil = duration
	a.lockedReason = rs
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
			if role.String() == requiredRole {
				return true
			}
		}
	}

	return false
}

func (a *Account) UsernameAlreadyBelongs(usernames []*Username, username string) *Username {

	for _, current := range usernames {
		if current.IsEqual(username) {
			return current
		}
	}

	return nil
}

func (a *Account) EditUsername(usernames []*Username, username string) error {

	if err := validateUsername(username); err != nil {
		return err
	}

	// if limit is reached, and the username doesn't belong to the account already
	if len(usernames) >= MaxUsernamesLimit && a.UsernameAlreadyBelongs(usernames, username) == nil {
		return ErrMaxUsernamesLimitReached
	}

	a.username = username
	a.lastUsernameEdit = int(time.Now().Unix())

	return nil
}

func (a *Account) RolesAsString() []string {
	var n []string

	for _, role := range a.roles {
		n = append(n, role.String())
	}

	return n
}

func (a *Account) UpdateLanguage(locale string) error {
	return a.language.SetLocale(locale)
}

func (a *Account) UpdateEmail(emails []*Email, email string) error {

	if len(emails) >= maxEmailsLimit {
		return ErrMaxEmailsLimitReached
	}

	for _, current := range emails {
		if current.IsEqual(email) {
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

func (a *Account) assignRoleCheck(requester *principal.Principal) error {

	// doesn't belong to account
	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	// need MFA enabled for a priv. role
	if !a.multiFactorEnabled {
		return ErrMultiFactorRequired
	}

	return nil
}

func (a *Account) AssignModeratorRole(requester *principal.Principal) error {

	if err := a.assignRoleCheck(requester); err != nil {
		return err
	}

	if a.IsModerator() {
		return ErrAccountAlreadyHasRole
	}

	a.roles = append(a.roles, Moderator)

	return nil
}

func (a *Account) AssignStaffRole(requester *principal.Principal) error {

	if err := a.assignRoleCheck(requester); err != nil {
		return err
	}

	if a.IsStaff() {
		return ErrAccountAlreadyHasRole
	}

	a.roles = append(a.roles, Staff)

	return nil
}

func (a *Account) revokeRoleCheck(requester *principal.Principal) error {

	// doesn't belong to account
	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	return nil
}

// remove from list of roles
func (a *Account) removeRole(role Role) error {
	var ind int
	found := false

	for i, rl := range a.roles {
		if rl == role {
			ind = i
			found = true
			break
		}
	}

	if found {
		a.roles = append(a.roles[:ind], a.roles[ind+1:]...)
		return nil
	}

	return ErrAccountNoRole
}

func (a *Account) RevokeStaffRole(requester *principal.Principal) error {

	if err := a.revokeRoleCheck(requester); err != nil {
		return err
	}

	if !a.IsStaff() {
		return ErrAccountNoRole
	}

	if err := a.removeRole(Staff); err != nil {
		return err
	}

	return nil
}

func (a *Account) RevokeModeratorRole(requester *principal.Principal) error {

	if err := a.revokeRoleCheck(requester); err != nil {
		return err
	}

	if !a.IsModerator() {
		return ErrAccountNoRole
	}

	if err := a.removeRole(Moderator); err != nil {
		return err
	}

	return nil
}

// convert account to a principal for global usage
func ToPrincipal(acc *Account) *principal.Principal {
	return principal.NewPrincipal(acc.id, acc.RolesAsString(), acc.verified, acc.locked)
}
