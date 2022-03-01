package adapters_test

import (
	"context"
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

type StellaServiceMock struct{}

func (s StellaServiceMock) GetClubMembershipsForAccount(ctx context.Context, accountId string) ([]string, error) {
	return []string{}, nil
}

func (s StellaServiceMock) CanAccountViewPostUnderClub(ctx context.Context, postId, accountId string) (bool, error) {
	return false, nil
}

func (s StellaServiceMock) GetSuspendedClubs(ctx context.Context) ([]string, error) {
	return []string{}, nil
}

func (s StellaServiceMock) CanAccountCreatePostUnderClub(ctx context.Context, clubId string, accountId string) (bool, error) {
	return false, nil
}

func (s StellaServiceMock) GetAccountSupportedClubs(ctx context.Context, accountId string) ([]string, error) {
	return []string{}, nil
}
