package token

import (
	"crypto/rand"
	"encoding/hex"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/nacl/secretbox"
	"io"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/domainerror"
	"overdoll/libraries/errors"
	"overdoll/libraries/passport"
	"overdoll/libraries/uuid"
	"strings"
	"time"
)

type AuthenticationToken struct {
	email string

	verified   bool
	expiration time.Duration

	deviceId string

	userAgent string

	ip string

	token string

	location *location.Location

	uniqueId string
}

var (
	ErrAlreadyVerified = domainerror.NewValidation("token already verified")
	ErrNotVerified     = domainerror.NewValidation("token not yet verified")
	ErrInvalidSecret   = domainerror.NewValidation("token secret is invalid")
	ErrTokenNotFound   = domainerror.NewValidation("token not found")
	ErrInvalidDevice   = domainerror.NewValidation("token viewed or used on an invalid device")
)

func NewAuthenticationToken(email string, location *location.Location, pass *passport.Passport) (*AuthenticationToken, *TemporaryState, error) {

	secretKeyBytes := make([]byte, 64)
	_, err := rand.Read(secretKeyBytes)
	if err != nil {
		return nil, nil, errors.Wrap(err, "failed to create new secret key")
	}

	secretKeyEncoded := hex.EncodeToString(secretKeyBytes)

	var secretKey [32]byte
	copy(secretKey[:], secretKeyBytes)

	var nonce [24]byte
	if _, err := io.ReadFull(rand.Reader, nonce[:]); err != nil {
		return nil, nil, errors.Wrap(err, "failed to create nonce")
	}

	properEmail := strings.ToLower(email)

	if err := validateEmail(email); err != nil {
		return nil, nil, err
	}

	// seal the email related to this authentication token, if one exists
	// the secret is saved in the state and will be discarded once GetSecretAndDispose is called
	// the email is also discarded, since it's also required as part of the email sending

	// when we decrypt it, we will know the email on the other end, and will be able to determine if an account belongs to
	// this token
	encrypted := secretbox.Seal(nonce[:], []byte(properEmail), &nonce, &secretKey)
	encryptedEncoded := hex.EncodeToString(encrypted)

	ck := &AuthenticationToken{
		token:      encryptedEncoded,
		expiration: time.Minute * 15,
		email:      "",
		verified:   false,
		userAgent:  pass.UserAgent(),
		deviceId:   pass.DeviceID(),
		location:   location,
		ip:         pass.IP(),
		uniqueId:   uuid.New().String(),
	}

	t := &TemporaryState{
		email:  properEmail,
		secret: secretKeyEncoded,
	}

	return ck, t, nil
}

func UnmarshalAuthenticationTokenFromDatabase(token, email string, verified bool, userAgent, ip, deviceId string, location *location.Location, uniqueId string) *AuthenticationToken {
	return &AuthenticationToken{
		ip:         ip,
		token:      token,
		email:      email,
		verified:   verified,
		deviceId:   deviceId,
		userAgent:  userAgent,
		location:   location,
		expiration: time.Minute * 15,
		uniqueId:   uniqueId,
	}
}

func (c *AuthenticationToken) Token() string {
	return c.token
}

func (c *AuthenticationToken) SameDevice(pass *passport.Passport) bool {
	return pass.DeviceID() == c.deviceId
}

func (c *AuthenticationToken) IP() string {
	return c.ip
}

func (c *AuthenticationToken) UniqueId() string {
	return c.uniqueId
}

func (c *AuthenticationToken) IsSecure(pass *passport.Passport) bool {
	return c.ip == pass.IP()
}

func (c *AuthenticationToken) Expiration() time.Duration {
	return c.expiration
}

func (c *AuthenticationToken) UserAgent() string {
	return c.userAgent
}

func (c *AuthenticationToken) Location() *location.Location {
	return c.location
}

func (c *AuthenticationToken) DeviceId() string {
	return c.deviceId
}

func (c *AuthenticationToken) Verified() bool {
	return c.verified
}

// MakeVerified the original secret is required to verify the token
func (c *AuthenticationToken) MakeVerified(secret string) error {

	if c.verified {
		return ErrAlreadyVerified
	}

	decrypted, err := decryptBox(c.token, secret)

	if err != nil {
		return err
	}

	c.verified = true
	c.email = decrypted

	return nil
}

func (c *AuthenticationToken) ViewEmailWithSecret(secret string) (string, error) {

	if !c.verified {
		return "", ErrNotVerified
	}

	_, err := decryptBox(c.token, secret)

	if err != nil {
		return "", err
	}

	return c.email, nil
}

func (c *AuthenticationToken) ViewEmailWithPassport(pass *passport.Passport) (string, error) {

	if !c.verified {
		return "", ErrNotVerified
	}

	if !c.SameDevice(pass) {
		return "", ErrInvalidDevice
	}

	return c.email, nil
}

func (c *AuthenticationToken) CanView(pass *passport.Passport, secret *string) error {
	return c.CanDelete(pass, secret)
}

func (c *AuthenticationToken) CanDelete(pass *passport.Passport, secret *string) error {

	if secret != nil {
		_, err := decryptBox(c.token, *secret)

		if err != nil {
			return err
		}

		return nil
	}

	if !c.SameDevice(pass) {
		return ErrInvalidDevice
	}

	return nil
}

func decryptBox(content, secret string) (string, error) {

	secretKeyBytes, err := hex.DecodeString(secret)
	if err != nil {
		return "", errors.Wrap(err, "failed to decode string")
	}

	contentBytes, err := hex.DecodeString(content)
	if err != nil {
		return "", errors.Wrap(err, "failed to decode string")
	}

	var secretKey [32]byte
	copy(secretKey[:], secretKeyBytes)

	var decryptNonce [24]byte
	copy(decryptNonce[:], contentBytes[:24])

	decrypted, ok := secretbox.Open(nil, contentBytes[24:], &decryptNonce, &secretKey)
	if !ok {
		return "", ErrInvalidSecret
	}

	return string(decrypted), nil
}

func validateEmail(email string) error {
	err := validator.New().Var(email, "required,email")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
