package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"overdoll/applications/buffer/src/ports"
	"overdoll/applications/buffer/src/service"
)

func main() {

	ctx := context.Background()

	app, cleanup := service.NewApplication(ctx)

	srv := ports.NewHttpServer(app)

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

	defer func() {
		// extra handling here
		cleanup()
	}()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("server shutdown failed:%+v", err)
	}
}
