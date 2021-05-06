package bootstrap

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"
	"time"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_zap "github.com/grpc-ecosystem/go-grpc-middleware/logging/zap"
	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	zapLogger  *zap.Logger
	customFunc grpc_zap.CodeToLevel
)

func InitializeGRPCServer(f func(server *grpc.Server)) {

	opts := []grpc_zap.Option{
		grpc_zap.WithLevels(customFunc),
	}
	// Make sure that log statements internal to gRPC library are logged using the zapLogger as well.
	grpc_zap.ReplaceGrpcLoggerV2(zapLogger)

	grpcServer := grpc.NewServer(
		grpc_middleware.WithUnaryServerChain(
			grpc_ctxtags.UnaryServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			grpc_zap.UnaryServerInterceptor(zapLogger, opts...),
		),
		grpc_middleware.WithStreamServerChain(
			grpc_ctxtags.StreamServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			grpc_zap.StreamServerInterceptor(zapLogger, opts...),
		),
	)

	reflection.Register(grpcServer)

	f(grpcServer)

	log.Printf("starting grpc server on port %s", "8080")

	listener, err := net.Listen("tcp", fmt.Sprintf("0.0.0.0:%s", "8080"))

	if err != nil {
		log.Fatal("net.Listen failed")
		return
	}

	go func() {
		if err := grpcServer.Serve(listener); err != nil {
			log.Fatalf("failed to serve: %v", err)
		}
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

	// Block until cancel signal is received.
	<-sig
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	log.Print("shutting down grpc server")
	grpcServer.GracefulStop()

	<-ctx.Done()
	os.Exit(0)
}
