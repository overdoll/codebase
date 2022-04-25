package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payment"
)

type IndexAllClubPaymentsHandler struct {
	pr payment.IndexRepository
}

func NewIndexAllClubPaymentsHandler(pr payment.IndexRepository) IndexAllClubPaymentsHandler {
	return IndexAllClubPaymentsHandler{pr: pr}
}

func (h IndexAllClubPaymentsHandler) Handle(ctx context.Context) error {

	if err := h.pr.DeleteClubPaymentsIndex(ctx); err != nil {
		return err
	}

	return h.pr.IndexAllClubPayments(ctx)
}
