package adapters

import (
	"context"
	"encoding/json"
	"github.com/go-redis/redis/v8"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/libraries/crypt"
	"overdoll/libraries/errors"
	"time"
)

const (
	accountPrefix = "account:"
)

var (
	errCacheNotFound = errors.New("account cache not found")
)

type accountsSerialized struct {
	Id                          string     `json:"id"`
	Username                    string     `json:"username"`
	Email                       string     `json:"email"`
	Roles                       []string   `json:"roles"`
	AvatarResource              string     `json:"avatar_resource"`
	Locked                      bool       `json:"locked"`
	LockedUntil                 *time.Time `json:"locked_until"`
	Deleting                    bool       `json:"deleting"`
	ScheduledDeletionAt         *time.Time `json:"scheduled_deletion_at"`
	ScheduledDeletionWorkflowId *string    `json:"scheduled_deletion_workflow_id"`
	Deleted                     bool       `json:"deleted"`
	LastUsernameEdit            time.Time  `json:"last_username_edit"`
	MultiFactorEnabled          bool       `json:"multi_factor_enabled"`
	CreatedAt                   time.Time  `json:"created_at"`
}

func (r AccountCassandraRepository) cacheAccount(ctx context.Context, accountId string, acc *account.Account) error {

	cachedAccount := &accountsSerialized{
		Id:                          acc.ID(),
		Username:                    acc.Username(),
		Email:                       acc.Email(),
		Roles:                       acc.RolesAsString(),
		AvatarResource:              "",
		Locked:                      acc.Locked(),
		LockedUntil:                 acc.LockedUntil(),
		Deleting:                    acc.IsDeleting(),
		ScheduledDeletionAt:         acc.ScheduledDeletionAt(),
		ScheduledDeletionWorkflowId: acc.ScheduledDeletionWorkflowId(),
		Deleted:                     acc.IsDeleted(),
		LastUsernameEdit:            acc.LastUsernameEdit(),
		MultiFactorEnabled:          acc.MultiFactorEnabled(),
		CreatedAt:                   acc.CreatedAt(),
	}

	val, err := json.Marshal(cachedAccount)

	if err != nil {
		return errors.Wrap(err, "failed to cache account - json marshal")
	}

	valReal, err := crypt.Encrypt(string(val))

	if err != nil {
		return errors.Wrap(err, "failed to cache account - encryption")
	}

	// cache for 24 hours
	_, err = r.cache.WithContext(ctx).Set(ctx, accountPrefix+accountId, valReal, time.Hour*24).Result()

	if err != nil {
		return errors.Wrap(err, "failed to cache account - redis")
	}

	return nil
}

func (r AccountCassandraRepository) clearAccountCache(ctx context.Context, accountId string) error {

	_, err := r.cache.WithContext(ctx).Del(ctx, accountPrefix+accountId).Result()

	if err != nil {
		return errors.Wrap(err, "failed delete account - delete redis key")
	}

	return nil
}

func (r AccountCassandraRepository) getAccountByIdFromCache(ctx context.Context, accountId string) (*account.Account, error) {

	val, err := r.cache.WithContext(ctx).Get(ctx, accountPrefix+accountId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, errCacheNotFound
		}

		return nil, errors.Wrap(err, "failed to get account - redis")
	}

	val, err = crypt.Decrypt(val)

	if err != nil {
		return nil, errors.Wrap(err, "failed to get account - decryption")
	}

	var accountCached accountsSerialized

	if err := json.Unmarshal([]byte(val), &accountCached); err != nil {
		return nil, errors.Wrap(err, "failed to get account - unmarshal")
	}

	return account.UnmarshalAccountFromDatabase(
		accountCached.Id,
		accountCached.Username,
		accountCached.Email,
		accountCached.Roles,
		nil,
		accountCached.Locked,
		accountCached.LockedUntil,
		accountCached.Deleting,
		accountCached.ScheduledDeletionAt,
		accountCached.ScheduledDeletionWorkflowId,
		accountCached.MultiFactorEnabled,
		accountCached.LastUsernameEdit,
		accountCached.Deleted,
		accountCached.CreatedAt,
	), nil
}

func (r AccountCassandraRepository) GetAccountById(ctx context.Context, accountId string) (*account.Account, error) {

	cached, err := r.getAccountByIdFromCache(ctx, accountId)

	if err != nil && err != errCacheNotFound {
		return nil, err
	}

	if cached != nil {
		return cached, nil
	}

	accountInstance, err := r.getAccountById(ctx, accountId)

	if err != nil {
		return nil, err
	}

	accountUnmarshalled := account.UnmarshalAccountFromDatabase(
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
	)

	if err := r.cacheAccount(ctx, accountId, accountUnmarshalled); err != nil {
		return nil, err
	}

	return accountUnmarshalled, nil
}
