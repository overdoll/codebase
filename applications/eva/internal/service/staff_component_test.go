package service_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/passport"
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

	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var assignAccountModeratorRole AssignAccountModeratorRole

	err := client.Mutate(context.Background(), &assignAccountModeratorRole, map[string]interface{}{
		"input": types.AssignAccountModeratorRole{AccountID: "QWNjb3VudDoxcTdNSXcwVTZURXBFTEgwRnFueHJjWHQzRTA="},
	})

	require.NoError(t, err)

	acc := getAccountByUsername(t, client, "testaccountforstuff")

	require.True(t, acc.IsModerator)

	var revokeAccountModeratorRole RevokeAccountModeratorRole

	err = client.Mutate(context.Background(), &revokeAccountModeratorRole, map[string]interface{}{
		"input": types.RevokeAccountModeratorRole{AccountID: "QWNjb3VudDoxcTdNSXcwVTZURXBFTEgwRnFueHJjWHQzRTA="},
	})

	require.NoError(t, err)

	acc = getAccountByUsername(t, client, "testaccountforstuff")

	require.False(t, acc.IsModerator)
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

	client, _, _ := getHttpClient(t, passport.FreshPassportWithAccount("1q7MJ3JkhcdcJJNqZezdfQt5pZ6"))

	var assignAccountStaffRole AssignAccountStaffRole

	err := client.Mutate(context.Background(), &assignAccountStaffRole, map[string]interface{}{
		"input": types.AssignAccountStaffRole{AccountID: "QWNjb3VudDoxcTdNSXcwVTZURXBFTEgwRnFueHJjWHQzRTA="},
	})

	require.NoError(t, err)

	acc := getAccountByUsername(t, client, "testaccountforstuff")

	require.True(t, acc.IsStaff)

	var revokeAccountStaffRole RevokeAccountStaffRole

	err = client.Mutate(context.Background(), &revokeAccountStaffRole, map[string]interface{}{
		"input": types.RevokeAccountStaffRole{AccountID: "QWNjb3VudDoxcTdNSXcwVTZURXBFTEgwRnFueHJjWHQzRTA="},
	})

	require.NoError(t, err)

	acc = getAccountByUsername(t, client, "testaccountforstuff")

	require.False(t, acc.IsStaff)
}
