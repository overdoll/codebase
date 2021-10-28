package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/go-redis/redis/v8"
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
		"avatar",
		"locked",
		"locked_until",
		"language",
		"locked_reason",
		"last_username_edit",
		"multi_factor_enabled",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type accounts struct {
	Id                 string   `db:"id"`
	Username           string   `db:"username"`
	Email              string   `db:"email"`
	Roles              []string `db:"roles"`
	Verified           bool     `db:"verified"`
	Avatar             string   `db:"avatar"`
	Language           string   `db:"language"`
	Locked             bool     `db:"locked"`
	LockedUntil        int      `db:"locked_until"`
	LockedReason       string   `db:"locked_reason"`
	LastUsernameEdit   int      `db:"last_username_edit"`
	MultiFactorEnabled bool     `db:"multi_factor_enabled"`
}

type AccountRepository struct {
	session gocqlx.Session
	client  *redis.Client
}

func NewAccountCassandraRedisRepository(session gocqlx.Session, client *redis.Client) AccountRepository {
	return AccountRepository{session: session, client: client}
}

func marshalUserToDatabase(usr *account.Account) *accounts {
	return &accounts{
		Id:                 usr.ID(),
		Email:              usr.Email(),
		Username:           usr.Username(),
		Roles:              usr.RolesAsString(),
		Avatar:             usr.Avatar(),
		Verified:           usr.Verified(),
		LockedUntil:        usr.LockedUntil(),
		Locked:             usr.IsLocked(),
		Language:           usr.Language().Locale(),
		LockedReason:       usr.LockedReason(),
		MultiFactorEnabled: usr.MultiFactorEnabled(),
	}
}

// GetAccountById - Get user using the ID
func (r AccountRepository) GetAccountById(ctx context.Context, id string) (*account.Account, error) {

	var accountInstance accounts

	queryUser := r.session.
		Query(accountTable.Get()).
		Consistency(gocql.LocalOne).
		BindStruct(&accounts{
			Id: id,
		})

	if err := queryUser.Get(&accountInstance); err != nil {

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
		accountInstance.Avatar,
		accountInstance.Language,
		accountInstance.Locked,
		accountInstance.LockedUntil,
		accountInstance.LockedReason,
		accountInstance.MultiFactorEnabled,
	), nil
}

// GetAccountsById - get accounts in bulk
func (r AccountRepository) GetAccountsById(ctx context.Context, ids []string) ([]*account.Account, error) {

	var accountInstances []accounts

	queryUser := qb.
		Select(accountTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		Consistency(gocql.LocalOne).
		Bind(ids)

	if err := queryUser.Select(&accountInstances); err != nil {

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
			accountInstance.Avatar,
			accountInstance.Language,
			accountInstance.Locked,
			accountInstance.LockedUntil,
			accountInstance.LockedReason,
			accountInstance.MultiFactorEnabled,
		))
	}

	return accounts, nil
}

// GetAccountByEmail - Get user using the email
func (r AccountRepository) GetAccountByEmail(ctx context.Context, email string) (*account.Account, error) {

	// get authentication cookie with this ID
	var accEmail accountEmail

	queryEmail := r.session.
		Query(accountEmailTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountEmail{
			Email: strings.ToLower(email),
		})

	if err := queryEmail.Get(&accEmail); err != nil {

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

	accountUsernames := accountUsernameTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(AccountUsername{
			AccountId: instance.ID(),
			// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
			// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
			Username: strings.ToLower(username),
		})

	applied, err := accountUsernames.ExecCAS()

	// Do our checks to make sure we got a unique username
	if err != nil {
		return fmt.Errorf("failed to create unique username: %v", err)
	}

	if !applied {
		return account.ErrUsernameNotUnique
	}

	return nil
}

func (r AccountRepository) createUniqueAccountEmail(ctx context.Context, instance *account.Account, email string) error {

	insertAccountEmail := accountEmailTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(accountEmail{
			Email:     strings.ToLower(email),
			AccountId: instance.ID(),
		})

	applied, err := insertAccountEmail.ExecCAS()

	if err != nil {
		return fmt.Errorf("failed to create unique email: %v", err)
	}

	if !applied {
		return account.ErrEmailNotUnique
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

	stmt, _ := usernameByAccount.Insert()

	batch.Query(stmt, instance.ID(), instance.Username())

	// At this point, we know our username is unique & captured, so we
	// now do our insert, but this time with the email
	// note: we don't do a unique check for the email first because if they're on this stage, we already
	// did the check earlier if an account exists with this specific email. however, we will still
	// do a rollback & deletion of the username if the email is already taken, just in case
	if err := r.createUniqueAccountEmail(ctx, instance, instance.Email()); err != nil {

		anotherErr := r.deleteAccountUsername(ctx, instance, instance.Username())

		if anotherErr != nil {
			return anotherErr
		}

		return err
	}

	// create a table that holds all of the user's emails
	stmt, _ = emailByAccountTable.Insert()

	batch.Query(stmt, instance.ID(), instance.Email(), 2)

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	stmt, _ = accountTable.Insert()

	batch.Query(stmt, instance.ID(), instance.Username(), instance.Email(), []string{}, false, nil, false, 0, instance.Language().Locale(), nil, nil, false)

	if err := r.session.ExecuteBatch(batch); err != nil {

		// do a rollback if this batch statement fails
		err1 := r.deleteAccountEmail(ctx, instance, instance.Email())
		err2 := r.deleteAccountUsername(ctx, instance, instance.Username())

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

	updateUser :=
		r.session.
			Query(
				accountTable.Update(
					"username",
					"email",
					"roles",
					"verified",
					"locked_until",
					"language",
					"locked",
					"locked_reason",
					"avatar",
					"multi_factor_enabled",
				),
			).
			Consistency(gocql.LocalQuorum).
			BindStruct(marshalUserToDatabase(currentUser))

	if err := updateUser.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update account: %v", err)
	}

	return currentUser, nil
}
