package adapters

import (
	"context"
	eva "overdoll/applications/eva/proto"
	"overdoll/libraries/errors"
)

type EvaGrpcSessionRepository struct {
	client eva.EvaClient
}

func NewEvaGrpcSessionRepository(client eva.EvaClient) EvaGrpcSessionRepository {
	return EvaGrpcSessionRepository{client: client}
}

func (s EvaGrpcSessionRepository) GetSession(ctx context.Context, sessionId string) (bool, string, error) {

	ss, err := s.client.GetSession(ctx, &eva.SessionRequest{Id: sessionId})

	if err != nil {
		return false, "", errors.Wrap(err, "failed to get session")
	}

	return ss.Valid, ss.AccountId, nil
}

func (s EvaGrpcSessionRepository) RevokeSession(ctx context.Context, sessionId string) error {

	_, err := s.client.RevokeSession(ctx, &eva.SessionRequest{Id: sessionId})

	if err != nil {
		return errors.Wrap(err, "failed to revoke session")
	}

	return nil
}

func (s EvaGrpcSessionRepository) CreateSession(ctx context.Context, accountId string) (string, error) {

	ss, err := s.client.CreateSession(ctx, &eva.CreateSessionRequest{AccountId: accountId})

	if err != nil {
		return "", errors.Wrap(err, "failed to create session")
	}

	return ss.Id, nil
}
