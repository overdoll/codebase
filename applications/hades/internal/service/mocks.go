package service

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/libraries/principal"
	"time"
)

type EvaServiceMock struct {
	adapter adapters.EvaGrpc
}

// GetAccount for testing purposes, we want to be able to use any accounts in order to have reproducible testing. so if an account
// is not found, we just default back to a principal with some default details
func (e EvaServiceMock) GetAccount(ctx context.Context, s string) (*principal.Principal, error) {

	prin, err := e.adapter.GetAccount(ctx, s)

	if err != nil {

		if e, ok := status.FromError(err); ok {
			switch e.Code() {
			case codes.NotFound:
				return principal.NewPrincipal(s, nil, false, false), nil
			}
		}

		return nil, err
	}

	return prin, nil
}

type StellaServiceMock struct{}

func (s StellaServiceMock) CanAccountBecomeClubSupporter(ctx context.Context, clubId, accountId string) (bool, error) {
	//TODO implement me
	panic("implement me")
}

func (s StellaServiceMock) AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error {
	//TODO implement me
	panic("implement me")
}

func (s StellaServiceMock) RemoveClubSupporter(ctx context.Context, clubId, accountId string) error {
	//TODO implement me
	panic("implement me")
}

func (s StellaServiceMock) CanAccountViewClub(ctx context.Context, clubId, accountId string) (bool, error) {
	return true, nil
}
