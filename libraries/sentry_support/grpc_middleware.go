package sentry_support

import (
	"context"
	"fmt"
	"github.com/getsentry/sentry-go"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/libraries/errors"
	"overdoll/libraries/support"
	"overdoll/libraries/zap_support"
	"time"
)

func recoverGrpcWithSentry(hub *sentry.Hub, r interface{}, ctx context.Context, method string) error {

	var err error
	errors.RecoverPanic(r, &err)

	if support.IsDebug() {
		fmt.Println(err)
		zap_support.SafePanic("panic while running grpc")
	} else {
		zap_support.SafePanic("panic while running grpc", zap.Error(err), zap.String("method", method))
	}

	eventID := hub.RecoverWithContext(ctx, err)
	if eventID != nil {
		hub.Flush(time.Second * 5)
	}

	return status.Errorf(codes.Internal, "unrecoverable error")
}

func UnaryServerInterceptor() grpc.UnaryServerInterceptor {
	return func(ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler) (_ interface{}, err error) {

		panicked := true

		hub := sentry.GetHubFromContext(ctx)
		if hub == nil {
			hub = sentry.CurrentHub().Clone()
			ctx = sentry.SetHubOnContext(ctx, hub)
		}

		defer func() {
			if r := recover(); r != nil || panicked {
				err = recoverGrpcWithSentry(hub, r, ctx, info.FullMethod)
			}
		}()

		resp, err := handler(ctx, req)
		panicked = false

		if err != nil && !panicked {
			st, ok := status.FromError(err)
			if (ok && st.Code() != codes.NotFound) || !ok {
				zap.S().Errorw("unary server error", zap.Error(err), zap.String("method", info.FullMethod))
				hub.CaptureException(err)
			}

			if support.IsDebug() {
				return resp, err
			}

			return resp, status.New(st.Code(), "internal server error").Err()
		}

		return resp, err
	}
}

func StreamServerInterceptor() grpc.StreamServerInterceptor {
	return func(srv interface{},
		ss grpc.ServerStream,
		info *grpc.StreamServerInfo,
		handler grpc.StreamHandler) (err error) {
		panicked := true

		ctx := ss.Context()
		hub := sentry.GetHubFromContext(ctx)
		if hub == nil {
			hub = sentry.CurrentHub().Clone()
			ctx = sentry.SetHubOnContext(ctx, hub)
		}

		stream := grpc_middleware.WrapServerStream(ss)
		stream.WrappedContext = ctx

		defer func() {
			if r := recover(); r != nil || panicked {
				err = recoverGrpcWithSentry(hub, r, ctx, info.FullMethod)
			}
		}()

		err = handler(srv, stream)
		panicked = false

		if err != nil && !panicked {
			st, ok := status.FromError(err)
			if (ok && st.Code() != codes.NotFound) || !ok {
				zap.S().Errorw("stream server error", zap.Error(err), zap.String("method", info.FullMethod))
				hub.CaptureException(err)
			}

			if support.IsDebug() {
				return err
			}

			return status.New(st.Code(), "internal server error").Err()
		}

		return nil
	}
}
