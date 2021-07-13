package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/go-redis/redis/v8"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/crypt"
	"overdoll/libraries/passport"
)

type EmailByAccount struct {
	Email     string `db:"email"`
	AccountId string `db:"account_id"`
	Status    int    `db:"status"`
}

type EmailConfirmation struct {
	Email string `json:"email"`
}

const (
	ConfirmEmailPrefix = "emailConfirm:"
)

// AddAccountEmail - add an email to the account
func (r AccountRepository) AddAccountEmail(ctx context.Context, acc *account.Account, confirm *account.EmailConfirmation) error {

	// check to make sure this email is not taken
	existingAcc, err := r.GetAccountByEmail(ctx, confirm.Email())

	if err != nil && err != account.ErrAccountNotFound {
		return err
	}

	if existingAcc != nil {
		return account.ErrEmailNotUnique
	}

	authCookie := &EmailConfirmation{
		Email: confirm.Email(),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return err
	}

	valReal := crypt.Encrypt(string(val))

	ok, err := r.client.SetNX(ctx, ConfirmEmailPrefix+confirm.ID(), valReal, confirm.Expires()).Result()

	if err != nil {
		return err
	}

	if !ok {
		return errors.New("duplicate key")
	}

	// create a unique email
	if err := r.createUniqueAccountEmail(ctx, acc, confirm.Email()); err != nil {
		return err
	}

	insertEmailByAccount := qb.Insert("emails_by_account").
		Columns("email", "account_id", "status").
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(EmailByAccount{
			Email:     confirm.Email(),
			AccountId: acc.ID(),
			Status:    0,
		})

	if err := insertEmailByAccount.ExecRelease(); err != nil {
		return r.deleteAccountEmail(ctx, acc, confirm.Email())
	}

	return nil
}

// GetEmailConfirmationByEmail - a method that is used to get the email confirmation ID by only passing the email
// NOTE: this should only be used in tests! This is here purely because it is used for testing and any future
// changes to how email confirmations will work would make this change easier
func (r AccountRepository) GetEmailConfirmationByEmail(ctx context.Context, email string) (string, error) {
	keys, err := r.client.Keys(ctx, ConfirmEmailPrefix+"*").Result()

	if err != nil {
		return "", err
	}

	for _, key := range keys {

		// get each key's value
		val, err := r.client.Get(ctx, key).Result()
		if err != nil {
			return "", err
		}

		val = crypt.Decrypt(val)

		var emailConfirmation EmailConfirmation
		if err := json.Unmarshal([]byte(val), &emailConfirmation); err != nil {
			return "", err
		}

		if emailConfirmation.Email == email {
			return strings.Split(key, ":")[1], nil
		}
	}

	return "", account.ErrEmailCodeInvalid
}

// ConfirmAccountEmail - confirm account email
func (r AccountRepository) ConfirmAccountEmail(ctx context.Context, confirmId string, acc *account.Account) error {

	val, err := r.client.Get(ctx, ConfirmEmailPrefix+confirmId).Result()

	if err != nil {

		if err == redis.Nil {
			return account.ErrEmailCodeInvalid
		}

		return fmt.Errorf("get failed: '%s", err)
	}

	val = crypt.Decrypt(val)

	var confirmItem EmailConfirmation

	if err := json.Unmarshal([]byte(val), &confirmItem); err != nil {
		return err
	}

	usr, err := r.GetAccountByEmail(ctx, confirmItem.Email)

	if err != nil {
		return err
	}

	// user must be logged in to confirm the email
	if usr.ID() != acc.ID() {
		return passport.ErrNotAuthenticated
	}

	// update to indicate that it's "confirmed" (status 1)
	updateAccountEmail := qb.Update("emails_by_account").
		Set("status").
		Where(qb.Eq("email"), qb.Eq("account_id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(EmailByAccount{
			Email:     confirmItem.Email,
			AccountId: acc.ID(),
			Status:    1,
		})

	if err := updateAccountEmail.ExecRelease(); err != nil {
		return fmt.Errorf("update() failed: '%s", err)
	}

	// delete confirmation (it has been used up)
	_, err = r.client.Del(ctx, ConfirmEmailPrefix+confirmId).Result()

	if err != nil {
		return fmt.Errorf("get failed: '%s", err)
	}

	return nil
}

// GetAccountEmails - get emails for account
func (r AccountRepository) GetAccountEmails(ctx context.Context, id string) ([]*account.Email, error) {

	usr, err := r.GetAccountById(ctx, id)

	if err != nil {
		return nil, err
	}

	var accountEmails []*EmailByAccount

	// get account emails and status
	queryEmails := qb.Select("emails_by_account").
		Where(qb.Eq("account_id")).
		Columns("account_id", "email", "status").
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&EmailByAccount{
			AccountId: id,
		})

	if err := queryEmails.Select(&accountEmails); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	var emails []*account.Email

	for _, email := range accountEmails {

		status := email.Status

		if usr.Email() == email.Email {
			status = 2
		}

		emails = append(emails, account.UnmarshalEmailFromDatabase(email.Email, status))
	}

	return emails, nil
}
