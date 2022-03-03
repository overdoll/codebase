package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/cancellation"

	"overdoll/libraries/paging"
)

type CancellationReasons struct {
	Cursor     *paging.Cursor
	Deprecated bool
}

type CancellationReasonsHandler struct {
	cr cancellation.Repository
}

func NewCancellationReasonsHandler(cr cancellation.Repository) CancellationReasonsHandler {
	return CancellationReasonsHandler{cr: cr}
}

func (h CancellationReasonsHandler) Handle(ctx context.Context, query CancellationReasons) ([]*cancellation.Reason, error) {

	reasons, err := h.cr.GetReasons(ctx, query.Cursor, query.Deprecated)

	if err != nil {
		return nil, err
	}

	return reasons, nil
}
