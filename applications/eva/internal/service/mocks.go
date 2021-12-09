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

func (c CarrierServiceMock) ConfirmAccountEmail(ctx context.Context, accountId, email, token string) error {
	return c.util.SendEmail(ctx, confirmEmailPrefix, email, map[string]interface{}{"token": token})
}

func (c CarrierServiceMock) NewLoginToken(ctx context.Context, email, token, secret, language string) error {
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

func GetEmailConfirmationTokenFromEmail(email string) (string, error) {
	util := testing_tools.NewMailingRedisUtility()
	res, err := util.ReadEmail(context.Background(), confirmEmailPrefix, email)
	if err != nil {
		return "", err
	}

	return res["token"].(string), nil
}
