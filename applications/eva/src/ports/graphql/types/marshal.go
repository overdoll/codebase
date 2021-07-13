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

	return &Account{ID: result.ID(), Username: result.Username(), Roles: result.RolesAsString(), Lock: lock, Avatar: result.Avatar(), Verified: result.Verified()}
}
