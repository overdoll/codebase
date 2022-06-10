package clients

import (
	"context"
	grpc_zap "github.com/grpc-ecosystem/go-grpc-middleware/logging/zap"
	"go.uber.org/zap"
	hades "overdoll/applications/hades/proto"
	"overdoll/libraries/errors"
	"overdoll/libraries/passport"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/support"
	"time"

	grpc_retry "github.com/grpc-ecosystem/go-grpc-middleware/retry"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
)

func NewHadesClient(ctx context.Context, address string) (hades.HadesClient, func()) {
	opts := []grpc_retry.CallOption{
		grpc_retry.WithBackoff(grpc_retry.BackoffExponential(100 * time.Millisecond)),
		grpc_retry.WithCodes(codes.Aborted, codes.Unavailable),
	}

	// only enable zap logging in production since it can get quite verbose
	if !support.IsDebug() {
		grpc_zap.ReplaceGrpcLoggerV2(zap.L())
	}

	logUnaryInterceptor := blankUnaryClientInterceptor()

	if !support.IsDebug() {
		logUnaryInterceptor = grpc_zap.UnaryClientInterceptor(zap.L())
	}

	logStreamInterceptor := blankStreamClientInterceptor()

	if !support.IsDebug() {
		logStreamInterceptor = grpc_zap.StreamClientInterceptor(zap.L())
	}

	hadesConnection, err := grpc.DialContext(ctx, address,
		grpc.WithInsecure(),
		grpc.WithStreamInterceptor(logStreamInterceptor),
		grpc.WithUnaryInterceptor(logUnaryInterceptor),
		grpc.WithStreamInterceptor(grpc_retry.StreamClientInterceptor(opts...)),
		grpc.WithUnaryInterceptor(grpc_retry.UnaryClientInterceptor(opts...)),
		grpc.WithUnaryInterceptor(sentry_support.UnaryClientInterceptor()),
		grpc.WithStreamInterceptor(sentry_support.StreamClientInterceptor()),
		grpc.WithStreamInterceptor(passport.StreamClientInterceptor()),
		grpc.WithUnaryInterceptor(passport.UnaryClientInterceptor()),
	)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "failed to start new hades client"))
		zap.S().Fatalw("failed to start new hades client", zap.Error(err))
	}

	return hades.NewHadesClient(hadesConnection), func() {
		_ = hadesConnection.Close()
	}
}
