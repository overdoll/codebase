package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/games"
)

type GameSession struct {
	GameSessionId string
}

type GameSessionHandler struct {
	gr games.Repository
}

func NewGameSessionHandler(gr games.Repository) GameSessionHandler {
	return GameSessionHandler{gr: gr}
}

func (h GameSessionHandler) Handle(ctx context.Context, query GameSession) (*games.RouletteStatus, error) {

	session, err := h.gr.GetGameSession(ctx, query.GameSessionId)

	if err != nil {
		return nil, err
	}

	// session not closed
	if !session.IsClosed() {
		return games.RouletteStatusFromSession(session, nil), nil
	}

	states, err := h.gr.GetRouletteGameStatesForSession(ctx, session)

	if err != nil {
		return nil, err
	}

	return games.RouletteStatusFromSession(session, states), nil
}
