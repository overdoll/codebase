package entities

import (
	"context"

	"overdoll/applications/parley/src/app"
	"overdoll/applications/parley/src/ports/graphql/types"
)

type EntityResolver struct {
	App *app.Application
}

func (e EntityResolver) FindUserByID(ctx context.Context, id string) (*types.User, error) {

	history, err := e.App.Queries.UserInfractionHistory.Handle(ctx, id)

	if err != nil {
		return nil, err
	}

	var infractionHistory []*types.UsersInfractionHistory

	for _, infraction := range history {
		infractionHistory = append(infractionHistory, &types.UsersInfractionHistory{
			ID:     infraction.ID(),
			Reason: infraction.Reason(),
		})
	}

	return &types.User{
		ID:                id,
		InfractionHistory: infractionHistory,
	}, nil
}
