package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/stella/internal/service"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.EvaClient.On("GetAccount", mock.Anything, mock.Anything).Return(func(c context.Context, req *eva.GetAccountRequest, g ...grpc.CallOption) *eva.Account {
		return &eva.Account{
			Id:     req.Id,
			Roles:  []string{"STAFF"},
			Secure: true,
		}
	}, nil)

	application.StingClient.On("AddTerminatedClub", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("RemoveTerminatedClub", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.CarrierClient.On("ClubSuspended", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubSupporterRequiredPostReminder", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubSupporterNoPosts", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
}
