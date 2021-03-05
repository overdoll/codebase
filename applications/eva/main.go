package main

import (
	"context"
	"log"
	"time"

	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
	"overdoll/applications/eva/src/server"
	"overdoll/libraries/bootstrap"
)

func main() {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	init, err := bootstrap.NewBootstrap(ctx, "applications/eva")

	if err != nil {
		log.Fatalf("bootstrap failed with errors: %s", err)
	}

	session, err := init.InitializeDatabaseSession()

	if err != nil {
		log.Fatalf("database session failed with errors: %s", err)
	}

	s := server.CreateServer(session)

	init.InitializeGRPCServer(func(server *grpc.Server) {
		eva.RegisterEvaServer(server, s)
	})
}
