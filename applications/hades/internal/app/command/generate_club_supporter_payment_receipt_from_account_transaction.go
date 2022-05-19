package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type GenerateClubSupporterPaymentReceiptFromAccountTransaction struct {
	Principal            *principal.Principal
	AccountTransactionId string
}

type GenerateClubSupporterPaymentReceiptFromAccountTransactionHandler struct {
	br billing.Repository
	fr billing.FileRepository
}

func NewGenerateClubSupporterPaymentReceiptFromAccountTransaction(br billing.Repository, fr billing.FileRepository) GenerateClubSupporterPaymentReceiptFromAccountTransactionHandler {
	return GenerateClubSupporterPaymentReceiptFromAccountTransactionHandler{br: br, fr: fr}
}

func (h GenerateClubSupporterPaymentReceiptFromAccountTransactionHandler) Handle(ctx context.Context, cmd GenerateClubSupporterPaymentReceiptFromAccountTransaction) (*billing.ClubSupporterReceipt, error) {

	transaction, err := h.br.GetAccountTransactionById(ctx, cmd.Principal, cmd.AccountTransactionId)

	if err != nil {
		return nil, err
	}

	clubSupporterReceipt, err := h.fr.GetOrCreateClubSupporterPaymentReceiptFromAccountTransaction(ctx, cmd.Principal, transaction)

	if err != nil {
		return nil, err
	}

	return clubSupporterReceipt, nil
}
