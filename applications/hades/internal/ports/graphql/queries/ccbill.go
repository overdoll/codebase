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

	var id relay.ID

	if result.ClubId() != nil {
		id = relay.NewID(types.CCBillTransactionDetails{}, result.AccountId(), *result.ClubId(), result.Id())
	}

	transaction := &types.CCBillTransactionDetails{
		ID:          id,
		Approved:    result.Approved(),
		DeclineText: result.DeclineText(),
		DeclineCode: result.DeclineCode(),
	}

	if result.DeclineCode() != nil {

		declineError := types.MarshalCCBillDeclineCodeToGraphQL(ctx, *result.DeclineCode())

		transaction.DeclineError = &declineError
	}

	return transaction, nil
}
