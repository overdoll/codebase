package command

import (
	"context"

	"overdoll/applications/hades/src/app"
)

type LogoutHandler struct {
	eva app.EvaService
}

func NewLogoutHandler(eva app.EvaService) LogoutHandler {
	return LogoutHandler{eva: eva}
}

func (h LogoutHandler) Handle(ctx context.Context) (bool, error) {

	// TODO: get session from cookie to determine what to revoke
	err := h.eva.RevokeSession(ctx, "id")

	if err != nil {
		return false, err
	}

	return true, nil
}
