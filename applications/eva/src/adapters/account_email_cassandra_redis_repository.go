package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/go-redis/redis/v8"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/crypt"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

var accountEmailTable = table.New(table.Metadata{
	Name: "account_emails",
	Columns: []string{
		"account_id",
		"email",
	},
	PartKey: []string{"email"},
	SortKey: []string{},
})

type accountEmail struct {
	AccountId string `db:"account_id"`
	Email     string `db:"email"`
}

var emailByAccountTable = table.New(table.Metadata{
	Name: "emails_by_account",
	Columns: []string{
		"account_id",
		"email",
		"status",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"email"},
})

type emailByAccount struct {
	Email     string `db:"email"`
	AccountId string `db:"account_id"`
	Status    int    `db:"status"`
}

type emailConfirmation struct {
	Email string `json:"email"`
}

const (
	ConfirmEmailPrefix = "emailConfirm:"
)

// AddAccountEmail - add an email to the account
func (r AccountRepository) AddAccountEmail(ctx context.Context, acc *account.Account, confirm *account.EmailConfirmation) (*account.Email, error) {

	// check to make sure this email is not taken
	existingAcc, err := r.GetAccountByEmail(ctx, confirm.Email())

	if err != nil && err != account.ErrAccountNotFound {
		return nil, err
	}

	if existingAcc != nil {
		return nil, account.ErrEmailNotUnique
	}

	authCookie := &emailConfirmation{
		Email: confirm.Email(),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return nil, err
	}

	valReal, err := crypt.Encrypt(string(val))
	if err != nil {
		return nil, err
	}

	ok, err := r.client.SetNX(ctx, ConfirmEmailPrefix+confirm.ID(), valReal, confirm.Expires()).Result()

	if err != nil {
		return nil, err
	}

	if !ok {
		return nil, errors.New("duplicate key")
	}

	// create a unique email
	if err := r.createUniqueAccountEmail(ctx, acc, confirm.Email()); err != nil {
		return nil, err
	}

	insertEmailByAccount := r.session.
		Query(emailByAccountTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(emailByAccount{
			Email:     confirm.Email(),
			AccountId: acc.ID(),
			Status:    0,
		})

	if err := insertEmailByAccount.ExecRelease(); err != nil {
		return nil, r.deleteAccountEmail(ctx, acc, confirm.Email())
	}

	return account.UnmarshalEmailFromDatabase(confirm.Email(), acc.ID(), 0), nil
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

		val, err = crypt.Decrypt(val)

		if err != nil {
			return "", err
		}

		var emailConfirmation emailConfirmation
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
func (r AccountRepository) ConfirmAccountEmail(ctx context.Context, confirmId string, acc *account.Account) (*account.Email, error) {

	val, err := r.client.Get(ctx, ConfirmEmailPrefix+confirmId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, account.ErrEmailCodeInvalid
		}

		return nil, fmt.Errorf("get failed: '%s", err)
	}

	val, err = crypt.Decrypt(val)
	if err != nil {
		return nil, err
	}

	var confirmItem emailConfirmation

	if err := json.Unmarshal([]byte(val), &confirmItem); err != nil {
		return nil, err
	}

	usr, err := r.GetAccountByEmail(ctx, confirmItem.Email)

	if err != nil {
		return nil, err
	}

	// user must be logged in to confirm the email
	if usr.ID() != acc.ID() {
		return nil, passport.ErrNotAuthenticated
	}

	updateAccountEmail := r.session.
		Query(emailByAccountTable.Update("status")).
		Consistency(gocql.LocalQuorum).
		BindStruct(emailByAccount{
			Email:     confirmItem.Email,
			AccountId: acc.ID(),
			Status:    1,
		})

	if err := updateAccountEmail.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	// delete confirmation (it has been used up)
	_, err = r.client.Del(ctx, ConfirmEmailPrefix+confirmId).Result()

	if err != nil {
		return nil, fmt.Errorf("get failed: '%s", err)
	}

	return nil, nil
}

// GetAccountEmail - get an email for a single account
func (r AccountRepository) GetAccountEmail(ctx context.Context, accountId, email string) (*account.Email, error) {

	var accountEmail emailByAccount

	// get account emails and status
	queryEmails := r.session.
		Query(emailByAccountTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&emailByAccount{
			AccountId: accountId,
			Email:     email,
		})

	if err := queryEmails.Get(&accountEmail); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return account.UnmarshalEmailFromDatabase(accountEmail.Email, accountEmail.AccountId, accountEmail.Status), nil
}

// GetAccountEmails - get emails for account
func (r AccountRepository) GetAccountEmails(ctx context.Context, cursor *paging.Cursor, id string) ([]*account.Email, *paging.Info, error) {

	var accountEmails []*emailByAccount

	queryEmails := r.session.
		Query(emailByAccountTable.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&emailByAccount{
			AccountId: id,
		})

	if err := queryEmails.Select(&accountEmails); err != nil {

		if err == gocql.ErrNotFound {
			return nil, nil, account.ErrAccountNotFound
		}

		return nil, nil, fmt.Errorf("select() failed: '%s", err)
	}

	var emails []*account.Email

	for _, email := range accountEmails {
		emails = append(emails, account.UnmarshalEmailFromDatabase(email.Email, email.AccountId, email.Status))
	}

	return emails, nil, nil
}

// DeleteAccountEmail - delete email for account
func (r AccountRepository) DeleteAccountEmail(ctx context.Context, accountId, email string) error {

	emails, _, err := r.GetAccountEmails(ctx, nil, accountId)

	if err != nil {
		return err
	}

	email = strings.ToLower(email)

	foundEmail := false

	for _, em := range emails {
		if em.Email() == email {
			foundEmail = true

			if em.IsPrimary() {
				return errors.New("email is primary")
			}

			break
		}
	}

	if !foundEmail {
		return errors.New("email does not belong to account")
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete emails by account
	stmt, _ := emailByAccountTable.Delete()

	batch.Query(stmt, accountId, email)

	// delete account email
	stmt, _ = accountEmailTable.Delete()

	batch.Query(stmt, email)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("batch() failed: %s", err)
	}

	return nil
}

// UpdateAccountMakeEmailPrimary - update the account and make the email primary
// or just change the casings
func (r AccountRepository) UpdateAccountMakeEmailPrimary(ctx context.Context, accountId string, updateFn func(usr *account.Account, ems []*account.Email) error) (*account.Account, *account.Email, error) {

	instance, err := r.GetAccountById(ctx, accountId)

	if err != nil {
		return nil, nil, err
	}

	ems, _, err := r.GetAccountEmails(ctx, nil, accountId)

	if err != nil {
		return nil, nil, err
	}

	err = updateFn(instance, ems)

	if err != nil {
		return nil, nil, err
	}

	return instance, nil, nil
}
