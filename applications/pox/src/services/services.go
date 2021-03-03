package services

import (
	"context"
	"os"

	"google.golang.org/grpc"
	sting "overdoll/applications/sting/proto"
)

type Services interface {
	Sting() sting.StingClient
}

type Connections struct {
	sting     sting.StingClient
}

func Dial(ctx context.Context) (Services, error) {
	stingConn, err := grpc.DialContext(ctx, os.Getenv("STING_SERVICE"), grpc.WithInsecure())

	if err != nil {
		return nil, err
	}

	return &Connections{
		sting:     sting.NewStingClient(stingConn),
	}, nil
}

func (connections *Connections) Sting() sting.StingClient {
	return connections.sting
}