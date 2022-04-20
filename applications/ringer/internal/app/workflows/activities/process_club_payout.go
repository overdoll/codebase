package activities

import (
	"context"
	"overdoll/applications/ringer/internal/domain/paxum"
	"overdoll/applications/ringer/internal/domain/payout"
	"time"
)

type ProcessClubPayoutInput struct {
	PayoutId string
}

type ProcessClubPayoutPayload struct {
	Success   bool
	Error     *string
	Timestamp time.Time
}

func (h *Activities) ProcessClubPayout(ctx context.Context, input ProcessClubPayoutInput) (*ProcessClubPayoutPayload, error) {

	// get payout
	clubPayout, err := h.par.GetClubPayoutByIdOperator(ctx, input.PayoutId)

	if err != nil {
		return nil, err
	}

	// get the specific account payout method that's linked
	accountMethod, err := h.par.GetAccountPayoutMethodByIdOperator(ctx, clubPayout.AccountPayoutMethodId())

	if err != nil {
		return nil, err
	}

	accountDetails, err := h.dr.GetAccountDetailsByIdOperator(ctx, clubPayout.AccountPayoutMethodId())

	if err != nil {
		return nil, err
	}

	switch accountMethod.Method() {
	case payout.Paxum:
		transfer, err := paxum.NewTransfer(
			clubPayout.Id(),
			*accountMethod.PaxumEmail(),
			accountDetails.FirstName(),
			accountDetails.LastName(),
			clubPayout.Amount(),
			clubPayout.Currency(),
		)

		if err != nil {
			return nil, err
		}

		errorCode, err := h.pxr.TransferFunds(ctx, transfer)
		if err != nil {
			return nil, err
		}

		// if an error code was sent back, return that to our processor
		if errorCode != nil {
			return &ProcessClubPayoutPayload{Success: false, Timestamp: time.Now(), Error: errorCode}, nil
		}
	}

	return &ProcessClubPayoutPayload{Success: true, Timestamp: time.Now()}, nil
}
