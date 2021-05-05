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

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func InitializeGRPCServer(f func(server *grpc.Server)) {

	grpcServer := grpc.NewServer()

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
