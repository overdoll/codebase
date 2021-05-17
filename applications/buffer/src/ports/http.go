package ports

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/bmizerany/pat"
	tusd "github.com/tus/tusd/pkg/handler"
	"overdoll/applications/buffer/src/app"
)

type HttpServer struct {
	app app.Application
}

func NewHttpServer(app app.Application) *http.Server {
	httpServer := &HttpServer{app: app}

	mx := http.NewServeMux()
	// Set up routes
	mx.Handle("/api/uploads/", http.StripPrefix("/api/uploads/", httpServer.HandleUpload()))
	mx.Handle("/api/upload/", http.StripPrefix("/api/upload/", httpServer.HandleTUS()))

	return &http.Server{
		Addr:    ":8000",
		Handler: mx,
	}
}

func (h *HttpServer) HandleUpload() http.Handler {
	uploadsHandler := pat.New()

	// Handle upload
	uploadsHandler.Get(":user/:file", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user := r.URL.Query().Get(":user")
		file := r.URL.Query().Get(":file")

		key := user + "/" + file

		cookie, _ := r.Cookie("session")

		output, err := h.app.Queries.GetFile.Handle(r.Context(), cookie.Value, user, file)

		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		buff, buffErr := ioutil.ReadAll(output)

		if buffErr != nil {
			fmt.Println(buffErr)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		reader := bytes.NewReader(buff)

		http.ServeContent(w, r, key, time.Now(), reader)
		return
	}))

	return uploadsHandler
}

func (h *HttpServer) HandleTUS() *tusd.Handler {

	handler, err := h.app.Commands.HandleUpload.Handle(context.Background())

	if err != nil {
		log.Fatal(err)
	}

	return handler
}
