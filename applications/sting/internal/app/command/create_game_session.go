package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/games"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/errors/domainerror"
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

func NewCreateGameSessionHandler(gr games.Repository, pr post.Repository) CreateGameSessionHandler {
	return CreateGameSessionHandler{gr: gr, pr: pr}
}

func (h CreateGameSessionHandler) Handle(ctx context.Context, cmd CreateGameSession) (*games.Session, error) {

	// we use nouns from our list of characters in the platform as the seed for games (so seeds can be shareable?)
	// so, we seed them here if needed
	if games.ShouldSeedNouns() {

		characterNames, err := h.pr.GetTopCharacterNames(ctx)

		if err != nil {
			return nil, err
		}

		games.SeedNouns(characterNames)
	}

	game, err := games.TypeFromString(cmd.Game)

	if err != nil {
		return nil, err
	}

	if game == games.Roulette {

		gameSessionState, err := games.NewRouletteSession(cmd.Passport)

		if err != nil {
			return nil, err
		}

		if err := h.gr.CreateGameSession(ctx, gameSessionState); err != nil {
			return nil, err
		}

		return gameSessionState, nil
	}

	return nil, domainerror.NewValidation("could not create game")
}
