package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/uuid"
	"testing"
)

type AccountPayoutMethod struct {
	Entities []struct {
		Account struct {
			ID           string
			PayoutMethod *struct {
				Item types.AccountPaxumPayoutMethod `graphql:"... on AccountPaxumPayoutMethod"`
			} `graphql:"payoutMethod()"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type SetPaxumAccountPayoutMethod struct {
	SetPaxumAccountPayoutMethod types.SetPaxumAccountPayoutMethodPayload `graphql:"setPaxumAccountPayoutMethod(input: $input)"`
}

type DeleteAccountPayoutMethod struct {
	DeleteAccountPayoutMethod types.DeleteAccountPayoutMethodPayload `graphql:"deleteAccountPayoutMethod(input: $input)"`
}

func TestCreateAndGetAccountPayoutMethod(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	email := "test-email@test.com"

	var res SetPaxumAccountPayoutMethod

	err := gClient.Mutate(context.Background(), &res, map[string]interface{}{
		"input": types.SetPaxumAccountPayoutMethodInput{Email: email},
	})

	require.NoError(t, err)
	require.NotNil(t, res.SetPaxumAccountPayoutMethod.AccountPayoutMethod)

	var method AccountPayoutMethod

	err = gClient.Query(context.Background(), &method, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         string(convertAccountIdToRelayId(accountId)),
			},
		},
	})

	require.NoError(t, err)

	require.NotNil(t, method.Entities[0].Account.PayoutMethod, "payout method is not nil")
	require.Equal(t, email, method.Entities[0].Account.PayoutMethod.Item.Email, "paxum payout method correct email")

	var del DeleteAccountPayoutMethod

	err = gClient.Mutate(context.Background(), &del, map[string]interface{}{
		"input": types.DeleteAccountPayoutMethodInput{PayoutMethodID: method.Entities[0].Account.PayoutMethod.Item.ID},
	})

	require.NoError(t, err)

	err = gClient.Query(context.Background(), &method, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         string(convertAccountIdToRelayId(accountId)),
			},
		},
	})

	require.NoError(t, err)

	require.Nil(t, method.Entities[0].Account.PayoutMethod, "payout method should be nil since it was deleted")
}
