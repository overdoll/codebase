package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type IndexAllClubPayoutsHandler struct {
	pr payout.IndexRepository
}

func NewIndexAllClubPayoutsHandler(pr payout.IndexRepository) IndexAllClubPayoutsHandler {
	return IndexAllClubPayoutsHandler{pr: pr}
}

func (h IndexAllClubPayoutsHandler) Handle(ctx context.Context) error {

	if err := h.pr.DeleteClubPayoutsIndex(ctx); err != nil {
		return err
	}

	return h.pr.IndexAllClubPayouts(ctx)
}
