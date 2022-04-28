package service

import (
	"bytes"
	"context"
	"fmt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"io/ioutil"
	"net/http"
	"overdoll/applications/hades/internal/adapters"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/location"
	"overdoll/libraries/principal"
	"overdoll/libraries/testing_tools"
	"time"
)

type EvaServiceMock struct {
	adapter adapters.EvaGrpc
}

// GetAccount for testing purposes, we want to be able to use any accounts in order to have reproducible testing. so if an account
// is not found, we just default back to a principal with some default details
func (e EvaServiceMock) GetAccount(ctx context.Context, s string) (*principal.Principal, error) {

	prin, err := e.adapter.GetAccount(ctx, s)

	if err != nil {

		if e, ok := status.FromError(err); ok {
			switch e.Code() {
			case codes.NotFound:
				return testing_tools.NewStaffSecurePrincipal(s), nil
			}
		}

		return nil, err
	}

	return prin, nil
}

func (e EvaServiceMock) LocationFromIp(ctx context.Context, ip string) (*location.Location, error) {
	return location.UnmarshalLocationFromDatabase(
		"test city",
		"US",
		"23412",
		"division",
		0,
		0,
	), nil
}

type StellaServiceMock struct{}

func (s StellaServiceMock) AddClubSupporter(ctx context.Context, clubId, accountId string, supportedAt time.Time) error {
	return nil
}

func (s StellaServiceMock) RemoveClubSupporter(ctx context.Context, clubId, accountId string) error {
	return nil
}

type MockCCBillHttpClient struct {
	DoFunc func(req *http.Request) (*http.Response, error)
}

// Do is the mock client's `Do` func
func (m MockCCBillHttpClient) Do(req *http.Request) (*http.Response, error) {

	var body string

	switch req.URL.Query().Get("action") {
	case "chargeByPreviousTransactionId":
		body = "<?xml version='1.0' standalone='yes'?>\n<results>\n    <approved>1</approved>\n    <subscriptionId>0222057601000146926</subscriptionId>\n</results>"
	case "extendSubscription":
		body = "<?xml version='1.0' standalone='yes'?>\n<results>1</results>"
	case "refundTransaction":
		body = "<?xml version='1.0' standalone='yes'?>\n<results>1</results>"
	case "voidTransaction":
		body = "<?xml version='1.0' standalone='yes'?>\n<results>1</results>"
	case "cancelSubscription":
		body = "<?xml version='1.0' standalone='yes'?>\n<results>1</results>"
	case "viewSubscriptionStatus":
		body = "<?xml version='1.0' standalone='yes'?>\n<results>\n    <cancelDate>20220225111316</cancelDate>\n    <chargebacksIssued>0</chargebacksIssued>\n    <expirationDate>20220326235959</expirationDate>\n    <recurringSubscription>1</recurringSubscription>\n    <refundsIssued>0</refundsIssued>\n    <signupDate>20220224200428</signupDate>\n    <subscriptionStatus>1</subscriptionStatus>\n    <timesRebilled>0</timesRebilled>\n    <voidsIssued>0</voidsIssued>\n</results>"
	default:
		return nil, fmt.Errorf("invalid action, not mocked: %s", req.URL.Query().Get("action"))
	}

	buff := bytes.NewBufferString(body)

	return &http.Response{
		StatusCode:    200,
		Body:          ioutil.NopCloser(buff),
		ContentLength: int64(buff.Len()),
	}, nil
}

type CarrierServiceMock struct{}

func (c CarrierServiceMock) UpcomingClubSupporterSubscriptionRenewals(ctx context.Context, accountId string, subscriptions []*billing.AccountClubSupporterSubscription) error {
	return nil
}

func (c CarrierServiceMock) ClubSupporterSubscriptionPaymentFailure(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error {
	return nil
}

func (c CarrierServiceMock) ClubSupporterSubscriptionRefunded(ctx context.Context, subscription *billing.AccountClubSupporterSubscription, transaction *billing.AccountTransaction, amount int64, currency string) error {
	return nil
}

func (c CarrierServiceMock) ClubSupporterSubscriptionCancelled(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error {
	return nil
}

func (c CarrierServiceMock) NewClubSupporterSubscription(ctx context.Context, subscription *billing.AccountClubSupporterSubscription) error {
	return nil
}

type RingerServiceMock struct{}

func (r RingerServiceMock) NewClubSupporterSubscriptionPaymentDeposit(ctx context.Context, accountId, clubId, transactionId string, timestamp time.Time, price *billing.Price) error {
	return nil
}

func (r RingerServiceMock) NewClubSupporterSubscriptionPaymentDeduction(ctx context.Context, accountId, clubId, transactionId string, timestamp time.Time, price *billing.Price) error {
	return nil
}
