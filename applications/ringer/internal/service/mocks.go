package service

import (
	"bytes"
	"context"
	"fmt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"io/ioutil"
	"net/http"
	"overdoll/applications/ringer/internal/adapters"
	"overdoll/libraries/principal"
	"overdoll/libraries/testing_tools"
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

type StellaServiceMock struct{}

func (s StellaServiceMock) CanAccountCreatePostUnderClub(ctx context.Context, accountId, clubId string) (bool, error) {
	return true, nil
}

func (s StellaServiceMock) GetClubById(ctx context.Context, clubId string) (*string, error) {
	return &clubId, nil
}

type MockPaxumHttpClient struct {
	DoFunc func(req *http.Request) (*http.Response, error)
}

// Do is the mock client's `Do` func
func (m MockPaxumHttpClient) Do(req *http.Request) (*http.Response, error) {

	var body string

	switch req.Form.Get("method") {
	case "transferFunds":
		body = "<?xml version=\"1.0\"?>\n<Response>\n    <Environment>PRODUCTION</Environment>\n\t<Method>transferFunds</Method>\n\t<ResponseCode>00</ResponseCode>\n\t<ResponseDescription>Approved or Completed Successfully</ResponseDescription >\n\t<Fee>0.00</Fee>\n\t<TransactionId>23646236</TransactionId>\n</Response>"
	default:
		return nil, fmt.Errorf("invalid method, not mocked: %s", req.Form.Get("method"))
	}

	buff := bytes.NewBufferString(body)

	return &http.Response{
		StatusCode:    200,
		Body:          ioutil.NopCloser(buff),
		ContentLength: int64(buff.Len()),
	}, nil
}
