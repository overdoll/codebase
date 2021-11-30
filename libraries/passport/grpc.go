package passport

import (
	"context"
	"github.com/grpc-ecosystem/go-grpc-middleware/util/metautils"
)

const (
	passportHeader = "passport"
)

func fromGrpc(ctx context.Context) (*Passport, error) {
	passportSaved := metautils.ExtractIncoming(ctx).Get(passportHeader)
	return unserializeFromString(passportSaved)
}

func toGrpc(ctx context.Context, passport *Passport) (metautils.NiceMD, error) {
	serialized, err := serializeToString(passport)
	if err != nil {
		return nil, err
	}
	return metautils.ExtractIncoming(ctx).Add(passportHeader, serialized), nil
}
