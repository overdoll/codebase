package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type GenerateClubSupporterReceiptFromAccountTransactionHistory struct {
	Principal                   *principal.Principal
	AccountTransactionHistoryId string
}

type GenerateClubSupporterReceiptFromAccountTransactionHistoryHandler struct {
	br billing.Repository
	fr billing.FileRepository
}

func NewGenerateClubSupporterReceiptFromAccountTransactionHistory(br billing.Repository, fr billing.FileRepository) GenerateClubSupporterReceiptFromAccountTransactionHistoryHandler {
	return GenerateClubSupporterReceiptFromAccountTransactionHistoryHandler{br: br, fr: fr}
}

func (h GenerateClubSupporterReceiptFromAccountTransactionHistoryHandler) Handle(ctx context.Context, cmd GenerateClubSupporterReceiptFromAccountTransactionHistory) (*billing.ClubSupporterReceipt, error) {

	transactionHistory, err := h.br.GetAccountTransactionHistoryById(ctx, cmd.Principal, cmd.AccountTransactionHistoryId)

	if err != nil {
		return nil, err
	}

	clubSupporterReceipt, err := h.fr.GetClubSupporterReceiptFromAccountTransactionHistory(ctx, transactionHistory)

	if err != nil && err != billing.ErrClubSupporterReceiptNotFound {
		return nil, err
	}

	// club supporter receipt is nil, we create a new one
	if clubSupporterReceipt == nil {
		return h.fr.CreateClubSupporterReceiptFromTransactionHistory(ctx, cmd.Principal, transactionHistory)
	}

	return clubSupporterReceipt, nil
}
