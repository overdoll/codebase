package service

import (
	"bytes"
	"context"
	"fmt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"io/ioutil"
	"net/http"
	"net/url"
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

var failureMap = make(map[string]int)

// Do is the mock client's `Do` func
func (m MockPaxumHttpClient) Do(req *http.Request) (*http.Response, error) {

	newBody, err := ioutil.ReadAll(req.Body)
	if err != nil {
		return nil, err
	}
	formValues, err := url.ParseQuery(string(newBody))

	if err != nil {
		return nil, err
	}

	targetKey := formValues.Get("toEmail")

	// in tests, if the target email is exactly this, we can simulate an error from a payout provider
	isFailure := targetKey == "test-failure@test.com"
	shouldFail := false
	failureAmount := 0

	// basically here, the first time this method is called with a _failure ID, it will fail, and be added to a list
	// the next time the failure occurs with the same ID, it won't fail

	// this allows us to test our tests easily against failure and then recovery
	if isFailure {
		found := false
		shouldFail = true

		for key, id := range failureMap {
			if key == targetKey {
				found = true
				failureAmount = id
				break
			}
		}

		if found && failureAmount >= 3 {
			shouldFail = false
		} else if found {
			failureMap[targetKey] = failureMap[targetKey] + 1
		} else {
			failureMap[targetKey] = 1
		}
	}

	var body string

	switch formValues.Get("method") {
	case "transferFunds":
		if shouldFail {
			body = "<?xml version=\"1.0\"?>\n<Response>\n    <Environment>PRODUCTION</Environment>\n\t<Method>transferFunds</Method>\n\t<ResponseCode>11</ResponseCode>\n\t<ResponseDescription>Approved or Completed Successfully</ResponseDescription >\n\t<Fee>0.00</Fee>\n\t<TransactionId>23646236</TransactionId>\n</Response>"
		} else {
			body = "<?xml version=\"1.0\"?>\n<Response>\n    <Environment>PRODUCTION</Environment>\n\t<Method>transferFunds</Method>\n\t<ResponseCode>00</ResponseCode>\n\t<ResponseDescription>Approved or Completed Successfully</ResponseDescription >\n\t<Fee>0.00</Fee>\n\t<TransactionId>23646236</TransactionId>\n</Response>"
		}
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
