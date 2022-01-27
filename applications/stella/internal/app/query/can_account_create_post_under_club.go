package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type CanAccountCreatePostUnderClub struct {
	AccountId string
	ClubId    string
}

type CanAccountCreatePostUnderClubHandler struct {
	cr club.Repository
}

func NewCanAccountCreatePostUnderClubHandler(cr club.Repository) CanAccountCreatePostUnderClubHandler {
	return CanAccountCreatePostUnderClubHandler{cr: cr}
}

func (h CanAccountCreatePostUnderClubHandler) Handle(ctx context.Context, query CanAccountCreatePostUnderClub) (bool, error) {

	result, err := h.cr.GetClubById(ctx, query.ClubId)

	if err != nil {
		return false, err
	}

	return result.AccountIdCanCreatePost(query.AccountId), nil
}
