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
	"overdoll/libraries/errors"
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
	q.Add("clientSubacc", os.Getenv("CCBILL_SUB_ACCOUNT_NUMBER"))
	q.Add("username", os.Getenv("CCBILL_DATALINK_USERNAME"))
	q.Add("password", os.Getenv("CCBILL_DATALINK_PASSWORD"))
	q.Add("returnXML", "1")
	return q
}

func (r CCBillHttpRepository) ViewSubscriptionStatus(ctx context.Context, ccbillSubscriptionId string) (*ccbill.SubscriptionStatus, error) {

	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return nil, errors.Wrap(err, "error creating view subscription status request")
	}

	// add credentials
	q := addDatalinkCredentialsToRequest(req.URL.Query())

	q.Add("subscriptionId", ccbillSubscriptionId)
	q.Add("action", "viewSubscriptionStatus")
	req.URL.RawQuery = q.Encode()

	resp, err := r.client.Do(req)

	if err != nil {
		return nil, errors.Wrap(err, "error sending ccbill view subscription status")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.Wrap(err, "error reading return body")
	}

	var subResult subscription

	if err := xml.Unmarshal(body, &subResult); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal ccbill view subscription status body")
	}

	// signup date is "" - need to unmarshal into a different type
	if subResult.SignupDate == "" {

		var result response

		if err := xml.Unmarshal(body, &result); err != nil {
			return nil, err
		}

		if result < 1 {
			return nil, errors.New(fmt.Sprintf("failed to charge by previous: ccbill error: %s", strconv.Itoa(int(result))))
		}
	}

	loc, err := time.LoadLocation("MST")
	if err != nil {
		return nil, errors.Wrap(err, "error parsing timezone")
	}

	var cancelDate *time.Time
	var expirationDate *time.Time
	var nextBillingDate *time.Time

	if subResult.CancelDate != "" {

		newCancelDate, err := ccbill.ParseDateWithTimeString(subResult.CancelDate)

		if err != nil {
			return nil, errors.Wrap(err, "error parsing expiration date")
		}

		cancelDate = &newCancelDate
	}

	if subResult.ExpirationDate != "" {

		newExpirationDate, err := ccbill.ParseDateWithTimeString(subResult.ExpirationDate)

		if err != nil {
			return nil, errors.Wrap(err, "error parsing expiration date")
		}

		expirationDate = &newExpirationDate
	}

	if subResult.NextBillingDate != "" {
		newNextBillingDate, err := time.ParseInLocation("20060102", subResult.NextBillingDate, loc)

		if err != nil {
			return nil, errors.Wrap(err, "error parsing next billing date date")
		}

		nextBillingDate = &newNextBillingDate
	}

	signupDate, err := ccbill.ParseDateWithTimeString(subResult.SignupDate)

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
		return errors.Wrap(err, "error creating new cancel subscription request")
	}

	// add credentials
	q := addDatalinkCredentialsToRequest(req.URL.Query())

	q.Add("subscriptionId", ccbillSubscriptionId)
	q.Add("action", "cancelSubscription")
	req.URL.RawQuery = q.Encode()

	resp, err := r.client.Do(req)

	if err != nil {
		return errors.Wrap(err, "error cancelling ccbill subscription")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return errors.Wrap(err, "error reading ccbill subscription cancel body")
	}

	var result response

	if err := xml.Unmarshal(body, &result); err != nil {
		return err
	}

	if result < 1 {
		return errors.New(fmt.Sprintf("failed to cancel subscription: ccbill error: %s", strconv.Itoa(int(result))))
	}

	return nil
}

func (r CCBillHttpRepository) RefundTransaction(ctx context.Context, refund *ccbill.Refund) error {

	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return errors.Wrap(err, "error creating new refund transaction request")
	}

	// add credentials
	q := addDatalinkCredentialsToRequest(req.URL.Query())

	q.Add("subscriptionId", refund.TransactionId())
	q.Add("action", "refundTransaction")

	amt, err := refund.Amount()

	if err != nil {
		return err
	}

	if amt != nil {
		q.Add("amount", fmt.Sprintf("%.2f", *amt))
	}

	req.URL.RawQuery = q.Encode()

	resp, err := r.client.Do(req)

	if err != nil {
		return errors.Wrap(err, "error sending refund transaction request")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return errors.Wrap(err, "error reading refund transaction body")
	}

	var result response

	if err := xml.Unmarshal(body, &result); err != nil {
		return errors.Wrap(err, "error unmarshalling refund transaction body")
	}

	if result < 1 {
		return errors.New(fmt.Sprintf("failed to refund transaction: ccbill error: %s", strconv.Itoa(int(result))))
	}

	return nil
}

func (r CCBillHttpRepository) VoidTransaction(ctx context.Context, ccbillTransactionId string) error {
	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return errors.Wrap(err, "error creating new void transaction request")
	}

	// add credentials
	q := addDatalinkCredentialsToRequest(req.URL.Query())

	q.Add("subscriptionId", ccbillTransactionId)
	q.Add("action", "voidTransaction")

	req.URL.RawQuery = q.Encode()

	resp, err := r.client.Do(req)

	if err != nil {
		return errors.Wrap(err, "error creating new void transaction request")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return errors.Wrap(err, "error reading void transaction body")
	}

	var result response

	if err := xml.Unmarshal(body, &result); err != nil {
		return errors.Wrap(err, "error unmarshalling void transaction body")
	}

	if result < 1 {
		return errors.New(fmt.Sprintf("failed to void transaction: ccbill error: %s", strconv.Itoa(int(result))))
	}

	return nil
}

func (r CCBillHttpRepository) ExtendSubscription(ctx context.Context, ccbillSubscriptionId string, days int) error {

	if days >= 6 {
		return errors.New("only a max of 6 day extensions can be created (ccbill limit)")
	}

	req, err := http.NewRequest("GET", "https://datalink.ccbill.com/utils/subscriptionManagement.cgi", nil)

	if err != nil {
		return errors.Wrap(err, "error creating new extend subscription request")
	}

	// add credentials
	q := addDatalinkCredentialsToRequest(req.URL.Query())

	q.Add("subscriptionId", ccbillSubscriptionId)
	q.Add("action", "extendSubscription")
	q.Add("extendLength", strconv.Itoa(days))

	req.URL.RawQuery = q.Encode()

	resp, err := r.client.Do(req)

	if err != nil {
		return errors.Wrap(err, "error extending ccbill subscription")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return errors.Wrap(err, "error reading extend subscription body")
	}

	var result response

	if err := xml.Unmarshal(body, &result); err != nil {
		return errors.Wrap(err, "error unmarshalling extend subscription body")
	}

	if result < 1 {
		return errors.New(fmt.Sprintf("failed to extend subscription: ccbill error: %s", strconv.Itoa(int(result))))
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
		return nil, errors.Wrap(err, "error creating charge by previous request")
	}

	resp, err := r.client.Do(req)

	if err != nil {
		return nil, errors.Wrap(err, "error running ccbill charge by previous request")
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.Wrap(err, "error reading charge by previous body")
	}

	var realResult chargeByPreviousResult

	if err := xml.Unmarshal(body, &realResult); err != nil {
		return nil, errors.Wrap(err, "error unmarshalling charge by previous body")
	}

	// these are blank, so we need to retry
	if realResult.SubscriptionId == "" && realResult.DenialId == "" {

		var result response

		if err := xml.Unmarshal(body, &result); err != nil {
			return nil, errors.Wrap(err, "error unmarshalling charge by previous body")
		}

		if result < 1 {
			return nil, errors.New(fmt.Sprintf("failed to charge by previous: ccbill error: %s", strconv.Itoa(int(result))))
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
