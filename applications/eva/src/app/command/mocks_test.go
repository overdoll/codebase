package command_test

import (
	"context"

	"overdoll/applications/eva/src/domain/cookie"
	"overdoll/applications/eva/src/domain/user"
)

// MOCKS
type cookieRepoMock struct {
	Cookie *cookie.Cookie
}

func (c cookieRepoMock) GetCookieById(ctx context.Context, id string) (*cookie.Cookie, error) {

	if c.Cookie.Cookie() == id {
		return c.Cookie, nil
	}

	return nil, cookie.ErrCookieNotFound
}

func (c cookieRepoMock) DeleteCookieById(ctx context.Context, id string) error {
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

func (u userRepoMock) GetUserById(ctx context.Context, id string) (*user.User, error) {
	return u.User, nil
}

func (u userRepoMock) GetUserByEmail(ctx context.Context, email string) (*user.User, error) {

	if u.User == nil || email != u.User.Email() {
		return nil, user.ErrUserNotFound
	}

	return u.User, nil
}

func (u userRepoMock) CreateUser(ctx context.Context, instance *user.User) error {
	return nil
}
