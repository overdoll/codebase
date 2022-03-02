package adapters

import (
	"context"
	"encoding/xml"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"overdoll/applications/hades/internal/domain/ccbill"
	"strconv"
	"time"
)

type CCBillHttpClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type CCBillHttpRepository struct {
	client CCBillHttpClient
}

// NewCCBillHttpRepository https://ccbill.com/doc/ccbill-api-guide docs
func NewCCBillHttpRepository(client CCBillHttpClient) CCBillHttpRepository {
	return CCBillHttpRepository{client: client}
}

type subscription struct {
	XMLName               xml.Name `xml:"results"`
	CancelDate            string   `xml:"cancelDate"`
	ChargebacksIssued     int      `xml:"chargebacksIssued"`
	ExpirationDate        string   `xml:"expirationDate"`
	NextBillingDate       string   `xml:"nextBillingDate"`
	RecurringSubscription int      `xml:"recurringSubscription"`
	RefundsIssued         int      `xml:"refundsIssued"`
	SignupDate            string   `xml:"signupDate"`
	SubscriptionStatus    int      `xml:"subscriptionStatus"`
	TimesRebilled         int      `xml:"timesRebilled"`
	VoidsIssued           int      `xml:"voidsIssued"`
}

type response int

func addDatalinkCredentialsToRequest(q url.Values) url.Values {
	q.Add("clientAccnum", os.Getenv("CCBILL_ACCOUNT_NUMBER"))
	q.Add("usingSubacc", os.Getenv("CCBILL_SUB_ACCOUNT_NUMBER"))
	q.Add("username", os.Getenv("CCBILL_DATALINK_USERNAME"))
	q.Add("password", os.Getenv("CCBILL_DATALINK_PASSWORD"))
	q.Add("returnXML", "1")
	return q
}

func (r CCBillHttpRepository) ViewSubscriptionStatus(ctx context.Context, ccbillSubscriptionId string) (*ccbill.SubscriptionStatus, error) {

	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return nil, err
	}

	// add credentials
	q := addDatalinkCredentialsToRequest(req.URL.Query())

	q.Add("subscriptionId", ccbillSubscriptionId)
	q.Add("action", "viewSubscriptionStatus")
	req.URL.RawQuery = q.Encode()

	resp, err := r.client.Do(req)

	if err != nil {
		return nil, err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var subResult subscription

	if err := xml.Unmarshal(body, &subResult); err != nil {
		return nil, fmt.Errorf("failed to unmarshal xml: %s", err)
	}

	// signup date is "" - need to unmarshal into a different type
	if subResult.SignupDate == "" {

		var result response

		if err := xml.Unmarshal(body, &result); err != nil {
			return nil, err
		}

		if result < 1 {
			return nil, fmt.Errorf("failed to charge by previous: ccbill error: %s", strconv.Itoa(int(result)))
		}
	}

	loc, err := time.LoadLocation("MST")
	if err != nil {
		return nil, err
	}

	var cancelDate *time.Time
	var expirationDate *time.Time
	var nextBillingDate *time.Time

	if subResult.CancelDate != "" {

		newCancelDate, err := time.ParseInLocation("20060102150405", subResult.CancelDate, loc)

		if err != nil {
			return nil, err
		}

		cancelDate = &newCancelDate
	}

	if subResult.ExpirationDate != "" {
		newExpirationDate, err := time.ParseInLocation("20060102150405", subResult.ExpirationDate, loc)

		if err != nil {
			return nil, err
		}

		expirationDate = &newExpirationDate
	}

	if subResult.NextBillingDate != "" {
		newNextBillingDate, err := time.ParseInLocation("20060102", subResult.NextBillingDate, loc)

		if err != nil {
			return nil, err
		}

		nextBillingDate = &newNextBillingDate
	}

	signupDate, err := time.ParseInLocation("20060102150405", subResult.SignupDate, loc)

	if err != nil {
		return nil, err
	}

	var isRecurring bool

	if subResult.SubscriptionStatus == 1 {
		isRecurring = true
	} else {
		isRecurring = false
	}

	return ccbill.UnmarshalSubscriptionStatusFromDatabase(
		ccbillSubscriptionId,
		cancelDate,
		subResult.ChargebacksIssued,
		nextBillingDate,
		expirationDate,
		isRecurring,
		subResult.RefundsIssued,
		signupDate,
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
	q := addDatalinkCredentialsToRequest(req.URL.Query())

	q.Add("subscriptionId", ccbillSubscriptionId)
	q.Add("action", "cancelSubscription")
	req.URL.RawQuery = q.Encode()

	resp, err := r.client.Do(req)

	if err != nil {
		return err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	var result response

	if err := xml.Unmarshal(body, &result); err != nil {
		return err
	}

	if result < 1 {
		return fmt.Errorf("failed to cancel subscription: ccbill error: %s", strconv.Itoa(int(result)))
	}

	return nil
}

func (r CCBillHttpRepository) VoidOrRefundSubscription(ctx context.Context, refund *ccbill.VoidOrRefund) error {

	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return err
	}

	// add credentials
	q := addDatalinkCredentialsToRequest(req.URL.Query())

	q.Add("subscriptionId", refund.SubscriptionId())
	q.Add("action", "voidOrRefundTransaction")

	if refund.Amount() != nil {
		q.Add("amount", fmt.Sprintf("%.2f", *refund.Amount()))
	}

	req.URL.RawQuery = q.Encode()

	resp, err := r.client.Do(req)

	if err != nil {
		return err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	var result response

	if err := xml.Unmarshal(body, &result); err != nil {
		return err
	}

	if result < 1 {
		return fmt.Errorf("failed to void or refund subscription: ccbill error: %s", strconv.Itoa(int(result)))
	}

	return nil
}

func (r CCBillHttpRepository) ExtendSubscription(ctx context.Context, ccbillSubscriptionId string, days int) error {

	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return err
	}

	// add credentials
	q := addDatalinkCredentialsToRequest(req.URL.Query())

	q.Add("subscriptionId", ccbillSubscriptionId)
	q.Add("action", "extendSubscription")
	q.Add("extendLength", strconv.Itoa(days))
	q.Add("clientAccnum", os.Getenv("CCBILL_ACCOUNT_NUMBER"))
	q.Add("clientSubacc", os.Getenv("CCBILL_SUB_ACCOUNT_NUMBER"))
	q.Add("username", os.Getenv("CCBILL_DATALINK_USERNAME"))
	q.Add("password", os.Getenv("CCBILL_DATALINK_PASSWORD"))
	q.Add("returnXML", "1")

	req.URL.RawQuery = q.Encode()

	resp, err := r.client.Do(req)

	if err != nil {
		return err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	var result response

	if err := xml.Unmarshal(body, &result); err != nil {
		return err
	}

	if result < 1 {
		return fmt.Errorf("failed to extend subscription: ccbill error: %s", strconv.Itoa(int(result)))
	}

	return nil
}

type chargeByPreviousResult struct {
	XMLName        xml.Name `xml:"results"`
	Approved       int      `xml:"approved"`
	SubscriptionId string   `xml:"subscriptionId"`
	DenialId       string   `xml:"denialId"`
	DeclineCode    string   `xml:"declineCode"`
	DeclineText    string   `xml:"declineText"`
}

func (r CCBillHttpRepository) ChargeByPreviousTransactionId(ctx context.Context, chargeByPrevious *ccbill.ChargeByPreviousClubSupporterPaymentUrl) (*string, error) {

	url, paymentToken, err := chargeByPrevious.GenerateUrl()

	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("GET", url, nil)

	if err != nil {
		return nil, err
	}

	resp, err := r.client.Do(req)

	if err != nil {
		return nil, err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var realResult chargeByPreviousResult

	if err := xml.Unmarshal(body, &realResult); err != nil {
		return nil, err
	}

	// these are blank, so we need to retry
	if realResult.SubscriptionId == "" && realResult.DenialId == "" {

		var result response

		if err := xml.Unmarshal(body, &result); err != nil {
			return nil, err
		}

		if result < 1 {
			return nil, fmt.Errorf("failed to charge by previous: ccbill error: %s", strconv.Itoa(int(result)))
		}
	}

	token, err := ccbill.NewChargeByPreviousResult(
		*paymentToken,
		realResult.SubscriptionId,
		realResult.DenialId,
		realResult.DeclineCode,
		realResult.DeclineText,
		realResult.Approved == 1,
	)

	if err != nil {
		return nil, err
	}

	return token.GenerateTransactionToken()
}
