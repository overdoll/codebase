package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	eva "overdoll/applications/eva/proto"
	"testing"
)

func TestLocation(t *testing.T) {
	t.Parallel()

	client, _ := getGrpcClient(t)

	res, err := client.GetLocationFromIp(context.Background(), &eva.GetLocationFromIpRequest{Ip: "175.16.199.0"})

	require.NoError(t, err, "no error for fetching location from ip")

	require.Equal(t, "Changchun", res.City)
	require.Equal(t, "", res.PostalCode)
	require.Equal(t, "Jilin Sheng", res.Subdivision)
	require.Equal(t, "CN", res.Country)
	require.Equal(t, 43.88, res.Latitude)
	require.Equal(t, 125.3228, res.Longitude)
}
