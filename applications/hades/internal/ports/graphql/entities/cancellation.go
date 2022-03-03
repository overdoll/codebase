package entities

import (
	"context"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
)

func (r EntityResolver) FindCancellationReasonByID(ctx context.Context, id relay.ID) (*types.CancellationReason, error) {

	result, err := r.App.Queries.CancellationReasonById.Handle(ctx, query.CancellationReasonById{
		ReasonId: id.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCancellationReasonToGraphQL(ctx, result), nil

}
