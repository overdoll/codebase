package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/paging"
)

type AccountUsername struct {
	AccountId string `db:"account_id"`
	Username  string `db:"username"`
}

type UsernameByAccount struct {
	AccountId string `db:"account_id"`
	Username  string `db:"username"`
}

// AddAccountEmail - add an email to the account
func (r AccountRepository) deleteAccountUsername(ctx context.Context, instance *account.Account, username string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete username
	q := qb.Delete("usernames_by_account").
		Where(qb.Eq("username"), qb.Eq("account_id"))

	stmt, _ := q.ToCql()

	batch.Query(stmt, instance.Username(), instance.ID())

	// delete from other table
	q = qb.Delete("account_usernames").
		Where(qb.Eq("username"))

	stmt, _ = q.ToCql()

	batch.Query(stmt, strings.ToLower(instance.Username()))

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("batch() failed: %s", err)
	}

	return nil
}

func (r AccountRepository) deleteAccountEmail(ctx context.Context, instance *account.Account, email string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete username
	q := qb.Delete("emails_by_account").
		Where(qb.Eq("email"), qb.Eq("account_id"))

	stmt, _ := q.ToCql()

	batch.Query(stmt, email, instance.ID())

	// delete from other table
	q = qb.Delete("account_emails").
		Where(qb.Eq("email"))

	stmt, _ = q.ToCql()

	batch.Query(stmt, strings.ToLower(email))

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("batch() failed: %s", err)
	}

	return nil
}

// UpdateAccountUsername - modify the username for the account - will either modify username by adding new entries (if it's a completely new username)
// or just change the casings
func (r AccountRepository) UpdateAccountUsername(ctx context.Context, id string, updateFn func(usr *account.Account) error) (*account.Account, error) {

	instance, err := r.GetAccountById(ctx, id)

	if err != nil {
		return nil, err
	}

	oldUsername := instance.Username()

	err = updateFn(instance)

	if err != nil {
		return nil, err
	}

	// if we dont change the casings (extra letters, etc..) we need to add it to our lookup table
	if oldUsername != strings.ToLower(instance.Username()) {
		if err := r.createUniqueAccountUsername(ctx, instance, instance.Username()); err != nil {
			return nil, err
		}
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// add to usernames table
	q := qb.Insert("usernames_by_account").
		Columns("account_id", "username")

	stmt, _ := q.ToCql()

	// add to account's usernames list
	batch.Query(stmt, instance.ID(), instance.Username())

	qUpdate := qb.Update("accounts").
		Set(
			"username",
			"last_username_edit",
		).
		Where(qb.Eq("id"))

	stmt, _ = qUpdate.ToCql()

	// finally, update account
	batch.Query(stmt, instance.Username(), instance.LastUsernameEdit(), instance.ID())

	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, fmt.Errorf("batch() failed: %s", err)
	}

	return instance, nil
}

// GetAccountByUsername - Get user using the username
func (r AccountRepository) GetAccountByUsername(ctx context.Context, username string) (*account.Account, error) {

	// get authentication cookie with this ID
	var accountUsername AccountUsername

	// check if email is in use
	queryEmail := qb.Select("account_usernames").
		Where(qb.Eq("username")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&AccountUsername{
			Username: strings.ToLower(username),
		})

	if err := queryEmail.Get(&accountUsername); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, err
	}

	// Get our user using the Account AccountId, from the user email instance
	usr, err := r.GetAccountById(ctx, accountUsername.AccountId)

	if err != nil {
		return nil, err
	}

	return usr, nil
}

// GetAccountEmails - get emails for account
func (r AccountRepository) GetAccountUsernames(ctx context.Context, cursor *paging.Cursor, id string) ([]*account.Username, *paging.Info, error) {

	var accountUsernames []*UsernameByAccount

	// get account emails and status
	queryUsernames := qb.Select("usernames_by_account").
		Where(qb.Eq("account_id")).
		Columns("account_id", "username").
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&UsernameByAccount{
			AccountId: id,
		})

	if err := queryUsernames.Select(&accountUsernames); err != nil {

		if err == gocql.ErrNotFound {
			return nil, nil, account.ErrAccountNotFound
		}

		return nil, nil, fmt.Errorf("select() failed: '%s", err)
	}

	var usernames []*account.Username

	for _, username := range accountUsernames {
		usernames = append(usernames, account.UnmarshalUsernameFromDatabase(username.Username, username.AccountId))
	}

	return usernames, nil, nil
}
