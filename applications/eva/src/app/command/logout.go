package command

import (
	"context"

	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/passport"
)

type LogoutHandler struct {
	ur user.Repository
}

func NewLogoutHandler(ur user.Repository) LogoutHandler {
	return LogoutHandler{ur: ur}
}

func (h LogoutHandler) Handle(ctx context.Context) (bool, error) {

	pass := passport.FromContext(ctx)

	err := pass.RevokeUser()

	if err != nil {
		return false, err
	}

	return true, nil
}
