package workflows

import (
	"go.temporal.io/api/enums/v1"
	"go.temporal.io/sdk/temporal"
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/money"
	"overdoll/libraries/support"
	"time"
)

type CCBillNewSaleOrUpSaleSuccessInput struct {
	SubscriptionId string
	TransactionId  string

	AccountingInitialPrice   uint64
	AccountingRecurringPrice uint64
	AccountingCurrency       money.Currency

	SubscriptionInitialPrice   uint64
	SubscriptionRecurringPrice uint64
	SubscriptionCurrency       money.Currency

	BilledInitialPrice   uint64
	BilledRecurringPrice uint64
	BilledCurrency       money.Currency

	PaymentToken *hades.CCBillPayment

	Timestamp time.Time

	NextBillingDate time.Time
	BilledAtDate    time.Time

	AddressLine1 string
	Bin          string
	CardType     string
	City         string
	Country      string
	Email        string
	ExpDate      string
	FirstName    string
	Last4        string
	LastName     string
	PhoneNumber  string
	PostalCode   string
	State        string
}

func CCBillNewSaleOrUpSaleSuccess(ctx workflow.Context, input CCBillNewSaleOrUpSaleSuccessInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)

	var a *activities.Activities

	// create a subscription id even though the subscription may be a duplicate
	uniqueSubscriptionId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	var existingClubSupport *activities.GetOrCreateCCBillSubscriptionAndCheckForDuplicatesPayload

	// check for duplicate subscriptions - if the account already supports the club
	if err := workflow.ExecuteActivity(ctx, a.GetOrCreateCCBillSubscriptionAndCheckForDuplicates,
		activities.GetOrCreateCCBillSubscriptionAndCheckForDuplicatesInput{
			AccountId:                          input.PaymentToken.AccountInitiator.AccountId,
			ClubId:                             input.PaymentToken.CcbillClubSupporter.ClubId,
			CCBillSubscriptionId:               input.SubscriptionId,
			AccountClubSupporterSubscriptionId: uniqueSubscriptionId,

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
			AddressLine1:       input.AddressLine1,
			City:               input.City,
			Country:            input.Country,
			State:              input.State,
			PostalCode:         input.PostalCode,
		},
	).Get(ctx, &existingClubSupport); err != nil {
		return err
	}

	// a duplicate subscription detected
	if existingClubSupport.Duplicate {

		// basically, if the subscription ID that was passed in is not the one currently being used, then it will void/refund it
		if err := workflow.ExecuteActivity(ctx, a.VoidCCBillTransaction,
			activities.VoidCCBillTransactionInput{
				CCBillTransactionId: input.TransactionId,
			},
		).Get(ctx, nil); err != nil {
			return err
		}

		// send a notification to our account that we detected a duplicate subscription and that it was voided
		if err := workflow.ExecuteActivity(ctx, a.SendAccountClubSupporterSubscriptionDuplicateNotification,
			activities.SendAccountClubSupporterSubscriptionDuplicateNotificationInput{
				AccountId: input.PaymentToken.AccountInitiator.AccountId,
				ClubId:    input.PaymentToken.CcbillClubSupporter.ClubId,
				Currency:  input.BilledCurrency,
				Amount:    input.BilledRecurringPrice,
			},
		).Get(ctx, nil); err != nil {
			return err
		}

		return nil
	}

	uniqueTransactionId, err := support.GenerateUniqueIdForWorkflow(ctx)

	if err != nil {
		return err
	}

	// create record for new transaction
	if err := workflow.ExecuteActivity(ctx, a.CreateInitialClubSubscriptionAccountTransaction,
		activities.CreateInitialClubSubscriptionAccountTransactionInput{
			Id:                                 uniqueTransactionId,
			AccountClubSupporterSubscriptionId: input.SubscriptionId,
			TransactionId:                      input.TransactionId,
			AccountId:                          input.PaymentToken.AccountInitiator.AccountId,
			Timestamp:                          input.Timestamp,
			Amount:                             input.BilledRecurringPrice,
			Currency:                           input.BilledCurrency,
			NextBillingDate:                    input.NextBillingDate,
			BillingDate:                        input.BilledAtDate,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// create a new account supporter record (this is done last because it serves as a "confirmation" that everything has been set up correctly)
	if err := workflow.ExecuteActivity(ctx, a.CreateAccountClubSupportSubscription,
		activities.CreateAccountClubSupportSubscriptionInput{
			// save payment details
			SavePaymentDetails:                 input.PaymentToken.HeaderConfiguration != nil && input.PaymentToken.HeaderConfiguration.SavePaymentDetails,
			CCBillSubscriptionId:               &input.SubscriptionId,
			AccountClubSupporterSubscriptionId: uniqueSubscriptionId,
			AccountId:                          input.PaymentToken.AccountInitiator.AccountId,
			ClubId:                             input.PaymentToken.CcbillClubSupporter.ClubId,
			LastRenewalDate:                    input.BilledAtDate,
			NextRenewalDate:                    input.NextBillingDate,
			Timestamp:                          input.Timestamp,
			Amount:                             input.BilledRecurringPrice,
			Currency:                           input.BilledCurrency,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// tell stella about this new supporter
	if err := workflow.ExecuteActivity(ctx, a.AddClubSupporter,
		activities.AddClubSupporterInput{
			AccountId:   input.PaymentToken.AccountInitiator.AccountId,
			ClubId:      input.PaymentToken.CcbillClubSupporter.ClubId,
			SupportedAt: input.Timestamp,
		},
	).Get(ctx, nil); err != nil {
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

	// send a payment
	if err := workflow.ExecuteActivity(ctx, a.NewClubSupporterSubscriptionPaymentDeposit,
		activities.NewClubSupporterSubscriptionPaymentDepositInput{
			AccountId:            input.PaymentToken.AccountInitiator.AccountId,
			ClubId:               input.PaymentToken.CcbillClubSupporter.ClubId,
			AccountTransactionId: input.TransactionId,
			Timestamp:            input.Timestamp,
			Amount:               input.AccountingRecurringPrice,
			Currency:             input.AccountingCurrency,
		},
	).Get(ctx, nil); err != nil {
		return err
	}

	// spawn an async child workflow
	// that will run this notification reminder at the beginning of each month to tell you how many subscriptions
	// you have re-billing this month
	childCtx := workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
		WorkflowID:            "UpcomingSubscriptionReminderNotification_" + input.PaymentToken.AccountInitiator.AccountId,
		ParentClosePolicy:     enums.PARENT_CLOSE_POLICY_ABANDON,
		WorkflowIDReusePolicy: enums.WORKFLOW_ID_REUSE_POLICY_ALLOW_DUPLICATE_FAILED_ONLY,
		CronSchedule:          "0 0 1 * *",
	})

	if err := workflow.ExecuteChildWorkflow(childCtx, UpcomingSubscriptionReminderNotification,
		UpcomingSubscriptionReminderNotificationInput{
			AccountId: input.PaymentToken.AccountInitiator.AccountId,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		return err
	}

	// spawn a child workflow that will calculate club transaction metrics
	childCtx = workflow.WithChildOptions(ctx, workflow.ChildWorkflowOptions{
		WorkflowID:        "ClubTransactionMetric_" + input.TransactionId,
		ParentClosePolicy: enums.PARENT_CLOSE_POLICY_ABANDON,
	})

	if err := workflow.ExecuteChildWorkflow(childCtx, ClubTransactionMetric,
		ClubTransactionMetricInput{
			ClubId:    input.PaymentToken.CcbillClubSupporter.ClubId,
			Timestamp: input.Timestamp,
			Id:        input.TransactionId,
			Amount:    input.AccountingRecurringPrice,
			Currency:  input.AccountingCurrency,
		},
	).
		GetChildWorkflowExecution().
		Get(ctx, nil); err != nil && !temporal.IsWorkflowExecutionAlreadyStartedError(err) {
		return err
	}

	return nil
}
