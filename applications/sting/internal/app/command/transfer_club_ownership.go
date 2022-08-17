package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/event"
	"overdoll/libraries/principal"
)

type TransferClubOwnership struct {
	Principal *principal.Principal
	ClubId    string
	AccountId string
}

type TransferClubOwnershipHandler struct {
	cr    club.Repository
	event event.Repository
	eva   EvaService
}

func NewTransferClubOwnershipHandler(cr club.Repository, event event.Repository, eva EvaService) TransferClubOwnershipHandler {
	return TransferClubOwnershipHandler{cr: cr, event: event, eva: eva}
}

func (h TransferClubOwnershipHandler) Handle(ctx context.Context, cmd TransferClubOwnership) (*club.Club, error) {

	clb, err := h.cr.GetClubById(ctx, cmd.ClubId)

	if err != nil {
		return nil, err
	}

	acc, err := h.eva.GetAccount(ctx, cmd.AccountId)

	if err != nil {
		return nil, err
	}

	if err := h.event.TransferClubOwnership(ctx, cmd.Principal, clb, acc); err != nil {
		return nil, err
	}

	return clb, nil
}
