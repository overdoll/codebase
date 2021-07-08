package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/eva/src/domain/account"
)

type AccountUsername struct {
	Id       string `db:"account_id"`
	Username string `db:"username"`
}

type UsernameByAccount struct {
	Id       string `db:"account_id"`
	Username string `db:"username"`
}

// AddAccountEmail - add an email to the account
func (r AccountRepository) deleteAccountUsername(ctx context.Context, instance *account.Account) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete username
	q := qb.Delete("usernames_by_account").
		Where(qb.Eq("username"), qb.Eq("account_id")).
		Query(r.session).
		BindStruct(AccountUsername{
			Id:       instance.ID(),
			Username: strings.ToLower(instance.Username()),
		})

	batch.Query(q.Statement())

	// delete from other table
	q = qb.Delete("accounts_usernames").
		Where(qb.Eq("username")).
		Query(r.session).
		BindStruct(UsernameByAccount{
			Id:       instance.ID(),
			Username: instance.Username(),
		})

	batch.Query(q.Statement())

	if err := r.session.ExecuteBatch(batch); err == nil {
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

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// if we dont change the casings (extra letters, etc..) we need to add it to our lookup table
	if oldUsername != strings.ToLower(instance.Username()) {
		// add to account usernames
		q := qb.Insert("accounts_usernames").
			Columns("account_id", "username").
			Unique().
			Query(r.session).
			BindStruct(AccountUsername{
				Id:       instance.ID(),
				Username: strings.ToLower(instance.Username()),
			})

		batch.Query(q.Statement())
	}

	// add to usernames table
	q := qb.Insert("usernames_by_account").
		Columns("account_id", "username").
		Unique().
		Query(r.session).
		BindStruct(UsernameByAccount{
			Id:       instance.ID(),
			Username: instance.Username(),
		})

	// add to account's usernames list
	batch.Query(q.Statement())

	q = qb.Update("accounts").
		Set(
			"username",
			"last_username_edit",
		).
		Where(qb.Eq("id")).
		Query(r.session).
		BindStruct(Account{
			Id:               instance.ID(),
			Username:         instance.Username(),
			LastUsernameEdit: instance.LastUsernameEdit(),
		})

	// finally, update account
	batch.Query(q.Statement())

	if err := r.session.ExecuteBatch(batch); err == nil {
		return nil, fmt.Errorf("batch() failed: %s", err)
	}

	return instance, nil
}

// GetAccountByUsername - Get user using the username
func (r AccountRepository) GetAccountByUsername(ctx context.Context, username string) (*account.Account, error) {

	// get authentication cookie with this ID
	var accountUsername AccountUsername

	// check if email is in use
	queryEmail := qb.Select("accounts_usernames").
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

	// Get our user using the Account Id, from the user email instance
	usr, err := r.GetAccountById(ctx, accountUsername.Id)

	if err != nil {
		return nil, err
	}

	return usr, nil
}

// GetAccountEmails - get emails for account
func (r AccountRepository) GetAccountUsernames(ctx context.Context, id string) ([]*account.Username, error) {

	var accountUsernames []*UsernameByAccount

	// get account emails and status
	queryUsernames := qb.Select("usernames_by_account").
		Where(qb.Eq("account_id")).
		Columns("account_id", "username").
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&UsernameByAccount{
			Id: id,
		})

	if err := queryUsernames.Select(&accountUsernames); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	var usernames []*account.Username

	for _, username := range accountUsernames {
		usernames = append(usernames, account.UnmarshalUsernameFromDatabase(username.Username))
	}

	return usernames, nil
}
