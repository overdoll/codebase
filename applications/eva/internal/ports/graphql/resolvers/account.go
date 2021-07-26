package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/ports/graphql/types"
	"overdoll/libraries/helpers"
	"overdoll/libraries/paging"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) Lock(ctx context.Context, obj *types.Account) (*types.AccountLock, error) {

	acc, err := r.App.Queries.AccountById.Handle(ctx, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountLockToGraphQL(acc), nil
}

func (r AccountResolver) Emails(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountEmailConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.AccountEmailsByAccount.Handle(ctx, cursor, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountEmailToGraphQLConnection(results, cursor), nil
}

func (r AccountResolver) Usernames(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountUsernameConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, err := r.App.Queries.AccountUsernamesByAccount.Handle(ctx, cursor, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountUsernameToGraphQLConnection(results, cursor), nil
}

func (r AccountResolver) Sessions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountSessionConnection, error) {

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	accountSession := ""

	gc := helpers.GinContextFromContext(ctx)

	// get current session from connect.sid cookie
	currentCookie, err := gc.Request.Cookie("connect.sid")

	if err == nil && currentCookie != nil {
		accountSession = currentCookie.Value
	}

	results, err := r.App.Queries.AccountSessionsByAccount.Handle(ctx, cursor, accountSession, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountSessionToGraphQLConnection(results, cursor), nil
}

func (r AccountResolver) MultiFactorSettings(ctx context.Context, obj *types.Account) (*types.AccountMultiFactorSettings, error) {

	accountId := obj.ID.GetID()

	acc, err := r.App.Queries.AccountById.Handle(ctx, accountId)

	if err != nil {
		return nil, err
	}

	codes, err := r.App.Queries.AccountRecoveryCodesByAccount.Handle(ctx, accountId)

	if err != nil {
		return nil, err
	}

	totpEnabled, err := r.App.Queries.IsAccountMultiFactorTOTPEnabled.Handle(ctx, accountId)

	if err != nil {
		return nil, err
	}

	return &types.AccountMultiFactorSettings{
		RecoveryCodesGenerated:    len(codes) > 0,
		MultiFactorEnabled:        acc.MultiFactorEnabled(),
		CanDisableMultiFactor:     acc.CanDisableMultiFactor(),
		MultiFactorTotpConfigured: totpEnabled,
	}, nil

}

func (r AccountResolver) RecoveryCodes(ctx context.Context, obj *types.Account) ([]*types.AccountMultiFactorRecoveryCode, error) {

	codes, err := r.App.Queries.AccountRecoveryCodesByAccount.Handle(ctx, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	var recoveryCodes []*types.AccountMultiFactorRecoveryCode

	for _, code := range codes {
		recoveryCodes = append(recoveryCodes, &types.AccountMultiFactorRecoveryCode{Code: code.Code()})
	}

	return recoveryCodes, nil
}
