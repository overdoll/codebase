package service_test

import (
	"github.com/stretchr/testify/mock"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/stella/internal/service"
	"overdoll/libraries/uuid"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.EvaClient.On("GetAccount", mock.Anything, mock.Anything).Return(&eva.Account{
		Id:    uuid.New().String(),
		Roles: []string{"ARTIST"},
	}, nil)

	application.StingClient.On("AddTerminatedClub", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("RemoveTerminatedClub", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.CarrierClient.On("ClubSuspended", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubSupporterRequiredPostReminder", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubSupporterNoPosts", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
}
