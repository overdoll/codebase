package query

import (
	"context"

	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/libraries/principal"
)

type ModeratorById struct {
	Principal *principal.Principal

	AccountId string
}

type ModeratorByIdHandler struct {
	mr moderator.Repository
}

func NewModeratorByIdHandler(mr moderator.Repository) ModeratorByIdHandler {
	return ModeratorByIdHandler{mr: mr}
}

func (h ModeratorByIdHandler) Handle(ctx context.Context, query ModeratorById) (*moderator.Moderator, error) {

	mod, err := h.mr.GetModerator(ctx, query.Principal, query.AccountId)

	if err != nil {
		return nil, err
	}

	return mod, nil
}
