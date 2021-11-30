package principal

import (
	"context"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"google.golang.org/grpc"
	"overdoll/libraries/passport"
)

// Basically, if you want your GRPC serviec to have access to Principal, you
// need to implement a "PrincipalById" method which will return principal
// you may choose however you'd like in order to grab this data
type GrpcServicePrincipalFunc interface {
	PrincipalById(ctx context.Context, id string) (*Principal, error)
}

// UnaryServerInterceptor returns a new unary server interceptors that performs per-request auth.
func UnaryServerInterceptor() grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {

		if overrideSrv, ok := info.Server.(GrpcServicePrincipalFunc); ok {

			// principal relies on passport, so we first check if it's available
			pass := passport.FromContext(ctx)

			// no passport available, skip
			if pass == nil || (pass != nil && pass.Authenticated() != nil) {
				return handler(ctx, req)
			}

			principal, err := overrideSrv.PrincipalById(ctx, pass.AccountID())

			if err != nil {
				return nil, err
			}

			return handler(toContext(ctx, principal), req)
		}

		return handler(ctx, req)
	}
}

// StreamServerInterceptor returns a new unary server interceptors that performs per-request auth.
func StreamServerInterceptor() grpc.StreamServerInterceptor {
	return func(srv interface{}, stream grpc.ServerStream, info *grpc.StreamServerInfo, handler grpc.StreamHandler) error {

		wrapped := grpc_middleware.WrapServerStream(stream)
		ctx := stream.Context()

		if overrideSrv, ok := srv.(GrpcServicePrincipalFunc); ok {

			// principal relies on passport, so we first check if it's available
			pass := passport.FromContext(ctx)

			// no passport available, skip
			if pass == nil || (pass != nil && pass.Authenticated() != nil) {
				return handler(ctx, wrapped)
			}

			principal, err := overrideSrv.PrincipalById(ctx, pass.AccountID())

			if err != nil {
				return err
			}

			wrapped.WrappedContext = toContext(ctx, principal)
			return handler(srv, wrapped)
		}

		return handler(srv, wrapped)
	}
}
