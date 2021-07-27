package ports

import (
	"context"
	"log"
	"net/http"

	"overdoll/applications/buffer/internal/app"

	tusd "github.com/tus/tusd/pkg/handler"
)

type HttpServer struct {
	app app.Application
}

func NewHttpServer(app app.Application) *http.ServeMux {
	httpServer := &HttpServer{app: app}

	mx := http.NewServeMux()
	// Set up routes
	mx.Handle("/api/upload/", http.StripPrefix("/api/upload/", httpServer.HandleTUS()))

	return mx
}

func (h *HttpServer) HandleTUS() *tusd.Handler {

	handler, err := h.app.Commands.HandleUpload.Handle(context.Background())

	if err != nil {
		log.Fatal(err)
	}

	return handler
}
