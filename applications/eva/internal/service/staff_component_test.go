package service_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/internal/ports/graphql/types"
)

type AssignAccountModeratorRole struct {
	AssignAccountModeratorRole struct {
		Account *AccountModified
	} `graphql:"assignAccountModeratorRole(input: $input)"`
}

type RevokeAccountModeratorRole struct {
	RevokeAccountModeratorRole struct {
		Account *AccountModified
	} `graphql:"revokeAccountModeratorRole(input: $input)"`
}

func TestAccountRole_assign_and_revoke_moderator(t *testing.T) {
	t.Parallel()

	accs := seedMfaAccount(t)
	accountId := accs.ID()
	accountUsername := accs.Username()
	accountRelayId := convertAccountIdToRelayId(accountId)

	moderatorAccountId := "1q7MJ5IyRTV0X4J27F3m5wGD5mj"

	client, _ := getHttpClientWithAuthenticatedAccount(t, moderatorAccountId)

	var assignAccountModeratorRole AssignAccountModeratorRole

	err := client.Mutate(context.Background(), &assignAccountModeratorRole, map[string]interface{}{
		"input": types.AssignAccountModeratorRole{AccountID: accountRelayId},
	})

	require.NoError(t, err)

	acc := getAccountByUsername(t, client, accountUsername)

	require.True(t, acc.IsModerator, "account is now moderator")

	var revokeAccountModeratorRole RevokeAccountModeratorRole

	err = client.Mutate(context.Background(), &revokeAccountModeratorRole, map[string]interface{}{
		"input": types.RevokeAccountModeratorRole{AccountID: accountRelayId},
	})

	require.NoError(t, err)

	acc = getAccountByUsername(t, client, accountUsername)

	require.False(t, acc.IsModerator, "account is not moderator")
}

type AssignAccountStaffRole struct {
	AssignAccountStaffRole struct {
		Account *AccountModified
	} `graphql:"assignAccountStaffRole(input: $input)"`
}

type RevokeAccountStaffRole struct {
	RevokeAccountStaffRole struct {
		Account *AccountModified
	} `graphql:"revokeAccountStaffRole(input: $input)"`
}

func TestAccountRole_assign_and_revoke_staff(t *testing.T) {
	t.Parallel()

	accs := seedMfaAccount(t)
	accountId := accs.ID()
	accountUsername := accs.Username()
	accountRelayId := convertAccountIdToRelayId(accountId)
	moderatorAccountId := "1q7MJ5IyRTV0X4J27F3m5wGD5mj"

	client, _ := getHttpClientWithAuthenticatedAccount(t, moderatorAccountId)

	var assignAccountStaffRole AssignAccountStaffRole

	err := client.Mutate(context.Background(), &assignAccountStaffRole, map[string]interface{}{
		"input": types.AssignAccountStaffRole{AccountID: accountRelayId},
	})

	require.NoError(t, err)

	acc := getAccountByUsername(t, client, accountUsername)

	require.True(t, acc.IsStaff, "account is staff")

	var revokeAccountStaffRole RevokeAccountStaffRole

	err = client.Mutate(context.Background(), &revokeAccountStaffRole, map[string]interface{}{
		"input": types.RevokeAccountStaffRole{AccountID: accountRelayId},
	})

	require.NoError(t, err)

	acc = getAccountByUsername(t, client, accountUsername)

	require.False(t, acc.IsStaff, "account is not staff")
}

type AccountModifiedLock struct {
	Lock *types.AccountLock
}
type ViewerAccountLock struct {
	Viewer *AccountModifiedLock `graphql:"viewer()"`
}

type LockAccount struct {
	LockAccount struct {
		Account *AccountModifiedLock
	} `graphql:"lockAccount(input: $input)"`
}

type UnlockAccount struct {
	UnlockAccount struct {
		Account *AccountModifiedLock
	} `graphql:"unlockAccount(input: $input)"`
}

func TestAccount_lock_unlock(t *testing.T) {
	t.Parallel()

	acc := seedNormalAccount(t)
	accountId := acc.ID()
	accountIdRelay := convertAccountIdToRelayId(accountId)

	staffAccountId := "1q7MJ3JkhcdcJJNqZezdfQt5pZ6"

	gClient, _ := getHttpClientWithAuthenticatedAccount(t, staffAccountId)

	var lockAccount LockAccount

	err := gClient.Mutate(context.Background(), &lockAccount, map[string]interface{}{
		"input": types.LockAccountInput{AccountID: accountIdRelay, EndTime: time.Now().Add(time.Hour * 24)},
	})

	require.NoError(t, err, "no error for locking account")

	// check from viewer perspective
	gClient, _ = getHttpClientWithAuthenticatedAccount(t, accountId)

	var query ViewerAccountLock
	err = gClient.Query(context.Background(), &query, nil)
	require.NoError(t, err, "no error fetching viewer")

	require.NotNil(t, query.Viewer.Lock, "should be locked")

	// now, unlock as a staff
	gClient, _ = getHttpClientWithAuthenticatedAccount(t, staffAccountId)

	var unlockAccount UnlockAccount

	err = gClient.Mutate(context.Background(), &unlockAccount, nil)

	require.NoError(t, err, "no error when unlocking")

	// check account from viewer perspective
	gClient, _ = getHttpClientWithAuthenticatedAccount(t, accountId)

	err = gClient.Query(context.Background(), &query, nil)
	require.NoError(t, err, "no error fetching viewer")

	require.Nil(t, query.Viewer.Lock, "should not be locked")
}
