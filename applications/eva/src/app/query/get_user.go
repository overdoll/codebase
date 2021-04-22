package query

import (
	"context"
	"fmt"

	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/ksuid"
)

type GetUserHandler struct {
	ur user.Repository
}

func NewGetUserHandler(ur user.Repository) GetUserHandler {
	return GetUserHandler{ur: ur}
}

func (h GetUserHandler) Handle(ctx context.Context, id string) (*user.User, error) {

	u, err := ksuid.Parse(id)

	if err != nil {
		return nil, fmt.Errorf("uuid is not valid: %s", id)
	}

	ur, err := h.ur.GetUserById(ctx, u)

	if err != nil {
		return nil, fmt.Errorf("could not get user: %s", err)
	}

	return ur, nil
}
