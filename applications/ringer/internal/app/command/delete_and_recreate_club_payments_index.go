package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
)

type DeleteAndRecreateClubPaymentsIndexHandler struct {
	pr payment.Repository
}

func NewDeleteAndRecreateClubPaymentsIndexHandler(pr payment.Repository) DeleteAndRecreateClubPaymentsIndexHandler {
	return DeleteAndRecreateClubPaymentsIndexHandler{pr: pr}
}

func (h DeleteAndRecreateClubPaymentsIndexHandler) Handle(ctx context.Context) error {
	return h.pr.DeleteAndRecreateClubPaymentsIndex(ctx)
}
