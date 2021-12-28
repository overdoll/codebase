package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/principal"
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

// AddAccountEmail - add an email to the account
func (r AccountRepository) deleteAccountUsername(ctx context.Context, accountId, username string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete from other table
	stmt, _ := accountUsernameTable.Delete()

	batch.Query(stmt, strings.ToLower(username))

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete account username: %v", err)
	}

	return nil
}

// UpdateAccountUsername - modify the username for the account - will either modify username by adding new entries (if it's a completely new username)
// or just change the casings
func (r AccountRepository) UpdateAccountUsername(ctx context.Context, requester *principal.Principal, id string, updateFn func(usr *account.Account) error) (*account.Account, error) {

	instance, err := r.GetAccountById(ctx, id)

	if err != nil {
		return nil, err
	}

	if err := instance.CanUpdateUsername(requester); err != nil {
		return nil, err
	}

	oldUsername := instance.Username()

	err = updateFn(instance)

	if err != nil {
		return nil, err
	}

	// username doesn't belong to the account, make sure it's not taken by someone else first
	_, err = r.GetAccountByUsername(ctx, instance.Username())

	if err != nil {

		if err != account.ErrAccountNotFound {
			return nil, err
		}

		if err := r.createUniqueAccountUsername(ctx, instance, instance.Username()); err != nil {
			return nil, err
		}

		batch := r.session.NewBatch(gocql.LoggedBatch)

		// delete old username
		stmt, _ := accountUsernameTable.Delete()
		batch.Query(stmt, oldUsername)

		// finally, update account
		stmt, _ = accountTable.UpdateBuilder().Set("username", "last_username_edit").ToCql()
		batch.Query(stmt, instance.Username(), instance.LastUsernameEdit(), instance.ID())

		if err := r.session.ExecuteBatch(batch); err != nil {
			return nil, fmt.Errorf("failed to update account username: %v", err)
		}

		return instance, nil

	}

	return nil, account.ErrUsernameNotUnique
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

		return nil, fmt.Errorf("failed to get account by username: %v", err)
	}

	// Get our user using the accounts AccountId, from the user email instance
	usr, err := r.GetAccountById(ctx, accountUsername.AccountId)

	if err != nil {
		return nil, err
	}

	return usr, nil
}
