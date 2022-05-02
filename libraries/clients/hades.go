package clients

import (
	"context"
	"overdoll/libraries/passport"
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

	hadesConnection, err := grpc.DialContext(ctx, address,
		grpc.WithInsecure(),
		grpc.WithStreamInterceptor(grpc_retry.StreamClientInterceptor(opts...)),
		grpc.WithUnaryInterceptor(grpc_retry.UnaryClientInterceptor(opts...)),
		grpc.WithStreamInterceptor(passport.StreamClientInterceptor()),
		grpc.WithUnaryInterceptor(passport.UnaryClientInterceptor()),
	)

	if err != nil {
		panic(err)
	}

	return hades.NewHadesClient(hadesConnection), func() {
		_ = hadesConnection.Close()
	}
}
