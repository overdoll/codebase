package command_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/uuid"
)

func TestRedeemCookie_Consume_fails_when_cookie_invalid(t *testing.T) {
	t.Parallel()

	id := uuid.New().String()

	ck, err := cookie.NewCookie(id, "test2@test.com", "")

	require.NoError(t, err)

	usr, err := user.NewUser(uuid.New().String(), "user", "test@test.com")

	require.NoError(t, err)

	handler := command.NewRedeemCookieHandler(&cookieRepoMock{Cookie: ck}, &userRepoMock{User: usr})

	usr, res, err := handler.Handle(context.Background(), true, "some-random-non-existent-cookie")

	// both response and error are nil when the cookie is invalid
	assert.Nil(t, res)
	assert.Nil(t, err)
}

func TestRedeemCookie_Consume_when_user_exists(t *testing.T) {
	t.Parallel()

	id := uuid.New().String()

	email := "test2@test.com"

	ck, err := cookie.NewCookie(id, email, "")

	require.NoError(t, err)

	usr, err := user.NewUser(uuid.New().String(), "user", email)

	require.NoError(t, err)

	handler := command.NewRedeemCookieHandler(&cookieRepoMock{Cookie: ck}, &userRepoMock{User: usr})

	_, res, err := handler.Handle(context.Background(), true, id)

	require.NoError(t, err)

	// user will be found here, so the cookie should be consumed
	assert.True(t, res.Consumed())
}

// A case where we have an auth cookie, but the user doesn't exist (not yet registered)
func TestRedeemCookie_Consume_false_when_user_not_exists(t *testing.T) {
	t.Parallel()

	id := uuid.New().String()

	ck, err := cookie.NewCookie(id, "test@test.com", "")

	require.NoError(t, err)

	handler := command.NewRedeemCookieHandler(&cookieRepoMock{Cookie: ck}, &userRepoMock{User: nil})

	_, res, err := handler.Handle(context.Background(), false, id)

	require.NoError(t, err)

	// Cookie returned as not consumed
	assert.False(t, res.Consumed())

	// cookie is redeemed in the same session, so we should get the same output
	_, res, err = handler.Handle(context.Background(), true, id)

	require.NoError(t, err)

	// Cookie returned as not consumed
	assert.False(t, res.Consumed())
}
