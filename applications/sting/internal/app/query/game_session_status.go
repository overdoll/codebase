package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/games"
)

type GameSessionStatus struct {
	GameSessionId string
}

type GameSessionStatusHandler struct {
	gr games.Repository
}

func NewGameSessionStatusHandler(gr games.Repository) GameSessionStatusHandler {
	return GameSessionStatusHandler{gr: gr}
}

func (h GameSessionStatusHandler) Handle(ctx context.Context, query GameSessionStatus) (*games.RouletteStatus, error) {

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
