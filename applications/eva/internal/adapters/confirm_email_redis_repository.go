package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/go-redis/redis/v8"
	"overdoll/applications/eva/internal/domain/account"
	"overdoll/applications/eva/internal/domain/confirm_email"
	"overdoll/libraries/crypt"
	"overdoll/libraries/principal"
)

type emailConfirmation struct {
	Email     string `json:"email"`
	AccountId string `json:"account_id"`
}

const (
	confirmEmailPrefix = "confirmEmail:"
)

type ConfirmEmailRedisRepository struct {
	client *redis.Client
}

func NewConfirmEmailRedisRepository(client *redis.Client) ConfirmEmailRedisRepository {
	return ConfirmEmailRedisRepository{client: client}
}

func (r ConfirmEmailRedisRepository) DeleteConfirmEmail(ctx context.Context, requester *principal.Principal, confirmEmail *confirm_email.ConfirmEmail) error {

	if err := confirmEmail.CanDelete(requester); err != nil {
		return err
	}

	// delete confirmation (it has been used up)
	_, err := r.client.WithContext(ctx).Del(ctx, confirmEmailPrefix+confirmEmail.ID()).Result()

	if err != nil {
		return fmt.Errorf("failed delete confirm email - delete redis key: %v", err)
	}

	return nil
}

func (r ConfirmEmailRedisRepository) AddConfirmEmail(ctx context.Context, confirmEmail *confirm_email.ConfirmEmail) error {

	authCookie := &emailConfirmation{
		Email:     confirmEmail.Email(),
		AccountId: confirmEmail.AccountId(),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return fmt.Errorf("failed to add confirm email - json marshal: %v", err)
	}

	valReal, err := crypt.Encrypt(string(val))

	if err != nil {
		return fmt.Errorf("failed to add confirm email - encryption: %v", err)
	}

	ok, err := r.client.WithContext(ctx).SetNX(ctx, confirmEmailPrefix+confirmEmail.ID(), valReal, confirmEmail.Expires()).Result()

	if err != nil {
		return fmt.Errorf("failed to add confirm email - redis: %v", err)
	}

	if !ok {
		return fmt.Errorf("failed to add confirm email - duplicate key: %s", confirmEmailPrefix+confirmEmail.ID())
	}

	return nil
}

func (r ConfirmEmailRedisRepository) GetConfirmEmail(ctx context.Context, requester *principal.Principal, id string) (*confirm_email.ConfirmEmail, error) {

	val, err := r.client.WithContext(ctx).Get(ctx, confirmEmailPrefix+id).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, account.ErrEmailCodeInvalid
		}

		return nil, fmt.Errorf("failed to get confirm email - redis: %v", err)
	}

	val, err = crypt.Decrypt(val)

	if err != nil {
		return nil, fmt.Errorf("failed to get confirm email - decryption: %v", err)
	}

	var confirmItem emailConfirmation

	if err := json.Unmarshal([]byte(val), &confirmItem); err != nil {
		return nil, fmt.Errorf("failed to get confirm email - unmarshal: %v", err)
	}

	return confirm_email.UnmarshalConfirmEmailFromDatabase(id, confirmItem.Email, confirmItem.AccountId), nil

}
