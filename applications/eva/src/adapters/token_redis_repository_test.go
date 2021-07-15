package adapters_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/adapters"
	"overdoll/applications/eva/src/domain/token"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/config"
	"overdoll/libraries/uuid"
)

func newFakeCookie(t *testing.T) *token.AuthenticationToken {

	ck, err := token.NewAuthenticationToken(uuid.New().String(), "test@test.com", "")

	require.NoError(t, err)

	return ck
}

func TestCookieRepository_GetCookie_not_exists(t *testing.T) {
	t.Parallel()

	repo := newCookieRepository(t)
	ctx := context.Background()

	id := uuid.New().String()

	usr, err := repo.GetAuthenticationTokenById(ctx, id)

	assert.Nil(t, usr)
	assert.EqualError(t, err, token.ErrTokenNotFound.Error())
}

func TestCookieRepository_GetCookie_exists(t *testing.T) {
	t.Parallel()

	repo := newCookieRepository(t)
	ctx := context.Background()

	ck := newFakeCookie(t)

	err := repo.CreateAuthenticationToken(ctx, ck)

	require.NoError(t, err)

	usr, err := repo.GetAuthenticationTokenById(ctx, ck.Token())

	assert.NotNil(t, usr)
	assert.NoError(t, err)
	assert.Equal(t, usr.Token(), ck.Token())
	assert.Equal(t, usr.Consumed(), ck.Consumed())
	assert.Equal(t, usr.Email(), ck.Email())
	assert.Equal(t, usr.Redeemed(), ck.Redeemed())
}

func TestCookieRepository_DeleteCookie(t *testing.T) {
	t.Parallel()

	repo := newCookieRepository(t)
	ctx := context.Background()

	ck := newFakeCookie(t)

	err := repo.CreateAuthenticationToken(ctx, ck)

	require.NoError(t, err)

	err = repo.DeleteAuthenticationTokenById(ctx, ck.Token())

	assert.NoError(t, err)
}

func newCookieRepository(t *testing.T) adapters.AuthenticationTokenRepository {
	config.Read("applications/eva/config.toml")

	redis, _ := bootstrap.InitializeRedisSession()

	return adapters.NewAuthenticationTokenRedisRepository(redis)
}
