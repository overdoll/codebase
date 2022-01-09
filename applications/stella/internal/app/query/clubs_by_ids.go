package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type ClubsByIds struct {
	ClubIds []string
}

type ClubsByIdsHandler struct {
	cr club.Repository
}

func NewClubsByIdsHandler(cr club.Repository) ClubsByIdsHandler {
	return ClubsByIdsHandler{cr: cr}
}

func (h ClubsByIdsHandler) Handle(ctx context.Context, query ClubsByIds) ([]*club.Club, error) {

	result, err := h.cr.GetClubsByIds(ctx, query.ClubIds)

	if err != nil {
		return nil, err
	}

	return result, nil
}
