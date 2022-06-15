package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	service2 "overdoll/applications/loader/internal/service"
	loader "overdoll/applications/loader/proto"
	parley "overdoll/applications/parley/proto"
	stella "overdoll/applications/stella/proto"
	"overdoll/applications/sting/internal/service"
	"testing"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.StellaClient.On("NewSupporterPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.LoaderClient.On("DeleteResources", mock.Anything, mock.Anything).Return(&loader.DeleteResourcesResponse{}, nil)

	application.ParleyClient.On("PutPostIntoModeratorQueueOrPublish", mock.Anything, mock.Anything).Return(&parley.PutPostIntoModeratorQueueOrPublishResponse{PutIntoReview: false}, nil)

	application.LoaderClient.On("CreateOrGetResourcesFromUploads", mock.Anything, mock.Anything).Return(func(c context.Context, req *loader.CreateOrGetResourcesFromUploadsRequest, g ...grpc.CallOption) *loader.CreateOrGetResourcesFromUploadsResponse {
		return &loader.CreateOrGetResourcesFromUploadsResponse{AllResourceIds: req.ResourceIds}
	}, nil)

	application.LoaderClient.On("GetResources", mock.Anything, mock.Anything).Return(func(c context.Context, req *loader.GetResourcesRequest, g ...grpc.CallOption) *loader.GetResourcesResponse {

		var res []*loader.Resource

		for _, r := range req.ResourceIds {
			res = append(res, &loader.Resource{
				Id:          req.ItemId,
				ItemId:      r,
				Processed:   true,
				ProcessedId: r + "_PROCESSED",
				Private:     true,
			})
		}

		return &loader.GetResourcesResponse{service2.Resources: res}
	}, nil)

	application.LoaderClient.On("CopyResourcesAndApplyFilter", mock.Anything, mock.Anything).Return(func(c context.Context, req *loader.CopyResourcesAndApplyFilterRequest, g ...grpc.CallOption) *loader.CopyResourcesAndApplyFilterResponse {

		var res []*loader.FilteredResources

		for _, r := range req.Resources {
			res = append(res, &loader.FilteredResources{
				OldResource: &loader.ResourceIdentifier{
					Id:     r.Id,
					ItemId: r.ItemId,
				},
				NewResource: &loader.ResourceIdentifier{
					ItemId: r.ItemId,
					Id:     r.Id + "_FILTERED",
				},
			})
		}

		return &loader.CopyResourcesAndApplyFilterResponse{service2.Resources: res}
	}, nil)
}

func mockAccountStaff(t *testing.T, accountId string) {
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(func(c context.Context, req *eva.GetAccountRequest, g ...grpc.CallOption) *eva.Account {
		return &eva.Account{
			Id:     req.Id,
			Roles:  []string{"STAFF"},
			Secure: true,
		}
	}, nil)
}

func mockAccountNormal(t *testing.T, accountId string) {
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(func(c context.Context, req *eva.GetAccountRequest, g ...grpc.CallOption) *eva.Account {
		return &eva.Account{
			Id:     req.Id,
			Roles:  []string{"ARTIST"},
			Secure: true,
		}
	}, nil)
}

func mockAccountDigestClubOwner(t *testing.T, accountId string, clubId string) {
	application.StellaClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{clubId},
	}, nil)
	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId}}, nil)
}

func mockAccountDigestNormal(t *testing.T, accountId string) {
	application.StellaClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{},
	}, nil)
}

func mockAccountDigestMembership(t *testing.T, accountId, clubId string) {
	application.StellaClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{},
		ClubMembershipIds: []string{clubId},
		OwnerClubIds:      []string{},
	}, nil)
}

func mockAccountDigestSupporter(t *testing.T, accountId, clubId string) {
	application.StellaClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{clubId},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{},
	}, nil)
}
