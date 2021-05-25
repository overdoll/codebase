package command

import (
	"context"
	"errors"

	"go.uber.org/zap"
	"overdoll/applications/eva/src/domain/user"
	"overdoll/libraries/passport"
)

type LogoutHandler struct {
	ur user.Repository
}

func NewLogoutHandler(ur user.Repository) LogoutHandler {
	return LogoutHandler{ur: ur}
}

var (
	ErrFailedLogout = errors.New("failed to logout")
)

func (h LogoutHandler) Handle(ctx context.Context) (bool, error) {

	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return false, ErrFailedLogout
	}

	// Update passport to include our new user
	err := pass.MutatePassport(ctx, func(p *passport.Passport) error {
		return p.RevokeUser()
	})

	if err != nil {
		zap.S().Errorf("failed to revoke passport: %s", err)
		return false, ErrFailedLogout
	}

	return true, nil
}
