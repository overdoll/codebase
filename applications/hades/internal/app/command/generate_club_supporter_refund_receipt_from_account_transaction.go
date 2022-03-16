package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type GenerateClubSupporterRefundReceiptFromAccountTransaction struct {
	Principal                        *principal.Principal
	AccountTransactionHistoryId      string
	AccountTransactionHistoryEventId string
}

type GenerateClubSupporterRefundReceiptFromAccountTransactionHandler struct {
	br billing.Repository
	fr billing.FileRepository
}

func NewGenerateClubSupporterRefundReceiptFromAccountTransaction(br billing.Repository, fr billing.FileRepository) GenerateClubSupporterRefundReceiptFromAccountTransactionHandler {
	return GenerateClubSupporterRefundReceiptFromAccountTransactionHandler{br: br, fr: fr}
}

func (h GenerateClubSupporterRefundReceiptFromAccountTransactionHandler) Handle(ctx context.Context, cmd GenerateClubSupporterRefundReceiptFromAccountTransaction) (*billing.ClubSupporterReceipt, error) {

	transaction, err := h.br.GetAccountTransactionById(ctx, cmd.Principal, cmd.AccountTransactionHistoryId)

	if err != nil {
		return nil, err
	}

	clubSupporterReceipt, err := h.fr.GetOrCreateClubSupporterRefundReceiptFromAccountTransaction(ctx, cmd.Principal, transaction, cmd.AccountTransactionHistoryEventId)

	if err != nil {
		return nil, err
	}

	return clubSupporterReceipt, nil
}
