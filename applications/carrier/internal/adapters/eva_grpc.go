package adapters

import (
	"context"
	"go.uber.org/zap"
	"overdoll/libraries/errors"

	"overdoll/applications/carrier/internal/domain/identifier"
	eva "overdoll/applications/eva/proto"
)

type EvaGrpc struct {
	client eva.EvaClient
}

func NewEvaGrpc(client eva.EvaClient) EvaGrpc {
	return EvaGrpc{client: client}
}

func (s EvaGrpc) GetAccount(ctx context.Context, id string) (*identifier.Identifier, error) {

	usr, err := s.client.GetAccount(ctx, &eva.GetAccountRequest{
		Id: id,
	})

	if err != nil {
		zap.S().Errorw("error retrieving account", zap.Error(err))
		return nil, errors.Wrap(err, "error retrieving account")
	}

	return identifier.UnmarshalIdentifierFromDatabase(usr.Id, usr.Username, usr.Email), nil
}
