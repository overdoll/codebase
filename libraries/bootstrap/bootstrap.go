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

	"github.com/gocql/gocql"
	"github.com/joho/godotenv"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/migrate"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type Bootstrap struct {
	directory string
	context   context.Context
}

func NewBootstrap(ctx context.Context, directory string) (Bootstrap, error) {

	err := godotenv.Load(directory + "/.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return Bootstrap{
		directory: directory,
		context:   ctx,
	}, nil
}

func (b Bootstrap) InitializeDatabaseSession() (gocqlx.Session, error) {

	// Create gocql cluster
	cluster := gocql.NewCluster(os.Getenv("DB_HOST"))
	cluster.Keyspace = os.Getenv("DB_KEYSPACE")

	// Wrap session on creation with gocqlx
	session, err := gocqlx.WrapSession(cluster.CreateSession())

	if err != nil {
		return session, err
	}

	if os.Getenv("RUN_MIGRATIONS_ON_STARTUP") == "true" {
		// Run migrations
		if err := migrate.Migrate(context.Background(), session, b.directory+"/migrations"); err != nil {
			return session, err
		}
	}

	return session, nil
}

func (b Bootstrap) InitializeGRPCServer(f func(server *grpc.Server)) {

	grpcServer := grpc.NewServer()

	reflection.Register(grpcServer)

	f(grpcServer)

	log.Printf("starting server on port %s", "8080")

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
	log.Print("shutting down server")
	grpcServer.GracefulStop()

	<-ctx.Done()
	os.Exit(0)
}
