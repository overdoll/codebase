package account

import (
	"bytes"
	"encoding/base64"
	"github.com/pquerna/otp"
	"go.uber.org/zap"
	"image/png"
	"net/url"
	"overdoll/libraries/crypt"
	"overdoll/libraries/errors/domainerror"
	"strconv"
	"time"

	"github.com/pquerna/otp/totp"
	"overdoll/libraries/principal"
)

type TOTP struct {
	secret string
	name   string
	// id is basically encrypted secret
	id string
}

const (
	issuer = "overdoll"
)

var (
	ErrTOTPCodeInvalid            = domainerror.NewValidation("TOTP code not valid")
	ErrTOTPNotConfigured          = domainerror.NewValidation("TOTP not configured")
	ErrRecoveryCodesNotConfigured = domainerror.NewValidation("recovery codes not configured")
	ErrRecoveryCodeInvalid        = domainerror.NewValidation("recovery code invalid")
)

// UnmarshalTOTPFromDatabase OTP will be returned from the DB as encrypted (because the getter returns it as so)
func UnmarshalTOTPFromDatabase(secret string) *TOTP {

	val, err := crypt.Encrypt(secret)

	if err != nil {
		zap.S().Panicw("failed to unmarshal totp", zap.Error(err))
	}

	return &TOTP{
		secret: secret,
		name:   "",
		id:     val,
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

func (c *TOTP) ID() string {
	return c.id
}

// Image - returns an image URL that can be easily used in HTML as an image SRC (base64 encoded)
func (c *TOTP) Image() (string, error) {

	v := url.Values{}
	v.Set("secret", c.secret)
	v.Set("issuer", issuer)
	v.Set("period", strconv.FormatUint(uint64(30), 10))
	v.Set("algorithm", otp.AlgorithmSHA1.String())
	v.Set("digits", otp.DigitsSix.String())

	u := url.URL{
		Scheme:   "otpauth",
		Host:     "totp",
		Path:     "/" + issuer + ":" + c.name,
		RawQuery: v.Encode(),
	}

	key, err := otp.NewKeyFromURL(u.String())

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

	key, err := totp.Generate(totp.GenerateOpts{
		Issuer:      issuer,
		AccountName: username,
	})

	if err != nil {
		return nil, err
	}

	val, err := crypt.Encrypt(key.Secret())

	if err != nil {
		return nil, err
	}

	return &TOTP{
		secret: key.Secret(),
		name:   username,
		id:     val,
	}, nil
}

// EnrollTOTP should be used when enrolling users in OTP
func EnrollTOTP(recoveryCodes []*RecoveryCode, id, code string) (*TOTP, error) {

	secret, err := crypt.Decrypt(id)

	if err != nil {
		return nil, err
	}

	if len(recoveryCodes) == 0 {
		return nil, ErrRecoveryCodesNotConfigured
	}

	if !totp.Validate(code, secret) {
		return nil, ErrTOTPCodeInvalid
	}

	return &TOTP{
		secret: secret,
		name:   "",
		id:     id,
	}, nil
}

func CanCreateTOTPForAccount(requester *principal.Principal, acc *Account) error {

	if requester.IsDeleting() {
		return principal.ErrNotAuthorized
	}

	if err := requester.BelongsToAccount(acc.id); err != nil {
		return err
	}

	return nil
}

func CanDeleteTOTPForAccount(requester *principal.Principal, acc *Account) error {

	if requester.IsDeleting() {
		return principal.ErrNotAuthorized
	}

	if err := requester.BelongsToAccount(acc.id); err != nil {
		return err
	}

	return nil
}
