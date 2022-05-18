package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/uuid"
	"testing"
)

type Countries struct {
	Countries []*types.Country `graphql:"countries()"`
}

func TestGetCountries(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()

	mockAccountArtist(t, accountId)
	mockAccountDigestDefault(t, accountId)
	gClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var countries Countries

	err := gClient.Query(context.Background(), &countries, nil)

	require.NoError(t, err)

	require.Len(t, countries.Countries, 252, "correct amount of countries")
}
