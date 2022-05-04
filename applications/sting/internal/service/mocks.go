package service

import (
	"context"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/applications/sting/internal/adapters"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/post"
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
				return testing_tools.NewDefaultPrincipal(s), nil
			}
		}

		return nil, err
	}

	return prin, nil
}

type StellaServiceMock struct{}

func (e StellaServiceMock) NewSupporterPost(ctx context.Context, clubId string) error {
	return nil
}

func (e StellaServiceMock) GetAccountClubPrincipalExtension(ctx context.Context, accountId string) (*principal.ClubExtension, error) {
	//TODO implement me
	panic("implement me")
}

func (e StellaServiceMock) GetClubById(ctx context.Context, clubId string) (*club.Club, error) {
	return club.UnmarshalClubFromDatabase(clubId, "", "", false, ""), nil
}

type LoaderServiceMock struct{}

func (l LoaderServiceMock) CopyResourcesAndApplyPixelateFilter(ctx context.Context, itemId string, resourceIds []string, pixelate int, private bool) ([]*post.NewContent, error) {
	var newContent []*post.NewContent

	for _, n := range resourceIds {
		newContent = append(newContent, post.UnmarshalNewContentFromDatabase(itemId, n, "hidden_id_"+n))
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

type ParleyServiceMock struct{}

func (p ParleyServiceMock) PutPostIntoModeratorQueueOrPublish(ctx context.Context, s string) (bool, error) {
	return false, nil
}
