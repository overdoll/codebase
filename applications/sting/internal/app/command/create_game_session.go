package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/games"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/passport"
)

type CreateGameSession struct {
	Game     string
	Passport *passport.Passport
}

type CreateGameSessionHandler struct {
	gr games.Repository
	pr post.Repository
}

func NewCreateRouletteSessionHandler(gr games.Repository, pr post.Repository) CreateRouletteSessionHandler {
	return CreateRouletteSessionHandler{gr: gr, pr: pr}
}

func (h CreateRouletteSessionHandler) Handle(ctx context.Context, cmd CreateGameSession) (*games.SessionToken, error) {

	// we use nouns from our list of characters in the platform
	// so, we seed them here if needed
	if games.ShouldSeedNouns() {

		characterNames, err := h.pr.GetTopCharacterNames(ctx)

		if err != nil {
			return nil, err
		}

		games.SeedNouns(characterNames)
	}

	gameSessionState, err := games.NewRouletteSession(cmd.Passport)

	if err != nil {
		return nil, err
	}

	if err := h.gr.CreateGameSessionToken(ctx, gameSessionState); err != nil {
		return nil, err
	}

	return gameSessionState, nil
}
