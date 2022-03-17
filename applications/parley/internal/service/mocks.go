package service

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/parley/internal/adapters"
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
				return testing_tools.NewStaffPrincipal(s), nil
			}
		}

		return nil, err
	}

	return prin, nil
}

type StingServiceMock struct {
}

func (t StingServiceMock) GetPost(ctx context.Context, s string) (string, error) {
	return s, nil
}

func (t StingServiceMock) PublishPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) RejectPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) DiscardPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) UndoPost(ctx context.Context, s string) error {
	return nil
}

func (t StingServiceMock) RemovePost(ctx context.Context, s string) error {
	return nil
}

type StellaServiceMock struct {
}

func (s StellaServiceMock) SuspendClub(ctx context.Context, clubId string, endTime int64) error {
	return nil
}

func (s StellaServiceMock) GetClubById(ctx context.Context, clubId string) error {
	return nil
}
