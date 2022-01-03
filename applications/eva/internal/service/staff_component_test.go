package service_test

import (
	"context"
	"testing"

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

	client, _ := getHttpClientWithAuthenticatedAccount(t, accountId)

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

	client, _ := getHttpClientWithAuthenticatedAccount(t, accountId)

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
