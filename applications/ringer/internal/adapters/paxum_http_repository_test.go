package adapters_test

import (
	"context"
	"fmt"
	"github.com/stretchr/testify/require"
	"net/http"
	"os"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/applications/ringer/internal/domain/paxum"
	"overdoll/libraries/money"
	"testing"
)

func Test_TransferFunds_Sandbox(t *testing.T) {
	t.Parallel()

	// make sure we're in sandbox
	require.NoError(t, os.Setenv("PAXUM_SANDBOX", "true"))

	repository := newPaxumHttpRepository(t)

	newTransfer, err := paxum.NewTransfer(
		"test",
		"club-name",
		"test-email@test.com",
		"somename",
		"somesurname",
		100,
		money.USD,
	)
	require.NoError(t, err, "no error creating a transfer")

	res, err := repository.TransferFunds(context.Background(), newTransfer)
	require.NoError(t, err, "no error transferring funds in sandbox env")
	if res != nil {
		fmt.Println(*res)
	}
	require.Nil(t, res, "no error response")
}

func newPaxumHttpRepository(t *testing.T) adapters.PaxumHttpCassandraRepository {
	httpClient := &http.Client{}
	return adapters.NewPaxumHttpCassandraRepository(httpClient)
}
