package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/go-redis/redis/v8"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/crypt"
)

const (
	authenticationTokenPrefix = "authToken:"
)

type authenticationToken struct {
	Email    string `json:"email"`
	Redeemed int    `json:"redeemed"`
	Session  string `json:"session"`
}

type AuthenticationTokenRepository struct {
	client *redis.Client
}

func NewAuthenticationTokenRedisRepository(client *redis.Client) AuthenticationTokenRepository {
	return AuthenticationTokenRepository{client: client}
}

// GetCookieById - Get authentication cookie by ID
func (r AuthenticationTokenRepository) GetAuthenticationTokenById(ctx context.Context, id string) (*token.AuthenticationToken, error) {

	val, err := r.client.Get(ctx, authenticationTokenPrefix+id).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, token.ErrTokenNotFound
		}

		return nil, fmt.Errorf("failed to get authentication token id: %v", err)
	}

	val, err = crypt.Decrypt(val)

	if err != nil {
		return nil, fmt.Errorf("failed to decrypt token: %v", err)
	}

	var cookieItem authenticationToken

	if err := json.Unmarshal([]byte(val), &cookieItem); err != nil {
		return nil, fmt.Errorf("failed to unmarshal token: %v", err)
	}

	return token.UnmarshalAuthenticationTokenFromDatabase(
		id,
		cookieItem.Email,
		cookieItem.Redeemed == 1,
		cookieItem.Session,
	), nil
}

// DeleteCookieById - Delete cookie by ID
func (r AuthenticationTokenRepository) DeleteAuthenticationTokenById(ctx context.Context, id string) error {

	_, err := r.client.Del(ctx, authenticationTokenPrefix+id).Result()

	if err != nil {
		return fmt.Errorf("failed to delete token: %v", err)
	}

	return nil
}

// CreateCookie - Create a authenticationToken
func (r AuthenticationTokenRepository) CreateAuthenticationToken(ctx context.Context, instance *token.AuthenticationToken) error {

	// run a query to create the authentication token
	authCookie := &authenticationToken{
		Email:    instance.Email(),
		Redeemed: 0,
		Session:  instance.Session(),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return fmt.Errorf("failed to marshal token: %v", err)
	}

	newVal, err := crypt.Encrypt(string(val))

	if err != nil {
		return fmt.Errorf("failed to encrypt token: %v", err)
	}

	ok, err := r.client.SetNX(ctx, authenticationTokenPrefix+instance.Token(), newVal, instance.Expiration()).Result()

	if err != nil {
		return fmt.Errorf("failed to create token: %v", err)
	}

	if !ok {
		return errors.New("duplicate key")
	}

	return nil
}

func (r AuthenticationTokenRepository) UpdateAuthenticationToken(ctx context.Context, cookieId string, updateFn func(instance *token.AuthenticationToken) error) (*token.AuthenticationToken, error) {

	instance, err := r.GetAuthenticationTokenById(ctx, cookieId)

	if err != nil {
		return nil, err
	}

	err = updateFn(instance)

	if err != nil {
		return nil, err
	}

	redeemed := 0

	if instance.Verified() {
		redeemed = 1
	}

	// get authentication cookie with this ID
	authCookie := &authenticationToken{
		Redeemed: redeemed,
		Email:    instance.Email(),
		Session:  instance.Session(),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return nil, fmt.Errorf("failed to marshal token: %v", err)
	}

	newVal, err := crypt.Encrypt(string(val))

	if err != nil {
		return nil, fmt.Errorf("failed to encrypt token: %v", err)
	}

	_, err = r.client.Set(ctx, authenticationTokenPrefix+instance.Token(), newVal, instance.Expiration()).Result()

	if err != nil {
		return nil, fmt.Errorf("failed to update token: %v", err)
	}

	return instance, nil
}
