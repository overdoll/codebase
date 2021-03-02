package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/scylladb/gocqlx/v2"
	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/server"
	"overdoll/libraries/bootstrap/synchronous"
)

func main() {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	init, err := synchronous.NewBootstrap(ctx, "applications/eva")

	if err != nil {
		log.Fatalf("Bootstrap failed with errors: %s", err)
	}

	init.Initialize(func(session gocqlx.Session, grpcServer *grpc.Server) {
		s := server.CreateServer(session)
		eva.RegisterEvaServer(grpcServer, s)
	})

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	log.Printf("shutting down server with signal: %s", <-sigChan)
}
