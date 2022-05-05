package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	ringer "overdoll/applications/ringer/proto"
	"overdoll/libraries/graphql/relay"
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
	SetPaxumAccountPayoutMethod *struct {
		AccountPayoutMethod *struct {
			Item struct {
				Id relay.ID
			} `graphql:"... on AccountPaxumPayoutMethod"`
		}
	} `graphql:"setPaxumAccountPayoutMethod(input: $input)"`
}

type DeleteAccountPayoutMethod struct {
	DeleteAccountPayoutMethod *struct {
		DeletedAccountPayoutMethodId relay.ID
	} `graphql:"deleteAccountPayoutMethod(input: $input)"`
}

type AccountDetails struct {
	Entities []struct {
		Account struct {
			ID      string
			Details *types.AccountDetails `graphql:"details()"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type UpdateAccountDetails struct {
	UpdateAccountDetails types.UpdateAccountDetailsPayload `graphql:"updateAccountDetails(input: $input)"`
}

func TestCreateAndGetAccountPayoutMethod(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	firstName := "Bob"
	lastName := "Michael"
	countryId := convertCountryIdToRelayId("USA")

	var res UpdateAccountDetails

	err := gClient.Mutate(context.Background(), &res, map[string]interface{}{
		"input": types.UpdateAccountDetailsInput{
			FirstName: firstName,
			LastName:  lastName,
			CountryID: countryId,
		},
	})

	require.NoError(t, err)
	require.NotNil(t, res.UpdateAccountDetails.AccountDetails)

	var details AccountDetails

	err = gClient.Query(context.Background(), &details, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         string(convertAccountIdToRelayId(accountId)),
			},
		},
	})

	require.NoError(t, err)

	require.NotNil(t, details.Entities[0].Account.Details, "account details is not nil")
	require.Equal(t, firstName, details.Entities[0].Account.Details.FirstName, "first name is equal")
	require.Equal(t, lastName, details.Entities[0].Account.Details.LastName, "last name is equal")
	require.Equal(t, "United States", details.Entities[0].Account.Details.Country.Name, "country is equal")
	require.Equal(t, types.PayoutMethodPaxum, details.Entities[0].Account.Details.Country.PayoutMethods[0], "correct payout method is set for country")

	email := "test-email@test.com"

	var set SetPaxumAccountPayoutMethod

	err = gClient.Mutate(context.Background(), &set, map[string]interface{}{
		"input": types.SetPaxumAccountPayoutMethodInput{Email: email},
	})

	require.NoError(t, err)
	require.NotNil(t, set.SetPaxumAccountPayoutMethod.AccountPayoutMethod)

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

	grpcClient := getGrpcClient(t)

	_, err = grpcClient.DeleteAccountData(context.Background(), &ringer.DeleteAccountDataRequest{AccountId: accountId})

	require.NoError(t, err, "no error deleting account data")

	err = gClient.Query(context.Background(), &details, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         string(convertAccountIdToRelayId(accountId)),
			},
		},
	})

	require.NoError(t, err)

	require.Nil(t, details.Entities[0].Account.Details, "account details were deleted")
}
