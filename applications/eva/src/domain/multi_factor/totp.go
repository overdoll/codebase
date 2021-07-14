package multi_factor

import (
	"bytes"
	"encoding/base64"
	"errors"
	"image/png"
	"time"

	"github.com/pquerna/otp"
	"github.com/pquerna/otp/totp"
)

type TOTP struct {
	secret string
}

const (
	TOTPCookieKey = "enroll-totp"
)

var (
	ErrTOTPCodeInvalid            = errors.New("TOTP code not valid")
	ErrTOTPNotConfigured          = errors.New("TOTP not configured")
	ErrRecoveryCodesNotConfigured = errors.New("recovery codes not configured")
	ErrRecoveryCodeInvalid        = errors.New("recovery code invalid")
)

// OTP will be returned from the DB as encrypted (because the getter returns it as so)
func UnmarshalTOTPFromDatabase(secret string) *TOTP {
	return &TOTP{
		secret: secret,
	}
}

func (c *TOTP) GenerateCode() (string, error) {
	key, err := totp.GenerateCode(c.secret, time.Now())

	if err != nil {
		return "", err
	}

	return key, nil
}

func (c *TOTP) ValidateCode(code string) bool {
	return totp.Validate(code, c.secret)
}

func (c *TOTP) Secret() string {
	return c.secret
}

// Image - returns an image URL that can be easily used in HTML as an image SRC (base64 encoded)
func (c *TOTP) Image() (string, error) {

	key, err := otp.NewKeyFromURL(c.secret)

	if err != nil {
		return "", err
	}

	img, err := key.Image(100, 100)

	if err != nil {
		return "", err
	}

	var buff bytes.Buffer

	if err := png.Encode(&buff, img); err != nil {
		return "", err
	}

	encodedString := base64.StdEncoding.EncodeToString(buff.Bytes())

	return "data:image/png;base64," + encodedString, nil
}

func NewTOTP(recoveryCodes []*RecoveryCode, username string) (*TOTP, error) {

	if len(recoveryCodes) == 0 {
		return nil, ErrRecoveryCodesNotConfigured
	}

	key, _ := totp.Generate(totp.GenerateOpts{
		Issuer:      "overdoll",
		AccountName: username,
	})

	return &TOTP{
		secret: key.Secret(),
	}, nil
}

// should be used when enrolling users in OTP
func EnrollTOTP(recoveryCodes []*RecoveryCode, secret, code string) (*TOTP, error) {

	if len(recoveryCodes) == 0 {
		return nil, ErrRecoveryCodesNotConfigured
	}

	if !totp.Validate(code, secret) {
		return nil, ErrTOTPCodeInvalid
	}

	return &TOTP{
		secret: secret,
	}, nil
}
