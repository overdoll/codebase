package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type AccountSavedPaymentMethods struct {
	Principal *principal.Principal
	Cursor    *paging.Cursor
	AccountId string
}

type AccountSavedPaymentMethodsHandler struct {
	br billing.Repository
}

func NewAccountSavedPaymentMethodsHandler(br billing.Repository) AccountSavedPaymentMethodsHandler {
	return AccountSavedPaymentMethodsHandler{br: br}
}

func (h AccountSavedPaymentMethodsHandler) Handle(ctx context.Context, cmd AccountSavedPaymentMethods) ([]*billing.SavedPaymentMethod, error) {

	accountSavedPaymentMethods, err := h.br.GetAccountSavedPaymentMethods(ctx, cmd.Principal, cmd.Cursor, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	return accountSavedPaymentMethods, nil
}
