package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/eva/src/domain/account"
	"overdoll/libraries/paging"
)

var accountUsernameTable = table.New(table.Metadata{
	Name: "account_usernames",
	Columns: []string{
		"account_id",
		"username",
	},
	PartKey: []string{"username"},
	SortKey: []string{},
})

type AccountUsername struct {
	AccountId string `db:"account_id"`
	Username  string `db:"username"`
}

var usernameByAccount = table.New(table.Metadata{
	Name: "usernames_by_account",
	Columns: []string{
		"account_id",
		"username",
	},
	PartKey: []string{"account_id"},
	SortKey: []string{"username"},
})

type UsernameByAccount struct {
	AccountId string `db:"account_id"`
	Username  string `db:"username"`
}

// AddAccountEmail - add an email to the account
func (r AccountRepository) deleteAccountUsername(ctx context.Context, instance *account.Account, username string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete username
	stmt, _ := usernameByAccount.Delete()

	batch.Query(stmt, instance.Username(), instance.ID())

	// delete from other table
	stmt, _ = accountUsernameTable.Delete()

	batch.Query(stmt, strings.ToLower(instance.Username()))

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("batch() failed: %s", err)
	}

	return nil
}

func (r AccountRepository) deleteAccountEmail(ctx context.Context, instance *account.Account, email string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete username
	stmt, _ := emailByAccountTable.Delete()

	batch.Query(stmt, email, instance.ID())

	// delete from other table
	stmt, _ = accountEmailTable.Delete()

	batch.Query(stmt, strings.ToLower(email))

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("batch() failed: %s", err)
	}

	return nil
}

// UpdateAccountUsername - modify the username for the account - will either modify username by adding new entries (if it's a completely new username)
// or just change the casings
func (r AccountRepository) UpdateAccountUsername(ctx context.Context, id string, updateFn func(usr *account.Account) error) (*account.Account, *account.Username, error) {

	instance, err := r.GetAccountById(ctx, id)

	if err != nil {
		return nil, nil, err
	}

	oldUsername := instance.Username()

	err = updateFn(instance)

	if err != nil {
		return nil, nil, err
	}

	// if we dont change the casings (extra letters, etc..) we need to add it to our lookup table
	if oldUsername != strings.ToLower(instance.Username()) {
		if err := r.createUniqueAccountUsername(ctx, instance, instance.Username()); err != nil {
			return nil, nil, err
		}
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// add to usernames table
	stmt, _ := usernameByAccount.Insert()

	// add to account's usernames list
	batch.Query(stmt, instance.ID(), instance.Username())

	stmt, _ = accountTable.UpdateBuilder().Set("username", "last_username_edit").ToCql()

	// finally, update account
	batch.Query(stmt, instance.Username(), instance.LastUsernameEdit(), instance.ID())

	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, nil, fmt.Errorf("batch() failed: %s", err)
	}

	return instance, account.UnmarshalUsernameFromDatabase(instance.Username(), instance.ID()), nil
}

// GetAccountByUsername - Get user using the username
func (r AccountRepository) GetAccountByUsername(ctx context.Context, username string) (*account.Account, error) {

	// get authentication cookie with this ID
	var accountUsername AccountUsername

	// check if email is in use
	queryEmail := r.session.
		Query(accountUsernameTable.Get()).
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

	// Get our user using the accounts AccountId, from the user email instance
	usr, err := r.GetAccountById(ctx, accountUsername.AccountId)

	if err != nil {
		return nil, err
	}

	return usr, nil
}

// GetAccountEmails - get emails for account
func (r AccountRepository) GetAccountUsernames(ctx context.Context, cursor *paging.Cursor, id string) ([]*account.Username, error) {

	var accountUsernames []*UsernameByAccount

	queryUsernames := r.session.
		Query(usernameByAccount.Select()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&UsernameByAccount{
			AccountId: id,
		})

	if err := queryUsernames.Select(&accountUsernames); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	var usernames []*account.Username

	for _, username := range accountUsernames {
		usernames = append(usernames, account.UnmarshalUsernameFromDatabase(username.Username, username.AccountId))
	}

	return usernames, nil
}

// GetAccountEmails - get emails for account
func (r AccountRepository) GetAccountUsername(ctx context.Context, accountId, username string) (*account.Username, error) {

	var accountUsernames *UsernameByAccount

	queryUsernames := r.session.
		Query(usernameByAccount.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&UsernameByAccount{
			AccountId: accountId,
			Username:  username,
		})

	if err := queryUsernames.Get(&accountUsernames); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return account.UnmarshalUsernameFromDatabase(accountUsernames.Username, accountUsernames.AccountId), nil
}
