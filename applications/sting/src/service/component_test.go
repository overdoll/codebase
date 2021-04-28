package service_test

import (
	"context"
	"os"
	"testing"

	"overdoll/applications/sting/src/service"
)

func startService() bool {
	_, router := service.NewComponentTestApplication(context.Background())

	go func() {
		_ = router.Run(context.Background())
	}()
	router.Running()

	return true
}

func TestMain(m *testing.M) {
	if !startService() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
