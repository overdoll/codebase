package adapters

import (
	"context"
	eva "overdoll/applications/eva/proto"
)

type EvaGrpcSessionRepository struct {
	client eva.EvaClient
}

func NewEvaGrpcSessionRepository(client eva.EvaClient) EvaGrpcSessionRepository {
	return EvaGrpcSessionRepository{client: client}
}

func (s EvaGrpcSessionRepository) GetSession(ctx context.Context, sessionId string) (bool, string, int64, error) {

	ss, err := s.client.GetSession(ctx, &eva.SessionRequest{Id: sessionId})

	if err != nil {
		return false, "", 0, err
	}

	return ss.Valid, ss.AccountId, ss.Duration, nil
}

func (s EvaGrpcSessionRepository) RevokeSession(ctx context.Context, sessionId string) error {

	_, err := s.client.RevokeSession(ctx, &eva.SessionRequest{Id: sessionId})

	if err != nil {
		return err
	}

	return nil
}

func (s EvaGrpcSessionRepository) CreateSession(ctx context.Context, accountId string) (string, int64, error) {

	ss, err := s.client.CreateSession(ctx, &eva.CreateSessionRequest{AccountId: accountId})

	if err != nil {
		return "", 0, err
	}

	return ss.Id, ss.Duration, nil
}
