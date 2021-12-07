package passport

import (
	"context"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"google.golang.org/grpc"
)

func UnaryServerInterceptor() grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {

		passport, err := fromGrpc(ctx)

		if err != nil {
			return nil, err
		}

		// passport is available add to context
		if passport != nil {
			return handler(withContext(ctx, passport), req)
		}

		return handler(ctx, req)
	}
}

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
			wrapped.WrappedContext = withContext(ctx, passport)
			return handler(srv, wrapped)
		}

		return handler(srv, wrapped)
	}
}

func UnaryClientInterceptor() grpc.UnaryClientInterceptor {
	return func(ctx context.Context, method string, req, reply interface{}, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
		// now check context instead
		passport := FromContext(ctx)

		// passport is in context, add it as part of the meta header
		if passport != nil {

			ctx, err := toGrpc(ctx, passport)

			if err != nil {
				return err
			}

			return invoker(ctx, method, req, reply, cc, opts...)
		}

		return invoker(ctx, method, req, reply, cc, opts...)
	}
}

func StreamClientInterceptor() grpc.StreamClientInterceptor {
	return func(ctx context.Context, desc *grpc.StreamDesc, cc *grpc.ClientConn, method string, streamer grpc.Streamer, opts ...grpc.CallOption) (grpc.ClientStream, error) {

		// now check context instead
		passport := FromContext(ctx)

		// passport is in context, add it as part of the meta header
		if passport != nil {

			ctx, err := toGrpc(ctx, passport)

			if err != nil {
				return nil, err
			}

			return streamer(ctx, desc, cc, method)
		}

		return streamer(ctx, desc, cc, method)
	}
}
