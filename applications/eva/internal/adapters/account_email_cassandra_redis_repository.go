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
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/crypt"
	"overdoll/libraries/paging"
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
	confirmEmailPrefix = "emailConfirm:"
)

func (r AccountRepository) deleteAccountEmail(ctx context.Context, instance *account.Account, email string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete username
	stmt, _ := emailByAccountTable.Delete()

	batch.Query(stmt, email, instance.ID())

	// delete from other table
	stmt, _ = accountEmailTable.Delete()

	batch.Query(stmt, strings.ToLower(email))

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete account email: %v", err)
	}

	return nil
}

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
		return nil, fmt.Errorf("failed to add account email - json marshal: %v", err)
	}

	valReal, err := crypt.Encrypt(string(val))

	if err != nil {
		return nil, fmt.Errorf("failed to add account email - encryption: %v", err)
	}

	ok, err := r.client.SetNX(ctx, confirmEmailPrefix+confirm.ID(), valReal, confirm.Expires()).Result()

	if err != nil {
		return nil, fmt.Errorf("failed to add account email - redis: %v", err)
	}

	if !ok {
		return nil, fmt.Errorf("failed to add account email - duplicate key: %s", confirmEmailPrefix+confirm.ID())
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
		_ = r.deleteAccountEmail(ctx, acc, confirm.Email())

		return nil, fmt.Errorf("failed to add account email - cassandra: %v", err)
	}

	return account.UnmarshalEmailFromDatabase(confirm.Email(), acc.ID(), 0), nil
}

// GetEmailConfirmationByEmail - a method that is used to get the email confirmation ID by only passing the email
// NOTE: this should only be used in tests! This is here purely because it is used for testing and any future
// changes to how email confirmations will work would make this change easier
func (r AccountRepository) GetEmailConfirmationByEmail(ctx context.Context, email string) (string, error) {
	keys, err := r.client.Keys(ctx, confirmEmailPrefix+"*").Result()

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

	val, err := r.client.Get(ctx, confirmEmailPrefix+confirmId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, account.ErrEmailCodeInvalid
		}

		return nil, fmt.Errorf("failed to confirm email - redis: %v", err)
	}

	val, err = crypt.Decrypt(val)

	if err != nil {
		return nil, fmt.Errorf("failed to confirm email - decryption: %v", err)
	}

	var confirmItem emailConfirmation

	if err := json.Unmarshal([]byte(val), &confirmItem); err != nil {
		return nil, fmt.Errorf("failed to confirm email - unmarshal: %v", err)
	}

	usr, err := r.GetAccountByEmail(ctx, confirmItem.Email)

	if err != nil {
		return nil, err
	}

	// user must be logged in to confirm the email
	if usr.ID() != acc.ID() {
		return nil, fmt.Errorf("failed to confirm email - invalid account")
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
		return nil, fmt.Errorf("failed to confirm email - account email update: %v", err)
	}

	// delete confirmation (it has been used up)
	_, err = r.client.Del(ctx, confirmEmailPrefix+confirmId).Result()

	if err != nil {
		return nil, fmt.Errorf("failed to confirm email - delete redis key: %v", err)
	}

	em, err := r.GetAccountEmail(ctx, acc.ID(), confirmItem.Email)

	if err != nil {
		return nil, err
	}

	return em, nil
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

		return nil, fmt.Errorf("failed to get email by account: %v", err)
	}

	return account.UnmarshalEmailFromDatabase(accountEmail.Email, accountEmail.AccountId, accountEmail.Status), nil
}

// GetAccountEmails - get emails for account
func (r AccountRepository) GetAccountEmails(ctx context.Context, cursor *paging.Cursor, id string) ([]*account.Email, error) {

	var accountEmails []*emailByAccount

	builder := emailByAccountTable.SelectBuilder()

	data := &emailByAccount{
		AccountId: id,
	}

	if cursor != nil {
		cursor.BuildCassandra(builder, "email")
	}

	queryEmails := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data)

	if err := queryEmails.Select(&accountEmails); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("failed to get emails by account: %v", err)
	}

	var emails []*account.Email

	for _, email := range accountEmails {
		em := account.UnmarshalEmailFromDatabase(email.Email, email.AccountId, email.Status)
		emails = append(emails, em)
		em.Node = paging.NewNode(email.Email)
	}

	return emails, nil
}

// DeleteAccountEmail - delete email for account
func (r AccountRepository) DeleteAccountEmail(ctx context.Context, accountId, email string) error {

	emails, err := r.GetAccountEmails(ctx, nil, accountId)

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
		return fmt.Errorf("failed to delete account email: %v", err)
	}

	return nil
}

// UpdateAccountMakeEmailPrimary - update the account and make the email primary
// or just change the casings
func (r AccountRepository) UpdateAccountMakeEmailPrimary(ctx context.Context, accountId string, updateFn func(usr *account.Account, ems []*account.Email) error) (*account.Account, *account.Email, error) {

	acc, err := r.GetAccountById(ctx, accountId)

	if err != nil {
		return nil, nil, err
	}

	ems, err := r.GetAccountEmails(ctx, nil, accountId)

	if err != nil {
		return nil, nil, err
	}

	oldEmail := acc.Email()

	err = updateFn(acc, ems)

	if err != nil {
		return nil, nil, err
	}

	var newEmail *account.Email

	for _, email := range ems {
		if email.IsPrimary() && email.Email() != oldEmail {
			newEmail = email
		}
	}

	if newEmail == nil {
		return nil, nil, errors.New("email not found")
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete emails by account
	stmt, _ := qb.Update(emailByAccountTable.Name()).
		Set("status").
		Where(qb.Eq("account_id"), qb.Eq("email")).
		ToCql()

	// set old mail to "1" - confirmed
	// set new mail to "2" - primary
	batch.Query(stmt, 2, accountId, newEmail.Email())
	batch.Query(stmt, 1, accountId, oldEmail)

	stmt, _ = qb.Update(accountTable.Name()).
		Set("email").
		Where(qb.Eq("id")).
		ToCql()

	batch.Query(stmt, newEmail.Email(), accountId)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, nil, fmt.Errorf("failed to make email primary: %v", err)
	}

	return acc, newEmail, nil
}
