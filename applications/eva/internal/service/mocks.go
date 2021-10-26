package service

import (
	"context"
	"overdoll/libraries/testing_tools"
)

type CarrierServiceMock struct {
	util *testing_tools.MailingRedisUtility
}

func (c CarrierServiceMock) ConfirmAccountEmail(ctx context.Context, accountId, email, token string) error {
	return c.util.SendEmail(ctx, email, map[string]interface{}{"token": token})
}

func (c CarrierServiceMock) NewLoginToken(ctx context.Context, email, token, language string) error {
	return c.util.SendEmail(ctx, email, map[string]interface{}{"token": token})

}
