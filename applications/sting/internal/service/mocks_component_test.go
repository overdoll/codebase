package service_test

import (
	"github.com/stretchr/testify/mock"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	parley "overdoll/applications/parley/proto"
	stella "overdoll/applications/stella/proto"
	"overdoll/applications/sting/internal/service"
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

	application.StellaClient.On("NewSupporterPost", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StellaClient.On("GetAccountClubPrincipalExtension", mock.Anything, mock.Anything).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{"1q7MJFMVgDPo4mFjsfNag6rRwRy"},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{"1q7MJFMVgDPo4mFjsfNag6rRwRy"},
	}, nil)
	application.StellaClient.On("GetClubById", mock.Anything, mock.Anything).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: ""}}, nil)

	application.LoaderClient.On("DeleteResources", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.ParleyClient.On("PutPostIntoModeratorQueueOrPublish", mock.Anything, mock.Anything).Return(&parley.PutPostIntoModeratorQueueOrPublishResponse{PutIntoReview: true}, nil)
}

func assertMocksWereCalled(t *testing.T) {
	application.TemporalClient.AssertExpectations(t)
	application.EvaClient.AssertExpectations(t)
	application.StellaClient.AssertExpectations(t)
	application.LoaderClient.AssertExpectations(t)
	application.ParleyClient.AssertExpectations(t)
}
