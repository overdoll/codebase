package service

import (
	"context"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/libraries/principal"
)

type EvaServiceMock struct {
	adapter adapters.EvaGrpc
}

// GetAccount for testing purposes, we want to be able to use any accounts in order to have reproducible testing. so if an account
// is not found, we just default back to a principal with some default details
func (e EvaServiceMock) GetAccount(ctx context.Context, s string) (*principal.Principal, error) {

	prin, err := e.adapter.GetAccount(ctx, s)

	if err != nil {
		return nil, err
	}

	if prin == nil {
		return principal.NewPrincipal(s, nil, false, false), nil
	}

	return prin, nil
}

type StellaServiceMock struct {
	adapter adapters.StellaGrpc
}

func (e StellaServiceMock) CanAccountPostUnderClub(ctx context.Context, clubId, accountId string) (bool, error) {
	return true, nil
}
