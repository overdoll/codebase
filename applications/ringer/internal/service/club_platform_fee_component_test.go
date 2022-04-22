package service_test

import (
	"context"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/uuid"
	"testing"
)

type GetClubPlatformFee struct {
	Entities []struct {
		Club struct {
			ID          string
			PlatformFee types.ClubPlatformFee `graphql:"platformFee()"`
		} `graphql:"... on Club"`
	} `graphql:"_entities(representations: $representations)"`
}

type UpdateClubPlatformFee struct {
	UpdateClubPlatformFee types.UpdateClubPlatformFeePayload `graphql:"updateClubPlatformFee(input: $input)"`
}

func getClubPlatformFee(t *testing.T, client *graphql.Client, clubId string) GetClubPlatformFee {

	var fee GetClubPlatformFee

	err := client.Query(context.Background(), &fee, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Club",
				"id":         string(convertClubIdToRelayId(clubId)),
			},
		},
	})

	require.NoError(t, err)

	return fee
}

func TestGetAndUpdatePlatformFee(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()
	clubId := uuid.New().String()
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	platformFee := getClubPlatformFee(t, gClient, clubId)
	require.NotNil(t, platformFee.Entities[0].Club.PlatformFee, "platform fee exists")
	require.Equal(t, 30, platformFee.Entities[0].Club.PlatformFee.Percent, "correct club platform fee percent")

	var res UpdateClubPlatformFee

	err := gClient.Mutate(context.Background(), &res, map[string]interface{}{
		"input": types.UpdateClubPlatformFeeInput{
			ClubID:  convertClubIdToRelayId(clubId),
			Percent: 22,
		},
	})

	require.NoError(t, err)
	require.NotNil(t, res.UpdateClubPlatformFee.ClubPlatformFee)

	platformFee = getClubPlatformFee(t, gClient, clubId)
	require.NotNil(t, platformFee.Entities[0].Club.PlatformFee, "platform fee exists")
	require.Equal(t, 22, platformFee.Entities[0].Club.PlatformFee.Percent, "correct updated club platform fee percent")
}
