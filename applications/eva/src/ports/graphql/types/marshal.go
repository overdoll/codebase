package types

import (
	"overdoll/applications/eva/src/domain/account"
)

func MarshalUserToGraphQL(result *account.Account) *User {

	var lock *AccountLock

	if result.IsLocked() {
		lock = &AccountLock{
			Expires: result.LockedUntil(),
			Reason:  result.LockedReason(),
		}
	}

	return &User{ID: result.ID(), Username: result.Username(), Roles: result.RolesAsString(), Lock: lock, Avatar: result.Avatar(), Verified: result.Verified()}
}
