package workflows

import (
	"github.com/segmentio/ksuid"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	hades "overdoll/applications/hades/proto"
)

type CCBillNewSaleOrUpsaleSuccessPayload struct {
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

func CCBillNewSaleOrUpSaleSuccess(ctx workflow.Context, payload CCBillNewSaleOrUpsaleSuccessPayload) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var details *hades.CCBillPayment

	// unravel payment details
	if err := workflow.ExecuteActivity(ctx, a.UnravelCCBillPaymentLink, payload.XOverdollPaymentToken).Get(ctx, &details); err != nil {
		return err
	}

	// create an idempotency key - in case the following activity fails but the record is still created
	idempotencyKey := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
		return ksuid.New().String()
	})

	var idempotentKey string

	if err := idempotencyKey.Get(&idempotentKey); err != nil {
		return err
	}

	var existingClubSupport *activities.GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload

	// check for duplicate subscriptions - if the account already supports the club
	if err := workflow.ExecuteActivity(ctx, a.GetOrCreateCCBillSubscriptionAndCheckForDuplicates,
		activities.GetOrCreateCCBillSubscriptionAndCheckForDuplicates{
			AccountId:            details.AccountInitiator.AccountId,
			ClubId:               details.CcbillClubSupporter.ClubId,
			CCBillSubscriptionId: payload.SubscriptionId,
			IdempotencyKey:       idempotentKey,

			AccountingCurrency:       payload.AccountingCurrency,
			AccountingInitialPrice:   payload.AccountingInitialPrice,
			AccountingRecurringPrice: payload.AccountingRecurringPrice,

			BilledCurrency:       payload.BilledCurrency,
			BilledInitialPrice:   payload.BilledInitialPrice,
			BilledRecurringPrice: payload.BilledRecurringPrice,

			SubscriptionCurrency:       payload.SubscriptionCurrency,
			SubscriptionInitialPrice:   payload.SubscriptionInitialPrice,
			SubscriptionRecurringPrice: payload.SubscriptionRecurringPrice,

			CardBin:            payload.Bin,
			CardType:           payload.CardType,
			CardLast4:          payload.Last4,
			CardExpirationDate: payload.ExpDate,
			FirstName:          payload.FirstName,
			Email:              payload.Email,
			LastName:           payload.LastName,
			PhoneNumber:        payload.PhoneNumber,
			AddressLine1:       payload.Address1,
			City:               payload.City,
			Country:            payload.Country,
			State:              payload.State,
			PostalCode:         payload.PostalCode,
		},
	).Get(ctx, &existingClubSupport); err != nil {
		return err
	}

	// a duplicate subscription detected
	if existingClubSupport.DuplicateSupportSameSubscription || existingClubSupport.DuplicateSupportDifferentSubscription {
		// basically, if the subscription ID that was passed in is not the one currently being used, then it will void/refund it
		// otherwise, the subscription ID that was passed in is the same as the current subscription ID, so we don't want to accidentally cancel
		// an existing CCBill subscription
		if existingClubSupport.DuplicateSupportDifferentSubscription {
			if err := workflow.ExecuteActivity(ctx, a.VoidOrRefundCCBillSubscription, payload.SubscriptionId).Get(ctx, nil); err != nil {
				return err
			}
		}

		return nil
	}

	// create record for new transaction
	if err := workflow.ExecuteActivity(ctx, a.CreateNewClubSubscriptionAccountTransactionRecord,
		activities.CreateNewClubSubscriptionAccountTransactionRecord{
			CCBillSubscriptionId: payload.SubscriptionId,
			AccountId:            details.AccountInitiator.AccountId,
			ClubId:               details.CcbillClubSupporter.ClubId,
			Timestamp:            payload.Timestamp,
			Amount:               payload.BilledRecurringPrice,
			Currency:             payload.BilledCurrency,
			NextBillingDate:      payload.NextRenewalDate,
			BillingDate:          payload.Timestamp,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// tell stella about this new supporter
	if err := workflow.ExecuteActivity(ctx, a.AddClubSupporter,
		activities.AddClubSupporter{
			AccountId:   details.AccountInitiator.AccountId,
			ClubId:      details.CcbillClubSupporter.ClubId,
			SupportedAt: payload.Timestamp,
		},
	).Get(ctx, &details); err != nil {
		return err
	}

	// create a new account supporter record (this is done last because it serves as a "confirmation" that everything has been set up correctly)
	if err := workflow.ExecuteActivity(ctx, a.CreateAccountClubSupportSubscription,
		activities.CreateAccountClubSupportSubscription{
			// save payment details
			SavePaymentDetails: details.HeaderConfiguration != nil && details.HeaderConfiguration.SavePaymentDetails,

			CCBillSubscriptionId: payload.SubscriptionId,
			AccountId:            details.AccountInitiator.AccountId,
			ClubId:               details.CcbillClubSupporter.ClubId,
			NextRenewalDate:      payload.NextRenewalDate,
			Timestamp:            payload.Timestamp,
			Amount:               payload.BilledRecurringPrice,
			Currency:             payload.BilledCurrency,
		},
	).Get(ctx, &details); err != nil {
		return err
	}

	return nil
}