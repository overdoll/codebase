package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/curation"
	"overdoll/applications/sting/internal/domain/games"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type SpinRoulette struct {
	GameSessionId string
	Passport      *passport.Passport
	Requester     *principal.Principal
}

type SpinRouletteHandler struct {
	gr  games.Repository
	pr  post.Repository
	ccr curation.Repository
}

func NewSpinRouletteHandler(gr games.Repository, pr post.Repository, ccr curation.Repository) SpinRouletteHandler {
	return SpinRouletteHandler{gr: gr, pr: pr, ccr: ccr}
}

func (h SpinRouletteHandler) Handle(ctx context.Context, cmd SpinRoulette) (*games.RouletteGameState, error) {

	gameSession, err := h.gr.GetGameSession(ctx, cmd.GameSessionId)

	if err != nil {
		return nil, err
	}

	states, err := h.gr.GetRouletteGameStateForSession(ctx, gameSession)

	// catch not found errors
	if err != nil && !apperror.IsNotFoundError(err) {
		return nil, err
	}

	state, err := games.SpinRoulette(states, cmd.Passport, gameSession, func(seed int64) (*post.Post, error) {

		var audienceIds []string

		if cmd.Requester != nil {
			cure, err := h.ccr.GetProfileByAccountId(ctx, cmd.Requester, cmd.Requester.AccountId())

			if err != nil {
				return nil, err
			}

			audienceIds = cure.AudienceIds()
		}

		return h.pr.GetPostWithRandomSeed(ctx, cmd.Passport, seed, audienceIds)
	})

	if err != nil {
		return nil, err
	}

	if err := h.gr.UpdateRouletteGameState(ctx, gameSession, state); err != nil {
		return nil, err
	}

	return state, nil
}
