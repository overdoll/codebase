package passport

import (
	"encoding/hex"
	"github.com/golang/protobuf/proto"
	libraries_passport_v1 "overdoll/libraries/passport/proto"
)

func unmarshalPassport(marshal []byte) (*Passport, error) {

	var msg libraries_passport_v1.Passport

	if err := proto.Unmarshal(marshal, &msg); err != nil {
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

	sDec, err := hex.DecodeString(raw)

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

	return hex.EncodeToString(msg), nil
}
