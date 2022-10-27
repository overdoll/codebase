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
	"overdoll/libraries/media/proto"
	"testing"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.LoaderClient.On("CancelMediaProcessing", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.LoaderClient.On("ProcessMediaFromUploads", mock.Anything, mock.Anything).Return(func(c context.Context, req *loader.ProcessMediaFromUploadsRequest, g ...grpc.CallOption) *loader.ProcessMediaFromUploadsResponse {

		var res []*proto.Media

		for _, r := range req.UploadIds {
			res = append(res, &proto.Media{
				Id:               r,
				IsUpload:         true,
				OriginalFileName: "some-file.jpg",
				Private:          true,
				Link:             req.Link,
				State: &proto.MediaState{
					Processed: false,
					Failed:    false,
				},
				Version: proto.MediaVersion_ONE,
			})
		}

		return &loader.ProcessMediaFromUploadsResponse{Media: res}
	}, nil)

	application.LoaderClient.On("GenerateImageFromMedia", mock.Anything, mock.Anything).Return(func(c context.Context, req *loader.GenerateImageFromMediaRequest, g ...grpc.CallOption) *loader.GenerateImageFromMediaResponse {

		var res []*proto.Media

		for _, r := range req.Media {
			res = append(res, &proto.Media{
				Id:      r.Id + "_FILTERED",
				Private: true,
				Link:    req.Link,
				State:   &proto.MediaState{Processed: false, Failed: false},
				Version: proto.MediaVersion_ONE,
				Source:  &proto.MediaSource{SourceMediaId: r.Id, Link: r.Link},
			})
		}

		return &loader.GenerateImageFromMediaResponse{Media: res}
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

func mockAccountDefault(t *testing.T, accountId string) {
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(func(c context.Context, req *eva.GetAccountRequest, g ...grpc.CallOption) *eva.Account {
		return &eva.Account{
			Id:     req.Id,
			Roles:  []string{},
			Secure: true,
		}
	}, nil)
}
