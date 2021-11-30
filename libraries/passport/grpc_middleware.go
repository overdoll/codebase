package passport

import (
	"context"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

// UnaryServerInterceptor returns a new unary server interceptors that performs per-request passport assignment.
func UnaryServerInterceptor() grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {

		passport, err := fromGrpc(ctx)

		if err != nil {
			return nil, err
		}

		// passport is available add to context
		if passport != nil {
			return handler(toContext(ctx, passport), req)
		}

		// now check context instead
		passport = FromContext(ctx)

		// passport is in context, add it as part of the meta header
		if passport != nil {

			md, err := toGrpc(ctx, passport)

			if err != nil {
				return nil, err
			}

			if err := grpc.SendHeader(ctx, metadata.MD(md)); err != nil {
				return nil, err
			}

			return handler(ctx, req)
		}

		return handler(ctx, req)
	}
}

// StreamServerInterceptor returns a new unary server interceptors that performs per-request passport assignment.
func StreamServerInterceptor() grpc.StreamServerInterceptor {
	return func(srv interface{}, stream grpc.ServerStream, info *grpc.StreamServerInfo, handler grpc.StreamHandler) error {

		ctx := stream.Context()

		passport, err := fromGrpc(ctx)
		wrapped := grpc_middleware.WrapServerStream(stream)

		if err != nil {
			return err
		}

		// passport is available add to context
		if passport != nil {
			wrapped.WrappedContext = toContext(ctx, passport)
			return handler(srv, wrapped)
		}

		// now check context instead
		passport = FromContext(ctx)

		// passport is in context, add it as part of the meta header
		if passport != nil {

			md, err := toGrpc(ctx, passport)

			if err != nil {
				return err
			}

			if err := wrapped.SendHeader(metadata.MD(md)); err != nil {
				return err
			}

			return handler(ctx, wrapped)
		}

		return handler(srv, wrapped)
	}
}
