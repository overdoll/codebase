package adapters

import (
	"context"
	"google.golang.org/protobuf/types/known/timestamppb"
	"overdoll/libraries/errors"
	"time"

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

	if err != nil {
		return errors.Wrap(err, "error sending confirm account email")
	}

	return nil
}

func (s CarrierGrpc) NewLoginToken(ctx context.Context, email, token, secret string) error {

	_, err := s.client.NewLoginToken(ctx, &carrier.NewLoginTokenRequest{
		Email:  email,
		Token:  token,
		Secret: secret,
	})

	if err != nil {
		return errors.Wrap(err, "error sending new login token email")
	}

	return nil
}

func (s CarrierGrpc) AccountDeletionBegin(ctx context.Context, accountId string, deletionDate time.Time) error {

	_, err := s.client.AccountDeletionBegin(ctx, &carrier.AccountDeletionBeginRequest{Account: &carrier.Account{Id: accountId}, DeletionDate: timestamppb.New(deletionDate)})

	if err != nil {
		return errors.Wrap(err, "error sending account deletion begin email")
	}

	return nil
}

func (s CarrierGrpc) AccountDeletionReminder(ctx context.Context, accountId string, deletionDate time.Time) error {

	_, err := s.client.AccountDeletionReminder(ctx, &carrier.AccountDeletionReminderRequest{Account: &carrier.Account{Id: accountId}, DeletionDate: timestamppb.New(deletionDate)})

	if err != nil {
		return errors.Wrap(err, "error sending account deletion reminder email")
	}

	return nil
}

func (s CarrierGrpc) AccountDeleted(ctx context.Context, username, email string) error {

	_, err := s.client.AccountDeleted(ctx, &carrier.AccountDeletedRequest{Username: username, Email: email})

	if err != nil {
		return errors.Wrap(err, "error sending account deleted email")
	}

	return nil
}
