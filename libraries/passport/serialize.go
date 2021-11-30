package passport

import (
	"encoding/base64"
	"github.com/golang/protobuf/proto"
	"go.uber.org/zap"
	libraries_passport_v1 "overdoll/libraries/passport/proto"
)

func unserializeFromString(raw string) (*Passport, error) {

	if raw == "" {
		return nil, nil
	}

	sDec, err := base64.StdEncoding.DecodeString(raw)

	if err != nil {
		return nil, err
	}

	var msg libraries_passport_v1.Passport

	err = proto.Unmarshal(sDec, &msg)

	if err != nil {
		zap.S().Errorf("could not unmarshal passport proto: %s", err)
		return nil, err
	}

	return &Passport{passport: &msg}, nil

}

func serializeToString(p *Passport) (string, error) {

	msg, err := proto.Marshal(p.passport)

	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(msg), nil
}
