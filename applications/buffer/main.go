package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/aws/aws-sdk-go/service/s3"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	storage "overdoll/libraries/aws"
	"overdoll/libraries/bootstrap"
)

func main() {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	_, err := bootstrap.NewBootstrap(ctx)

	if err != nil {
		log.Fatalf("failed to bootstrap server: %s", err)
	}

	session, err := storage.CreateAWSSession()

	if err != nil {
		log.Fatalf("failed to create aws session: %s", err)
	}

	s3Client := s3.New(session)

	store := s3store.S3Store{
		Bucket:             "overdoll-processing",
		Service:            s3Client,
		TemporaryDirectory: "temporary",
		MaxObjectSize:      10000000,
	}

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	// Create a new HTTP handler for the tusd server by providing a configuration.
	// The StoreComposer property must be set to allow the handler to function.
	handler, err := tusd.NewHandler(tusd.Config{
		BasePath:              "/api/upload/",
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
	})

	if err != nil {
		log.Fatalf("unable to create handler: %s", err)
	}

	mux := http.NewServeMux()

	mux.Handle("/api/upload/", http.StripPrefix("/api/upload/", handler))

	srv := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()
	log.Printf("server started on port %s", "8080")

	<-done
	log.Print("server stopped")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer func() {
		// extra handling here
		cancel()
	}()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("server shutdown failed:%+v", err)
	}
}
