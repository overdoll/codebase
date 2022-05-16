package service

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
)

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
