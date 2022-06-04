package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"overdoll/libraries/zap_support"
	"time"
)

func recoverWithSentry(hub *sentry.Hub, r interface{}, ctx context.Context, method string) error {
	zap_support.SafePanic("panic while running grpc", zap.Any("stack", r), zap.String("method", method))

	eventID := hub.RecoverWithContext(ctx, r)
	if eventID != nil {
		hub.Flush(time.Second * 2)
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
				err = recoverWithSentry(hub, r, ctx, info.FullMethod)
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
				err = recoverWithSentry(hub, r, ctx, info.FullMethod)
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
		}

		return err
	}
}
