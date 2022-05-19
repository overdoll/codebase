package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type DeleteAccountSavedPaymentMethod struct {
	Principal                   *principal.Principal
	AccountId                   string
	AccountSavedPaymentMethodId string
}

type DeleteAccountSavedPaymentMethodHandler struct {
	br billing.Repository
}

func NewDeleteAccountSavedPaymentMethodHandler(br billing.Repository) DeleteAccountSavedPaymentMethodHandler {
	return DeleteAccountSavedPaymentMethodHandler{br: br}
}

func (h DeleteAccountSavedPaymentMethodHandler) Handle(ctx context.Context, cmd DeleteAccountSavedPaymentMethod) error {
	return h.br.DeleteAccountSavedPaymentMethod(ctx, cmd.Principal, cmd.AccountId, cmd.AccountSavedPaymentMethodId)
}
