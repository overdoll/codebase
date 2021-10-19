package service_test

import (
	"context"
	"testing"

	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/internal/ports/graphql/types"
)

type Language struct {
	Language types.Language `graphql:"language()"`
}

type Languages struct {
	Languages []types.Language `graphql:"languages()"`
}

type UpdateLanguage struct {
	UpdateLanguage types.UpdateLanguagePayload `graphql:"updateLanguage(input: $input)"`
}

func getLanguage(t *testing.T, client *graphql.Client) types.Language {
	var language Language

	err := client.Query(context.Background(), &language, nil)

	require.NoError(t, err)

	return language.Language
}

func TestGetRandomLanguageAndSet(t *testing.T) {
	t.Parallel()

	client, _, _ := getHttpClient(t, nil)

	lang := getLanguage(t, client)

	require.Equal(t, "en-US", lang.Locale)

	var languages Languages

	err := client.Query(context.Background(), &languages, nil)

	require.NoError(t, err)

	// pick 3rd language
	pickedLanguage := languages.Languages[2]

	var updateLanguage UpdateLanguage

	err = client.Mutate(context.Background(), &updateLanguage, map[string]interface{}{
		"input": types.UpdateLanguageInput{Locale: pickedLanguage.Locale},
	})

	require.NoError(t, err)

	lang = getLanguage(t, client)

	require.Equal(t, pickedLanguage.Locale, lang.Locale)
}
