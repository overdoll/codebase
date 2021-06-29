package adapters

import (
	"context"
	"fmt"
	"strings"

	"github.com/go-redis/redis/v8"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/eva/src/domain/account"
)

type Account struct {
	Id           string   `db:"id"`
	Username     string   `db:"username"`
	Email        string   `db:"email"`
	Roles        []string `db:"roles"`
	Verified     bool     `db:"verified"`
	Avatar       string   `db:"avatar"`
	Locked       bool     `db:"locked"`
	LockedUntil  int      `db:"locked_until"`
	LockedReason string   `db:"locked_reason"`
}

type AccountUsername struct {
	Id       string `db:"account_id"`
	Username string `db:"username"`
}

type AccountEmail struct {
	AccountId string `db:"account_id"`
	Email     string `db:"email"`
}

type AccountRepository struct {
	session gocqlx.Session
	client  *redis.Client
}

func NewAccountCassandraRedisRepository(session gocqlx.Session, client *redis.Client) AccountRepository {
	return AccountRepository{session: session, client: client}
}

func marshalUserToDatabase(usr *account.Account) *Account {
	return &Account{
		Id:           usr.ID(),
		Email:        usr.Email(),
		Username:     usr.Username(),
		Roles:        usr.RolesAsString(),
		Avatar:       usr.RawAvatar(),
		Verified:     usr.Verified(),
		LockedUntil:  usr.LockedUntil(),
		Locked:       usr.IsLocked(),
		LockedReason: usr.LockedReason(),
	}
}

// GetAccountById - Get user using the ID
func (r AccountRepository) GetAccountById(ctx context.Context, id string) (*account.Account, error) {
	var accountInstance Account

	queryUser := qb.Select("accounts").
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalOne).
		BindStruct(&Account{
			Id: id,
		})

	if err := queryUser.Get(&accountInstance); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	return account.UnmarshalAccountFromDatabase(
		accountInstance.Id,
		accountInstance.Username,
		accountInstance.Email,
		accountInstance.Roles,
		accountInstance.Verified,
		accountInstance.Avatar,
		accountInstance.Locked,
		accountInstance.LockedUntil,
		accountInstance.LockedReason,
	), nil
}

// GetAccountByEmail - Get user using the email
func (r AccountRepository) GetAccountByEmail(ctx context.Context, email string) (*account.Account, error) {

	// get authentication cookie with this ID
	var accountEmail AccountEmail

	// check if email is in use
	queryEmail := qb.Select("accounts_emails").
		Where(qb.Eq("email")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(&AccountEmail{
			Email: email,
		})

	if err := queryEmail.Get(&accountEmail); err != nil {

		if err == gocql.ErrNotFound {
			return nil, account.ErrAccountNotFound
		}

		return nil, err
	}

	// Get our user using the Account Id, from the user email instance
	usr, err := r.GetAccountById(ctx, accountEmail.AccountId)

	if err != nil {
		return nil, err
	}

	return usr, nil
}

// CreateAccount - Ensure we create a unique user by using lightweight transactions
func (r AccountRepository) CreateAccount(ctx context.Context, instance *account.Account) error {

	// First, we do a unique insert into users_usernames
	// This ensures that we capture the username so nobody else can use it
	usernameEmail := AccountUsername{
		Id: instance.ID(),
		// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
		// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
		Username: strings.ToLower(instance.Username()),
	}

	insertUserEmail := qb.Insert("accounts_usernames").
		Columns("account_id", "username").
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(usernameEmail)

	applied, err := insertUserEmail.ExecCAS()

	// Do our checks to make sure we got a unique username
	if err != nil {
		return fmt.Errorf("ExecCAS() failed: '%s", err)
	}

	if !applied {
		return account.ErrUsernameNotUnique
	}

	email := ""

	// Only add to email table if user is not unclaimed (email is assigned)
	if !instance.IsUnclaimed() {
		// At this point, we know our username is unique & captured, so we
		// now do our insert, but this time with the email
		// note: we don't do a unique check for the email first because if they're on this stage, we already
		// did the check earlier if an account exists with this specific email. however, we will still
		// do a rollback & deletion of the username if the email is already taken, just in case
		accountEmail := AccountEmail{
			Email:     instance.Email(),
			AccountId: instance.ID(),
		}

		// Create a lookup table that will lookup the user using email
		createAccountEmail := qb.Insert("accounts_emails").
			Columns("email", "account_id").
			Unique().
			Query(r.session).
			SerialConsistency(gocql.Serial).
			BindStruct(accountEmail)

		applied, err = createAccountEmail.ExecCAS()

		if err != nil || !applied {

			// There was an error or something, so we want to gracefully recover.
			// Delete our users_usernames entry just in case, so user can try to signup again
			deleteAccountUsername := qb.Delete("accounts_usernames").
				Where(qb.Eq("username")).
				Query(r.session).
				BindStruct(usernameEmail)

			if err := deleteAccountUsername.ExecRelease(); err != nil {
				return fmt.Errorf("delete() failed: '%s", err)
			}

			return account.ErrEmailNotUnique
		}

		emailByAccount := EmailByAccount{
			Email:     instance.Email(),
			AccountId: instance.ID(),
			Status:    1,
		}

		// create a table that holds all of the user's emails
		createAccountByEmail := qb.Insert("emails_by_account").
			Columns("email", "account_id", "status").
			Unique().
			Query(r.session).
			SerialConsistency(gocql.Serial).
			BindStruct(emailByAccount)

		applied, err = createAccountByEmail.ExecCAS()

		if err != nil || !applied {

			// There was an error or something, so we want to gracefully recover.
			// Delete our users_usernames entry just in case, so user can try to signup again
			deleteAccountUsername := qb.Delete("accounts_usernames").
				Where(qb.Eq("username")).
				Query(r.session).
				BindStruct(usernameEmail)

			if err := deleteAccountUsername.ExecRelease(); err != nil {
				return fmt.Errorf("delete() failed: '%s", err)
			}

			deleteAccountEmail := qb.Delete("accounts_emails").
				Where(qb.Eq("email")).
				Query(r.session).
				BindStruct(accountEmail)

			if err := deleteAccountEmail.ExecRelease(); err != nil {
				return fmt.Errorf("delete() failed: '%s", err)
			}

			return account.ErrEmailNotUnique
		}

		email = accountEmail.Email
	}

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	acc := &Account{
		Username: instance.Username(),
		Id:       instance.ID(),
		Email:    email,
		Verified: false,
	}

	insertUser := qb.Insert("accounts").
		Columns("username", "id", "email").
		Unique().
		Query(r.session).
		BindStruct(acc)

	if err := insertUser.ExecRelease(); err != nil {
		return fmt.Errorf("ExecRelease() failed: '%s", err)
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

	// update user
	updateUser := qb.Update("accounts").
		Set(
			"username",
			"email",
			"roles",
			"verified",
			"locked_until",
			"locked",
			"locked_reason",
			"avatar",
		).
		Where(qb.Eq("id")).
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalUserToDatabase(currentUser))

	if err := updateUser.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return currentUser, nil
}
