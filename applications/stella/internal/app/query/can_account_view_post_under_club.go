package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type CanAccountViewPostUnderClub struct {
	AccountId string
	ClubId    string
}

type CanAccountViewPostUnderClubHandler struct {
	cr  club.Repository
	eva EvaService
}

func NewCanAccountViewPostUnderClubHandler(cr club.Repository, eva EvaService) CanAccountViewPostUnderClubHandler {
	return CanAccountViewPostUnderClubHandler{cr: cr, eva: eva}
}

func (h CanAccountViewPostUnderClubHandler) Handle(ctx context.Context, query CanAccountViewPostUnderClub) (bool, error) {

	result, err := h.cr.GetClubById(ctx, query.ClubId)

	if err != nil {
		return false, err
	}

	if query.AccountId == "" {
		return result.CanView(nil), nil
	}

	prin, err := h.eva.GetAccount(ctx, query.AccountId)

	if err != nil {
		return false, err
	}

	return result.CanView(prin), nil
}
