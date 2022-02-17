package ccbill

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"github.com/golang/protobuf/proto"
	"golang.org/x/crypto/nacl/secretbox"
	"io"
	"os"
	hades "overdoll/applications/hades/proto"
)

func encryptCCBillPayment(payment *hades.CCBillPayment) (*string, error) {

	secretKeyBytes := []byte(os.Getenv("OVERDOLL_CCBILL_PAYMENT_LINK_SECRET"))

	var secretKey [32]byte
	copy(secretKey[:], secretKeyBytes)

	var nonce [24]byte
	if _, err := io.ReadFull(rand.Reader, nonce[:]); err != nil {
		return nil, err
	}

	data, err := proto.Marshal(payment)
	if err != nil {
		return nil, err
	}

	// seal encrypted ccbill payment link
	encrypted := secretbox.Seal(nonce[:], data, &nonce, &secretKey)
	encryptedEncoded := hex.EncodeToString(encrypted)

	return &encryptedEncoded, nil
}

func DecryptCCBillPayment(content string) (*hades.CCBillPayment, error) {

	secretKeyBytes := []byte(os.Getenv("OVERDOLL_CCBILL_PAYMENT_LINK_SECRET"))

	contentBytes, err := hex.DecodeString(content)
	if err != nil {
		return nil, err
	}

	var secretKey [32]byte
	copy(secretKey[:], secretKeyBytes)

	var decryptNonce [24]byte
	copy(decryptNonce[:], contentBytes[:24])

	decrypted, ok := secretbox.Open(nil, contentBytes[24:], &decryptNonce, &secretKey)
	if !ok {
		return nil, errors.New("invalid secret or failure")
	}

	newPaymentMessage := &hades.CCBillPayment{}
	err = proto.Unmarshal(decrypted, newPaymentMessage)
	if err != nil {
		panic(err)
	}

	return newPaymentMessage, nil
}
