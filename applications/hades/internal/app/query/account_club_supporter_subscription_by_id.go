package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type AccountClubSupporterSubscriptionById struct {
	Principal *principal.Principal
	Id        string
}

type AccountClubSupporterSubscriptionByIdHandler struct {
	br billing.Repository
}

func NewAccountClubSupporterSubscriptionByIdHandler(br billing.Repository) AccountClubSupporterSubscriptionByIdHandler {
	return AccountClubSupporterSubscriptionByIdHandler{br: br}
}

func (h AccountClubSupporterSubscriptionByIdHandler) Handle(ctx context.Context, cmd AccountClubSupporterSubscriptionById) (*billing.AccountClubSupporterSubscription, error) {

	accountClubSupporterSubscription, err := h.br.GetAccountClubSupporterSubscriptionById(ctx, cmd.Principal, cmd.Id)

	if err != nil {
		return nil, err
	}

	return accountClubSupporterSubscription, nil
}
