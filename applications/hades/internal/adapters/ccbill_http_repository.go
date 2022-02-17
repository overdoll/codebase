package adapters

import (
	"context"
	"encoding/xml"
	"fmt"
	"net/http"
	"os"
	"overdoll/applications/hades/internal/domain/ccbill"
)

type CCBillHttpRepository struct {
	client *http.Client
}

// NewCCBillHttpRepository https://ccbill.com/doc/ccbill-api-guide docs
func NewCCBillHttpRepository(client *http.Client) CCBillHttpRepository {
	return CCBillHttpRepository{client: client}
}

func addDatalinkCredentialsToRequest(req *http.Request) {
	q := req.URL.Query()
	q.Add("clientAccnum", os.Getenv("CCBILL_ACCOUNT_NUMBER"))
	q.Add("usingSubacc", os.Getenv("CCBILL_SUB_ACCOUNT_NUMBER"))
	q.Add("username", os.Getenv("CCBILL_DATALINK_USERNAME"))
	q.Add("password", os.Getenv("CCBILL_DATALINK_PASSWORD"))
}

type subscription struct {
	XMLName               xml.Name `xml:"results"`
	CancelDate            string   `xml:"cancelDate"`
	ChargebacksIssued     int      `xml:"chargebacksIssued"`
	ExpirationDate        string   `xml:"expirationDate"`
	RecurringSubscription int      `xml:"recurringSubscription"`
	RefundsIssued         int      `xml:"RefundsIssued"`
	SignupDate            string   `xml:"signupDate"`
	SubscriptionStatus    int      `xml:"subscriptionStatus"`
	TimesRebilled         int      `xml:"timesRebilled"`
	VoidsIssued           int      `xml:"voidsIssued"`
}

type response struct {
	Results int `xml:"results"`
}

func (r CCBillHttpRepository) ViewSubscriptionStatus(ctx context.Context, ccbillSubscriptionId string) (*ccbill.Subscription, error) {

	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return nil, err
	}

	// add credentials
	addDatalinkCredentialsToRequest(req)

	req.URL.Query().Add("subscriptionId", ccbillSubscriptionId)
	req.URL.Query().Add("action", "viewSubscriptionStatus")

	resp, err := r.client.Do(req)

	if err != nil {
		return nil, err
	}

	var body []byte
	if _, err := resp.Body.Read(body); err != nil {
		return nil, err
	}

	var subResult subscription

	if err := xml.Unmarshal(body, &subResult); err != nil {
		return nil, err
	}

	return ccbill.UnmarshalSubscriptionFromDatabase(
		subResult.CancelDate,
		subResult.ChargebacksIssued,
		subResult.ExpirationDate,
		subResult.RecurringSubscription,
		subResult.RefundsIssued,
		subResult.SignupDate,
		subResult.SubscriptionStatus,
		subResult.TimesRebilled,
		subResult.VoidsIssued,
	), nil
}

func (r CCBillHttpRepository) CancelSubscription(ctx context.Context, ccbillSubscriptionId string) error {

	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return err
	}

	// add credentials
	addDatalinkCredentialsToRequest(req)

	req.URL.Query().Add("subscriptionId", ccbillSubscriptionId)
	req.URL.Query().Add("action", "cancelSubscription")

	resp, err := r.client.Do(req)

	if err != nil {
		return err
	}

	var body []byte
	if _, err := resp.Body.Read(body); err != nil {
		return err
	}

	var result response

	if err := xml.Unmarshal(body, &result); err != nil {
		return err
	}

	if result.Results != 1 {
		return fmt.Errorf("failed to cancel subscription: %s", result.Results)
	}

	return nil
}

func (r CCBillHttpRepository) VoidOrRefundSubscription(ctx context.Context, refund *ccbill.VoidOrRefund) error {
	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return err
	}

	// add credentials
	addDatalinkCredentialsToRequest(req)

	req.URL.Query().Add("subscriptionId", refund.SubscriptionId())
	req.URL.Query().Add("action", "voidOrRefundTransaction")

	if refund.Amount() != nil {
		req.URL.Query().Add("amount", fmt.Sprintf("%.2f", *refund.Amount()))
	}

	resp, err := r.client.Do(req)

	if err != nil {
		return err
	}

	var body []byte
	if _, err := resp.Body.Read(body); err != nil {
		return err
	}

	var result response

	if err := xml.Unmarshal(body, &result); err != nil {
		return err
	}

	if result.Results != 1 {
		return fmt.Errorf("failed to void or refund subscription: %s", result.Results)
	}

	return nil
}
