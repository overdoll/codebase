package passport

import (
	"context"
	"google.golang.org/grpc"
)

func NewGrpcTestClientConnection(ctx context.Context, address string, accountId *string) (*grpc.ClientConn, context.Context, error) {

	pass, err := issueTestingPassport(accountId, nil)

	if err != nil {
		return nil, nil, err
	}

	// add passport to context
	newCtx := withContext(ctx, pass)

	conn, err := grpc.DialContext(newCtx, address,
		grpc.WithInsecure(),
		grpc.WithStreamInterceptor(StreamClientInterceptor()),
		grpc.WithUnaryInterceptor(UnaryClientInterceptor()),
	)

	return conn, newCtx, err
}
