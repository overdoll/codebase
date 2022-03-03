package service

import (
	"context"
	"github.com/segmentio/ksuid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/domain/post"
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

func (e StellaServiceMock) GetAccountSupportedClubs(ctx context.Context, accountId string) ([]string, error) {

	if accountId == "1pcKiTRBqURVEdcw1cKhyiejFp7" {
		return []string{"1q7MJFMVgDPo4mFjsfNag6rRwRy"}, nil
	}

	return []string{}, nil
}

func (e StellaServiceMock) CanAccountViewPostUnderClub(ctx context.Context, postId, accountId string) (bool, error) {
	return true, nil
}

func (e StellaServiceMock) GetSuspendedClubs(ctx context.Context) ([]string, error) {
	return []string{}, nil
}

func (e StellaServiceMock) GetClubMembershipsForAccount(ctx context.Context, accountId string) ([]string, error) {
	return []string{accountId}, nil
}

func (e StellaServiceMock) CanAccountCreatePostUnderClub(ctx context.Context, clubId, accountId string) (bool, error) {
	return true, nil
}

type LoaderServiceMock struct{}

func (l LoaderServiceMock) CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool) ([]*post.NewContent, error) {
	var newContent []*post.NewContent

	for _, n := range resourceIds {
		newContent = append(newContent, post.UnmarshalNewContentFromDatabase(itemId, n, ksuid.New().String()))
	}

	return newContent, nil
}

func (l LoaderServiceMock) CreateOrGetResourcesFromUploads(ctx context.Context, itemId string, resourceIds []string, private bool) ([]string, error) {
	return resourceIds, nil
}

func (l LoaderServiceMock) DeleteResources(ctx context.Context, itemId string, resourceIds []string) error {
	return nil
}

func (l LoaderServiceMock) AllResourcesProcessed(ctx context.Context, itemId string, resourceIds []string) (bool, error) {
	return true, nil
}
