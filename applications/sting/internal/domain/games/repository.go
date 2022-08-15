package games

import "context"

type Repository interface {
	CreateGameSessionToken(ctx context.Context, sessionToken *SessionToken) error
	GetGameSessionToken(ctx context.Context, id string) (*SessionToken, error)
	UpdateRouletteGameState(ctx context.Context, session *SessionToken, state *RouletteGameState) error
	GetRouletteGameStatesForSession(ctx context.Context, session *SessionToken) ([]*RouletteGameState, error)
	GetRouletteStatus(ctx context.Context, id string) (*RouletteStatus, error)
}
