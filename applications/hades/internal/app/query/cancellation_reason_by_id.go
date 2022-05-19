package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type CancellationReasonById struct {
	ReasonId string
}

type CancellationReasonByIdHandler struct {
	br billing.Repository
}

func NewCancellationReasonByIdHandler(br billing.Repository) CancellationReasonByIdHandler {
	return CancellationReasonByIdHandler{br: br}
}

func (h CancellationReasonByIdHandler) Handle(ctx context.Context, query CancellationReasonById) (*billing.CancellationReason, error) {

	reason, err := h.br.GetCancellationReasonById(ctx, query.ReasonId)

	if err != nil {
		return nil, err
	}

	return reason, nil
}
