package queries

import (
	"context"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/ports/graphql/types"
	"overdoll/libraries/errors/apperror"
)

func (r *QueryResolver) GameSessionStatus(ctx context.Context, reference string) (types.GameSessionStatus, error) {

	status, err := r.App.Queries.GameSessionStatus.
		Handle(
			ctx,
			query.GameSessionStatus{
				GameSessionId: reference,
			},
		)

	if err != nil {

		// catch not found errors
		if apperror.IsNotFoundError(err) {
			return nil, nil
		}

		return nil, err
	}

	var allStates []*types.RouletteGameState

	for _, state := range status.AllGameStates() {
		allStates = append(allStates, types.MarshalRouletteGameStateToGraphQL(ctx, state))
	}

	return &types.RouletteStatus{
		GameSession:   types.MarshalGameSessionToGraphQL(ctx, status.Session()),
		LastGameState: types.MarshalRouletteGameStateToGraphQL(ctx, status.LastRouletteGameState()),
		AllGameStates: allStates,
		TotalRolls:    status.TotalRolls(),
		TotalDoubles:  status.TotalDoubles(),
		Probability:   status.Probability(),
		Score:         status.Score(),
	}, nil
}
