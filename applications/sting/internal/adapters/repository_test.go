package adapters_test

import (
	"os"
	"testing"

	"overdoll/libraries/config"
)

// create buckets before running tests
func seedConfiguration() bool {
	config.Read("applications/sting")

	return true
}

func TestMain(m *testing.M) {
	if !seedConfiguration() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
