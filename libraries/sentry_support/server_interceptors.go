package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"go.uber.org/zap"
	"google.golang.org/grpc"
)

func recoverWithSentry(hub *sentry.Hub, ctx context.Context, o *options) {
	if err := recover(); err != nil {
		eventID := hub.RecoverWithContext(ctx, err)
		if eventID != nil && o.WaitForDelivery {
			hub.Flush(o.Timeout)
		}

		if o.Repanic {
			panic(err)
		}
	}
}

func UnaryServerInterceptor(opts ...Option) grpc.UnaryServerInterceptor {
	o := newConfig(opts)
	return func(ctx context.Context,
		req interface{},
		info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler) (interface{}, error) {

		hub := sentry.GetHubFromContext(ctx)
		if hub == nil {
			hub = sentry.CurrentHub().Clone()
			ctx = sentry.SetHubOnContext(ctx, hub)
		}

		defer recoverWithSentry(hub, ctx, o)

		resp, err := handler(ctx, req)
		if err != nil && o.ReportOn(err) {
			zap.S().Errorw("unary server error", zap.Error(err))
			hub.CaptureException(err)
		}

		return resp, err
	}
}

func StreamServerInterceptor(opts ...Option) grpc.StreamServerInterceptor {
	o := newConfig(opts)
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

		defer recoverWithSentry(hub, ctx, o)

		err := handler(srv, stream)
		if err != nil && o.ReportOn(err) {
			zap.S().Errorw("stream server error", zap.Error(err))
			hub.CaptureException(err)
		}

		return err
	}
}