package adapters

import (
	"context"
	"github.com/getsentry/sentry-go"
	"github.com/go-redis/redis/v8"
	"go.uber.org/zap"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"overdoll/libraries/resource"
	"overdoll/libraries/support"
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
		"avatar_resource",
		"locked",
		"locked_until",
		"deleting",
		"scheduled_deletion_at",
		"scheduled_deletion_workflow_id",
		"deleted",
		"last_username_edit",
		"multi_factor_enabled",
		"created_at",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type accounts struct {
	Id                          string     `db:"id"`
	Username                    string     `db:"username"`
	Email                       string     `db:"email"`
	Roles                       []string   `db:"roles"`
	AvatarResource              string     `db:"avatar_resource"`
	Locked                      bool       `db:"locked"`
	LockedUntil                 *time.Time `db:"locked_until"`
	Deleting                    bool       `db:"deleting"`
	ScheduledDeletionAt         *time.Time `db:"scheduled_deletion_at"`
	ScheduledDeletionWorkflowId *string    `db:"scheduled_deletion_workflow_id"`
	Deleted                     bool       `db:"deleted"`
	LastUsernameEdit            time.Time  `db:"last_username_edit"`
	MultiFactorEnabled          bool       `db:"multi_factor_enabled"`
	CreatedAt                   time.Time  `db:"created_at"`
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

type AccountCassandraRepository struct {
	session gocqlx.Session
	cache   *redis.Client
}

func NewAccountCassandraRedisRepository(session gocqlx.Session, cache *redis.Client) AccountCassandraRepository {
	return AccountCassandraRepository{session: session, cache: cache}
}

func marshalUserToDatabase(usr *account.Account) (*accounts, error) {

	marshalled, err := resource.MarshalResourceToDatabase(usr.AvatarResource())

	if err != nil {
		return nil, err
	}

	return &accounts{
		Id:                          usr.ID(),
		Email:                       usr.Email(),
		Username:                    usr.Username(),
		Roles:                       usr.RolesAsString(),
		AvatarResource:              marshalled,
		LockedUntil:                 usr.LockedUntil(),
		Locked:                      usr.IsLocked(),
		Deleting:                    usr.IsDeleting(),
		Deleted:                     usr.IsDeleted(),
		ScheduledDeletionAt:         usr.ScheduledDeletionAt(),
		ScheduledDeletionWorkflowId: usr.ScheduledDeletionWorkflowId(),
		MultiFactorEnabled:          usr.MultiFactorEnabled(),
		CreatedAt:                   usr.CreatedAt(),
	}, nil
}

func (r AccountCassandraRepository) getAccountById(ctx context.Context, id string) (*accounts, error) {
	var accountInstance accounts

	if err := r.session.
		Query(accountTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalOne).
		Idempotent(true).
		BindStruct(&accounts{
			Id: id,
		}).
		GetRelease(&accountInstance); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("account", id)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get account")
	}

	return &accountInstance, nil
}

// GetAccountById - Get user using the ID

func (r AccountCassandraRepository) GetRawAccountById(ctx context.Context, id string) (*account.Account, error) {

	accountInstance, err := r.getAccountById(ctx, id)

	if err != nil {
		return nil, err
	}

	return account.UnmarshalAccountFromDatabase(
		accountInstance.Id,
		accountInstance.Username,
		accountInstance.Email,
		accountInstance.Roles,
		nil,
		accountInstance.Locked,
		accountInstance.LockedUntil,
		accountInstance.Deleting,
		accountInstance.ScheduledDeletionAt,
		accountInstance.ScheduledDeletionWorkflowId,
		accountInstance.MultiFactorEnabled,
		accountInstance.LastUsernameEdit,
		accountInstance.Deleted,
		accountInstance.CreatedAt,
	), nil
}

// GetAccountsById - get accounts in bulk
func (r AccountCassandraRepository) GetAccountsById(ctx context.Context, ids []string) ([]*account.Account, error) {

	var accountInstances []accounts

	if err := qb.
		Select(accountTable.Name()).
		Where(qb.In("id")).
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalOne).
		Bind(ids).
		SelectRelease(&accountInstances); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get account by id")
	}

	var accounts []*account.Account

	for _, accountInstance := range accountInstances {
		accounts = append(accounts, account.UnmarshalAccountFromDatabase(
			accountInstance.Id,
			accountInstance.Username,
			accountInstance.Email,
			accountInstance.Roles,
			nil,
			accountInstance.Locked,
			accountInstance.LockedUntil,
			accountInstance.Deleting,
			accountInstance.ScheduledDeletionAt,
			accountInstance.ScheduledDeletionWorkflowId,
			accountInstance.MultiFactorEnabled,
			accountInstance.LastUsernameEdit,
			accountInstance.Deleted,
			accountInstance.CreatedAt,
		))
	}

	return accounts, nil
}

// GetAccountByEmail - Get user using the email
func (r AccountCassandraRepository) GetAccountByEmail(ctx context.Context, email string) (*account.Account, error) {

	// get authentication cookie with this ID
	var accEmail accountEmail

	if err := r.session.
		Query(accountEmailTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&accountEmail{
			Email: strings.ToLower(email),
		}).
		Get(&accEmail); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("account - email", email)
		}
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get account by email")
	}

	// Get our user using the accounts AccountId, from the user email instance
	usr, err := r.GetRawAccountById(ctx, accEmail.AccountId)

	if err != nil {
		return nil, err
	}

	return usr, nil
}

func (r AccountCassandraRepository) createUniqueAccountUsername(ctx context.Context, instance *account.Account, username string) error {
	// First, we do a unique insert into users_usernames
	// This ensures that we capture the username so nobody else can use it

	applied, err := accountUsernameTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.LocalSerial).
		BindStruct(AccountUsername{
			AccountId: instance.ID(),
			// This piece of data, we want to make sure we use as lowercase, to make sure we don't get collisions
			// This table always has the username of a user, in lowercase format to make sure that we always have unique usernames
			Username: strings.ToLower(username),
		}).
		ExecCASRelease()

	// Do our checks to make sure we got a unique username
	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique username")
	}

	if !applied {
		return account.ErrUsernameNotUnique
	}

	return nil
}

// AddAccountEmail - add an email to the account
func (r AccountCassandraRepository) deleteAccountUsername(ctx context.Context, accountId, username string) error {

	applied, err := accountUsernameTable.
		DeleteBuilder().
		Existing().
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(AccountUsername{
			Username: strings.TrimSpace(strings.ToLower(username)),
		}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete unique username")
	}

	if !applied {
		return errors.Wrap(support.NewGocqlTransactionError(), "could not delete unique username")
	}

	return nil
}

func (r AccountCassandraRepository) createUniqueAccountEmail(ctx context.Context, accountId string, email string) error {

	applied, err := accountEmailTable.
		InsertBuilder().
		Unique().
		Query(r.session).
		WithContext(ctx).
		SerialConsistency(gocql.Serial).
		BindStruct(accountEmail{
			Email:     strings.ToLower(email),
			AccountId: accountId,
		}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to create unique email")
	}

	if !applied {
		return account.ErrEmailNotUnique
	}

	return nil
}

func (r AccountCassandraRepository) deleteAccountEmail(ctx context.Context, accountId, email string) error {

	batch := r.session.NewBatch(gocql.LoggedBatch)

	// delete username
	stmt, _ := emailByAccountTable.Delete()

	batch.Query(stmt, accountId, email)

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete account email")
	}

	applied, err := accountEmailTable.
		DeleteBuilder().
		Existing().
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(accountEmail{
			Email: strings.ToLower(email),
		}).
		ExecCASRelease()

	if err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete account email")
	}

	if !applied {
		return errors.Wrap(support.NewGocqlTransactionError(), "failed to delete account email")
	}

	return nil
}

// CreateAccount - Ensure we create a unique user by using lightweight transactions
func (r AccountCassandraRepository) CreateAccount(ctx context.Context, instance *account.Account) error {

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

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

	// create a table that holds all the user's emails
	stmt, names := emailByAccountTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		emailByAccount{
			Email:     instance.Email(),
			AccountId: instance.ID(),
			Status:    2,
		},
	)

	acc, err := marshalUserToDatabase(instance)

	if err != nil {
		return err
	}

	// Create a lookup table that will be used to find the user using their unique ID
	// Will also contain all major information about the user such as permissions, etc...
	stmt, names = accountTable.Insert()
	support.BindStructToBatchStatement(
		batch,
		stmt, names,
		acc,
	)

	support.MarkBatchIdempotent(batch)
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

		return errors.Wrap(support.NewGocqlError(err), "failed to create account")
	}

	// set the scope of the account that was created
	if hub := sentry.GetHubFromContext(ctx); hub != nil {
		hub.Scope().SetUser(sentry.User{
			ID:       instance.ID(),
			Username: instance.Username(),
		})
	}

	return nil
}

func (r AccountCassandraRepository) updateAccount(ctx context.Context, id string, updateFn func(usr *account.Account) error, columns []string) (*account.Account, error) {

	currentUser, err := r.GetRawAccountById(ctx, id)

	if err != nil {
		return nil, err
	}

	if err = updateFn(currentUser); err != nil {
		return nil, err
	}

	marshalled, err := marshalUserToDatabase(currentUser)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(
			accountTable.Update(
				columns...,
			),
		).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalled).
		Idempotent(true).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to update account")
	}

	if err := r.clearAccountCache(ctx, id); err != nil {
		return nil, err
	}

	return currentUser, nil
}

func (r AccountCassandraRepository) UpdateAccount(ctx context.Context, id string, updateFn func(usr *account.Account) error) (*account.Account, error) {
	return r.updateAccount(ctx, id, updateFn, []string{
		"username",
		"email",
		"roles",
		"locked_until",
		"locked",
		"avatar_resource",
		"multi_factor_enabled",
	})
}

func (r AccountCassandraRepository) UpdateAccountDeleting(ctx context.Context, accountId string, updateFn func(account *account.Account) error) (*account.Account, error) {
	return r.updateAccount(ctx, accountId, updateFn, []string{
		"deleting",
		"scheduled_deletion_at",
		"scheduled_deletion_workflow_id",
	})
}

func (r AccountCassandraRepository) UpdateAccountDeleted(ctx context.Context, accountId string, updateFn func(account *account.Account) error) (*account.Account, error) {
	return r.updateAccount(ctx, accountId, updateFn, []string{
		"deleted",
	})
}

func (r AccountCassandraRepository) DeleteAccountData(ctx context.Context, accountId string) error {

	acc, err := r.getAccountById(ctx, accountId)

	if err != nil {
		return err
	}

	if err := r.deleteAccountEmail(ctx, accountId, acc.Email); err != nil {
		return err
	}

	if err := r.deleteAccountUsername(ctx, accountId, acc.Username); err != nil {
		return err
	}

	if err := r.session.
		Query(emailByAccountTable.Delete()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&emailByAccount{
			AccountId: accountId,
		}).
		Idempotent(true).
		ExecRelease(); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete account emails")
	}

	acc.Email = ""
	acc.Username = "[deleted]"
	acc.AvatarResource = ""
	acc.MultiFactorEnabled = false

	if err := r.session.
		Query(
			accountTable.Update(
				"email",
				"username",
				"avatar_resource",
			),
		).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(acc).
		Idempotent(true).
		ExecRelease(); err != nil {
		zap.S().Errorw("failed to update account", zap.Error(err))
		return errors.Wrap(support.NewGocqlError(err), "failed to update account")
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := qb.Delete(accountMultiFactorRecoveryCodeTable.Name()).
		Where(qb.Eq("account_id")).ToCql()

	batch.Query(stmt, accountId)

	stmt, _ = accountMultiFactorTotpTable.Delete()

	batch.Query(stmt, accountId)

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return errors.Wrap(support.NewGocqlError(err), "failed to delete multi factor account data")
	}

	if err := r.clearAccountCache(ctx, accountId); err != nil {
		return err
	}

	return nil
}

// UpdateAccountUsername - modify the username for the account - will either modify username by adding new entries (if it's a completely new username)
// or just change the casings
func (r AccountCassandraRepository) UpdateAccountUsername(ctx context.Context, requester *principal.Principal, id string, updateFn func(usr *account.Account) error) (*account.Account, error) {

	instance, err := r.GetRawAccountById(ctx, id)

	if err != nil {
		return nil, err
	}

	if err := instance.CanUpdateUsername(requester); err != nil {
		return nil, err
	}

	oldUsername := instance.Username()

	if err := updateFn(instance); err != nil {
		return nil, err
	}

	// username doesn't belong to the account, make sure it's not taken by someone else first
	_, err = r.GetAccountByUsername(ctx, instance.Username())

	if err != nil {

		if !apperror.IsNotFoundError(err) {
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

		batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

		stmt, names := accountTable.UpdateBuilder().Set("username", "last_username_edit").ToCql()

		support.BindStructToBatchStatement(
			batch,
			stmt, names,
			accounts{
				Id:               instance.ID(),
				Username:         instance.Username(),
				LastUsernameEdit: instance.LastUsernameEdit(),
			},
		)

		support.MarkBatchIdempotent(batch)
		if err := r.session.ExecuteBatch(batch); err != nil {

			if err := r.deleteAccountUsername(ctx, instance.ID(), instance.Username()); err != nil {
				return nil, err
			}

			return nil, errors.Wrap(support.NewGocqlError(err), "failed to update account username")
		}

		if err := r.clearAccountCache(ctx, id); err != nil {
			return nil, err
		}

		return instance, nil

	}

	return nil, account.ErrUsernameNotUnique
}

// GetAccountByUsername - Get user using the username
func (r AccountCassandraRepository) GetAccountByUsername(ctx context.Context, username string) (*account.Account, error) {

	// get authentication cookie with this ID
	var accountUsername AccountUsername

	// check if email is in use
	if err := r.session.
		Query(accountUsernameTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		Idempotent(true).
		BindStruct(&AccountUsername{
			Username: strings.ToLower(username),
		}).
		Get(&accountUsername); err != nil {
		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("account - username", username)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get account by username")
	}

	// Get our user using the accounts AccountId, from the user email instance
	usr, err := r.GetRawAccountById(ctx, accountUsername.AccountId)

	if err != nil {
		return nil, err
	}

	return usr, nil
}

// GetAccountEmail - get an email for a single account
func (r AccountCassandraRepository) GetAccountEmail(ctx context.Context, requester *principal.Principal, accountId, email string) (*account.Email, error) {

	var accountEmail emailByAccount

	// get account emails and status
	if err := r.session.
		Query(emailByAccountTable.Get()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		Idempotent(true).
		BindStruct(&emailByAccount{
			AccountId: accountId,
			Email:     email,
		}).
		Get(&accountEmail); err != nil {

		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("account", accountId)
		}
		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get email by account")
	}

	result := account.UnmarshalEmailFromDatabase(accountEmail.Email, accountEmail.AccountId, accountEmail.Status)

	if err := result.CanView(requester); err != nil {
		return nil, err
	}

	return result, nil
}

// GetAccountEmails - get emails for account
func (r AccountCassandraRepository) GetAccountEmails(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*account.Email, error) {

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

	if err := builder.
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(data).
		SelectRelease(&accountEmails); err != nil {
		if err == gocql.ErrNotFound {
			return nil, apperror.NewNotFoundError("account", accountId)
		}

		return nil, errors.Wrap(support.NewGocqlError(err), "failed to get emails by account")
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
func (r AccountCassandraRepository) DeleteAccountEmail(ctx context.Context, requester *principal.Principal, accountId, email string) error {

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
func (r AccountCassandraRepository) UpdateAccountMakeEmailPrimary(ctx context.Context, requester *principal.Principal, accountId string, updateFn func(usr *account.Account, ems []*account.Email) error) (*account.Account, *account.Email, error) {

	acc, err := r.GetRawAccountById(ctx, accountId)

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
		return nil, nil, domainerror.NewValidation("email not found")
	}

	batch := r.session.NewBatch(gocql.LoggedBatch).WithContext(ctx)

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

	support.MarkBatchIdempotent(batch)
	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, nil, errors.Wrap(support.NewGocqlError(err), "failed to make email primary")
	}

	if err := r.clearAccountCache(ctx, accountId); err != nil {
		return nil, nil, err
	}

	return acc, newEmail, nil
}

func (r AccountCassandraRepository) CreateAccountEmail(ctx context.Context, requester *principal.Principal, email *account.Email) error {
	// check to make sure this email is not taken
	existingAcc, err := r.GetAccountByEmail(ctx, email.Email())

	if err != nil && !apperror.IsNotFoundError(err) {
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
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		Idempotent(true).
		BindStruct(emailByAccount{
			Email:     email.Email(),
			AccountId: email.AccountId(),
			Status:    1,
		}).
		ExecRelease(); err != nil {
		if err := r.deleteAccountEmail(ctx, email.AccountId(), email.Email()); err != nil {
			return err
		}
		return errors.Wrap(support.NewGocqlError(err), "failed to add account email")
	}

	return nil
}
