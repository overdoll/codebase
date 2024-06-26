package sentry_support

import (
	"context"
	"github.com/getsentry/sentry-go"
	"google.golang.org/grpc"
)

func UnaryClientInterceptor() grpc.UnaryClientInterceptor {
	return func(ctx context.Context,
		method string,
		req, reply interface{},
		cc *grpc.ClientConn,
		invoker grpc.UnaryInvoker,
		callOpts ...grpc.CallOption) error {

		hub := sentry.GetHubFromContext(ctx)
		if hub == nil {
			hub = sentry.CurrentHub().Clone()
			ctx = sentry.SetHubOnContext(ctx, hub)
		}

		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Type:     "grpc.client",
			Category: method,
			Data:     map[string]interface{}{"payload": req},
		}, 10)

		return invoker(ctx, method, req, reply, cc, callOpts...)
	}
}

func StreamClientInterceptor() grpc.StreamClientInterceptor {
	return func(ctx context.Context,
		desc *grpc.StreamDesc,
		cc *grpc.ClientConn,
		method string,
		streamer grpc.Streamer,
		callOpts ...grpc.CallOption) (grpc.ClientStream, error) {

		hub := sentry.GetHubFromContext(ctx)
		if hub == nil {
			hub = sentry.CurrentHub().Clone()
			ctx = sentry.SetHubOnContext(ctx, hub)
		}

		hub.Scope().AddBreadcrumb(&sentry.Breadcrumb{
			Type:     "grpc.client",
			Category: method,
		}, 10)

		return streamer(ctx, desc, cc, method, callOpts...)
	}
}
