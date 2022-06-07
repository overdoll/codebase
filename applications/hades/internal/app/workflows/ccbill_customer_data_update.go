package workflows

import (
	"go.temporal.io/sdk/workflow"
	"overdoll/applications/hades/internal/app/workflows/activities"
	"time"
)

type CCBillCustomerDataUpdateInput struct {
	SubscriptionId string
	Timestamp      time.Time
	AddressLine1   string
	City           string
	State          string
	Country        string
	PostalCode     string
	LastName       string
	FirstName      string
	Email          string
	PhoneNumber    string
	CardType       string
	Last4          string
	Bin            string
	ExpDate        string
}

func CCBillCustomerDataUpdate(ctx workflow.Context, input CCBillCustomerDataUpdateInput) error {

	ctx = workflow.WithActivityOptions(ctx, options)
	logger := workflow.GetLogger(ctx)

	var a *activities.Activities

	// update with new payment details data
	if err := workflow.ExecuteActivity(ctx, a.UpdateCCBillSubscriptionDetails,
		activities.UpdateCCBillSubscriptionDetailsInput{
			CCBillSubscriptionId: input.SubscriptionId,
			CardBin:              input.Bin,
			CardType:             input.CardType,
			CardLast4:            input.Last4,
			CardExpirationDate:   input.ExpDate,
			FirstName:            input.FirstName,
			Email:                input.Email,
			LastName:             input.LastName,
			PhoneNumber:          input.PhoneNumber,
			AddressLine1:         input.AddressLine1,
			City:                 input.City,
			Country:              input.Country,
			State:                input.State,
			PostalCode:           input.PostalCode,
			Timestamp:            input.Timestamp,
		},
	).Get(ctx, nil); err != nil {
		logger.Error("failed to update ccbill subscription details", "Error", err)
		return err
	}

	return nil
}
