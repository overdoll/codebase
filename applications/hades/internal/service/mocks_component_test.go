package service_test

import (
	"github.com/stretchr/testify/mock"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/hades/internal/service"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/uuid"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	application.EvaClient.On("GetAccount", mock.Anything, mock.Anything).Return(&eva.Account{
		Id:    uuid.New().String(),
		Roles: []string{"ARTIST"},
	}, nil)

	application.EvaClient.On("GetLocationFromIp", mock.Anything, mock.Anything).Return(&eva.Location{
		City:        "test city",
		Country:     "US",
		PostalCode:  "23412",
		Subdivision: "division",
		Latitude:    0,
		Longitude:   0,
	}, nil)

	application.CarrierClient.On("ClubSupporterSubscriptionDuplicate", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubOverChargebackThreshold", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("UpcomingClubSupporterSubscriptionRenewals", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubSupporterSubscriptionPaymentFailure", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubSupporterSubscriptionRefunded", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("ClubSupporterSubscriptionCancelled", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("NewClubSupporterSubscription", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.RingerClient.On("NewClubSupporterSubscriptionPaymentDeposit", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.RingerClient.On("NewClubSupporterSubscriptionPaymentDeduction", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.StellaClient.On("SuspendClub", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StellaClient.On("AddClubSupporter", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StellaClient.On("RemoveClubSupporter", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.StellaClient.On("GetAccountClubPrincipalExtension", mock.Anything, mock.Anything).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{},
	}, nil)
	application.StellaClient.On("GetClubById", mock.Anything, mock.Anything).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: ""}}, nil)
}
