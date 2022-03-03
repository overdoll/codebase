package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/cancellation"
	"overdoll/libraries/principal"
)

type UpdateCancellationReasonDeprecated struct {
	Principal  *principal.Principal
	ReasonId   string
	Deprecated bool
}

type UpdateCancellationReasonDeprecatedHandler struct {
	cr cancellation.Repository
}

func NewUpdateCancellationReasonDeprecatedHandler(cr cancellation.Repository) UpdateCancellationReasonDeprecatedHandler {
	return UpdateCancellationReasonDeprecatedHandler{cr: cr}
}

func (h UpdateCancellationReasonDeprecatedHandler) Handle(ctx context.Context, cmd UpdateCancellationReasonDeprecated) (*cancellation.Reason, error) {

	reasonItem, err := h.cr.UpdateReasonDeprecated(ctx, cmd.ReasonId, func(reason *cancellation.Reason) error {
		return reason.UpdateDeprecated(cmd.Principal, cmd.Deprecated)
	})

	if err != nil {
		return nil, err
	}

	return reasonItem, nil
}
