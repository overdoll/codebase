package adapters

import (
	"context"
	"errors"
	"fmt"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/eva/internal/domain/account"
)

var accountTable = table.New(table.Metadata{
	Name: "accounts",
	Columns: []string{
		"id",
		"username",
		"email",
		"roles",
		"verified",
		"avatar_resource_id",
		"locked",
		"locked_until",
		"last_username_edit",
		"multi_factor_enabled",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type accounts struct {
	Id                 string     `db:"id"`
	Username           string     `db:"username"`
	Email              string     `db:"email"`
	Roles              []string   `db:"roles"`
	Verified           bool       `db:"verified"`
	AvatarResourceId   *string    `db:"avatar_resource_id"`
	Locked             bool       `db:"locked"`
	LockedUntil        *time.Time `db:"locked_until"`
	LastUsernameEdit   time.Time  `db:"last_username_edit"`
	MultiFactorEnabled bool       `db:"multi_factor_enabled"`
}

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

type AccountRepository struct {
	session gocqlx.Session
}

func NewAccountCassandraRedisRepository(session gocqlx.Session) AccountRepository {
	return AccountRepository{session: session}
}

func marshalUserToDatabase(usr *account.Account) *accounts {
	return &accounts{
		Id:                 usr.ID(),
		Email:              usr.Email(),
		Username:           usr.Username(),
		Roles:              usr.RolesAsString(),
		AvatarResourceId:   usr.AvatarResourceId(),
		Verified:           usr.Verified(),
		LockedUntil:        usr.LockedUntil(),
		Locked:             usr.IsLocked(),
		MultiFactorEnabled: usr.MultiFactorEnabled(),
	}
}

// GetAccountById - Get user using the ID
func (r AccountRepository) GetAccountById(ctx context.Context, id string) (*account.Account, error) {

	var accountInstance accounts

	if err := r.session.
		Query(accountTable.Get()).
		Consistency(gocql.LocalOne).
		BindStruct(&accounts{
			Id: id,
		}).
		Get(&accountInstance); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("failed to get account: %v", err)
	}

	return account.UnmarshalAccountFromDatabase(
		accountInstance.Id,
		accountInstance.Username,
		accountInstance.Email,
		accountInstance.Roles,
		accountInstance.Verified,
		accountInstance.AvatarResourceId,
		accountInstance.Locked,
		accountInstance.LockedUntil,
		accountInstance.MultiFactorEnabled,
		accountInstance.LastUsernameEdit,
	), nil
}

// GetAccountsById - get accounts in bulk
func (r AccountRepository) GetAccountsById(ctx context.Context, ids []string) ([]*account.Account, error) {

	var accountInstances []accounts

	if err := qb.
		Select(accountTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.LocalOne).
		Bind(ids).
		Select(&accountInstances); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("failed to get accounts: %v", err)
	}

	var accounts []*account.Account

	for _, accountInstance := range accountInstances {
		accounts = append(accounts, account.UnmarshalAccountFromDatabase(
			accountInstance.Id,
			accountInstance.Username,
			accountInstance.Email,
			accountInstance.Roles,
			accountInstance.Verified,
			accountInstance.AvatarResourceId,
			accountInstance.Locked,
			accountInstance.LockedUntil,
			accountInstance.MultiFactorEnabled,
			accountInstance.LastUsernameEdit,
		))
	}

	return accounts, nil
}

// GetAccountByEmail - Get user using the email
func (r AccountRepository) GetAccountByEmail(ctx context.Context, email string) (*account.Account, error) {

	// get authentication cookie with this ID
	var accEmail accountEmail

	if err := r.session.
		Query(accountEmailTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountEmail{
			Email: strings.ToLower(email),
		}).
		Get(&accEmail); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("failed to get account by email: %v", err)
	}

	// Get our user using the accounts AccountId, from the user email instance
	usr, err := r.GetAccountById(ctx, accEmail.AccountId)

	if err != nil {
		return nil, err
	}

	return usr, nil
}

func (r AccountRepository) createUniqueAccountUsername(ctx context.Context, instance *account.Account, username string) error {
	// First, we do a unique insert into users_usernames
	// This ensures that we capture the username so nobody else can use it

	applied, err := accountUsernameTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.LocalSerial).
		BindStruct(AccountUsername{
			AccountId: instance.ID(),
			// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
			// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
			Username: strings.ToLower(username),
		}).
		ExecCAS()

	// Do our checks to make sure we got a unique username
	if err != nil {
		return fmt.Errorf("failed to create unique username: %v", err)
	}

	if !applied {
		return account.ErrUsernameNotUnique
	}

	return nil
}

// AddAccountEmail - add an email to the account
func (r AccountRepository) deleteAccountUsername(ctx context.Context, accountId, username string) error {

	applied, err := accountUsernameTable.
		DeleteBuilder().
		Existing().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(AccountUsername{
			Username: strings.TrimSpace(strings.ToLower(username)),
		}).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to delete unique username: %v", err)
	}

	if !applied {
		return fmt.Errorf("could not delete unique username: %v", err)
	}

	return nil
}

func (r AccountRepository) createUniqueAccountEmail(ctx context.Context, accountId string, email string) error {

	applied, err := accountEmailTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(accountEmail{
			Email:     strings.ToLower(email),
			AccountId: accountId,
		}).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to create unique email: %v", err)
	}

	if !applied {
		return account.ErrEmailNotUnique
	}

	return nil
}

func (r AccountRepository) deleteAccountEmail(ctx context.Context, accountId, email string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete username
	stmt, _ := emailByAccountTable.Delete()

	batch.Query(stmt, accountId, email)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to delete account email: %v", err)
	}

	applied, err := accountEmailTable.
		DeleteBuilder().
		Existing().
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountEmail{
			Email: strings.ToLower(email),
		}).
		ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to delete account email: %v", err)
	}

	if !applied {
		return fmt.Errorf("failed to delete account email: %v", err)
	}

	return nil
}

// CreateAccount - Ensure we create a unique user by using lightweight transactions
func (r AccountRepository) CreateAccount(ctx context.Context, instance *account.Account) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// TODO: it would be nice if this was part of the batch statement but it seems like gocql and cassandra
	// TODO: are overloaded or timeout because it's a unique insert
	if err := r.createUniqueAccountUsername(ctx, instance, instance.Username()); err != nil {
		return err
	}

	// At this point, we know our username is unique & captured, so we
	// now do our insert, but this time with the email
	// note: we don't do a unique check for the email first because if they're on this stage, we already
	// did the check earlier if an account exists with this specific email. however, we will still
	// do a rollback & deletion of the username if the email is already taken, just in case
	if err := r.createUniqueAccountEmail(ctx, instance.ID(), instance.Email()); err != nil {

		anotherErr := r.deleteAccountUsername(ctx, instance.ID(), instance.Username())

		if anotherErr != nil {
			return anotherErr
		}

		return err
	}

	// create a table that holds all of the user's emails
	stmt, _ := emailByAccountTable.Insert()

	batch.Query(stmt, instance.ID(), instance.Email(), 2)

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	stmt, _ = accountTable.Insert()

	batch.Query(stmt,
		instance.ID(),
		instance.Username(),
		instance.Email(),
		instance.RolesAsString(),
		instance.Verified(),
		instance.AvatarResourceId(),
		instance.IsLocked(),
		instance.LockedUntil(),
		instance.LastUsernameEdit(),
		instance.MultiFactorEnabled(),
	)

	if err := r.session.ExecuteBatch(batch); err != nil {

		// do a rollback if this batch statement fails
		err1 := r.deleteAccountEmail(ctx, instance.ID(), instance.Email())
		err2 := r.deleteAccountUsername(ctx, instance.ID(), instance.Username())

		if err1 != nil {
			return err1
		}

		if err2 != nil {
			return err2
		}

		return fmt.Errorf("failed to create account: %v", err)
	}

	return nil
}

func (r AccountRepository) UpdateAccount(ctx context.Context, id string, updateFn func(usr *account.Account) error) (*account.Account, error) {

	currentUser, err := r.GetAccountById(ctx, id)

	if err != nil {
		return nil, err
	}

	err = updateFn(currentUser)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(
			accountTable.Update(
				"username",
				"email",
				"roles",
				"verified",
				"locked_until",
				"locked",
				"avatar_resource_id",
				"multi_factor_enabled",
			),
		).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalUserToDatabase(currentUser)).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update account: %v", err)
	}

	return currentUser, nil
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

		if strings.ToLower(oldUsername) != strings.ToLower(instance.Username()) {
			// only a casings change - don't create unique username

			if err := r.createUniqueAccountUsername(ctx, instance, instance.Username()); err != nil {
				return nil, err
			}

			if err := r.deleteAccountUsername(ctx, instance.ID(), strings.ToLower(oldUsername)); err != nil {

				if err := r.createUniqueAccountUsername(ctx, instance, strings.ToLower(oldUsername)); err != nil {
					return nil, err
				}

				return nil, err
			}
		}

		batch := r.session.NewBatch(gocql.LoggedBatch)

		// finally, update account
		stmt, _ := accountTable.UpdateBuilder().Set("username", "last_username_edit").ToCql()
		batch.Query(stmt, instance.Username(), instance.LastUsernameEdit(), instance.ID())

		if err := r.session.ExecuteBatch(batch); err != nil {

			if err := r.deleteAccountUsername(ctx, instance.ID(), instance.Username()); err != nil {
				return nil, err
			}

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
	if err := r.session.
		Query(accountUsernameTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&AccountUsername{
			Username: strings.ToLower(username),
		}).
		Get(&accountUsername); err != nil {

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

// GetAccountEmail - get an email for a single account
func (r AccountRepository) GetAccountEmail(ctx context.Context, requester *principal.Principal, accountId, email string) (*account.Email, error) {

	var accountEmail emailByAccount

	// get account emails and status
	if err := r.session.
		Query(emailByAccountTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&emailByAccount{
			AccountId: accountId,
			Email:     email,
		}).
		Get(&accountEmail); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("failed to get email by account: %v", err)
	}

	result := account.UnmarshalEmailFromDatabase(accountEmail.Email, accountEmail.AccountId, accountEmail.Status)

	if err := result.CanView(requester); err != nil {
		return nil, err
	}

	return result, nil
}

// GetAccountEmails - get emails for account
func (r AccountRepository) GetAccountEmails(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*account.Email, error) {

	if err := account.CanViewAccountEmails(requester, accountId); err != nil {
		return nil, err
	}

	var accountEmails []*emailByAccount

	builder := emailByAccountTable.SelectBuilder()

	data := &emailByAccount{
		AccountId: accountId,
	}

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "email", true); err != nil {
			return nil, err
		}
	}

	if err := builder.Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data).
		Select(&accountEmails); err != nil {

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
func (r AccountRepository) DeleteAccountEmail(ctx context.Context, requester *principal.Principal, accountId, email string) error {

	emails, err := r.GetAccountEmails(ctx, requester, nil, accountId)

	if err != nil {
		return err
	}

	email = strings.ToLower(email)

	if err := account.CanDeleteAccountEmail(requester, accountId, emails, email); err != nil {
		return err
	}

	return r.deleteAccountEmail(ctx, accountId, email)
}

// UpdateAccountMakeEmailPrimary - update the account and make the email primary
func (r AccountRepository) UpdateAccountMakeEmailPrimary(ctx context.Context, requester *principal.Principal, accountId string, updateFn func(usr *account.Account, ems []*account.Email) error) (*account.Account, *account.Email, error) {

	acc, err := r.GetAccountById(ctx, accountId)

	if err != nil {
		return nil, nil, err
	}

	if err := acc.CanMakeEmailPrimary(requester); err != nil {
		return nil, nil, err
	}

	ems, err := r.GetAccountEmails(ctx, requester, nil, accountId)

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

func (r AccountRepository) CreateAccountEmail(ctx context.Context, requester *principal.Principal, email *account.Email) error {
	// check to make sure this email is not taken
	existingAcc, err := r.GetAccountByEmail(ctx, email.Email())

	if err != nil && err != account.ErrAccountNotFound {
		return err
	}

	if existingAcc != nil {
		return account.ErrEmailNotUnique
	}

	// create a unique email - will error out if not uniques
	if err := r.createUniqueAccountEmail(ctx, email.AccountId(), email.Email()); err != nil {
		return err
	}

	if err := r.session.
		Query(emailByAccountTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(emailByAccount{
			Email:     email.Email(),
			AccountId: email.AccountId(),
			Status:    1,
		}).
		ExecRelease(); err != nil {
		_ = r.deleteAccountEmail(ctx, email.AccountId(), email.Email())
		return fmt.Errorf("failed to add account email - cassandra: %v", err)
	}

	return nil
}
