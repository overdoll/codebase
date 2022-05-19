package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type UpdateCancellationReasonDeprecated struct {
	Principal  *principal.Principal
	ReasonId   string
	Deprecated bool
}

type UpdateCancellationReasonDeprecatedHandler struct {
	br billing.Repository
}

func NewUpdateCancellationReasonDeprecatedHandler(br billing.Repository) UpdateCancellationReasonDeprecatedHandler {
	return UpdateCancellationReasonDeprecatedHandler{br: br}
}

func (h UpdateCancellationReasonDeprecatedHandler) Handle(ctx context.Context, cmd UpdateCancellationReasonDeprecated) (*billing.CancellationReason, error) {

	reasonItem, err := h.br.UpdateCancellationReasonDeprecated(ctx, cmd.ReasonId, func(reason *billing.CancellationReason) error {
		return reason.UpdateDeprecated(cmd.Principal, cmd.Deprecated)
	})

	if err != nil {
		return nil, err
	}

	return reasonItem, nil
}
