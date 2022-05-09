package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/payout"
)

type DeleteAndRecreateClubPayoutsIndexHandler struct {
	pr payout.Repository
}

func NewDeleteAndRecreateClubPayoutsIndexHandler(pr payout.Repository) DeleteAndRecreateClubPayoutsIndexHandler {
	return DeleteAndRecreateClubPayoutsIndexHandler{pr: pr}
}

func (h DeleteAndRecreateClubPayoutsIndexHandler) Handle(ctx context.Context) error {
	return h.pr.DeleteAndRecreateClubPayoutsIndex(ctx)
}
