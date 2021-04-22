package command_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"overdoll/applications/eva/src/app/command"
	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/ksuid"
)

// MOCKS
type cookieRepoMock struct {
	Cookie *cookie.Cookie
}

func (c cookieRepoMock) GetCookieById(ctx context.Context, id ksuid.UUID) (*cookie.Cookie, error) {
	return c.Cookie, nil
}

func (c cookieRepoMock) DeleteCookieById(ctx context.Context, id ksuid.UUID) error {
	return nil
}

func (c cookieRepoMock) CreateCookie(ctx context.Context, instance *cookie.Cookie) error {
	return nil
}

func (c cookieRepoMock) UpdateCookie(ctx context.Context, instance *cookie.Cookie) error {
	return nil
}

// MOCKS
type userRepoMock struct {
	User *user.User
}

func (u userRepoMock) GetUserById(ctx context.Context, id ksuid.UUID) (*user.User, error) {
	return u.User, nil
}

func (u userRepoMock) GetUserByEmail(ctx context.Context, email string) (*user.User, error) {
	return u.User, nil
}

func (u userRepoMock) CreateUser(ctx context.Context, instance *user.User) error {
	return nil
}

func TestRedeemCookie_Consume_when_user_exists(t *testing.T) {
	t.Parallel()

	id := ksuid.New()

	ck, err := cookie.NewCookie(id, "test2@test.com", "")

	require.NoError(t, err)

	usr, err := user.NewUser(ksuid.New(), "user", "test@test.com")

	require.NoError(t, err)

	handler := command.NewRedeemCookieHandler(&cookieRepoMock{Cookie: ck}, &userRepoMock{User: usr})

	res, err := handler.Handle(context.Background(), id.String())

	require.NoError(t, err)

	// user will be found here, so the cookie should be consumed
	assert.True(t, res.Consumed())
}

// A case where we have an auth cookie, but the user doesn't exist (not yet registered)
func TestRedeemCookie_Consume_false_when_user_not_exists(t *testing.T) {
	t.Parallel()

	id := ksuid.New()

	ck, err := cookie.NewCookie(id, "test@test.com", "")

	require.NoError(t, err)

	handler := command.NewRedeemCookieHandler(&cookieRepoMock{Cookie: ck}, &userRepoMock{User: nil})

	res, err := handler.Handle(context.Background(), id.String())

	require.NoError(t, err)

	// Cookie returned as not consumed
	assert.False(t, res.Consumed())
}
