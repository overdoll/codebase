package types

import (
	"overdoll/applications/eva/src/domain/account"
)

func MarshalAccountToGraphQL(result *account.Account) *Account {

	var lock *AccountLock

	if result.IsLocked() {
		lock = &AccountLock{
			Expires: result.LockedUntil(),
			Reason:  result.LockedReason(),
		}
	}

	var roles []AccountRoleEnum

	if result.IsModerator() {
		roles = append(roles, AccountRoleEnumModerator)
	}

	if result.IsStaff() {
		roles = append(roles, AccountRoleEnumStaff)
	}

	return &Account{ID: result.ID(), Username: result.Username(), Roles: roles, Lock: lock, Avatar: result.Avatar(), Verified: result.Verified()}
}
