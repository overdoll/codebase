package query

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
)

type ClubById struct {
	Id string
}

type ClubByIdHandler struct {
	cr club.Repository
}

func NewClubByIdHandler(cr club.Repository) ClubByIdHandler {
	return ClubByIdHandler{cr: cr}
}

func (h ClubByIdHandler) Handle(ctx context.Context, query ClubById) (*club.Club, error) {

	result, err := h.cr.GetClubById(ctx, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
