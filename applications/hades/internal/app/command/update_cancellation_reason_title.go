package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type UpdateCancellationReasonTitle struct {
	Principal *principal.Principal
	ReasonId  string
	Title     string
	Locale    string
}

type UpdateCancellationReasonTitleHandler struct {
	br billing.Repository
}

func NewUpdateCancellationReasonTitleHandler(br billing.Repository) UpdateCancellationReasonTitleHandler {
	return UpdateCancellationReasonTitleHandler{br: br}
}

func (h UpdateCancellationReasonTitleHandler) Handle(ctx context.Context, cmd UpdateCancellationReasonTitle) (*billing.CancellationReason, error) {

	reasonItem, err := h.br.UpdateCancellationReasonTitle(ctx, cmd.ReasonId, func(reason *billing.CancellationReason) error {
		return reason.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return reasonItem, nil
}
