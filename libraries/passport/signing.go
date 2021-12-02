package passport

import (
	"crypto/hmac"
	"crypto/sha256"
	"errors"
	"github.com/golang/protobuf/proto"
	"os"

	libraries_passport_v1 "overdoll/libraries/passport/proto"
)

var (
	errInvalidSignature = errors.New("invalid passport signature")
)

func signPassport(signatureTarget *libraries_passport_v1.Passport) error {

	target := &libraries_passport_v1.Passport{
		Account:    signatureTarget.Account,
		Header:     signatureTarget.Header,
		DeviceInfo: signatureTarget.DeviceInfo,
		Actions:    signatureTarget.Actions,
	}

	msg, err := proto.Marshal(target)

	if err != nil {
		return err
	}

	// Create a new HMAC by defining the hash type and the key (as byte array)
	h := hmac.New(sha256.New, []byte(os.Getenv("PASSPORT_SECRET")))

	// Write Data to it
	h.Write(msg)

	signatureTarget.Integrity = &libraries_passport_v1.Integrity{
		Version:   0,
		Signature: h.Sum(nil),
	}

	return nil
}

func verifySignature(p *libraries_passport_v1.Passport) error {

	// verify signature
	signature := p.Integrity.Signature

	if err := signPassport(p); err != nil {
		return err
	}

	if !hmac.Equal(p.Integrity.Signature, signature) {
		return errInvalidSignature
	}

	return nil
}
