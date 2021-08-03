package adapters

import (
	"os"
	"testing"

	"overdoll/libraries/config"
)

// create buckets before running tests
func seedConfiguration() bool {
	config.Read("applications/eva")

	return true
}

func TestMain(m *testing.M) {
	if !seedConfiguration() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
