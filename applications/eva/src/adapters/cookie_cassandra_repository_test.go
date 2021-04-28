package adapters_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/adapters"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/libraries/ksuid"
	"overdoll/libraries/testing/scylla"
)

func TestCookieRepository_GetCookie_not_exists(t *testing.T) {
	t.Parallel()

	repo := newCookieRepository(t)
	ctx := context.Background()

	id := ksuid.New().String()

	usr, err := repo.GetCookieById(ctx, id)

	assert.Nil(t, usr)
	assert.EqualError(t, err, cookie.NotFoundError{CookieUUID: id}.Error())
}

func TestCookieRepository_CreateCookie(t *testing.T) {
	t.Parallel()

	repo := newCookieRepository(t)
	ctx := context.Background()

	ck, err := cookie.NewCookie(ksuid.New().String(), "test@test.com", "")

	require.NoError(t, err)

	err = repo.CreateCookie(ctx, ck)

	require.NoError(t, err)
}

func newCookieRepository(t *testing.T) adapters.CookieRepository {
	session := scylla.CreateScyllaSession(t, "eva")

	return adapters.NewCookieCassandraRepository(session)
}
