package command

import (
	"context"

	"overdoll/applications/hades/src/app"
	"overdoll/applications/hades/src/domain/user"
)

type GetUserSessionHandler struct {
	er app.EvaService
}

func NewGetUserSessionHandler(er app.EvaService) GetUserSessionHandler {
	return GetUserSessionHandler{er: er}
}

func (h GetUserSessionHandler) Handle(ctx context.Context, token string) (*user.User, error) {

	usr, err := h.er.ValidateSession(ctx, token)

	if err != nil {
		return user.NewGuestUser(), nil
	}

	return user.NewUserFromUser(usr), nil
}
