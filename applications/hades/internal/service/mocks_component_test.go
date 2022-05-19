package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/types/known/emptypb"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/hades/internal/service"
	stella "overdoll/applications/stella/proto"
	"testing"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

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

	application.StellaClient.On("GetClubById", mock.Anything, mock.Anything).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: "", CanSupport: true}}, nil)

	application.RingerClient.On("ClubPaymentDeposit", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.RingerClient.On("ClubPaymentDeduction", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
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

func mockAccountDigest(t *testing.T, accountId string, clubId string) {
	application.StellaClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{clubId},
	}, nil)
}
