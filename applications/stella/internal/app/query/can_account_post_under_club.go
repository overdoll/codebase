package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type CanAccountPostUnderClub struct {
	AccountId string
	ClubId    string
}

type CanAccountPostUnderClubHandler struct {
	cr club.Repository
}

func NewCanAccountPostUnderClubHandler(cr club.Repository) CanAccountPostUnderClubHandler {
	return CanAccountPostUnderClubHandler{cr: cr}
}

func (h CanAccountPostUnderClubHandler) Handle(ctx context.Context, query CanAccountPostUnderClub) (bool, error) {

	result, err := h.cr.GetClubById(ctx, query.ClubId)

	if err != nil {
		return false, err
	}

	return result.AccountIdCanPost(query.AccountId), nil
}
