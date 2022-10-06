package token

import (
	"crypto/rand"
	"encoding/hex"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/nacl/secretbox"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
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
	method    Method

	ip string

	token  string
	secret string

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

// Characters that are allowed to show up in our random string
const allowedCodeCharacters = "0123456789abcdefghijklmnopqrstuvwxyz"

// how long is each code
const codeLength = 6

func generateTokenKey() (string, error) {
	tokenKeyBytes := make([]byte, 64)
	_, err := rand.Read(tokenKeyBytes)
	if err != nil {
		return "", errors.Wrap(err, "failed to create new token key")
	}

	return hex.EncodeToString(tokenKeyBytes), nil
}

func NewAuthenticationTokenCode(email string, location *location.Location, pass *passport.Passport) (*AuthenticationToken, *TemporaryState, error) {

	properEmail := strings.ToLower(email)

	if err := validateEmail(email); err != nil {
		return nil, nil, err
	}

	bytes := make([]byte, codeLength)

	if _, err := rand.Read(bytes); err != nil {
		return nil, nil, err
	}

	for i, b := range bytes {
		bytes[i] = allowedCodeCharacters[b%byte(len(allowedCodeCharacters))]
	}

	tokenKeyEncoded, err := generateTokenKey()
	if err != nil {
		return nil, nil, err
	}

	secret := string(bytes)

	ck := &AuthenticationToken{
		token:      tokenKeyEncoded,
		expiration: time.Minute * 10,
		email:      properEmail,
		secret:     secret,
		verified:   false,
		userAgent:  pass.UserAgent(),
		deviceId:   pass.DeviceID(),
		location:   location,
		ip:         pass.IP(),
		uniqueId:   uuid.New().String(),
		method:     Code,
	}

	t := &TemporaryState{
		email:  properEmail,
		secret: secret,
	}

	return ck, t, nil
}

func NewAuthenticationTokenMagicLink(email string, location *location.Location, pass *passport.Passport) (*AuthenticationToken, *TemporaryState, error) {

	properEmail := strings.ToLower(email)

	if err := validateEmail(email); err != nil {
		return nil, nil, err
	}

	secretKeyBytes := make([]byte, 64)
	_, err := rand.Read(secretKeyBytes)
	if err != nil {
		return nil, nil, errors.Wrap(err, "failed to create new secret key")
	}

	secretKeyEncoded := hex.EncodeToString(secretKeyBytes)

	tokenKeyEncoded, err := generateTokenKey()
	if err != nil {
		return nil, nil, err
	}

	ck := &AuthenticationToken{
		token:      tokenKeyEncoded,
		secret:     secretKeyEncoded,
		expiration: time.Minute * 10,
		email:      properEmail,
		verified:   false,
		userAgent:  pass.UserAgent(),
		deviceId:   pass.DeviceID(),
		location:   location,
		ip:         pass.IP(),
		uniqueId:   uuid.New().String(),
		method:     MagicLink,
	}

	t := &TemporaryState{
		email:  properEmail,
		secret: secretKeyEncoded,
	}

	return ck, t, nil
}

func UnmarshalAuthenticationTokenFromDatabase(token, email string, verified bool, userAgent, ip, deviceId string, location *location.Location, uniqueId, secret string, method Method) *AuthenticationToken {
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
		secret:     secret,
		method:     method,
	}
}

func (c *AuthenticationToken) Token() string {
	return c.token
}

func (c *AuthenticationToken) Method() Method {
	return c.method
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

	secret = strings.ToLower(secret)

	if c.verified {
		return ErrAlreadyVerified
	}

	if c.email == "" {

		decrypted, err := decryptBox(c.token, secret)

		if err != nil {
			return err
		}

		c.email = decrypted
	} else {
		if c.secret != secret {
			return ErrInvalidSecret
		}
	}

	c.verified = true

	return nil
}

func (c *AuthenticationToken) ViewEmailWithSecret(secret string) (string, error) {

	secret = strings.ToLower(secret)

	if !c.verified {
		return "", ErrNotVerified
	}

	if c.secret == "" {

		_, err := decryptBox(c.token, secret)

		if err != nil {
			return "", err
		}

	} else {
		if c.secret != secret {
			return "", ErrInvalidSecret
		}
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
		if c.secret == "" {

			_, err := decryptBox(c.token, *secret)

			if err != nil {
				return err
			}

		} else {
			if c.secret != *secret {
				return ErrInvalidSecret
			}
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
