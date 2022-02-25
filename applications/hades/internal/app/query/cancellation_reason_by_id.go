package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/cancellation"
)

type CancellationReasonById struct {
	ReasonId string
}

type CancellationReasonByIdHandler struct {
	car cancellation.Repository
}

func NewCancellationReasonByIdHandler(car cancellation.Repository) CancellationReasonByIdHandler {
	return CancellationReasonByIdHandler{car: car}
}

func (h CancellationReasonByIdHandler) Handle(ctx context.Context, query CancellationReasonById) (*cancellation.Reason, error) {

	reason, err := h.car.GetReasonById(ctx, query.ReasonId)

	if err != nil {
		return nil, err
	}

	return reason, nil
}
