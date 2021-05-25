package service_test

import (
	"context"
	"os"
	"testing"

	"overdoll/applications/sting/src/service"
)

func startService() bool {
	_ = service.NewComponentTestApplication(context.Background())

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
