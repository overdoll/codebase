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

func (s CarrierGrpc) ConfirmAccountEmail(ctx context.Context, accountId, email, token string) error {

	_, err := s.client.ConfirmAccountEmail(ctx, &carrier.ConfirmAccountEmailRequest{
		Account: &carrier.Account{Id: accountId},
		Email:   email,
		Token:   token,
	})

	return err
}

func (s CarrierGrpc) NewLoginToken(ctx context.Context, email, token string) error {

	_, err := s.client.NewLoginToken(ctx, &carrier.NewLoginTokenRequest{
		Email: email,
		Token: token,
	})

	return err
}
