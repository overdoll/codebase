package queries

import (
	"context"

	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/passport"
)

func (r *QueryResolver) AccountMultiFactorRecoveryCodes(ctx context.Context) ([]*types.AccountMultiFactorRecoveryCode, error) {
	pass := passport.FromContext(ctx)

	if !pass.IsAuthenticated() {
		return nil, passport.ErrNotAuthenticated
	}

	codes, err := r.App.Queries.GetAccountRecoveryCodes.Handle(ctx, pass.AccountID())

	if err != nil {
		return nil, err
	}

	var recoveryCodes []*types.AccountMultiFactorRecoveryCode

	for _, code := range codes {
		recoveryCodes = append(recoveryCodes, &types.AccountMultiFactorRecoveryCode{Code: code.RawCode()})
	}

	return recoveryCodes, nil
}
