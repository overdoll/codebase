package service

import "context"

type CarrierServiceMock struct {
}

func (c CarrierServiceMock) ConfirmAccountEmail(ctx context.Context, accountId, email, token string) error {
	return nil
}

func (c CarrierServiceMock) NewLoginToken(ctx context.Context, email, token, language string) error {
	return nil
}
