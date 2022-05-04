package service

import (
	"context"
	"overdoll/libraries/testing_tools"
)

const (
	tokenEmailPrefix   = "token-email"
	confirmEmailPrefix = "email-confirm"
)

type CarrierServiceMock struct {
	util *testing_tools.MailingRedisUtility
}

func NewCarrierServiceMock() CarrierServiceMock {
	return CarrierServiceMock{
		util: testing_tools.NewMailingRedisUtility(),
	}
}

func (c CarrierServiceMock) ConfirmAccountEmail(ctx context.Context, accountId, email, id, secret string) error {
	return c.util.SendEmail(ctx, confirmEmailPrefix, email, map[string]interface{}{"id": id, "secret": secret})
}

func (c CarrierServiceMock) NewLoginToken(ctx context.Context, email, token, secret string) error {
	return c.util.SendEmail(ctx, tokenEmailPrefix, email, map[string]interface{}{"token": token, "secret": secret})
}

func GetAuthTokenAndSecretFromEmail(email string) (string, string, error) {
	util := testing_tools.NewMailingRedisUtility()
	res, err := util.ReadEmail(context.Background(), tokenEmailPrefix, email)
	if err != nil {
		return "", "", err
	}

	return res["token"].(string), res["secret"].(string), nil
}

func GetEmailConfirmationTokenFromEmail(email string) (string, string, error) {
	util := testing_tools.NewMailingRedisUtility()
	res, err := util.ReadEmail(context.Background(), confirmEmailPrefix, email)
	if err != nil {
		return "", "", err
	}

	return res["id"].(string), res["secret"].(string), nil
}

type HadesServiceMock struct{}

func (h HadesServiceMock) HasNonTerminatedClubs(ctx context.Context, accountId string) (bool, error) {
	return true, nil
}

func (h HadesServiceMock) DeleteAccountData(ctx context.Context, accountId string) error {
	return nil
}

type StellaServiceMock struct{}

func (s StellaServiceMock) HasNonTerminatedClubs(ctx context.Context, accountId string) (bool, error) {
	return true, nil
}

func (s StellaServiceMock) DeleteAccountData(ctx context.Context, accountId string) error {
	return nil
}

type ParleyServiceMock struct{}

func (p ParleyServiceMock) DeleteAccountData(ctx context.Context, accountId string) error {
	return nil
}

type StingServiceMock struct{}

func (s StingServiceMock) DeleteAccountData(ctx context.Context, accountId string) error {
	return nil
}

type RingerServiceMock struct{}

func (r RingerServiceMock) DeleteAccountData(ctx context.Context, accountId string) error {
	return nil
}
