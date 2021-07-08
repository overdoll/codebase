package command_test

import (
	"context"

	"overdoll/applications/eva/src/domain/account"
	"overdoll/applications/eva/src/domain/cookie"
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
	User *account.Account
}

func (u userRepoMock) GetAccountByUsername(ctx context.Context, s string) (*account.Account, error) {
	panic("implement me")
}

func (u userRepoMock) UpdateAccountUsername(ctx context.Context, s string, f func(*account.Account) error) (*account.Account, error) {
	panic("implement me")
}

func (u userRepoMock) GetAccountUsernames(ctx context.Context, s string) ([]*account.Username, error) {
	panic("implement me")
}

func (u userRepoMock) AddAccountEmail(ctx context.Context, a *account.Account, confirmation *account.EmailConfirmation) error {
	panic("implement me")
}

func (u userRepoMock) ConfirmAccountEmail(ctx context.Context, s string, a *account.Account) error {
	panic("implement me")
}

func (u userRepoMock) GetAccountEmails(ctx context.Context, s string) ([]*account.Email, error) {
	panic("implement me")
}

func (u userRepoMock) UpdateAccount(ctx context.Context, s string, f func(*account.Account) error) (*account.Account, error) {
	panic("implement me")
}

func (u userRepoMock) GetAccountById(ctx context.Context, id string) (*account.Account, error) {
	return u.User, nil
}

func (u userRepoMock) GetAccountByEmail(ctx context.Context, email string) (*account.Account, error) {

	if u.User == nil || email != u.User.Email() {
		return nil, account.ErrAccountNotFound
	}

	return u.User, nil
}

func (u userRepoMock) CreateAccount(ctx context.Context, instance *account.Account) error {
	return nil
}
