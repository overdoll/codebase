package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/parley/internal/service"
	stella "overdoll/applications/stella/proto"
	"overdoll/applications/sting/proto"
	"testing"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.StingClient.On("PublishPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("RejectPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("DiscardPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("UndoPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("RemovePost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StellaClient.On("SuspendClub", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.StingClient.On("GetPost", mock.Anything, mock.Anything).Return(func(c context.Context, r *proto.PostRequest, g ...grpc.CallOption) *proto.Post {
		return &proto.Post{ClubId: r.Id}
	}, nil)

	application.StellaClient.On("GetClubById", mock.Anything, mock.Anything).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: "", CanSupport: true}}, nil)

}

func mockAccountModerator(t *testing.T, accountId string) {
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(func(c context.Context, req *eva.GetAccountRequest, g ...grpc.CallOption) *eva.Account {
		return &eva.Account{
			Id:     req.Id,
			Roles:  []string{"MODERATOR"},
			Secure: true,
		}
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
