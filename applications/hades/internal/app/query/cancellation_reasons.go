package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
)

type CancellationReasons struct {
	Cursor     *paging.Cursor
	Deprecated bool
}

type CancellationReasonsHandler struct {
	br billing.Repository
}

func NewCancellationReasonsHandler(br billing.Repository) CancellationReasonsHandler {
	return CancellationReasonsHandler{br: br}
}

func (h CancellationReasonsHandler) Handle(ctx context.Context, query CancellationReasons) ([]*billing.CancellationReason, error) {

	reasons, err := h.br.GetCancellationReasons(ctx, query.Cursor, query.Deprecated)

	if err != nil {
		return nil, err
	}

	return reasons, nil
}
