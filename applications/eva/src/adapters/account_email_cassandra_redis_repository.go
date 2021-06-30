package adapters

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/go-redis/redis/v8"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/eva/src/domain/account"
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

	authCookie := &EmailConfirmation{
		Email: confirm.Email(),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return err
	}

	_, err = r.client.SetNX(ctx, ConfirmEmailPrefix+confirm.ID(), val, confirm.Expires()).Result()

	if err != nil {
		return err
	}

	accountEmail := AccountEmail{
		Email:     confirm.Email(),
		AccountId: acc.ID(),
	}

	// Create a lookup table that will lookup the user using email
	createAccountEmail := qb.Insert("accounts_emails").
		Columns("email", "account_id").
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(accountEmail)

	applied, err := createAccountEmail.ExecCAS()

	if err != nil || !applied {
		return account.ErrEmailNotUnique
	}

	emailByAccount := EmailByAccount{
		Email:     confirm.Email(),
		AccountId: acc.ID(),
		Status:    0,
	}

	// add emails to account
	addAccountEmail := qb.Insert("emails_by_account").
		Columns("email", "account_id", "status").
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(emailByAccount)

	applied, err = addAccountEmail.ExecCAS()

	if err != nil || !applied {

		deleteAccountUsername := qb.Delete("accounts_emails").
			Where(qb.Eq("email")).
			Query(r.session).
			BindStruct(accountEmail)

		if err := deleteAccountUsername.ExecRelease(); err != nil {
			return fmt.Errorf("delete() failed: '%s", err)
		}

		return account.ErrEmailNotUnique
	}

	return nil
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

	emailByAccount := EmailByAccount{
		Email:     confirmItem.Email,
		AccountId: acc.ID(),
		Status:    1,
	}

	// update to indicate that it's "confirmed" (status 1)
	updateAccountEmail := qb.Update("emails_by_account").
		Set("status").
		Where(qb.Eq("email"), qb.Eq("account_id")).
		Query(r.session).
		SerialConsistency(gocql.LocalQuorum).
		BindStruct(emailByAccount)

	if err := updateAccountEmail.ExecRelease(); err != nil {
		return fmt.Errorf("update() failed: '%s", err)
	}

	return nil
}

// GetAccountEmails - get emails for account
func (r AccountRepository) GetAccountEmails(ctx context.Context, id string) ([]*account.Email, error) {

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
		emails = append(emails, account.UnmarshalEmailFromDatabase(email.Email, email.Status))
	}

	return emails, nil
}
