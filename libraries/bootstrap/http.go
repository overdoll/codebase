package bootstrap

import (
	"context"
	"go.uber.org/zap"
	"net/http"
	"os"
	"os/signal"
	"overdoll/libraries/errors"
	"overdoll/libraries/sentry_support"
	"syscall"
	"time"
)

func InitializeHttpServer(addr string, handler http.Handler, shutdown func()) {

	sentry_support.SetServerType("http")

	server := &http.Server{
		Addr:         addr,
		WriteTimeout: time.Second * 10,
		ReadTimeout:  time.Second * 10,
		Handler:      handler,
	}

	// Start graph_api server
	zap.S().Infof("starting http server on %s", server.Addr)
	go func() {
		if err := server.ListenAndServe(); err != nil {
			if err != http.ErrServerClosed {
				sentry_support.MustCaptureException(errors.Wrap(err, "failed to serve http server"))
				zap.S().Fatalw("failed to serve http server", zap.Error(err))
			}
		}
	}()

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, os.Interrupt, syscall.SIGTERM)

	// Block until cancel signal is received.
	<-sig
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	zap.S().Info("shutting down http server")

	if err := server.Shutdown(ctx); err != nil {
		shutdown()
	}
	<-ctx.Done()
	os.Exit(0)
}
