package main

import (
	"os/signal"
	"context"
	"log"
	"net/http"
	"fmt"
	"os"
	"syscall"
	"time"

	"project01101000/codebase/applications/hades/services"
	"project01101000/codebase/applications/hades/gen"
	"project01101000/codebase/applications/hades/resolvers"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/gorilla/mux"
)

const defaultPort = "8080"

func main() {
	// Load environment variables
	port := os.Getenv("GRAPH_API_PORT")
	if port == "" {
		port = defaultPort
	}
	evaSvc := os.Getenv("BOOKS_SERVICE")
	if evaSvc == "" {
		log.Fatalf("Failed to load environmet variable: %s", "BOOKS_SERVICE")
	}

	// Connect to the services
	svcs, err := services.NewServicesKeeper(services.ServicesConfig{
		EvaSvc: evaSvc,
	})
	if err != nil {
		log.Fatalf("Failed to create grpc api holder: %s", err)
	}

	// Create graphApi handlers
	router := mux.NewRouter()
	graphAPIHandler := handler.NewDefaultServer(gen.NewExecutableSchema(gen.Config{Resolvers: resolvers.NewResolver(svcs)}))
	router.Handle("/query", graphAPIHandler)

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		WriteTimeout: time.Second * 10,
		ReadTimeout:  time.Second * 10,
		Handler:      router,
	}

	// Start graph_api server
	log.Printf("Server started on http://localhost:%s/", port)
	go func() {
		log.Fatal(srv.ListenAndServe())
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

	// Block until cancel signal is received.
	<-sig
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	log.Print("Shutting down graph_api server")

	if err := srv.Shutdown(ctx); err != nil {
		log.Print(err)
	}
	<-ctx.Done()
	os.Exit(0)
}
