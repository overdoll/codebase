package query

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type ClubById struct {
	Principal *principal.Principal
	Id        string
}

type ClubByIdHandler struct {
	cr club.Repository
}

func NewClubByIdHandler(cr club.Repository) ClubByIdHandler {
	return ClubByIdHandler{cr: cr}
}

func (h ClubByIdHandler) Handle(ctx context.Context, query ClubById) (*club.Club, error) {

	result, err := h.cr.GetClubById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
