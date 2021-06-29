package adapters_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/adapters"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/uuid"
)

func newFakeCookie(t *testing.T) *cookie.Cookie {

	ck, err := cookie.NewCookie(uuid.New().String(), "test@test.com", "")

	require.NoError(t, err)

	return ck
}

func TestCookieRepository_GetCookie_not_exists(t *testing.T) {
	t.Parallel()

	repo := newCookieRepository(t)
	ctx := context.Background()

	id := uuid.New().String()

	usr, err := repo.GetCookieById(ctx, id)

	assert.Nil(t, usr)
	assert.EqualError(t, err, cookie.ErrCookieNotFound.Error())
}

func TestCookieRepository_GetCookie_exists(t *testing.T) {
	t.Parallel()

	repo := newCookieRepository(t)
	ctx := context.Background()

	ck := newFakeCookie(t)

	err := repo.CreateCookie(ctx, ck)

	require.NoError(t, err)

	usr, err := repo.GetCookieById(ctx, ck.Cookie())

	assert.NotNil(t, usr)
	assert.NoError(t, err)
	assert.Equal(t, usr.Cookie(), ck.Cookie())
	assert.Equal(t, usr.Consumed(), ck.Consumed())
	assert.Equal(t, usr.Email(), ck.Email())
	assert.Equal(t, usr.Redeemed(), ck.Redeemed())
}

func TestCookieRepository_DeleteCookie(t *testing.T) {
	t.Parallel()

	repo := newCookieRepository(t)
	ctx := context.Background()

	ck := newFakeCookie(t)

	err := repo.CreateCookie(ctx, ck)

	require.NoError(t, err)

	err = repo.DeleteCookieById(ctx, ck.Cookie())

	assert.NoError(t, err)
}

func TestCookieRepository_UpdateCookie_make_redeemed(t *testing.T) {
	t.Parallel()

	repo := newCookieRepository(t)
	ctx := context.Background()

	ck := newFakeCookie(t)

	err := repo.CreateCookie(ctx, ck)

	require.NoError(t, err)

	err = ck.MakeRedeemed()

	require.NoError(t, err)

	err = repo.UpdateCookie(ctx, ck)

	require.NoError(t, err)
}

func newCookieRepository(t *testing.T) adapters.CookieRepository {
	redis, _ := bootstrap.InitializeRedisSession(2)

	return adapters.NewCookieRedisRepository(redis)
}
