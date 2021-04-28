package common

import (
	"context"
	"os"

	"google.golang.org/grpc"
	eva "overdoll/applications/eva/proto"
)

func NewEvaConnection(ctx context.Context) (EvaGrpc, func()) {
	evaConnection, err := grpc.DialContext(ctx, os.Getenv("EVA_SERVICE"), grpc.WithInsecure())

	if err != nil {
		panic(err)
	}

	return NewEvaGrpc(eva.NewEvaClient(evaConnection)), func() {
		_ = evaConnection.Close()
	}
}
