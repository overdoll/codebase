package service

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"os"
	"overdoll/applications/carrier/internal/adapters"
	"overdoll/applications/carrier/internal/domain/club"
	"overdoll/applications/carrier/internal/domain/identifier"
)

type EvaServiceMock struct {
	adapter adapters.EvaGrpc
}

// GetAccount for testing purposes, we want to be able to use any accounts in order to have reproducible testing. so if an account
// is not found, we just default back to a principal with some default details
func (e EvaServiceMock) GetAccount(ctx context.Context, s string) (*identifier.Identifier, error) {

	prin, err := e.adapter.GetAccount(ctx, s)

	if err != nil {

		if e, ok := status.FromError(err); ok {
			switch e.Code() {
			case codes.NotFound:
				return identifier.UnmarshalIdentifierFromDatabase(
					s,
					"",
					os.Getenv("TESTMAIL_NAMESPACE")+".carrier-"+s+"@inbox.testmail.app",
				), nil
			}
		}

		return nil, err
	}

	return prin, nil
}

type StellaServiceMock struct {
}

func (s StellaServiceMock) GetClub(ctx context.Context, s2 string) (*club.Club, error) {
	return club.UnmarshalClubFromDatabase(s2, "testclub", s2), nil
}
