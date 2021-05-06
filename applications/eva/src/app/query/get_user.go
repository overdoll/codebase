package query

import (
	"context"
	"fmt"

	"overdoll/applications/eva/src/domain/user"
)

type GetUserHandler struct {
	ur user.Repository
}

func NewGetUserHandler(ur user.Repository) GetUserHandler {
	return GetUserHandler{ur: ur}
}

func (h GetUserHandler) Handle(ctx context.Context, id string) (*user.User, error) {

	ur, err := h.ur.GetUserById(ctx, id)

	if err != nil {
		return nil, fmt.Errorf("could not get user: %s", id)
	}

	return ur, nil
}
