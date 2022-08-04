package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/parley/internal/service"
	sting "overdoll/applications/sting/proto"
	"testing"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.CarrierClient.On("ModeratorPostInQueue", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.StingClient.On("PublishPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("RejectPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("DiscardPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("UndoPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("RemovePost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("SuspendClub", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.StingClient.On("GetPost", mock.Anything, mock.Anything).Return(func(c context.Context, r *sting.PostRequest, g ...grpc.CallOption) *sting.Post {
		return &sting.Post{ClubId: r.Id, AccountId: r.Id}
	}, nil)

	application.StingClient.On("GetClubById", mock.Anything, mock.Anything).Return(&sting.GetClubByIdResponse{Club: &sting.Club{OwnerAccountId: "", CanSupport: true}}, nil)

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
