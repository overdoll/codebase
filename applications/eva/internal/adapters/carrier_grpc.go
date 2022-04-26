package adapters

import (
	"context"

	carrier "overdoll/applications/carrier/proto"
)

type CarrierGrpc struct {
	client carrier.CarrierClient
}

func NewCarrierGrpc(client carrier.CarrierClient) CarrierGrpc {
	return CarrierGrpc{client: client}
}

func (s CarrierGrpc) ConfirmAccountEmail(ctx context.Context, accountId, email, id, secret string) error {

	_, err := s.client.ConfirmAccountEmail(ctx, &carrier.ConfirmAccountEmailRequest{
		Account: &carrier.Account{Id: accountId},
		Email:   email,
		Id:      id,
		Secret:  secret,
	})

	return err
}

func (s CarrierGrpc) NewLoginToken(ctx context.Context, email, token, secret string) error {

	_, err := s.client.NewLoginToken(ctx, &carrier.NewLoginTokenRequest{
		Email:  email,
		Token:  token,
		Secret: secret,
	})

	return err
}
