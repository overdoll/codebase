package passport

import (
	"encoding/base64"
	"github.com/golang/protobuf/proto"
	"overdoll/libraries/errors"
	libraries_passport_v1 "overdoll/libraries/passport/proto"
)

func unmarshalPassport(marshal []byte) (*Passport, error) {

	var msg libraries_passport_v1.Passport

	if err := proto.Unmarshal(marshal, &msg); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal passport")
	}

	if err := verifyPassport(&msg); err != nil {
		return nil, err
	}

	return &Passport{passport: &msg}, nil
}

func marshalPassport(p *Passport) ([]byte, error) {

	msg, err := proto.Marshal(p.passport)

	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal passport")
	}

	return msg, nil
}

func unserializeFromString(raw string) (*Passport, error) {

	if raw == "" {
		return nil, nil
	}

	sDec, err := base64.RawURLEncoding.DecodeString(raw)

	if err != nil {
		return nil, errors.Wrap(err, "failed to decode string")
	}

	return unmarshalPassport(sDec)
}

func serializeToString(p *Passport) (string, error) {

	msg, err := marshalPassport(p)

	if err != nil {
		return "", err
	}

	return base64.RawURLEncoding.EncodeToString(msg), nil
}
