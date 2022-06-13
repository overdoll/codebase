package bootstrap

import (
	"context"
	"go.uber.org/zap"
	"net"
	"os"
	"os/signal"
	"overdoll/libraries/errors"
	"overdoll/libraries/passport"
	"overdoll/libraries/sentry_support"
	"syscall"
	"time"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func InitializeGRPCServer(addr string, f func(server *grpc.Server)) {

	grpcServer := grpc.NewServer(
		grpc_middleware.WithUnaryServerChain(
			grpc_ctxtags.UnaryServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			sentry_support.UnaryServerInterceptor(),
			passport.UnaryServerInterceptor(),
		),
		grpc_middleware.WithStreamServerChain(
			grpc_ctxtags.StreamServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			sentry_support.StreamServerInterceptor(),
			passport.StreamServerInterceptor(),
		),
	)

	reflection.Register(grpcServer)

	f(grpcServer)

	zap.S().Infof("starting grpc server on %s", addr)
	sentry_support.SetServerType("grpc")

	listener, err := net.Listen("tcp", addr)

	if err != nil {
		sentry_support.MustCaptureException(errors.Wrap(err, "net.Listen failed"))
		zap.S().Fatalw("net.Listen failed", zap.Error(err))
		return
	}

	go func() {
		if err := grpcServer.Serve(listener); err != nil {
			sentry_support.MustCaptureException(errors.Wrap(err, "failed to serve grpc server"))
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
