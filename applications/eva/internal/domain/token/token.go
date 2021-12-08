package token

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"golang.org/x/crypto/nacl/secretbox"
	"io"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/passport"
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

	token  string
	secret string

	location *location.Location
}

const (
	OTPKey = "otp-key"
)

var (
	ErrTokenNotVerified = errors.New("token is not yet verified")
	ErrTokenNotFound    = errors.New("token not found")
)

func NewAuthenticationToken(email string, location *location.Location, pass *passport.Passport) (*AuthenticationToken, error) {

	secretKeyBytes := make([]byte, 64)
	_, err := rand.Read(secretKeyBytes)
	if err != nil {
		return nil, err
	}

	secretKeyEncoded := hex.EncodeToString(secretKeyBytes)

	var secretKey [32]byte
	copy(secretKey[:], secretKeyBytes)

	var nonce [24]byte
	if _, err := io.ReadFull(rand.Reader, nonce[:]); err != nil {
		return nil, err
	}

	properEmail := strings.ToLower(email)

	// seal the email related to this authentication token, if one exists
	// the secret is saved in the state and will be discarded once GetSecretAndDispose is called
	// the email is also discarded, since it's also required as part of the email sending

	// when we decrypt it, we will know the email on the other end, and will be able to determine if an account belongs to
	// this token
	encrypted := secretbox.Seal(nonce[:], []byte(properEmail), &nonce, &secretKey)

	ck := &AuthenticationToken{
		token:      string(encrypted),
		secret:     secretKeyEncoded,
		expiration: time.Minute * 15,
		email:      properEmail,
		verified:   false,
		userAgent:  pass.UserAgent(),
		deviceId:   pass.DeviceID(),
		location:   location,
		ip:         pass.IP(),
	}

	return ck, nil
}

func UnmarshalAuthenticationTokenFromDatabase(token, email string, verified bool, userAgent, ip, deviceId string, location *location.Location) *AuthenticationToken {
	return &AuthenticationToken{
		ip:         ip,
		token:      token,
		email:      email,
		verified:   verified,
		deviceId:   deviceId,
		userAgent:  userAgent,
		location:   location,
		expiration: time.Minute * 15,
	}
}

func (c *AuthenticationToken) Token() string {
	return c.token
}

func (c *AuthenticationToken) Email(pass *passport.Passport) (string, error) {

	if !c.CanViewAccountEmail(pass) {
		return "", errors.New("cannot view email. token not verified or devices are mismatched")
	}

	return c.email, nil
}

func (c *AuthenticationToken) SameDevice(pass *passport.Passport) bool {
	return pass.DeviceID() == c.deviceId
}

func (c *AuthenticationToken) IP() string {
	return c.ip
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

func (c *AuthenticationToken) CanViewAccountEmail(pass *passport.Passport) bool {
	return c.verified && c.SameDevice(pass)
}

func (c *AuthenticationToken) Verified() bool {
	return c.verified
}

// MakeVerified the original secret is required to verify the token
func (c *AuthenticationToken) MakeVerified(secret string) error {

	secretKeyBytes, err := hex.DecodeString(secret)
	if err != nil {
		return err
	}

	var secretKey [32]byte
	copy(secretKey[:], secretKeyBytes)

	var decryptNonce [24]byte
	copy(decryptNonce[:], c.token[:24])

	decrypted, ok := secretbox.Open(nil, []byte(c.token[24:]), &decryptNonce, &secretKey)
	if !ok {
		return err
	}

	c.verified = true
	c.email = string(decrypted)

	return nil
}

// GetSecretWithEmailAndDispose - the secret stored for the encryption is not stored anywhere
// after grabbing it once and only once (for the purpose of sending the email), it will be discarded from the state

// next time, you can only view the email once you get the secret again
func (c *AuthenticationToken) GetSecretWithEmailAndDispose() (string, string, error) {

	if c.verified {
		return "", "", errors.New("already verified. cannot dispose")
	}

	secret := c.secret
	c.secret = ""

	email := c.email
	c.email = ""
	return secret, email, nil
}
