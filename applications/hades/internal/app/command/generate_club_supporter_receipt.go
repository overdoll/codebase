package command

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/principal"
)

type GenerateClubSupporterReceipt struct {
	Principal                   *principal.Principal
	AccountTransactionHistoryId string
}

type GenerateClubSupporterReceiptHandler struct {
	br billing.Repository
	fr billing.FileRepository
}

func NewGenerateClubSupporterReceiptHandler(br billing.Repository, fr billing.FileRepository) GenerateClubSupporterReceiptHandler {
	return GenerateClubSupporterReceiptHandler{br: br, fr: fr}
}

func (h GenerateClubSupporterReceiptHandler) Handle(ctx context.Context, cmd GenerateClubSupporterReceipt) (*billing.ClubSupporterReceipt, error) {

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
