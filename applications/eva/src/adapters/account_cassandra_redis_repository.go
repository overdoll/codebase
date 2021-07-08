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
	Id                 string   `db:"id"`
	Username           string   `db:"username"`
	Email              string   `db:"email"`
	Roles              []string `db:"roles"`
	Verified           bool     `db:"verified"`
	Avatar             string   `db:"avatar"`
	Locked             bool     `db:"locked"`
	LockedUntil        int      `db:"locked_until"`
	LockedReason       string   `db:"locked_reason"`
	LastUsernameEdit   int      `db:"last_username_edit"`
	MultiFactorEnabled bool     `db:"multi_factor_enabled"`
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
		Id:                 usr.ID(),
		Email:              usr.Email(),
		Username:           usr.Username(),
		Roles:              usr.RolesAsString(),
		Avatar:             usr.RawAvatar(),
		Verified:           usr.Verified(),
		LockedUntil:        usr.LockedUntil(),
		Locked:             usr.IsLocked(),
		LockedReason:       usr.LockedReason(),
		MultiFactorEnabled: usr.MultiFactorEnabled(),
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
		accountInstance.MultiFactorEnabled,
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

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// First, we do a unique insert into users_usernames
	// This ensures that we capture the username so nobody else can use it
	q := qb.Insert("accounts_usernames").
		Columns("account_id", "username").
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(AccountUsername{
			Id: instance.ID(),
			// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
			// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
			Username: strings.ToLower(instance.Username()),
		})

	batch.Query(q.Statement())

	q = qb.Insert("usernames_by_account").
		Columns("account_id", "username").
		Unique().
		Query(r.session).
		SerialConsistency(gocql.Serial).
		BindStruct(AccountUsername{
			Id:       instance.ID(),
			Username: instance.Username(),
		})

	batch.Query(q.Statement())

	email := ""

	// Only add to email table if user is not unclaimed (email is assigned)
	if !instance.IsUnclaimed() {

		// At this point, we know our username is unique & captured, so we
		// now do our insert, but this time with the email
		// note: we don't do a unique check for the email first because if they're on this stage, we already
		// did the check earlier if an account exists with this specific email. however, we will still
		// do a rollback & deletion of the username if the email is already taken, just in case
		q = qb.Insert("accounts_emails").
			Columns("email", "account_id").
			Unique().
			Query(r.session).
			SerialConsistency(gocql.Serial).
			BindStruct(AccountEmail{
				Email:     instance.Email(),
				AccountId: instance.ID(),
			})

		batch.Query(q.Statement())

		// create a table that holds all of the user's emails
		q = qb.Insert("emails_by_account").
			Columns("email", "account_id", "status").
			Unique().
			Query(r.session).
			SerialConsistency(gocql.Serial).
			BindStruct(EmailByAccount{
				Email:     instance.Email(),
				AccountId: instance.ID(),
				Status:    1,
			})

		batch.Query(q.Statement())

		email = instance.Username()
	}

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	q = qb.Insert("accounts").
		Columns("username", "id", "email").
		Unique().
		Query(r.session).
		BindStruct(&Account{
			Username: instance.Username(),
			Id:       instance.ID(),
			Email:    email,
			Verified: false,
		})

	batch.Query(q.Statement())

	if err := r.session.ExecuteBatch(batch); err == nil {
		return fmt.Errorf("batch() failed: %s", err)
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
			"multi_factor_enabled",
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
