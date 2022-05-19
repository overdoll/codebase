package queries

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/paging"
)

func (r QueryResolver) CancellationReason(ctx context.Context, reference string) (*types.CancellationReason, error) {

	result, err := r.App.Queries.CancellationReasonById.Handle(ctx, query.CancellationReasonById{
		ReasonId: reference,
	})

	if err != nil {

		if err == billing.ErrReasonNotFound {
			return nil, nil
		}

		return nil, err
	}

	return types.MarshalCancellationReasonToGraphQL(ctx, result), nil

}

func (r QueryResolver) CancellationReasons(ctx context.Context, after *string, before *string, first *int, last *int, deprecated bool) (*types.CancellationReasonConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	cancellationReasons, err := r.App.Queries.CancellationReasons.Handle(ctx, query.CancellationReasons{
		Cursor:     cursor,
		Deprecated: deprecated,
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalCancellationReasonsToGraphQLConnection(ctx, cancellationReasons, cursor), nil

}
