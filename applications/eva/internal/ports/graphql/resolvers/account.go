package resolvers

import (
	"context"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/query"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/session"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"time"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) RecoveryCodesGenerated(ctx context.Context, obj *types.Account) (bool, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return false, err
	}

	res, err := r.App.Queries.AreAccountMultiFactorRecoveryCodesGenerated.Handle(ctx, query.AreAccountMultiFactorRecoveryCodesGenerated{
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return false, err
	}

	return res, nil
}

func (r AccountResolver) MultiFactorEnabled(ctx context.Context, obj *types.Account) (bool, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return false, err
	}

	if err := principal.FromContext(ctx).BelongsToAccount(obj.ID.GetID()); err != nil {
		return false, err
	}

	return obj.MultiFactorEnabled, nil
}

func (r AccountResolver) CanDisableMultiFactor(ctx context.Context, obj *types.Account) (bool, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return false, err
	}

	if err := principal.FromContext(ctx).BelongsToAccount(obj.ID.GetID()); err != nil {
		return false, err
	}

	return obj.CanDisableMultiFactor, nil
}

func (r AccountResolver) MultiFactorTotpConfigured(ctx context.Context, obj *types.Account) (bool, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return false, err
	}

	totpEnabled, err := r.App.Queries.IsAccountMultiFactorTOTPEnabled.Handle(ctx, query.IsAccountMultiFactorTOTPEnabled{
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return false, err
	}

	return totpEnabled, nil
}

func (r AccountResolver) UsernameEditAvailableAt(ctx context.Context, obj *types.Account) (*time.Time, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if err := principal.FromContext(ctx).BelongsToAccount(obj.ID.GetID()); err != nil {
		return nil, err
	}

	return &obj.UsernameEditAvailableAt, nil
}

func (r AccountResolver) EmailsLimit(ctx context.Context, obj *types.Account) (int, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return 0, err
	}

	return r.App.Queries.AccountEmailsLimit.Handle(ctx, query.AccountEmailsLimit{
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})
}

func (r AccountResolver) Lock(ctx context.Context, obj *types.Account) (*types.AccountLock, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if principal.FromContext(ctx).IsStaff() {
		return obj.Lock, nil
	}

	if err := principal.FromContext(ctx).BelongsToAccount(obj.ID.GetID()); err != nil {
		return nil, err
	}

	return obj.Lock, nil
}

func (r AccountResolver) Deleting(ctx context.Context, obj *types.Account) (*types.AccountDeleting, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	if principal.FromContext(ctx).IsStaff() {
		return obj.Deleting, nil
	}

	if err := principal.FromContext(ctx).BelongsToAccount(obj.ID.GetID()); err != nil {
		return nil, err
	}

	return obj.Deleting, nil
}

func (r AccountResolver) Emails(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountEmailConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.AccountEmailsByAccount.Handle(ctx, query.AccountEmailsByAccount{
		Cursor:    cursor,
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {

		if err == account.ErrAccountNotFound {
			return types.MarshalAccountEmailToGraphQLConnection(results, cursor), nil
		}

		return nil, err
	}

	return types.MarshalAccountEmailToGraphQLConnection(results, cursor), nil
}

func (r AccountResolver) Sessions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountSessionConnection, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.AccountSessionsByAccount.Handle(ctx, query.AccountSessionsByAccount{
		Cursor:    cursor,
		Passport:  passport.FromContext(ctx),
		Principal: principal.FromContext(ctx),
		AccountId: obj.ID.GetID(),
	})

	if err != nil {

		if err == session.ErrSessionsNotFound {
			return types.MarshalAccountSessionToGraphQLConnection(results, cursor), nil
		}

		return nil, err
	}

	return types.MarshalAccountSessionToGraphQLConnection(results, cursor), nil
}

func (r AccountResolver) RecoveryCodes(ctx context.Context, obj *types.Account) ([]*types.AccountMultiFactorRecoveryCode, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	codes, err := r.App.Queries.AccountRecoveryCodesByAccount.Handle(ctx, query.AccountRecoveryCodesByAccount{
		AccountId: obj.ID.GetID(),
		Principal: principal.FromContext(ctx),
	})

	if err != nil {
		return nil, err
	}

	return types.MarshalRecoveryCodesToGraphql(ctx, codes), nil
}
