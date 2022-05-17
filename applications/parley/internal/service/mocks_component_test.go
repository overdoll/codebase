package service_test

import (
	"github.com/stretchr/testify/mock"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/parley/internal/service"
	"overdoll/libraries/uuid"
	"testing"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.EvaClient.On("GetAccount", mock.Anything, mock.Anything).Return(&eva.Account{
		Id:    uuid.New().String(),
		Roles: []string{"ARTIST"},
	}, nil)

	application.StingClient.On("PublishPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("RejectPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("DiscardPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("UndoPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StingClient.On("RemovePost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StellaClient.On("SuspendClub", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
}

func assertMocksWereCalled(t *testing.T) {
	application.TemporalClient.AssertExpectations(t)
	application.EvaClient.AssertExpectations(t)
	application.StellaClient.AssertExpectations(t)
	application.StingClient.AssertExpectations(t)
}
