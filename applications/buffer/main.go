package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/aws/aws-sdk-go/service/s3"
	tusd "github.com/tus/tusd/pkg/handler"
	"github.com/tus/tusd/pkg/s3store"
	storage "overdoll/libraries/aws"
)

func main() {

	session, err := storage.CreateAWSSession()

	if err != nil {
		log.Fatalf("failed to create aws session: %s", err)
	}

	s3Client := s3.New(session)

	store := s3store.S3Store{
		Bucket:               "overdoll.processing",
		Service:              s3Client,
		TemporaryDirectory:   "temporary",
	}

	composer := tusd.NewStoreComposer()
	store.UseIn(composer)

	// Create a new HTTP handler for the tusd server by providing a configuration.
	// The StoreComposer property must be set to allow the handler to function.
	handler, err := tusd.NewHandler(tusd.Config{
		BasePath:              "/upload/",
		StoreComposer:         composer,
		NotifyCompleteUploads: true,
	})

	if err != nil {
		log.Fatalf("unable to create handler: %s", err)
	}

	// Start another goroutine for receiving events from the handler whenever
	// an upload is completed. The event will contains details about the upload
	// itself and the relevant HTTP request.
	go func() {
		for {
			event := <-handler.CompleteUploads
			fmt.Printf("Upload %s finished\n", event.Upload.ID)
		}
	}()

	http.Handle("/upload/", http.StripPrefix("/upload/", handler))

	err = http.ListenAndServe(":8080", nil)

	if err != nil {
		log.Fatalf("unable to listen: %s", err)
	}
}