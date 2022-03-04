package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/cancellation"
	"overdoll/libraries/principal"
)

type UpdateCancellationReasonTitle struct {
	Principal *principal.Principal
	ReasonId  string
	Title     string
	Locale    string
}

type UpdateCancellationReasonTitleHandler struct {
	cr cancellation.Repository
}

func NewUpdateCancellationReasonTitleHandler(cr cancellation.Repository) UpdateCancellationReasonTitleHandler {
	return UpdateCancellationReasonTitleHandler{cr: cr}
}

func (h UpdateCancellationReasonTitleHandler) Handle(ctx context.Context, cmd UpdateCancellationReasonTitle) (*cancellation.Reason, error) {

	reasonItem, err := h.cr.UpdateReasonTitle(ctx, cmd.ReasonId, func(reason *cancellation.Reason) error {
		return reason.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return reasonItem, nil
}
