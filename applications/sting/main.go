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
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/server"
	"overdoll/libraries/bootstrap/synchronous"
	"overdoll/libraries/events"
)

func main() {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	init, err := synchronous.NewBootstrap(ctx, "applications/sting")

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	init.Initialize(func(session gocqlx.Session, grpcServer *grpc.Server) {

		eventsConn := events.GetConnection(ctx, "sting")

		s := server.CreateServer(session, eventsConn)
		sting.RegisterStingServer(grpcServer, s)
	})

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	log.Printf("shutting down server with signal: %s", <-sigChan)
}
