package query

import (
	"context"

	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type ClubById struct {
	Principal *principal.Principal
	Id        string
}

type ClubByIdHandler struct {
	pr post.Repository
}

func NewClubByIdHandler(pr post.Repository) ClubByIdHandler {
	return ClubByIdHandler{pr: pr}
}

func (h ClubByIdHandler) Handle(ctx context.Context, query ClubById) (*post.Club, error) {

	result, err := h.pr.GetClubById(ctx, query.Principal, query.Id)

	if err != nil {
		return nil, err
	}

	return result, nil
}
