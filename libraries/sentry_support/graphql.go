package sentry_support

import (
	"context"
	"github.com/99designs/gqlgen/graphql"
	"github.com/getsentry/sentry-go"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	domainerror2 "overdoll/libraries/errors/domainerror"
	"overdoll/libraries/support"
	"overdoll/libraries/zap_support"
	"time"
)

var (
	unrecoverableError = errors.New("internal server error")
)

func GraphQLRecoverFunc(ctx context.Context, r interface{}) error {

	var err error
	errors.RecoverPanic(r, &err)
	zap_support.SafePanic("panic while resolving graphql", zap.Any("error", err))

	if hub := sentry.GetHubFromContext(ctx); hub != nil {
		eventID := hub.RecoverWithContext(ctx, err)
		if eventID != nil {
			hub.Flush(time.Second * 5)
		}
	}

	return unrecoverableError
}

func GraphQLErrorPresenter(ctx context.Context, e error) *gqlerror.Error {

	defaultMessage := ""
	isSafeToView := false

	switch e.(type) {
	case *domainerror2.Validation:
		isSafeToView = true
		defaultMessage = "validation error"
		break
	case *domainerror2.Authorization:
		isSafeToView = true
		defaultMessage = "not authorized"
		break
	default:
		unwrappedError := errors.Unwrap(e)
		// ignore unrecoverable errors that are passed from panics since we want to successfully recover
		if unwrappedError == unrecoverableError {
			return graphql.DefaultErrorPresenter(ctx, e)
		}

		zap.S().Errorw("resolver error", zap.Error(unwrappedError))
		defaultMessage = "internal server error"
		if hub := sentry.GetHubFromContext(ctx); hub != nil {
			hub.CaptureException(unwrappedError)
		}
	}

	err := graphql.DefaultErrorPresenter(ctx, e)

	if isSafeToView || support.IsDebug() {
		err.Message = defaultMessage + ": " + err.Message
	} else {
		err.Message = defaultMessage
	}

	return err
}

func GraphQLAroundOperations(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
	oc := graphql.GetOperationContext(ctx)
	if hub := sentry.GetHubFromContext(ctx); hub != nil {
		hub.Scope().SetExtra("GraphQL Operation", oc.OperationName)
		hub.Scope().SetExtra("GraphQL Query", oc.RawQuery)
	}

	return next(ctx)
}
