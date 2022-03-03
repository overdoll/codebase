package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"testing"
)

type CancellationReasons struct {
	CancellationReasons types.CancellationReasonConnection `graphql:"cancellationReasons()"`
}

type CancellationReason struct {
	CancellationReason types.CancellationReason `graphql:"cancellationReason(reference: $reference)"`
}

type CreateCancellationReason struct {
	CreateCancellationReason *struct {
		CancellationReason *types.CancellationReason
	} `graphql:"createCancellationReason(input: $input)"`
}

type UpdateCancellationReasonTitle struct {
	UpdateCancellationReasonTitle *struct {
		CancellationReason *types.CancellationReason
	} `graphql:"updateCancellationReasonTitle(input: $input)"`
}

type UpdateCancellationReasonDeprecated struct {
	UpdateCancellationReasonDeprecated *struct {
		CancellationReason *types.CancellationReason
	} `graphql:"updateCancellationReasonDeprecated(input: $input)"`
}

type TestCancellationReason struct {
	Title string `faker:"username"`
}

func TestCreateCancellationReason(t *testing.T) {
	t.Parallel()

	client := getGraphqlClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	fake := TestCancellationReason{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake cancellation reason")

	var createCancellationReason CreateCancellationReason

	err = client.Mutate(context.Background(), &createCancellationReason, map[string]interface{}{
		"input": types.CreateCancellationReasonInput{
			Title: fake.Title,
		},
	})

	require.NoError(t, err, "no error creating cancellation reason")

	var cancellationReasons CancellationReasons

	err = client.Query(context.Background(), &cancellationReasons, nil)

	require.NoError(t, err, "no error querying cancellation reasons")

	var foundCancellationReason *types.CancellationReason

	for _, rule := range cancellationReasons.CancellationReasons.Edges {
		if rule.Node.Title == fake.Title {
			foundCancellationReason = rule.Node
		}
	}

	require.NotNil(t, foundCancellationReason, "found the newly created cancellation reason")

	newFake := TestCancellationReason{}
	err = faker.FakeData(&newFake)
	require.NoError(t, err, "no error generating new fake cancellation reason")

	var updateCancellationReasonTitle UpdateCancellationReasonTitle

	err = client.Mutate(context.Background(), &updateCancellationReasonTitle, map[string]interface{}{
		"input": types.UpdateCancellationReasonTitleInput{
			CancellationReasonID: foundCancellationReason.ID,
			Title:                newFake.Title,
			Locale:               "en",
		},
	})

	require.NoError(t, err, "no error updating cancellation reason title")

	require.Equal(t, newFake.Title, updateCancellationReasonTitle.UpdateCancellationReasonTitle.CancellationReason.Title, "new update should match")

	var updateCancellationReasonDeprecated UpdateCancellationReasonDeprecated

	err = client.Mutate(context.Background(), &updateCancellationReasonDeprecated, map[string]interface{}{
		"input": types.UpdateCancellationReasonDeprecatedInput{
			CancellationReasonID: foundCancellationReason.ID,
			Deprecated:           true,
		},
	})

	require.NoError(t, err, "no error updating  cancellation reason deprecated")

	require.True(t, updateCancellationReasonDeprecated.UpdateCancellationReasonDeprecated.CancellationReason.Deprecated, "new update should be deprecated")

	var cancellationReason CancellationReason

	err = client.Query(context.Background(), &cancellationReason, map[string]interface{}{
		"reference": graphql.String(foundCancellationReason.Reference),
	})

	require.NoError(t, err, "no error querying cancellation reason")
	require.NotNil(t, cancellationReason, "should have found cancellation reason")

	require.True(t, cancellationReason.CancellationReason.Deprecated, "should be deprecated")
	require.Equal(t, newFake.Title, cancellationReason.CancellationReason.Title, "should have proper title")
}
