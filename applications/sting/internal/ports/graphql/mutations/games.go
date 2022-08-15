package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r *MutationResolver) CreateGameSession(ctx context.Context, input types.CreateGameSessionInput) (*types.CreateGameSessionPayload, error) {

	session, err := r.App.Commands.CreateGameSession.
		Handle(
			ctx,
			command.CreateGameSession{
				Game:     input.GameType.String(),
				Seed:     input.Seed,
				Passport: passport.FromContext(ctx),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.CreateGameSessionPayload{GameSession: types.MarshalGameSessionToGraphQL(ctx, session)}, nil
}

func (r *MutationResolver) SpinRoulette(ctx context.Context, input types.SpinRouletteInput) (*types.SpinRoulettePayload, error) {

	spin, err := r.App.Commands.SpinRoulette.
		Handle(
			ctx,
			command.SpinRoulette{
				GameSessionId: input.GameSessionID.GetID(),
				Passport:      passport.FromContext(ctx),
				Requester:     principal.FromContext(ctx),
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.SpinRoulettePayload{RouletteGameState: types.MarshalRouletteGameStateToGraphQL(ctx, spin)}, nil
}
