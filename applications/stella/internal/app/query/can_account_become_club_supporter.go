package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type CanAccountBecomeClubSupporter struct {
	AccountId string
	ClubId    string
}

type CanAccountBecomeClubSupporterHandler struct {
	cr  club.Repository
	eva EvaService
}

func NewCanAccountBecomeClubSupporterHandler(cr club.Repository, eva EvaService) CanAccountBecomeClubSupporterHandler {
	return CanAccountBecomeClubSupporterHandler{cr: cr, eva: eva}
}

func (h CanAccountBecomeClubSupporterHandler) Handle(ctx context.Context, query CanAccountBecomeClubSupporter) (bool, error) {

	result, err := h.cr.GetClubById(ctx, query.ClubId)

	if err != nil {
		return false, err
	}

	prin, err := h.eva.GetAccount(ctx, query.AccountId)

	if err != nil {
		return false, err
	}

	clubMemberships, err := h.cr.GetAccountClubMemberships(ctx, prin, nil, prin.AccountId())

	if err != nil {
		return false, err
	}

	return result.CanBecomeSupporter(prin, clubMemberships)
}
