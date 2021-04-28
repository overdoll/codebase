package main

import (
	"context"

	"overdoll/applications/buffer/src/ports"
	"overdoll/applications/buffer/src/service"
	"overdoll/libraries/bootstrap"
)

func main() {

	ctx := context.Background()

	app, cleanup := service.NewApplication(ctx)

	srv := ports.NewHttpServer(app)

	bootstrap.InitializeHttpServer(srv, func() {
		cleanup()
	})
}
