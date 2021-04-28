package bootstrap

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"path"
	"syscall"
	"time"

	"github.com/gocql/gocql"
	"github.com/joho/godotenv"
	"github.com/scylladb/gocqlx/v2"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"overdoll/libraries/helpers"
)

type Bootstrap struct {
	context   context.Context
	directory string
}

func NewBootstrap(ctx context.Context) (Bootstrap, error) {

	dir, err := helpers.GetBinaryDirectory()

	if err != nil {
		log.Fatal("error loading directory")
	}

	directory := path.Dir(*dir)

	err = godotenv.Load(directory + "/.env")

	if err != nil {
		log.Fatal("error loading .env file")
	}

	return Bootstrap{
		context:   ctx,
		directory: directory,
	}, nil
}

func (b Bootstrap) GetCurrentDirectory() string {
	return b.directory
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

	return session, nil
}

func InitializeGRPCServer(f func(server *grpc.Server)) {

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

func InitializeHttpServer(server *http.Server, shutdown func()) {

	// Start graph_api server
	log.Printf("server started on port 8080")
	go func() {
		log.Fatal(server.ListenAndServe())
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

	// Block until cancel signal is received.
	<-sig
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	log.Print("Shutting down server")

	if err := server.Shutdown(ctx); err != nil {
		shutdown()
	}
	<-ctx.Done()
	os.Exit(0)
}
