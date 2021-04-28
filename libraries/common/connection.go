package common

import (
	"context"
	"os"

	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
)

func NewEvaClient(ctx context.Context) (eva.EvaClient, func()) {
	evaConnection, err := grpc.DialContext(ctx, os.Getenv("EVA_SERVICE"), grpc.WithInsecure())

	if err != nil {
		panic(err)
	}

	return eva.NewEvaClient(evaConnection), func() {
		_ = evaConnection.Close()
	}
}
