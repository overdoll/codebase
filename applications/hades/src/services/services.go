package services

import (
	"io"
	"log"

	evav1 "overdoll/applications/eva/proto"

	"google.golang.org/grpc"
)

type ServicesConfig struct {
	EvaSvc string
}

type services struct {
	io.Closer
	evaClientConn *grpc.ClientConn
	evaClient     evav1.EvaClient
}

type Services interface {
	Eva() evav1.EvaClient
}

func NewServicesKeeper(conf ServicesConfig) (Services, error) {
	log.Printf("Connection to Eva Service: %s...", conf.EvaSvc)
	evaConnection, err := grpc.Dial(conf.EvaSvc, grpc.WithInsecure())

	if err != nil {
		return nil, err
	}

	ah := &services{
		evaClientConn: evaConnection,
		evaClient:     evav1.NewEvaClient(evaConnection),
	}

	return ah, nil
}

func (ah *services) Eva() evav1.EvaClient {
	return ah.evaClient
}

func (ah *services) Close() error {
	err := ah.evaClientConn.Close()
	if err != nil {
		log.Printf("An error occurred while closing connection on Eva service: %s", err)
	}

	return nil
}
