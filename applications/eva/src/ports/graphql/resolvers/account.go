package resolvers

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"overdoll/applications/eva/src/app"
	"overdoll/applications/eva/src/ports/graphql/types"
	"overdoll/libraries/graphql"
	"overdoll/libraries/helpers"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

type AccountResolver struct {
	App *app.Application
}

func (r AccountResolver) Avatar(ctx context.Context, obj *types.Account, size *int) (graphql.URI, error) {
	return graphql.NewURI(""), nil
}

func (r AccountResolver) Emails(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountEmailConnection, error) {
	accountId := obj.ID.GetID()

	if passport.FromContext(ctx).AccountID() != accountId {
		return nil, nil
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, page, err := r.App.Queries.GetAccountEmails.Handle(ctx, cursor, accountId)

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountEmailToGraphQLConnection(results, page), nil
}

func (r AccountResolver) Usernames(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountUsernameConnection, error) {
	accountId := obj.ID.GetID()

	if passport.FromContext(ctx).AccountID() != accountId {
		return nil, nil
	}

	cursor, err := paging.NewCursor(after, before, first, last)

	if err != nil {
		return nil, gqlerror.Errorf(err.Error())
	}

	results, page, err := r.App.Queries.GetAccountUsernames.Handle(ctx, cursor, accountId)

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountUsernameToGraphQLConnection(results, page), nil
}

func (r AccountResolver) Sessions(ctx context.Context, obj *types.Account, after *string, before *string, first *int, last *int) (*types.AccountSessionConnection, error) {
	accountId := obj.ID.GetID()

	if passport.FromContext(ctx).AccountID() != accountId {
		return nil, nil
	}

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

	results, page, err := r.App.Queries.GetAccountSessions.Handle(ctx, cursor, accountSession, accountId)

	if err != nil {
		return nil, err
	}

	return types.MarshalAccountSessionToGraphQLConnection(results, page), nil
}

func (r AccountResolver) MultiFactorSettings(ctx context.Context, obj *types.Account) (*types.AccountMultiFactorSettings, error) {

	accountId := obj.ID.GetID()

	if passport.FromContext(ctx).AccountID() != accountId {
		return nil, nil
	}

	acc, err := r.App.Queries.GetAccount.Handle(ctx, accountId)

	if err != nil {
		return nil, err
	}

	codes, err := r.App.Queries.GetAccountRecoveryCodes.Handle(ctx, accountId)

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

	if passport.FromContext(ctx).AccountID() != obj.ID.GetID() {
		return nil, nil
	}

	codes, err := r.App.Queries.GetAccountRecoveryCodes.Handle(ctx, obj.ID.GetID())

	if err != nil {
		return nil, err
	}

	var recoveryCodes []*types.AccountMultiFactorRecoveryCode

	for _, code := range codes {
		recoveryCodes = append(recoveryCodes, &types.AccountMultiFactorRecoveryCode{Code: code.Code()})
	}

	return recoveryCodes, nil
}
