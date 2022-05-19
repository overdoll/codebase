package service_test

import (
	"context"
	"github.com/stretchr/testify/mock"
	"google.golang.org/protobuf/types/known/emptypb"
	carrier "overdoll/applications/carrier/proto"
	"overdoll/applications/eva/internal/service"
	hades "overdoll/applications/hades/proto"
	stella "overdoll/applications/stella/proto"
	"overdoll/libraries/testing_tools"
)

const (
	tokenEmailPrefix   = "token-email"
	confirmEmailPrefix = "email-confirm"
)

var application *service.ComponentTestApplication

func mockServices(testApplication *service.ComponentTestApplication) {
	application = testApplication

	mailingUtility := testing_tools.NewMailingRedisUtility()

	application.CarrierClient.On("ConfirmAccountEmail", mock.Anything, mock.Anything).
		Run(func(args mock.Arguments) {
			request := args.Get(1).(*carrier.ConfirmAccountEmailRequest)
			mailingUtility.SendEmail(context.Background(), confirmEmailPrefix, request.Email, map[string]interface{}{"id": request.Id, "secret": request.Secret})
		}).
		Return(&emptypb.Empty{}, nil)

	application.CarrierClient.On("NewLoginToken", mock.Anything, mock.Anything).
		Run(func(args mock.Arguments) {
			request := args.Get(1).(*carrier.NewLoginTokenRequest)
			mailingUtility.SendEmail(context.Background(), tokenEmailPrefix, request.Email, map[string]interface{}{"token": request.Token, "secret": request.Secret})
		}).
		Return(&emptypb.Empty{}, nil)

	application.CarrierClient.On("AccountDeletionBegin", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("AccountDeletionReminder", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.CarrierClient.On("AccountDeleted", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.HadesClient.On("DeleteAccountData", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.HadesClient.On("CanDeleteAccountData", mock.Anything, mock.Anything).Return(&hades.CanDeleteAccountDataResponse{CanDelete: true}, nil)

	application.StellaClient.On("DeleteAccountData", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
	application.StellaClient.On("CanDeleteAccountData", mock.Anything, mock.Anything).Return(&stella.CanDeleteAccountDataResponse{CanDelete: true}, nil)

	application.ParleyClient.On("DeleteAccountData", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.StingClient.On("DeleteAccountData", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)

	application.RingerClient.On("DeleteAccountData", mock.Anything, mock.Anything).Return(&emptypb.Empty{}, nil)
}

func GetAuthTokenAndSecretFromEmail(email string) (string, string, error) {
	util := testing_tools.NewMailingRedisUtility()
	res, err := util.ReadEmail(context.Background(), tokenEmailPrefix, email)
	if err != nil {
		return "", "", err
	}

	return res["token"].(string), res["secret"].(string), nil
}

func GetEmailConfirmationTokenFromEmail(email string) (string, string, error) {
	util := testing_tools.NewMailingRedisUtility()
	res, err := util.ReadEmail(context.Background(), confirmEmailPrefix, email)
	if err != nil {
		return "", "", err
	}

	return res["id"].(string), res["secret"].(string), nil
}
