package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"time"
)

func recoverWithSentry(hub *sentry.Hub, ctx context.Context) {
	if err := recover(); err != nil {
		eventID := hub.RecoverWithContext(ctx, err)
		if eventID != nil {
			hub.Flush(time.Second * 2)
		}

		zap.S().Panicw("panic while running grpc", zap.Any("stack", err))
	}
}

func UnaryServerInterceptor() grpc.UnaryServerInterceptor {
	return func(ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler) (interface{}, error) {

		hub := sentry.GetHubFromContext(ctx)
		if hub == nil {
			hub = sentry.CurrentHub().Clone()
			ctx = sentry.SetHubOnContext(ctx, hub)
		}

		defer recoverWithSentry(hub, ctx)

		resp, err := handler(ctx, req)
		if err != nil {
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
		handler grpc.StreamHandler) error {

		ctx := ss.Context()
		hub := sentry.GetHubFromContext(ctx)
		if hub == nil {
			hub = sentry.CurrentHub().Clone()
			ctx = sentry.SetHubOnContext(ctx, hub)
		}

		stream := grpc_middleware.WrapServerStream(ss)
		stream.WrappedContext = ctx

		defer recoverWithSentry(hub, ctx)

		err := handler(srv, stream)

		if err != nil {
			st, ok := status.FromError(err)
			if (ok && st.Code() != codes.NotFound) || !ok {
				zap.S().Errorw("stream server error", zap.Error(err), zap.String("method", info.FullMethod))
				hub.CaptureException(err)
			}
		}

		return err
	}
}
