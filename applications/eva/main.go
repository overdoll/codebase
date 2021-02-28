package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gocql/gocql"
	"github.com/joho/godotenv"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"overdoll/applications/eva/src/server"
)

func init() {
	err := godotenv.Load("applications/eva/.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	// Create gocql cluster
	cluster := gocql.NewCluster(os.Getenv("SCYLLA_DATABASE"))
	cluster.Keyspace = "eva"

	// Wrap session on creation with gocqlx
	session, err := gocqlx.WrapSession(cluster.CreateSession())

	if err != nil {
		log.Fatalf("Database session failed with errors: %s", err)
	}

	if os.Getenv("RUN_MIGRATIONS_ON_STARTUP") == "true" {
		// Run migrations
		if err := migrate.Migrate(context.Background(), session, "applications/eva/migrations"); err != nil {
			log.Fatalf("Migrate: %s", err)
		}
	}

	// if server disabled, then dont run it (useful for running migrations, and then stopping the server)
	if os.Getenv("DISABLE_SERVER") == "true" {
		return
	}

	srv, err := server.NewServer(ctx, session)
	if err != nil {
		log.Fatalf("NewServer failed with error: %s", err)
	}

	srv.Run()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	signal := <-sigChan
	log.Printf("shutting down eva server with signal: %s", signal)
}
