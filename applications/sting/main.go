package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"google.golang.org/grpc"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/server"
	"overdoll/libraries/bootstrap"
	"overdoll/libraries/events"
)

func main() {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	init, err := bootstrap.NewBootstrap(ctx, "applications/sting")

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	eventsConn := events.GetConnection(ctx, "sting")

	s := server.CreateServer(session, eventsConn)

	init.InitializeGRPCServer(func(server *grpc.Server) {
		sting.RegisterStingServer(server, s)
	})

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	log.Printf("shutting down server with signal: %s", <-sigChan)
}
