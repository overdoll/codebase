package clients

import (
	"context"
	"go.uber.org/zap"
	"overdoll/libraries/passport"
	"overdoll/libraries/sentry_support"
	"time"

	grpc_retry "github.com/grpc-ecosystem/go-grpc-middleware/retry"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	stella "overdoll/applications/stella/proto"
)

func NewStellaClient(ctx context.Context, address string) (stella.StellaClient, func()) {
	opts := []grpc_retry.CallOption{
		grpc_retry.WithBackoff(grpc_retry.BackoffExponential(100 * time.Millisecond)),
		grpc_retry.WithCodes(codes.Aborted, codes.Unavailable),
	}

	stellaConnection, err := grpc.DialContext(ctx, address,
		grpc.WithInsecure(),
		grpc.WithStreamInterceptor(grpc_retry.StreamClientInterceptor(opts...)),
		grpc.WithUnaryInterceptor(grpc_retry.UnaryClientInterceptor(opts...)),
		grpc.WithStreamInterceptor(passport.StreamClientInterceptor()),
		grpc.WithUnaryInterceptor(passport.UnaryClientInterceptor()),
		grpc.WithUnaryInterceptor(sentry_support.UnaryClientInterceptor()),
		grpc.WithStreamInterceptor(sentry_support.StreamClientInterceptor()),
	)

	if err != nil {
		zap.S().Fatalw("failed to start new stella client", zap.Error(err))
	}

	return stella.NewStellaClient(stellaConnection), func() {
		_ = stellaConnection.Close()
	}
}
