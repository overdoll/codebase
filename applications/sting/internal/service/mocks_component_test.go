package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	loader "overdoll/applications/loader/proto"
	parley "overdoll/applications/parley/proto"
	"overdoll/applications/sting/internal/service"
	"overdoll/libraries/resource/proto"
	"testing"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.LoaderClient.On("CreateOrGetResourcesFromUploads", mock.Anything, mock.Anything).Return(func(c context.Context, req *loader.CreateOrGetResourcesFromUploadsRequest, g ...grpc.CallOption) *loader.CreateOrGetResourcesFromUploadsResponse {

		var res []*proto.Resource

		for _, r := range req.ResourceIds {
			res = append(res, &proto.Resource{
				Id:        r,
				ItemId:    req.ItemId,
				Processed: false,
				Private:   req.Private,
				Token:     req.Token,
			})
		}

		return &loader.CreateOrGetResourcesFromUploadsResponse{Resources: res}
	}, nil)

	application.LoaderClient.On("CopyResourcesAndApplyFilter", mock.Anything, mock.Anything).Return(func(c context.Context, req *loader.CopyResourcesAndApplyFilterRequest, g ...grpc.CallOption) *loader.CopyResourcesAndApplyFilterResponse {

		var res []*loader.FilteredResources

		for _, r := range req.Resources {
			res = append(res, &loader.FilteredResources{
				OldResource: &loader.ResourceIdentifier{
					Id:     r.Id,
					ItemId: r.ItemId,
				},
				NewResource: &proto.Resource{
					ItemId:    r.ItemId,
					Processed: false,
					Id:        r.Id + "_FILTERED",
				},
			})
		}

		return &loader.CopyResourcesAndApplyFilterResponse{Resources: res}
	}, nil)

	application.CarrierClient.On("ClubSuspended", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubSupporterRequiredPostReminder", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubSupporterNoPosts", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.ParleyClient.On("PutPostIntoModeratorQueueOrPublish", mock.Anything, mock.Anything).Return(&parley.PutPostIntoModeratorQueueOrPublishResponse{PutIntoReview: false}, nil)
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
