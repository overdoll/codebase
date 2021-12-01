package adapters

import (
	"context"
	"encoding/json"
	"github.com/gorilla/sessions"
	eva "overdoll/applications/eva/proto"
)

type EvaGrpcSessionRepository struct {
	client eva.EvaClient
}

func NewEvaGrpcSessionRepository(client eva.EvaClient) EvaGrpcSessionRepository {
	return EvaGrpcSessionRepository{client: client}
}

func (s EvaGrpcSessionRepository) Load(ctx context.Context, sess *sessions.Session) (*sessions.Session, error) {

	ss, err := s.client.GetSession(ctx, &eva.GetSessionRequest{Id: sess.ID})

	if err != nil {
		return nil, err
	}

	var vals map[interface{}]interface{}

	if err := json.Unmarshal([]byte(ss.Serialized), &vals); err != nil {
		return nil, err
	}

	return &sessions.Session{ID: ss.Id, Values: vals}, nil
}

func (s EvaGrpcSessionRepository) Delete(ctx context.Context, session *sessions.Session) error {

	_, err := s.client.DeleteSession(ctx, &eva.DeleteSessionRequest{Id: session.ID})

	if err != nil {
		return err
	}

	return nil
}

func (s EvaGrpcSessionRepository) Save(ctx context.Context, session *sessions.Session) (*sessions.Session, error) {

	data, err := json.Marshal(session.Values)

	if err != nil {
		return nil, err
	}

	ss, err := s.client.SaveSession(ctx, &eva.SaveSessionRequest{Session: &eva.Session{Id: session.ID, Serialized: string(data)}})

	if err != nil {
		return nil, err
	}

	var vals map[interface{}]interface{}

	if err := json.Unmarshal([]byte(ss.Serialized), &vals); err != nil {
		return nil, err
	}

	return &sessions.Session{ID: ss.Id, Values: vals}, nil
}
