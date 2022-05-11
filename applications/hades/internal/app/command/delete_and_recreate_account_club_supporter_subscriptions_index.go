package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
)

type DeleteAndRecreateAccountClubSupporterSubscriptionsIndexHandler struct {
	bi billing.Repository
}

func NewDeleteAndRecreateAccountClubSupporterSubscriptionsIndexHandler(bi billing.Repository) DeleteAndRecreateAccountClubSupporterSubscriptionsIndexHandler {
	return DeleteAndRecreateAccountClubSupporterSubscriptionsIndexHandler{bi: bi}
}

func (h DeleteAndRecreateAccountClubSupporterSubscriptionsIndexHandler) Handle(ctx context.Context) error {
	return h.bi.DeleteAndRecreateAccountClubSupporterSubscriptionsIndex(ctx)
}
