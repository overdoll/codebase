package account

import (
	"errors"
	"overdoll/libraries/localization"
	"time"

	"github.com/go-playground/validator/v10"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Account struct {
	*paging.Node

	id string

	username         string
	email            string
	roles            []Role
	verified         bool
	avatarResourceId string
	language         *localization.Language

	locked      bool
	lockedUntil *time.Time

	lastUsernameEdit time.Time

	multiFactorEnabled bool
}

var (
	ErrUsernameNotUnique      = errors.New("username is not unique")
	ErrEmailNotUnique         = errors.New("email is not unique")
	ErrEmailCodeInvalid       = errors.New("email confirmation expired or invalid")
	ErrAccountNotFound        = errors.New("account not found")
	ErrAccountPrivileged      = errors.New("account is privileged")
	ErrMultiFactorRequired    = errors.New("account needs to have multi factor enabled")
	ErrAccountNoRole          = errors.New("account does not have the assigned role")
	ErrUsernameChangeCooldown = errors.New("cannot change username yet")
)

func UnmarshalAccountFromDatabase(id, username, email string, roles []string, verified bool, avatar, locale string, locked bool, lockedUntil *time.Time, multiFactorEnabled bool, lastUsernameEdit time.Time) *Account {

	var newRoles []Role

	for _, role := range roles {
		rl, _ := RoleFromString(role)
		newRoles = append(newRoles, rl)
	}

	return &Account{
		id:                 id,
		username:           username,
		email:              email,
		roles:              newRoles,
		verified:           verified,
		avatarResourceId:   avatar,
		lockedUntil:        lockedUntil,
		locked:             locked,
		language:           localization.NewLanguageWithFallback(locale),
		multiFactorEnabled: multiFactorEnabled,
		lastUsernameEdit:   lastUsernameEdit,
	}
}

func NewAccount(lang *localization.Language, id, username, email string) (*Account, error) {

	if err := validateUsername(username); err != nil {
		return nil, err
	}

	return &Account{
		id:               id,
		username:         username,
		language:         lang,
		email:            email,
		lastUsernameEdit: time.Now().Add(time.Duration(-(24 * 30 * 2)) * time.Hour),
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

func (a *Account) Language() *localization.Language {
	return a.language
}

func (a *Account) Verified() bool {
	return a.verified
}

func (a *Account) AvatarResourceId() string {
	return a.avatarResourceId
}

func (a *Account) LockedUntil() *time.Time {
	return a.lockedUntil
}

func (a *Account) CanUnlock() bool {
	if a.locked {
		return true
	}
	return time.Now().After(*a.lockedUntil)
}

func (a *Account) IsLocked() bool {
	return a.locked
}

func (a *Account) MultiFactorEnabled() bool {
	return a.multiFactorEnabled
}

func (a *Account) DisableMultiFactor() error {

	if a.multiFactorEnabled && !a.CanDisableMultiFactor() {
		return ErrAccountPrivileged
	}

	a.multiFactorEnabled = false
	return nil
}

func (a *Account) EnableMultiFactor() error {
	a.multiFactorEnabled = true
	return nil
}

func (a *Account) Lock(requester *principal.Principal, time2 time.Time) error {
	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	a.lockedUntil = &time2
	a.locked = true

	return nil
}

func (a *Account) unlock() error {
	a.lockedUntil = nil
	a.locked = false

	return nil
}

func (a *Account) Unlock(requester *principal.Principal) error {

	if requester.IsStaff() {
		return a.unlock()
	}

	if !a.CanUnlock() {
		return errors.New("cannot unlock yet")
	}

	return a.unlock()
}

func (a *Account) LastUsernameEdit() time.Time {
	return a.lastUsernameEdit
}

func (a *Account) UsernameEditAvailableAt() time.Time {
	return a.lastUsernameEdit.Add(time.Hour * 24 * 30)
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

func (a *Account) EditUsername(username string) error {

	if err := validateUsername(username); err != nil {
		return err
	}

	if !time.Now().After(a.UsernameEditAvailableAt()) {
		return ErrUsernameChangeCooldown
	}

	a.username = username
	a.lastUsernameEdit = time.Now()

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

	l, err := localization.NewLanguage(locale)

	if err != nil {
		return err
	}

	a.language = l

	return nil
}

func (a *Account) UpdateEmail(emails []*Email, email string) error {

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

	if requester.IsLocked() {
		return principal.ErrLocked
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

	// if already moderator, don't do anything
	if a.IsModerator() {
		return nil
	}

	a.roles = append(a.roles, Moderator)

	return nil
}

func (a *Account) AssignStaffRole(requester *principal.Principal) error {

	if err := a.assignRoleCheck(requester); err != nil {
		return err
	}

	if a.IsStaff() {
		return nil
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

func ToPrincipal(acc *Account) *principal.Principal {
	return principal.NewPrincipal(acc.id, acc.RolesAsString(), acc.verified, acc.locked)
}
