package service_test

import (
	"context"
	"github.com/stretchr/testify/require"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"testing"
	"time"
)

type CurationProfileModified struct {
	ID          relay.ID
	Completed   bool
	DateOfBirth struct {
		Skipped     bool
		Completed   bool
		DateOfBirth *time.Time
	}
	Audience struct {
		Completed bool
		Skipped   bool
		Audiences []struct {
			ID    string
			Title string
		}
	}
	Category struct {
		Completed  bool
		Skipped    bool
		Categories []struct {
			ID    string
			Title string
		}
	}
}

type AccountCuration struct {
	Entities []struct {
		Account struct {
			ID              string
			CurationProfile CurationProfileModified
		} `graphql:"... on Account"`
	} `graphql:"_entities(representations: $representations)"`
}

type UpdateCurationProfileAudience struct {
	UpdateCurationProfileAudience *struct {
		CurationProfile *CurationProfileModified
	} `graphql:"updateCurationProfileAudience(input: $input)"`
}

type UpdateCurationProfileCategory struct {
	UpdateCurationProfileCategory *struct {
		CurationProfile *CurationProfileModified
	} `graphql:"updateCurationProfileCategory(input: $input)"`
}

type UpdateCurationProfileDateOfBirth struct {
	UpdateCurationProfileDateOfBirth *struct {
		CurationProfile *CurationProfileModified
	} `graphql:"updateCurationProfileDateOfBirth(input: $input)"`
}

func getAccountCuration(t *testing.T, accountId string) CurationProfileModified {

	client := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var accountPersonalization AccountCuration

	err := client.Query(context.Background(), &accountPersonalization, map[string]interface{}{
		"representations": []_Any{
			{
				"__typename": "Account",
				"id":         convertAccountIdToRelayId(accountId),
			},
		},
	})

	require.NoError(t, err)

	return accountPersonalization.Entities[0].Account.CurationProfile
}

func TestCreateAndCompleteCurationProfile(t *testing.T) {
	t.Parallel()

	testingAccountId := newFakeAccount(t)
	mockAccountNormal(t, testingAccountId)
	mockAccountDigestNormal(t, testingAccountId)

	personalProfile := getAccountCuration(t, testingAccountId)

	require.False(t, personalProfile.Completed, "profile should not be completed initially")
	require.False(t, personalProfile.Audience.Completed, "audience profile should not be completed initially")
	require.False(t, personalProfile.Category.Completed, "category profile should not be completed initially")
	require.False(t, personalProfile.DateOfBirth.Completed, "birth date profile should not be completed initially")

	client := getGraphqlClientWithAuthenticatedAccount(t, testingAccountId)

	var updateDOB UpdateCurationProfileDateOfBirth

	dob := time.Now().Add(-time.Hour * 175200)

	err := client.Mutate(context.Background(), &updateDOB, map[string]interface{}{
		"input": types.UpdateCurationProfileDateOfBirthInput{
			DateOfBirth: &dob,
			Skipped:     false,
		},
	})

	require.NoError(t, err, "no error updating DOB curation profile")

	personalProfile = getAccountCuration(t, testingAccountId)
	require.True(t, personalProfile.DateOfBirth.Completed, "DOB profile should be now completed")

	var updateAudience UpdateCurationProfileAudience

	err = client.Mutate(context.Background(), &updateAudience, map[string]interface{}{
		"input": types.UpdateCurationProfileAudienceInput{
			AudienceIds: []relay.ID{"QXVkaWVuY2U6MXBjS2lRTDdkZ1VXOENJTjd1TzF3cUZhTXFs"},
			Skipped:     false,
		},
	})

	require.NoError(t, err, "no error updating audience curation profile")

	personalProfile = getAccountCuration(t, testingAccountId)
	require.True(t, personalProfile.Audience.Completed, "audience profile should be now completed")
	require.Len(t, personalProfile.Audience.Audiences, 1, "should have correct count of audiences")
	require.NotEmptyf(t, personalProfile.Audience.Audiences[0].Title, "title should not be empty")

	var updateCategories UpdateCurationProfileCategory

	err = client.Mutate(context.Background(), &updateCategories, map[string]interface{}{
		"input": types.UpdateCurationProfileCategoryInput{
			CategoryIds: []relay.ID{"Q2F0ZWdvcnk6MXE3TUpGazlXb2YxcXlRUU9SS0JySnhHRmhK", "Q2F0ZWdvcnk6MXE3TUpGTVZnRFBvNG1GanNmTmFnNnJSd1J5"},
			Skipped:     false,
		},
	})

	require.NoError(t, err, "no error updating category curation profile")

	personalProfile = getAccountCuration(t, testingAccountId)
	require.True(t, personalProfile.Category.Completed, "category profile should be now completed")
	require.Len(t, personalProfile.Category.Categories, 2, "should have correct count of categories")
	require.NotEmptyf(t, personalProfile.Category.Categories[0].Title, "title should not be empty")

	require.True(t, personalProfile.Completed, "profile should now be completed")
}
