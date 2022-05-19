package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type CreateCancellationReason struct {
	Principal *principal.Principal
	Title     string
}

type CreateCancellationReasonHandler struct {
	br billing.Repository
}

func NewCreateCancellationReasonHandler(br billing.Repository) CreateCancellationReasonHandler {
	return CreateCancellationReasonHandler{br: br}
}

func (h CreateCancellationReasonHandler) Handle(ctx context.Context, cmd CreateCancellationReason) (*billing.CancellationReason, error) {

	resultReason, err := billing.NewCancellationReason(
		cmd.Principal,
		cmd.Title,
	)

	if err != nil {
		return nil, err
	}

	if err := h.br.CreateCancellationReason(ctx, resultReason); err != nil {
		return nil, err
	}

	return resultReason, nil
}
