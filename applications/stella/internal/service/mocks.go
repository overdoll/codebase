package service

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/stella/internal/adapters"
	"overdoll/libraries/principal"
	"overdoll/libraries/testing_tools"
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
				return testing_tools.NewArtistPrincipal(s), nil
			}
		}

		return nil, err
	}

	return prin, nil
}

type LoaderServiceMock struct{}

func (l LoaderServiceMock) CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string) ([]string, error) {
	return resourceIds, nil
}

type StingServiceMock struct{}

func (s StingServiceMock) AddSuspendedClub(ctx context.Context, clubId string) error {
	return nil
}

func (s StingServiceMock) RemoveSuspendedClub(ctx context.Context, clubId string) error {
	return nil
}
