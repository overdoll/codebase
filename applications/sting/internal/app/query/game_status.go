package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/games"
)

type GameStatus struct {
	GameSessionTokenId string
}

type GameStatusHandler struct {
	gr games.Repository
}

func NewGameStatusHandler(gr games.Repository) GameStatusHandler {
	return GameStatusHandler{gr: gr}
}

func (h GameStatusHandler) Handle(ctx context.Context, query GameStatus) (*games.RouletteStatus, error) {
	return h.gr.GetRouletteStatus(ctx, query.GameSessionTokenId)
}
