package service

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
)

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
