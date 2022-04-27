package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/uuid"
	"testing"
)

type ClubSupporterSubscriptionPricing struct {
	Entities []struct {
		Club struct {
			Id                         relay.ID
			SupporterSubscriptionPrice types.LocalizedPricingPoint
		} `graphql:"... on Club"`
	} `graphql:"_entities(representations: $representations)"`
}

func TestAccountClubSupporterSubscriptionPricing(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	clubId := uuid.New().String()

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var clubSupporterPricing ClubSupporterSubscriptionPricing

	err := gqlClient.Query(context.Background(), &clubSupporterPricing, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Club",
				"id":         convertClubIdIdToRelayId(clubId),
			},
		},
	})

	require.NoError(t, err, "no error grabbing supporter pricing")

	require.Len(t, clubSupporterPricing.Entities, 1, "1 entity")

	pricingItem := clubSupporterPricing.Entities[0].Club.SupporterSubscriptionPrice

	require.Equal(t, 699, pricingItem.LocalizedPrice.Amount, "correct amount")
	require.Equal(t, graphql.CurrencyUsd, pricingItem.LocalizedPrice.Currency, "correct currency")

	require.Len(t, pricingItem.Prices, 6, "all 6 currencies are here")
}
