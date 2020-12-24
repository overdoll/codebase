package main

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/joho/godotenv"
	"github.com/scylladb/gocqlx/v2"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"
	"project01101000/codebase/applications/eva/server"
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

	// Create gocql cluster.
	cluster := gocql.NewCluster(os.Getenv("SCYLLA_DATABASE"))
	cluster.Keyspace = "eva"
	// Wrap session on creation, gocqlx session embeds gocql.Session pointer.
	session, err := gocqlx.WrapSession(cluster.CreateSession())
	if err != nil {
		log.Fatalf("Database session failed with error: %s", err)
	}

	srv, err := server.NewServer(ctx, session)
	if err != nil {
		log.Fatalf("NewServer failed with error: %s", err)
	}

	srv.Run()

	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt, syscall.SIGTERM)
	signal := <-sigChan
	log.Printf("shutting down eva service with signal: %s", signal)
}
