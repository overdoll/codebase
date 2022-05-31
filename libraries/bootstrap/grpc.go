package bootstrap

import (
	"context"
	grpc_zap "github.com/grpc-ecosystem/go-grpc-middleware/logging/zap"
	"go.uber.org/zap"
	"net"
	"os"
	"os/signal"
	"overdoll/libraries/passport"
	"overdoll/libraries/sentry_support"
	"overdoll/libraries/support"
	"syscall"
	"time"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func InitializeGRPCServer(addr string, f func(server *grpc.Server)) {

	// only enable zap logging in production since it can get quite verbose
	if !support.IsDebug() {
		grpc_zap.ReplaceGrpcLoggerV2(zap.L())
	}

	logUnaryInterceptor := BlankUnaryServerInterceptor()

	if !support.IsDebug() {
		logUnaryInterceptor = grpc_zap.UnaryServerInterceptor(zap.L())
	}

	logStreamInterceptor := BlankStreamServerInterceptor()

	if !support.IsDebug() {
		logStreamInterceptor = grpc_zap.StreamServerInterceptor(zap.L())
	}

	grpcServer := grpc.NewServer(
		grpc_middleware.WithUnaryServerChain(
			grpc_ctxtags.UnaryServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			passport.UnaryServerInterceptor(),
			logUnaryInterceptor,
			sentry_support.UnaryServerInterceptor(),
		),
		grpc_middleware.WithStreamServerChain(
			grpc_ctxtags.StreamServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			passport.StreamServerInterceptor(),
			logStreamInterceptor,
			sentry_support.StreamServerInterceptor(),
		),
	)

	reflection.Register(grpcServer)

	f(grpcServer)

	zap.S().Infof("starting grpc server on %s", addr)

	listener, err := net.Listen("tcp", addr)

	if err != nil {
		zap.S().Fatalw("net.Listen failed", zap.Error(err))
		return
	}

	go func() {
		if err := grpcServer.Serve(listener); err != nil {
			zap.S().Fatalw("failed to serve grpc server", zap.Error(err))
		}
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

	// Block until cancel signal is received.
	<-sig
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	zap.S().Info("shutting down grpc server")
	grpcServer.GracefulStop()

	<-ctx.Done()
	os.Exit(0)
}

func BlankUnaryServerInterceptor() grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		return handler(ctx, req)
	}
}

func BlankStreamServerInterceptor() grpc.StreamServerInterceptor {
	return func(srv interface{}, stream grpc.ServerStream, info *grpc.StreamServerInfo, handler grpc.StreamHandler) error {
		return handler(srv, stream)
	}
}
