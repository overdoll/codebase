package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/ringer/internal/service"
	stella "overdoll/applications/stella/proto"
	"testing"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication
}

func mockAccountArtist(t *testing.T, accountId string) {
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(func(c context.Context, req *eva.GetAccountRequest, g ...grpc.CallOption) *eva.Account {
		return &eva.Account{
			Id:     req.Id,
			Roles:  []string{"ARTIST"},
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

func mockAccountDigestSupportClub(t *testing.T, accountId, clubId string) {
	application.StellaClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{clubId},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{},
	}, nil)
}

func mockAccountDigestOwnClub(t *testing.T, accountId, clubId string) {
	application.StellaClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{clubId},
	}, nil)

	application.StellaClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId}}, nil)

}

func mockAccountDigestDefault(t *testing.T, accountId string) {
	application.StellaClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{},
	}, nil)
}
