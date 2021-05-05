package bootstrap

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func InitializeHttpServer(server *http.Server, shutdown func()) {

	// Start graph_api server
	log.Printf("http server started on %s", server.Addr)
	go func() {
		log.Fatal(server.ListenAndServe())
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

	// Block until cancel signal is received.
	<-sig
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()
	log.Print("shutting down http server")

	if err := server.Shutdown(ctx); err != nil {
		shutdown()
	}
	<-ctx.Done()
	os.Exit(0)
}
