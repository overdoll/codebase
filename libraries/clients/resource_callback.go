package clients

import (
	"context"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	"overdoll/libraries/passport"
	"overdoll/libraries/resource/proto"
	"overdoll/libraries/sentry_support"
	"time"

	grpc_retry "github.com/grpc-ecosystem/go-grpc-middleware/retry"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
)

func NewResourceCallbackClient(ctx context.Context, address string) (proto.ResourceCallbackClient, func()) {
	opts := []grpc_retry.CallOption{
		grpc_retry.WithBackoff(grpc_retry.BackoffExponential(100 * time.Millisecond)),
		grpc_retry.WithCodes(codes.Aborted, codes.Unavailable),
	}

	callbackConnection, err := grpc.DialContext(ctx, address,
		grpc.WithInsecure(),
		grpc.WithStreamInterceptor(grpc_retry.StreamClientInterceptor(opts...)),
		grpc.WithUnaryInterceptor(grpc_retry.UnaryClientInterceptor(opts...)),
		grpc.WithUnaryInterceptor(sentry_support.UnaryClientInterceptor()),
		grpc.WithStreamInterceptor(sentry_support.StreamClientInterceptor()),
		grpc.WithStreamInterceptor(passport.StreamClientInterceptor()),
		grpc.WithUnaryInterceptor(passport.UnaryClientInterceptor()),
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new resource callback client"))
		zap.S().Fatalw("failed to start new resource callback client", zap.Error(err))
	}

	return proto.NewResourceCallbackClient(callbackConnection), func() {
		_ = callbackConnection.Close()
	}
}