package services

import (
	"context"
	"os"

	eva "overdoll/applications/eva/proto"
	sting "overdoll/applications/sting/proto"

	"google.golang.org/grpc"
)

type Services interface {
	Sting() sting.StingClient
	Eva() eva.EvaClient
}

type Connections struct {
	sting sting.StingClient
	eva   eva.EvaClient
}

func Dial(ctx context.Context) (Services, error) {
	stingConn, err := grpc.DialContext(ctx, os.Getenv("STING_SERVICE"), grpc.WithInsecure())

	if err != nil {
		return nil, err
	}

	evaConnection, err := grpc.DialContext(ctx, os.Getenv("EVA_SERVICE"), grpc.WithInsecure())

	if err != nil {
		return nil, err
	}

	return &Connections{
		sting: sting.NewStingClient(stingConn),
		eva:   eva.NewEvaClient(evaConnection),
	}, nil
}

func (connections *Connections) Sting() sting.StingClient {
	return connections.sting
}

func (connections *Connections) Eva() eva.EvaClient {
	return connections.eva
}
