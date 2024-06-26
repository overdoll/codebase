package adapters

import (
	"context"
	"encoding/json"
	"github.com/spf13/viper"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/client"
	"overdoll/applications/hades/internal/app/workflows"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/errors"
	"overdoll/libraries/money"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"strings"
)

type EventTemporalRepository struct {
	client client.Client
}

func NewEventTemporalRepository(client client.Client) EventTemporalRepository {
	return EventTemporalRepository{client: client}
}

type CCBillNewSaleOrUpSaleSuccess struct {
	AccountingCurrency       string `json:"accountingCurrency"`
	AccountingCurrencyCode   string `json:"accountingCurrencyCode"`
	AccountingInitialPrice   string `json:"accountingInitialPrice"`
	AccountingRecurringPrice string `json:"accountingRecurringPrice"`

	BilledCurrency       string `json:"billedCurrency"`
	BilledCurrencyCode   string `json:"billedCurrencyCode"`
	BilledInitialPrice   string `json:"billedInitialPrice"`
	BilledRecurringPrice string `json:"billedRecurringPrice"`

	SubscriptionCurrency       string `json:"subscriptionCurrency"`
	SubscriptionCurrencyCode   string `json:"subscriptionCurrencyCode"`
	SubscriptionInitialPrice   string `json:"subscriptionInitialPrice"`
	SubscriptionRecurringPrice string `json:"subscriptionRecurringPrice"`

	Address1 string `json:"address1"`

	Bin            string `json:"bin"`
	CardType       string `json:"cardType"`
	City           string `json:"city"`
	Country        string `json:"country"`
	Email          string `json:"email"`
	ExpDate        string `json:"expDate"`
	FirstName      string `json:"firstName"`
	Last4          string `json:"last4"`
	LastName       string `json:"lastName"`
	PhoneNumber    string `json:"phoneNumber"`
	PostalCode     string `json:"postalCode"`
	State          string `json:"state"`
	SubscriptionId string `json:"subscriptionId"`

	ClientAccnum                   string `json:"clientAccnum"`
	ClientSubacc                   string `json:"clientSubacc"`
	DynamicPricingValidationDigest string `json:"dynamicPricingValidationDigest"`

	FlexId        string `json:"flexId"`
	FormName      string `json:"formName"`
	InitialPeriod string `json:"initialPeriod"`
	IpAddress     string `json:"ipAddress"`

	NextRenewalDate string `json:"nextRenewalDate"`
	TransactionId   string `json:"transactionId"`
	Timestamp       string `json:"timestamp"`

	PaymentAccount            string `json:"paymentAccount"`
	PaymentType               string `json:"paymentType"`
	PriceDescription          string `json:"priceDescription"`
	Rebills                   string `json:"rebills"`
	RecurringPeriod           string `json:"recurringPeriod"`
	RecurringPriceDescription string `json:"recurringPriceDescription"`
	ReferringUrl              string `json:"referringUrl"`

	SubscriptionTypeId    string `json:"subscriptionTypeId"`
	XFormDigest           string `json:"X-formDigest"`
	XCurrencyCode         string `json:"X-currencyCode"`
	XOverdollPaymentToken string `json:"X-overdollPaymentToken"`
}

func (r EventTemporalRepository) CCBillNewSaleSuccess(ctx context.Context, payload []byte) error {

	var input CCBillNewSaleOrUpSaleSuccess

	if err := json.Unmarshal(payload, &input); err != nil {
		return err
	}

	accountingInitialPrice, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingInitialPrice, input.AccountingCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing accounting initial price")
	}

	accountingRecurringPrice, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingRecurringPrice, input.AccountingCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing accounting recurring price")
	}

	accountingCurrency, err := money.CurrencyFromString(input.AccountingCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing accounting currency")
	}

	subscriptionInitialPrice, err := ccbill.ParseCCBillCurrencyAmount(input.SubscriptionInitialPrice, input.SubscriptionCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing subscription initial price")
	}

	subscriptionRecurringPrice, err := ccbill.ParseCCBillCurrencyAmount(input.SubscriptionRecurringPrice, input.SubscriptionCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing subscription recurring price")
	}

	subscriptionCurrency, err := money.CurrencyFromString(input.SubscriptionCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing subscription currency")
	}

	billedInitialPrice, err := ccbill.ParseCCBillCurrencyAmount(input.BilledInitialPrice, input.BilledCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing billed initial price")
	}

	billedRecurringPrice, err := ccbill.ParseCCBillCurrencyAmount(input.BilledRecurringPrice, input.BilledCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing billed recurring price")
	}

	billedCurrency, err := money.CurrencyFromString(input.BilledCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing billed currency")
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return errors.Wrap(err, "error parsing timestamp")
	}

	billedAtDate, err := ccbill.ParseCCBillDate(strings.Split(input.Timestamp, " ")[0])

	if err != nil {
		return errors.Wrap(err, "error parsing billed at date")
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextRenewalDate)

	if err != nil {
		return errors.Wrap(err, "error parsing next billing date")
	}

	paymentToken, err := ccbill.DecryptCCBillPayment(input.XOverdollPaymentToken)

	if err != nil {
		return errors.Wrap(err, "error decrypting ccbill payment token")
	}

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "hades.CCBillNewSaleOrUpSaleSuccess_" + input.SubscriptionId + "_" + input.TransactionId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillNewSaleOrUpSaleSuccess, workflows.CCBillNewSaleOrUpSaleSuccessInput{
		SubscriptionId:             input.SubscriptionId,
		TransactionId:              input.TransactionId,
		AccountingInitialPrice:     accountingInitialPrice,
		AccountingRecurringPrice:   accountingRecurringPrice,
		AccountingCurrency:         accountingCurrency,
		SubscriptionInitialPrice:   subscriptionInitialPrice,
		SubscriptionRecurringPrice: subscriptionRecurringPrice,
		SubscriptionCurrency:       subscriptionCurrency,
		BilledInitialPrice:         billedInitialPrice,
		BilledRecurringPrice:       billedRecurringPrice,
		BilledCurrency:             billedCurrency,
		PaymentToken:               paymentToken,
		Timestamp:                  timestamp,
		NextBillingDate:            nextBillingDate,
		BilledAtDate:               billedAtDate,
		AddressLine1:               input.Address1,
		Bin:                        input.Bin,
		CardType:                   input.CardType,
		City:                       input.City,
		Country:                    input.Country,
		Email:                      input.Email,
		ExpDate:                    input.ExpDate,
		FirstName:                  input.FirstName,
		Last4:                      input.Last4,
		LastName:                   input.LastName,
		PhoneNumber:                input.PhoneNumber,
		PostalCode:                 input.PostalCode,
		State:                      input.State,
	}); err != nil {
		return errors.Wrap(err, "error executing ccbill new sale or upsale success")
	}

	return nil
}

func (r EventTemporalRepository) CCBillUpSaleSuccess(ctx context.Context, payload []byte) error {
	return r.CCBillNewSaleSuccess(ctx, payload)
}

type CCBillRenewalSuccess struct {
	TransactionId          string `json:"transactionId"`
	SubscriptionId         string `json:"subscriptionId"`
	ClientAccnum           string `json:"clientAccnum"`
	ClientSubacc           string `json:"clientSubacc"`
	Timestamp              string `json:"timestamp"`
	BilledCurrency         string `json:"billedCurrency"`
	BilledCurrencyCode     string `json:"billedCurrencyCode"`
	BilledAmount           string `json:"billedAmount"`
	AccountingCurrency     string `json:"accountingCurrency"`
	AccountingCurrencyCode string `json:"accountingCurrencyCode"`
	AccountingAmount       string `json:"accountingAmount"`
	RenewalDate            string `json:"renewalDate"`
	NextRenewalDate        string `json:"nextRenewalDate"`
	PaymentAccount         string `json:"paymentAccount"`
	PaymentType            string `json:"paymentType"`
	CardType               string `json:"cardType"`
	Last4                  string `json:"last4"`
	ExpDate                string `json:"expDate"`
}

func (r EventTemporalRepository) CCBillRenewalSuccess(ctx context.Context, payload []byte) error {

	var input CCBillRenewalSuccess

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling renewal success payload")
	}

	amount, err := ccbill.ParseCCBillCurrencyAmount(input.BilledAmount, input.BilledCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing ccbill amount")
	}

	currency, err := money.CurrencyFromString(input.BilledCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing ccbill currency")
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return errors.Wrap(err, "error parsing timestamp")
	}

	billedAtDate, err := ccbill.ParseCCBillDate(strings.Split(input.RenewalDate, " ")[0])

	if err != nil {
		return errors.Wrap(err, "error parsing billed at date")
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextRenewalDate)

	if err != nil {
		return errors.Wrap(err, "error parsing next billing date")
	}

	accountingAmount, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingAmount, input.AccountingCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing accounting amount")
	}

	accountingCurrency, err := money.CurrencyFromString(input.AccountingCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing accounting currency")
	}

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "hades.CCBillRenewalSuccess_" + input.SubscriptionId + "_" + input.TransactionId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillRenewalSuccess, workflows.CCBillRenewalSuccessInput{
		TransactionId:      input.TransactionId,
		SubscriptionId:     input.SubscriptionId,
		Timestamp:          timestamp,
		BilledCurrency:     currency,
		BilledAmount:       amount,
		AccountingCurrency: accountingCurrency,
		AccountingAmount:   accountingAmount,
		BilledAtDate:       billedAtDate,
		NextBillingDate:    nextBillingDate,
		CardType:           input.CardType,
		Last4:              input.Last4,
		ExpDate:            input.ExpDate,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill renewal success workflow")
	}

	return nil
}

type CCBillChargeback struct {
	TransactionId          string `json:"transactionId"`
	SubscriptionId         string `json:"subscriptionId"`
	ClientAccnum           string `json:"clientAccnum"`
	ClientSubacc           string `json:"clientSubacc"`
	Timestamp              string `json:"timestamp"`
	Currency               string `json:"currency"`
	CurrencyCode           string `json:"currencyCode"`
	Amount                 string `json:"amount"`
	AccountingCurrency     string `json:"accountingCurrency"`
	AccountingCurrencyCode string `json:"accountingCurrencyCode"`
	AccountingAmount       string `json:"accountingAmount"`
	Reason                 string `json:"reason"`
	CardType               string `json:"cardType"`
	PaymentAccount         string `json:"paymentAccount"`
	PaymentType            string `json:"paymentType"`
	Last4                  string `json:"last4"`
	ExpDate                string `json:"expDate"`
}

func (r EventTemporalRepository) CCBillChargeback(ctx context.Context, payload []byte) error {

	var input CCBillChargeback

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling ccbill chargeback")
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return errors.Wrap(err, "error parsing ccbill timestamp")
	}

	amount, err := ccbill.ParseCCBillCurrencyAmount(input.Amount, input.Currency)

	if err != nil {
		return errors.Wrap(err, "error parsing ccbill amount")
	}

	currency, err := money.CurrencyFromString(input.Currency)

	if err != nil {
		return errors.Wrap(err, "error parsing ccbill currency")
	}

	accountingAmount, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingAmount, input.AccountingCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing accounting amount")
	}

	accountingCurrency, err := money.CurrencyFromString(input.AccountingCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing accounting currency")
	}

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "hades.CCBillChargeback_" + input.SubscriptionId + "_" + input.TransactionId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillChargeback, workflows.CCBillChargebackInput{
		TransactionId:      input.TransactionId,
		SubscriptionId:     input.SubscriptionId,
		Timestamp:          timestamp,
		Currency:           currency,
		Amount:             amount,
		AccountingCurrency: accountingCurrency,
		AccountingAmount:   accountingAmount,
		Reason:             input.Reason,
		CardType:           input.CardType,
		Last4:              input.Last4,
		ExpDate:            input.ExpDate,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill chargeback workflow")
	}

	return nil
}

type CCBillRefund struct {
	TransactionId          string `json:"transactionId"`
	SubscriptionId         string `json:"subscriptionId"`
	ClientAccnum           string `json:"clientAccnum"`
	ClientSubacc           string `json:"clientSubacc"`
	Timestamp              string `json:"timestamp"`
	Currency               string `json:"currency"`
	CurrencyCode           string `json:"currencyCode"`
	Amount                 string `json:"amount"`
	AccountingCurrency     string `json:"accountingCurrency"`
	AccountingCurrencyCode string `json:"accountingCurrencyCode"`
	AccountingAmount       string `json:"accountingAmount"`
	Reason                 string `json:"reason"`
	CardType               string `json:"cardType"`
	PaymentAccount         string `json:"paymentAccount"`
	PaymentType            string `json:"paymentType"`
	Last4                  string `json:"last4"`
	ExpDate                string `json:"expDate"`
}

func (r EventTemporalRepository) CCBillRefund(ctx context.Context, payload []byte) error {

	var input CCBillRefund

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling ccbill refund")
	}

	amount, err := ccbill.ParseCCBillCurrencyAmount(input.Amount, input.Currency)

	if err != nil {
		return errors.Wrap(err, "error parsing ccbill amount")
	}

	currency, err := money.CurrencyFromString(input.Currency)

	if err != nil {
		return errors.Wrap(err, "error parsing ccbill currency")
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return errors.Wrap(err, "error parsing timestamp")
	}

	accountingAmount, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingAmount, input.AccountingCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing accounting amount")
	}

	accountingCurrency, err := money.CurrencyFromString(input.AccountingCurrency)

	if err != nil {
		return errors.Wrap(err, "error parsing accounting currency")
	}

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "hades.CCBillRefund_" + input.SubscriptionId + "_" + input.TransactionId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillRefund, workflows.CCBillRefundInput{
		TransactionId:      input.TransactionId,
		SubscriptionId:     input.SubscriptionId,
		Timestamp:          timestamp,
		Currency:           currency,
		Amount:             amount,
		AccountingCurrency: accountingCurrency,
		AccountingAmount:   accountingAmount,
		Reason:             input.Reason,
		CardType:           input.CardType,
		Last4:              input.Last4,
		ExpDate:            input.ExpDate,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill refund workflow")
	}

	return nil
}

type CCBillVoid struct {
	TransactionId          string `json:"transactionId"`
	SubscriptionId         string `json:"subscriptionId"`
	ClientAccnum           string `json:"clientAccnum"`
	ClientSubacc           string `json:"clientSubacc"`
	Timestamp              string `json:"timestamp"`
	Currency               string `json:"currency"`
	CurrencyCode           string `json:"currencyCode"`
	Amount                 string `json:"amount"`
	AccountingCurrency     string `json:"accountingCurrency"`
	AccountingCurrencyCode string `json:"accountingCurrencyCode"`
	AccountingAmount       string `json:"accountingAmount"`
	Reason                 string `json:"reason"`
}

func (r EventTemporalRepository) CCBillVoid(ctx context.Context, payload []byte) error {

	var input CCBillVoid

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling ccbill void")
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return errors.Wrap(err, "error parsing timestamp")
	}

	options := client.StartWorkflowOptions{
		TaskQueue:             viper.GetString("temporal.queue"),
		ID:                    "hades.CCBillVoid_" + input.SubscriptionId + "_" + input.TransactionId,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillVoid, workflows.CCBillVoidInput{
		TransactionId:  input.TransactionId,
		SubscriptionId: input.SubscriptionId,
		Timestamp:      timestamp,
		Reason:         input.Reason,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill void workflow")
	}

	return nil
}

type CCBillCancellation struct {
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
	Reason         string `json:"reason"`
}

func (r EventTemporalRepository) CCBillCancellation(ctx context.Context, payload []byte) error {

	var input CCBillCancellation

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling ccbill cancellation")
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return errors.Wrap(err, "error parsing timestamp")
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "hades.CCBillCancellation_" + input.SubscriptionId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillCancellation, workflows.CCBillCancellationInput{
		SubscriptionId: input.SubscriptionId,
		Timestamp:      timestamp,
		Reason:         input.Reason,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill cancellation workflow")
	}

	return nil
}

type CCBillExpiration struct {
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
}

func (r EventTemporalRepository) CCBillExpiration(ctx context.Context, payload []byte) error {

	var input CCBillExpiration

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling ccbill expiration")
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return errors.Wrap(err, "error parsing ccbill timestamp")
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "hades.CCBillExpiration_" + input.SubscriptionId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillExpiration, workflows.CCBillExpirationInput{
		SubscriptionId: input.SubscriptionId,
		Timestamp:      timestamp,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill expiration workflow")
	}

	return nil
}

type CCBillUserReactivation struct {
	TransactionId   string `json:"transactionId"`
	SubscriptionId  string `json:"subscriptionId"`
	Price           string `json:"price"`
	ClientAccnum    string `json:"clientAccnum"`
	ClientSubacc    string `json:"clientSubacc"`
	Email           string `json:"email"`
	NextRenewalDate string `json:"nextRenewalDate"`
}

func (r EventTemporalRepository) CCBillUserReactivation(ctx context.Context, payload []byte) error {

	var input CCBillUserReactivation

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling ccbill user reactivation")
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextRenewalDate)

	if err != nil {
		return errors.Wrap(err, "error parsing next billing date")
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "hades.CCBillUserReactivation_" + uuid.New().String(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillUserReactivation, workflows.CCBillUserReactivationInput{
		TransactionId:   input.TransactionId,
		SubscriptionId:  input.SubscriptionId,
		NextBillingDate: nextBillingDate,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill user reactivation workflow")
	}

	return nil
}

type CCBillBillingDateChange struct {
	SubscriptionId  string `json:"subscriptionId"`
	ClientAccnum    string `json:"clientAccnum"`
	ClientSubacc    string `json:"clientSubacc"`
	Timestamp       string `json:"timestamp"`
	NextRenewalDate string `json:"nextRenewalDate"`
}

func (r EventTemporalRepository) CCBillBillingDateChange(ctx context.Context, payload []byte) error {

	var input CCBillBillingDateChange

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling ccbill billing date change")
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextRenewalDate)

	if err != nil {
		return errors.Wrap(err, "error parsing next renewal date")
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "hades.CCBillBillingDateChange_" + uuid.New().String(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillBillingDateChange, workflows.CCBillBillingDateChangeInput{
		SubscriptionId:  input.SubscriptionId,
		NextBillingDate: nextBillingDate,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill billing date change workflow")
	}

	return nil
}

type CCBillCustomerDataUpdate struct {
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
	Address1       string `json:"address1"`
	City           string `json:"city"`
	State          string `json:"state"`
	Country        string `json:"country"`
	PostalCode     string `json:"postalCode"`
	LastName       string `json:"lastName"`
	FirstName      string `json:"firstName"`
	Email          string `json:"email"`
	PhoneNumber    string `json:"phoneNumber"`
	IpAddress      string `json:"ipAddress"`
	ReservationId  string `json:"reservationId"`
	PaymentType    string `json:"paymentType"`
	CardType       string `json:"cardType"`
	Last4          string `json:"last4"`
	Bin            string `json:"bin"`
	ExpDate        string `json:"expDate"`
	PaymentAccount string `json:"paymentAccount"`
}

func (r EventTemporalRepository) CCBillCustomerDataUpdate(ctx context.Context, payload []byte) error {

	var input CCBillCustomerDataUpdate

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling ccbill billing date change")
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return errors.Wrap(err, "error parsing timestamp")
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "hades.CCBillCustomerDataUpdate_" + uuid.New().String(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillCustomerDataUpdate, workflows.CCBillCustomerDataUpdateInput{
		SubscriptionId: input.SubscriptionId,
		Timestamp:      timestamp,
		AddressLine1:   input.Address1,
		City:           input.City,
		State:          input.State,
		Country:        input.Country,
		PostalCode:     input.PostalCode,
		LastName:       input.LastName,
		FirstName:      input.FirstName,
		Email:          input.Email,
		PhoneNumber:    input.PhoneNumber,
		CardType:       input.CardType,
		Last4:          input.Last4,
		Bin:            input.Bin,
		ExpDate:        input.ExpDate,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill customer data update workflow")
	}

	return nil
}

type CCBillRenewalFailure struct {
	TransactionId  string `json:"transactionId"`
	SubscriptionId string `json:"subscriptionId"`
	ClientAccnum   string `json:"clientAccnum"`
	ClientSubacc   string `json:"clientSubacc"`
	Timestamp      string `json:"timestamp"`
	RenewalDate    string `json:"renewalDate"`
	CardType       string `json:"cardType"`
	PaymentType    string `json:"paymentType"`
	NextRetryDate  string `json:"nextRetryDate"`
	FailureReason  string `json:"failureReason"`
	FailureCode    string `json:"failureCode"`
}

func (r EventTemporalRepository) CCBillRenewalFailure(ctx context.Context, payload []byte) error {

	var input CCBillRenewalFailure

	if err := json.Unmarshal(payload, &input); err != nil {
		return errors.Wrap(err, "error unmarshalling ccbill renewal failure")
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return errors.Wrap(err, "error parsing timestamp")
	}

	nextRetryDate, err := ccbill.ParseCCBillDate(input.NextRetryDate)

	if err != nil {
		return errors.Wrap(err, "error parsing next retry date")
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "hades.CCBillRenewalFailure_" + uuid.New().String(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CCBillRenewalFailure, workflows.CCBillRenewalFailureInput{
		TransactionId:  input.TransactionId,
		SubscriptionId: input.SubscriptionId,
		Timestamp:      timestamp,
		NextRetryDate:  nextRetryDate,
		FailureReason:  input.FailureReason,
		FailureCode:    input.FailureCode,
	}); err != nil {
		return errors.Wrap(err, "error running ccbill renewal failure workflow")
	}

	return nil
}

func (r EventTemporalRepository) CancelActiveSupporterSubscriptionsForClub(ctx context.Context, requester *principal.Principal, clubId string) error {

	if err := billing.CanCancelActiveSubscriptionsForClub(requester); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "hades.CancelActiveSubscriptionsForClub_" + clubId,
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CancelActiveSupporterSubscriptionsForClub, workflows.CancelActiveSupporterSubscriptionsForClubInput{
		ClubId: clubId,
	}); err != nil {
		return errors.Wrap(err, "error running cancel active supporter subscriptions for club workflow")
	}

	return nil
}

func (r EventTemporalRepository) CancelAccountClubSupporterSubscription(ctx context.Context, requester *principal.Principal, subscription *billing.AccountClubSupporterSubscription, cancellationReason *billing.CancellationReason) error {

	if err := subscription.RequestCancel(requester, cancellationReason); err != nil {
		return err
	}

	options := client.StartWorkflowOptions{
		TaskQueue: viper.GetString("temporal.queue"),
		ID:        "hades.CancelAccountClubSupporterSubscription_" + subscription.Id(),
	}

	if _, err := r.client.ExecuteWorkflow(ctx, options, workflows.CancelAccountClubSupporterSubscription, workflows.CancelAccountClubSupporterSubscriptionInput{
		AccountClubSupporterSubscriptionId: subscription.Id(),
		CancellationReasonId:               cancellationReason.ID(),
	}); err != nil {
		return errors.Wrap(err, "error running cancel account club supporter subscription workflow")
	}

	return nil
}
