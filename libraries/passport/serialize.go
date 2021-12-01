package passport

import (
	"encoding/base64"
	"github.com/golang/protobuf/proto"
	"go.uber.org/zap"
	libraries_passport_v1 "overdoll/libraries/passport/proto"
)

func unmarshalPassport(marshal []byte) (*Passport, error) {

	var msg libraries_passport_v1.Passport

	if err := proto.Unmarshal(marshal, &msg); err != nil {
		zap.S().Errorf("could not unmarshal passport proto: %s", err)
		return nil, err
	}

	if err := verifyPassport(&msg); err != nil {
		return nil, err
	}

	return &Passport{passport: &msg}, nil
}

func marshalPassport(p *Passport) ([]byte, error) {

	msg, err := proto.Marshal(p.passport)

	if err != nil {
		return nil, err
	}

	return msg, nil
}

func unserializeFromString(raw string) (*Passport, error) {

	if raw == "" {
		return nil, nil
	}

	sDec, err := base64.StdEncoding.DecodeString(raw)

	if err != nil {
		return nil, err
	}

	return unmarshalPassport(sDec)
}

func serializeToString(p *Passport) (string, error) {

	msg, err := marshalPassport(p)

	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(msg), nil
}
