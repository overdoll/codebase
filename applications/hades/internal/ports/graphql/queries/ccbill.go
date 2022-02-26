package queries

import (
	"context"
	"overdoll/applications/hades/internal/app/query"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r QueryResolver) CcbillTransactionDetails(ctx context.Context, token string) (*types.CCBillTransactionDetails, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if token == "" {
		return nil, nil
	}

	result, err := r.App.Queries.CCBillTransactionDetails.Handle(ctx, query.CCBillTransactionDetails{
		Principal: principal.FromContext(ctx),
		Token:     token,
	})

	if err != nil {
		return nil, err
	}

	var declineError types.CCBillDeclineError

	if result.DeclineCode() != nil {
		switch *result.DeclineCode() {
		case "11":
			declineError = types.CCBillDeclineErrorTransactionDeclined
		case "24":
			declineError = types.CCBillDeclineErrorTransactionDeniedOrRefusedByBank
		case "29":
			declineError = types.CCBillDeclineErrorCardExpired
		case "31":
			declineError = types.CCBillDeclineErrorInsufficientFunds
		case "38":
			declineError = types.CCBillDeclineErrorTransactionDeniedOrRefusedByBank
		case "39":
			declineError = types.CCBillDeclineErrorRateLimitError
		case "45":
			declineError = types.CCBillDeclineErrorTransactionApprovalRequired
		default:
			declineError = types.CCBillDeclineErrorGeneralSystemError
		}
	}

	var id relay.ID

	if result.ClubId() != nil {
		id = relay.NewID(types.CCBillTransactionDetails{}, result.AccountId(), *result.ClubId(), result.Id())
	}

	return &types.CCBillTransactionDetails{
		ID:           id,
		Approved:     result.Approved(),
		DeclineError: &declineError,
		DeclineText:  result.DeclineText(),
		DeclineCode:  result.DeclineCode(),
	}, nil
}
