package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/cancellation"
	"overdoll/libraries/principal"
)

type CreateCancellationReason struct {
	Principal *principal.Principal
	Title     string
}

type CreateCancellationReasonHandler struct {
	cr cancellation.Repository
}

func NewCreateCancellationReasonHandler(cr cancellation.Repository) CreateCancellationReasonHandler {
	return CreateCancellationReasonHandler{cr: cr}
}

func (h CreateCancellationReasonHandler) Handle(ctx context.Context, cmd CreateCancellationReason) (*cancellation.Reason, error) {

	resultReason, err := cancellation.NewReason(
		cmd.Principal,
		cmd.Title,
	)

	if err != nil {
		return nil, err
	}

	if err := h.cr.CreateReason(ctx, resultReason); err != nil {
		return nil, err
	}

	return resultReason, nil
}
