package service_test

import (
	"github.com/stretchr/testify/mock"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/ringer/internal/service"
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

	application.StellaClient.On("GetAccountClubPrincipalExtension", mock.Anything, mock.Anything).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{"1q7MJFMVgDPo4mFjsfNag6rRwRy"},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{"1q7MJFMVgDPo4mFjsfNag6rRwRy"},
	}, nil)
	application.StellaClient.On("GetClubById", mock.Anything, mock.Anything).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: ""}}, nil)
}

func assertMocksWereCalled(t *testing.T) {
	application.TemporalClient.AssertExpectations(t)
	application.EvaClient.AssertExpectations(t)
	application.StellaClient.AssertExpectations(t)
}
