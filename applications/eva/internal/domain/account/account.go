package account

import (
	"errors"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/resource"
	"time"

	"github.com/go-playground/validator/v10"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type Account struct {
	*paging.Node

	id string

	username       string
	email          string
	roles          []Role
	avatarResource *resource.Resource

	locked      bool
	lockedUntil *time.Time

	deleting                    bool
	scheduledDeletionAt         *time.Time
	scheduledDeletionWorkflowId *string
	deleted                     bool

	lastUsernameEdit time.Time

	multiFactorEnabled bool

	createdAt time.Time
}

var (
	ErrUsernameNotUnique      = domainerror.NewValidation("username is not unique")
	ErrEmailNotUnique         = domainerror.NewValidation("email is not unique")
	ErrEmailCodeInvalid       = domainerror.NewValidation("email confirmation expired or invalid")
	ErrAccountPrivileged      = domainerror.NewValidation("account is privileged")
	ErrMultiFactorRequired    = domainerror.NewValidation("account needs to have multi factor enabled")
	ErrAccountNoRole          = domainerror.NewValidation("account does not have the assigned role")
	ErrUsernameChangeCooldown = domainerror.NewValidation("cannot change username yet")
	ErrAccountIsDeleting      = domainerror.NewValidation("cannot updated account in deleting status")
)

func UnmarshalAccountFromDatabase(id, username, email string, roles []string, avatar *resource.Resource, locked bool, lockedUntil *time.Time, isDeleting bool, scheduledDeletionAt *time.Time, scheduledDeletionWorkflowId *string, multiFactorEnabled bool, lastUsernameEdit time.Time, isDeleted bool, createdAt time.Time) *Account {

	var newRoles []Role

	for _, role := range roles {
		rl, _ := RoleFromString(role)
		newRoles = append(newRoles, rl)
	}

	return &Account{
		id:                          id,
		username:                    username,
		email:                       email,
		roles:                       newRoles,
		avatarResource:              avatar,
		deleting:                    isDeleting,
		scheduledDeletionAt:         scheduledDeletionAt,
		scheduledDeletionWorkflowId: scheduledDeletionWorkflowId,
		lockedUntil:                 lockedUntil,
		locked:                      locked,
		multiFactorEnabled:          multiFactorEnabled,
		lastUsernameEdit:            lastUsernameEdit,
		deleted:                     isDeleted,
		createdAt:                   createdAt,
	}
}

func NewAccount(id, username, email string) (*Account, error) {

	if err := validateUsername(username); err != nil {
		return nil, err
	}

	return &Account{
		id:               id,
		username:         username,
		email:            email,
		lastUsernameEdit: time.Now().Add(time.Duration(-(24 * 30 * 2)) * time.Hour),
		createdAt:        time.Now(),
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

func (a *Account) AvatarResource() *resource.Resource {
	return a.avatarResource
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

func (a *Account) CanCancelDeletion(requester *principal.Principal) error {

	if a.deleted {
		return errors.New("already deleted")
	}

	if !a.deleting {
		return errors.New("not in deletion state")
	}

	if requester.IsStaff() {
		return nil
	}

	return requester.BelongsToAccount(a.id)
}

func (a *Account) CanDelete(requester *principal.Principal) error {

	if a.IsDeleting() {
		return errors.New("already deleting")
	}

	if requester.IsStaff() {
		return nil
	}

	return requester.BelongsToAccount(a.id)
}

func (a *Account) IsLocked() bool {
	// an account that is deleting is also locked
	return a.locked || a.deleting
}

func (a *Account) Locked() bool {
	return a.locked
}

func (a *Account) IsSecure() bool {
	return a.multiFactorEnabled
}

func (a *Account) ScheduledDeletionWorkflowId() *string {
	return a.scheduledDeletionWorkflowId
}

func (a *Account) MultiFactorEnabled() bool {
	return a.multiFactorEnabled
}

func (a *Account) CreatedAt() time.Time {
	return a.createdAt
}

func (a *Account) IsDeleting() bool {
	return a.deleting
}

func (a *Account) IsDeleted() bool {
	return a.deleted
}

func (a *Account) ScheduledDeletionAt() *time.Time {
	return a.scheduledDeletionAt
}

func (a *Account) DisableMultiFactor() error {

	if a.deleting {
		return ErrAccountIsDeleting
	}

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
	return a.hasRoles([]string{Staff.String()})
}

func (a *Account) IsModerator() bool {
	return (a.hasRoles([]string{Moderator.String()}) || a.IsStaff()) && !a.IsLocked()
}

func (a *Account) IsArtist() bool {
	return (a.hasRoles([]string{Artist.String()}) || a.IsStaff()) && !a.IsLocked()
}

func (a *Account) IsWorker() bool {
	return (a.hasRoles([]string{Worker.String()}) || a.IsStaff()) && !a.IsLocked()
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

	if a.deleting {
		return ErrAccountIsDeleting
	}

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

func (a *Account) UpdateEmail(emails []*Email, email string) error {

	if a.deleting {
		return ErrAccountIsDeleting
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

func (a *Account) MarkDeleting(timestamp time.Time, workflowId string) error {

	future := timestamp.Add(time.Hour * 24 * 30)

	a.deleting = true
	a.scheduledDeletionAt = &future
	a.scheduledDeletionWorkflowId = &workflowId

	return nil
}

func (a *Account) MarkUnDeleted() error {
	a.deleting = false
	a.scheduledDeletionAt = nil

	return nil
}

func (a *Account) MarkDeleted() error {

	a.deleted = true

	return nil
}

func validateUsername(username string) error {
	err := validator.New().Var(username, "required,alphanum,max=25,excludesall= ")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}

func (a *Account) CanMakeEmailPrimary(requester *principal.Principal) error {

	if a.deleting {
		return ErrAccountIsDeleting
	}

	if err := requester.BelongsToAccount(a.id); err != nil {
		return err
	}

	return nil
}

func (a *Account) CanUpdateUsername(requester *principal.Principal) error {

	if a.deleting {
		return ErrAccountIsDeleting
	}

	if err := requester.BelongsToAccount(a.id); err != nil {
		return err
	}

	return nil
}

func (a *Account) assignRoleCheck(requester *principal.Principal) error {

	if a.deleting {
		return ErrAccountIsDeleting
	}

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

func (a *Account) AssignWorkerRole() error {

	if a.deleting {
		return ErrAccountIsDeleting
	}

	if a.IsWorker() {
		return nil
	}

	a.roles = append(a.roles, Worker)

	return nil
}

func (a *Account) AssignArtistRole(requester *principal.Principal) error {

	if a.deleting {
		return ErrAccountIsDeleting
	}

	// doesn't belong to account
	if !requester.IsStaff() {
		return principal.ErrNotAuthorized
	}

	if requester.IsLocked() {
		return principal.ErrLocked
	}

	if a.IsArtist() {
		return nil
	}

	a.roles = append(a.roles, Artist)

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

	if a.deleting {
		return ErrAccountIsDeleting
	}

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

func (a *Account) RevokeWorkerRole() error {

	if !a.IsWorker() {
		return ErrAccountNoRole
	}

	if err := a.removeRole(Worker); err != nil {
		return err
	}

	return nil
}

func (a *Account) RevokeArtistRole(requester *principal.Principal) error {

	if err := a.revokeRoleCheck(requester); err != nil {
		return err
	}

	if !a.IsArtist() {
		return ErrAccountNoRole
	}

	if err := a.removeRole(Artist); err != nil {
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
	return principal.NewPrincipal(acc.id, acc.username, acc.email, acc.RolesAsString(), acc.locked, acc.IsSecure(), false)
}
