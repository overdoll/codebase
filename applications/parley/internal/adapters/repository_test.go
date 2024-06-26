package adapters_test

import (
	"os"
	"testing"

	"overdoll/libraries/config"
)

func seedConfiguration() bool {
	config.Read("applications/parley")
	return true
}

func TestMain(m *testing.M) {
	if !seedConfiguration() {
		os.Exit(1)
	}

	os.Exit(m.Run())
}
