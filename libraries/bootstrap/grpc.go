package bootstrap

import (
	"context"
	"log"
	"net"
	"os"
	"os/signal"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
	"syscall"
	"time"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func InitializeGRPCServer(addr string, f func(server *grpc.Server)) {

	// TODO: logger too verbose in dev, should be improved?
	// Make sure that log statements internal to gRPC library are logged using the zapLogger as well.
	//grpc_zap.ReplaceGrpcLoggerV2(zap.L())

	grpcServer := grpc.NewServer(
		grpc_middleware.WithUnaryServerChain(
			grpc_ctxtags.UnaryServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			passport.UnaryServerInterceptor(),
			principal.UnaryServerInterceptor(),
			//	grpc_zap.UnaryServerInterceptor(zap.L()),
		),
		grpc_middleware.WithStreamServerChain(
			grpc_ctxtags.StreamServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			passport.StreamServerInterceptor(),
			principal.StreamServerInterceptor(),
			//	grpc_zap.StreamServerInterceptor(zap.L()),
		),
	)

	reflection.Register(grpcServer)

	f(grpcServer)

	log.Printf("starting grpc server on %s", addr)

	listener, err := net.Listen("tcp", addr)

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
