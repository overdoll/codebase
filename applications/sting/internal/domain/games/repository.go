package games

import "context"

type Repository interface {
	CreateGameSession(ctx context.Context, sessionToken *Session) error
	GetGameSession(ctx context.Context, id string) (*Session, error)
	UpdateRouletteGameState(ctx context.Context, session *Session, state *RouletteGameState) error
	GetRouletteGameStateForSession(ctx context.Context, session *Session) (*RouletteGameState, error)
}
