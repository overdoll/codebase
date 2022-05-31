package confirm_email

import (
	"github.com/go-playground/validator/v10"
	"overdoll/libraries/crypt"
	"overdoll/libraries/domainerror"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
	"strings"
	"time"
)

type ConfirmEmail struct {
	id        string
	accountId string
	email     string

	confirmed bool

	expires time.Duration
}

func UnmarshalConfirmEmailFromDatabase(id, email, accountId string) *ConfirmEmail {
	return &ConfirmEmail{
		id:        id,
		email:     email,
		confirmed: false,
		accountId: accountId,
		expires:   time.Minute * 10,
	}
}

func NewConfirmEmail(accountId, email string) (*ConfirmEmail, string, error) {

	secret, err := crypt.Encrypt(email)

	if err != nil {
		return nil, "", err
	}

	if err := validateEmail(email); err != nil {
		return nil, "", err
	}

	return &ConfirmEmail{
		id:        uuid.New().String(),
		accountId: accountId,
		confirmed: false,
		email:     strings.ToLower(email),
		expires:   time.Minute * 10,
	}, secret, nil
}

func (c *ConfirmEmail) Email() string {
	return c.email
}

func (c *ConfirmEmail) ConfirmEmail(requester *principal.Principal, secret string) error {

	// make sure original account is the same
	if err := requester.BelongsToAccount(c.accountId); err != nil {
		return err
	}

	resultEmail, err := crypt.Decrypt(secret)

	if err != nil {
		return err
	}

	if resultEmail != c.email {
		return domainerror.NewValidation("invalid secret")
	}

	c.confirmed = true

	return nil
}

func (c *ConfirmEmail) CanDelete(requester *principal.Principal) error {

	// make sure original account is the same
	if err := requester.BelongsToAccount(c.accountId); err != nil {
		return err
	}

	return nil
}

func (c *ConfirmEmail) ID() string {
	return c.id
}

func (c *ConfirmEmail) AccountId() string {
	return c.accountId
}

func (c *ConfirmEmail) Expires() time.Duration {
	return c.expires
}

func validateEmail(email string) error {
	err := validator.New().Var(email, "required,email")

	if err != nil {
		return domainerror.NewValidation(err.Error())
	}

	return nil
}
