package mutations

import (
	"context"
	"overdoll/applications/ringer/internal/app"
	"overdoll/applications/ringer/internal/app/command"
	"overdoll/applications/ringer/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

type MutationResolver struct {
	App *app.Application
}

func (r MutationResolver) UpdateAccountDetails(ctx context.Context, input types.UpdateAccountDetailsInput) (*types.UpdateAccountDetailsPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.UpdateAccountDetails.Handle(ctx, command.UpdateAccountDetails{
		Principal:          principal.FromContext(ctx),
		AccountId:          principal.FromContext(ctx).AccountId(),
		FirstName:          input.FirstName,
		LastName:           input.LastName,
		CountryOfResidence: input.CountryID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdateAccountDetailsPayload{AccountDetails: types.MarshalAccountDetailsToGraphQL(result)}, nil
}

func (r MutationResolver) UpdateClubPlatformFee(ctx context.Context, input types.UpdateClubPlatformFeeInput) (*types.UpdateClubPlatformFeePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.UpdateClubPlatformFee.Handle(ctx, command.UpdateClubPlatformFee{
		Principal:  principal.FromContext(ctx),
		ClubId:     input.ClubID.GetID(),
		FeePercent: int64(input.Percent),
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdateClubPlatformFeePayload{ClubPlatformFee: types.MarshalClubPlatformFeeToGraphQL(ctx, result)}, nil
}

func (r MutationResolver) SetPaxumAccountPayoutMethod(ctx context.Context, input types.SetPaxumAccountPayoutMethodInput) (*types.SetPaxumAccountPayoutMethodPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.SetPaxumAccountPayoutMethod.Handle(ctx, command.SetPaxumAccountPayoutMethod{
		Principal:  principal.FromContext(ctx),
		AccountId:  principal.FromContext(ctx).AccountId(),
		PaxumEmail: input.Email,
	})

	if err != nil {
		return nil, err
	}

	return &types.SetPaxumAccountPayoutMethodPayload{AccountPayoutMethod: types.MarshalAccountPayoutMethodToGraphQL(ctx, result)}, nil
}

func (r MutationResolver) DeleteAccountPayoutMethod(ctx context.Context, input types.DeleteAccountPayoutMethodInput) (*types.DeleteAccountPayoutMethodPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.DeleteAccountPayoutMethod.Handle(ctx, command.DeleteAccountPayoutMethod{
		Principal:             principal.FromContext(ctx),
		AccountPayoutMethodId: input.PayoutMethodID.GetID(),
	}); err != nil {
		return nil, err
	}

	return &types.DeleteAccountPayoutMethodPayload{DeletedAccountPayoutMethodID: input.PayoutMethodID}, nil
}

func (r MutationResolver) UpdateClubPayoutDepositDate(ctx context.Context, input types.UpdateClubPayoutDepositDateInput) (*types.UpdateClubPayoutDepositDatePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.UpdateClubPayoutDepositDate.Handle(ctx, command.UpdateClubPayoutDepositDate{
		Principal: principal.FromContext(ctx),
		PayoutId:  input.PayoutID.GetID(),
		NewDate:   input.NewDate,
	})

	if err != nil {
		return nil, err
	}

	return &types.UpdateClubPayoutDepositDatePayload{ClubPayout: types.MarshalClubPayoutToGraphQL(result)}, nil
}

func (r MutationResolver) CancelClubPayout(ctx context.Context, input types.CancelClubPayoutInput) (*types.CancelClubPayoutPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.CancelClubPayout.Handle(ctx, command.CancelClubPayout{
		Principal: principal.FromContext(ctx),
		PayoutId:  input.PayoutID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.CancelClubPayoutPayload{ClubPayout: types.MarshalClubPayoutToGraphQL(result)}, nil
}

func (r MutationResolver) RetryClubPayout(ctx context.Context, input types.RetryClubPayoutInput) (*types.RetryClubPayoutPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	result, err := r.App.Commands.RetryClubPayout.Handle(ctx, command.RetryClubPayout{
		Principal: principal.FromContext(ctx),
		PayoutId:  input.PayoutID.GetID(),
	})

	if err != nil {
		return nil, err
	}

	return &types.RetryClubPayoutPayload{ClubPayout: types.MarshalClubPayoutToGraphQL(result)}, nil
}

func (r MutationResolver) InitiateClubPayout(ctx context.Context, input types.InitiateClubPayoutInput) (*types.InitiateClubPayoutPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := r.App.Commands.InitiateClubPayout.Handle(ctx, command.InitiateClubPayout{
		Principal:   principal.FromContext(ctx),
		ClubId:      input.ClubID.GetID(),
		DepositDate: input.DepositDate,
	}); err != nil {
		return nil, err
	}

	return &types.InitiateClubPayoutPayload{Club: &types.Club{ID: input.ClubID}}, nil
}
