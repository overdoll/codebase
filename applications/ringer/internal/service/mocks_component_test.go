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
}

func mockAccountArtist(t *testing.T, accountId string) {
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{
		Id:     accountId,
		Roles:  []string{"ARTIST"},
		Secure: true,
	}, nil)
}

func mockAccountStaff(t *testing.T, accountId string) {
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accountId}).Return(&eva.Account{
		Id:     accountId,
		Roles:  []string{"STAFF"},
		Secure: true,
	}, nil)
}

func mockAccountDigestOwnClub(t *testing.T, accountId, clubId string) {
	application.StingClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{clubId},
	}, nil)

	application.StingClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accountId}}, nil)
}

func mockAccountDigestDefault(t *testing.T, accountId, clubId string) {
	application.StingClient.On("GetAccountClubDigest", mock.Anything,
		&stella.GetAccountClubDigestRequest{AccountId: accountId}).Return(&stella.GetAccountClubDigestResponse{
		SupportedClubIds:  []string{},
		ClubMembershipIds: []string{},
		OwnerClubIds:      []string{},
	}, nil)
	accId := uuid.New().String()
	application.StingClient.On("GetClubById", mock.Anything, &stella.GetClubByIdRequest{ClubId: clubId}).Return(&stella.GetClubByIdResponse{Club: &stella.Club{OwnerAccountId: accId}}, nil)
	application.EvaClient.On("GetAccount", mock.Anything, &eva.GetAccountRequest{Id: accId}).Return(&eva.Account{
		Id:     accId,
		Roles:  []string{"ARTIST"},
		Secure: true,
	}, nil)

	// seed a payout method for this account or else the payout won't work
	setupPayoutMethodForAccount(t, accId, "test@test.com")
}
