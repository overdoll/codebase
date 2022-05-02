package service_test

import (
	"context"
	graphql1 "overdoll/libraries/graphql"
	"testing"

	"github.com/stretchr/testify/require"
)

type Languages struct {
	Languages []graphql1.Language `graphql:"languages()"`
}

func TestGetRandomLanguageAndSet(t *testing.T) {
	t.Parallel()

	client, _ := getHttpClient(t)

	var languages Languages

	err := client.Query(context.Background(), &languages, nil)

	require.NoError(t, err)

	// pick 3rd language
	pickedLanguage := languages.Languages[0]

	require.Equal(t, "en", pickedLanguage.Locale, "correct language")
}
