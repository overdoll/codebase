package workflows

import (
	"fmt"
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"overdoll/applications/hades/internal/domain/ccbill"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/uuid"
	"strings"
)

type CCBillNewSaleOrUpsaleSuccessInput struct {
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

func CCBillNewSaleOrUpSaleSuccess(ctx workflow.Context, input CCBillNewSaleOrUpsaleSuccessInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	var details *hades.CCBillPayment

	// unravel payment details
	if err := workflow.ExecuteActivity(ctx, a.UnravelCCBillPaymentLink, input.XOverdollPaymentToken).Get(ctx, &details); err != nil {
		return err
	}

	// create an idempotency key - in case the following activity fails but the record is still created
	idempotencyKey := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
		return uuid.New().String()
	})

	var idempotentKey string

	if err := idempotencyKey.Get(&idempotentKey); err != nil {
		return err
	}

	var existingClubSupport *activities.GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload

	// check for duplicate subscriptions - if the account already supports the club
	if err := workflow.ExecuteActivity(ctx, a.GetOrCreateCCBillSubscriptionAndCheckForDuplicates,
		activities.GetOrCreateCCBillSubscriptionAndCheckForDuplicatesInput{
			AccountId:            details.AccountInitiator.AccountId,
			ClubId:               details.CcbillClubSupporter.ClubId,
			CCBillSubscriptionId: input.SubscriptionId,
			IdempotencyKey:       idempotentKey,

			AccountingCurrency:       input.AccountingCurrency,
			AccountingInitialPrice:   input.AccountingInitialPrice,
			AccountingRecurringPrice: input.AccountingRecurringPrice,

			BilledCurrency:       input.BilledCurrency,
			BilledInitialPrice:   input.BilledInitialPrice,
			BilledRecurringPrice: input.BilledRecurringPrice,

			SubscriptionCurrency:       input.SubscriptionCurrency,
			SubscriptionInitialPrice:   input.SubscriptionInitialPrice,
			SubscriptionRecurringPrice: input.SubscriptionRecurringPrice,

			CardBin:            input.Bin,
			CardType:           input.CardType,
			CardLast4:          input.Last4,
			CardExpirationDate: input.ExpDate,
			FirstName:          input.FirstName,
			Email:              input.Email,
			LastName:           input.LastName,
			PhoneNumber:        input.PhoneNumber,
			AddressLine1:       input.Address1,
			City:               input.City,
			Country:            input.Country,
			State:              input.State,
			PostalCode:         input.PostalCode,
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
			if err := workflow.ExecuteActivity(ctx, a.VoidCCBillSubscription,
				activities.VoidCCBillSubscriptionInput{
					CCBillSubscriptionId: input.SubscriptionId,
				},
			).Get(ctx, nil); err != nil {
				return err
			}
		}

		return nil
	}

	amount, err := ccbill.ParseCCBillCurrencyAmount(input.BilledRecurringPrice, input.BilledCurrency)

	if err != nil {
		return fmt.Errorf("failed to parse amount: %s", err)
	}

	timestamp, err := ccbill.ParseCCBillDateWithTime(input.Timestamp)

	if err != nil {
		return fmt.Errorf("failed to parse timestamp: %s", err)
	}

	billedAtDate, err := ccbill.ParseCCBillDate(strings.Split(input.Timestamp, " ")[0])

	if err != nil {
		return fmt.Errorf("failed to parse date: %s", err)
	}

	nextBillingDate, err := ccbill.ParseCCBillDate(input.NextRenewalDate)

	if err != nil {
		return fmt.Errorf("failed to parse date: %s", err)
	}

	// create record for new transaction
	if err := workflow.ExecuteActivity(ctx, a.CreateInitialClubSubscriptionAccountTransaction,
		activities.CreateInitialClubSubscriptionAccountTransactionInput{
			AccountClubSupporterSubscriptionId: input.SubscriptionId,
			TransactionId:                      input.TransactionId,
			AccountId:                          details.AccountInitiator.AccountId,
			Timestamp:                          timestamp,
			Amount:                             amount,
			Currency:                           input.BilledCurrency,
			NextBillingDate:                    nextBillingDate,
			BillingDate:                        billedAtDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// tell stella about this new supporter
	if err := workflow.ExecuteActivity(ctx, a.AddClubSupporter,
		activities.AddClubSupporterInput{
			AccountId:   details.AccountInitiator.AccountId,
			ClubId:      details.CcbillClubSupporter.ClubId,
			SupportedAt: input.Timestamp,
		},
	).Get(ctx, &details); err != nil {
		return err
	}

	// create a new account supporter record (this is done last because it serves as a "confirmation" that everything has been set up correctly)
	if err := workflow.ExecuteActivity(ctx, a.CreateAccountClubSupportSubscription,
		activities.CreateAccountClubSupportSubscriptionInput{
			// save payment details
			SavePaymentDetails:   details.HeaderConfiguration != nil && details.HeaderConfiguration.SavePaymentDetails,
			CCBillSubscriptionId: &input.SubscriptionId,
			AccountId:            details.AccountInitiator.AccountId,
			ClubId:               details.CcbillClubSupporter.ClubId,
			LastRenewalDate:      billedAtDate,
			NextRenewalDate:      nextBillingDate,
			Timestamp:            timestamp,
			Amount:               amount,
			Currency:             input.BilledCurrency,
		},
	).Get(ctx, &details); err != nil {
		return err
	}

	// send success notification
	if err := workflow.ExecuteActivity(ctx, a.SendAccountClubSupporterSubscriptionSuccessNotification,
		activities.SendAccountClubSupporterSubscriptionSuccessNotificationInput{
			AccountClubSupporterSubscriptionId: input.SubscriptionId,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// spawn an async child workflow
	// that will run this notification reminder at the beginning of each month to tell you how many subscriptions
	// you have re-billing this month
	childWorkflowOptions := workflow.ChildWorkflowOptions{
		WorkflowID:            "UpcomingSubscriptionReminderNotification_" + details.AccountInitiator.AccountId,
		ParentClosePolicy:     enums.PARENT_CLOSE_POLICY_ABANDON,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
		CronSchedule:          "0 0 1 * *",
	}

	ctx = workflow.WithChildOptions(ctx, childWorkflowOptions)

	if err := workflow.ExecuteChildWorkflow(ctx, UpcomingSubscriptionReminderNotification,
		UpcomingSubscriptionReminderNotificationInput{
			AccountId: details.AccountInitiator.AccountId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil {
		return err
	}

	accountingAmount, err := ccbill.ParseCCBillCurrencyAmount(input.AccountingInitialPrice, input.AccountingCurrency)

	if err != nil {
		return fmt.Errorf("failed to parse amount: %s", err)
	}

	// send a payment
	if err := workflow.ExecuteActivity(ctx, a.NewClubSupporterSubscriptionPaymentDeposit,
		activities.NewClubSupporterSubscriptionPaymentDepositInput{
			AccountId:     details.AccountInitiator.AccountId,
			ClubId:        details.CcbillClubSupporter.ClubId,
			TransactionId: input.TransactionId,
			Timestamp:     timestamp,
			Amount:        accountingAmount,
			Currency:      input.AccountingCurrency,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	return nil
}
