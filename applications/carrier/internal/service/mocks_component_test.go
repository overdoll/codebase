package service_test

import (
	"github.com/stretchr/testify/mock"
	"overdoll/applications/carrier/internal/service"
	eva "overdoll/applications/eva/proto"
	stella "overdoll/applications/stella/proto"
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

	application.StellaClient.On("GetClubById", mock.Anything, mock.Anything).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: ""}}, nil)
}

func assertMocksWereCalled(t *testing.T) {
	application.StellaClient.AssertExpectations(t)
	application.EvaClient.AssertExpectations(t)
}
