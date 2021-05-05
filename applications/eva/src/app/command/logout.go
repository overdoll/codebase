package command

import (
	"context"
	"errors"

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

	if !pass.IsAuthenticated() {
		return false, errors.New("user is not logged in")
	}

	// Update passport to include our new user
	err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
		return p.RevokeUser()
	})

	if err != nil {
		return false, err
	}

	return true, nil
}
