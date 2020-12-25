package services

import (
	"io"
	"log"

	evav1 "project01101000/codebase/applications/eva/proto"

	"google.golang.org/grpc"
)

type ServicesConfig struct {
	EvaSvc string
}

type services struct {
	io.Closer
	evaClientConn *grpc.ClientConn
	evaClient     evav1.EvaAPIClient
}

type Services interface {
	Eva() evav1.EvaAPIClient
}

func NewServicesKeeper(conf ServicesConfig) (Services, error) {
	log.Printf("Connection to Eva Service: %s...", conf.EvaSvc)
	evaConnection, err := grpc.Dial(conf.EvaSvc, grpc.WithInsecure())

	if err != nil {
		return nil, err
	}

	ah := &services{
		evaClientConn: evaConnection,
		evaClient:     evav1.NewEvaAPIClient(evaConnection),
	}
	return ah, nil
}

func (ah *services) Eva() evav1.EvaAPIClient {
	return ah.evaClient
}

func (ah *services) Close() error {
	err := ah.evaClientConn.Close()
	if err != nil {
		log.Printf("An error occurred while closing connection on Eva service: %s", err)
	}

	return nil
}
