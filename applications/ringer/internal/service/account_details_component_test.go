package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/uuid"
	"testing"
)

type AccountDetails struct {
	Entities []struct {
		Account struct {
			ID             string
			AccountDetails *types.AccountDetails `graphql:"accountDetails()"`
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type UpdateAccountDetails struct {
	UpdateAccountDetails types.UpdateAccountDetailsPayload `graphql:"updateAccountDetails(input: $input)"`
}

func TestGetAndUpdateAccountDetails(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	firstName := "Bob"
	lastName := "Michael"
	countryId := relay.NewID(types.Country{}, "USA")

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

	require.NotNil(t, details.Entities[0].Account.AccountDetails, "account details is not nil")
	require.Equal(t, firstName, details.Entities[0].Account.AccountDetails.FirstName, "first name is equal")
	require.Equal(t, lastName, details.Entities[0].Account.AccountDetails.LastName, "last name is equal")
	require.Equal(t, "United States of America", details.Entities[0].Account.AccountDetails.Country.Name, "country is equal")
	require.Equal(t, types.PayoutMethodPaxum, details.Entities[0].Account.AccountDetails.Country.PayoutMethods[0], "correct payout method is set for country")
}

type Countries struct {
	Countries []*types.Country `graphql:"countries()"`
}

func TestGetCountries(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var countries Countries

	err := gClient.Query(context.Background(), &countries, nil)

	require.NoError(t, err)

	require.Len(t, countries.Countries, 10, "correct amount of countries")
}
