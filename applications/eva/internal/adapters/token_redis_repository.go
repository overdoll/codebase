package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/passport"

	"github.com/go-redis/redis/v8"
	"overdoll/applications/eva/internal/domain/token"
	"overdoll/libraries/crypt"
)

const (
	authenticationTokenPrefix = "authToken:"
)

type authenticationToken struct {
	Email     string                `json:"email"`
	Verified  int                   `json:"verified"`
	IP        string                `json:"ip"`
	UniqueId  string                `json:"uniqueId"`
	DeviceId  string                `json:"deviceId"`
	UserAgent string                `json:"userAgent"`
	Location  location.Serializable `json:"location"`
}

type AuthenticationTokenRepository struct {
	client *redis.Client
}

func NewAuthenticationTokenRedisRepository(client *redis.Client) AuthenticationTokenRepository {
	return AuthenticationTokenRepository{client: client}
}

// GetAuthenticationToken - Get authentication cookie by ID
func (r AuthenticationTokenRepository) GetAuthenticationToken(ctx context.Context, passport *passport.Passport, tk string, secret *string) (*token.AuthenticationToken, error) {

	val, err := r.client.WithContext(ctx).Get(ctx, authenticationTokenPrefix+tk).Result()

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

	instance := token.UnmarshalAuthenticationTokenFromDatabase(
		tk,
		cookieItem.Email,
		cookieItem.Verified == 1,
		cookieItem.UserAgent,
		cookieItem.IP,
		cookieItem.DeviceId,
		location.UnmarshalLocationFromSerialized(cookieItem.Location),
		cookieItem.UniqueId,
	)

	if err := instance.CanView(passport, secret); err != nil {
		return nil, err
	}

	return instance, nil
}

// DeleteAuthenticationToken - Delete cookie by ID
func (r AuthenticationTokenRepository) DeleteAuthenticationToken(ctx context.Context, passport *passport.Passport, id string, secret *string) error {

	tk, err := r.GetAuthenticationToken(ctx, passport, id, secret)

	if err != nil {
		return err
	}

	if err := tk.CanDelete(passport, secret); err != nil {
		return err
	}

	_, err = r.client.WithContext(ctx).Del(ctx, authenticationTokenPrefix+id).Result()

	if err != nil {
		return fmt.Errorf("failed to delete token: %v", err)
	}

	return nil
}

// CreateAuthenticationToken - Create a authenticationToken
func (r AuthenticationTokenRepository) CreateAuthenticationToken(ctx context.Context, instance *token.AuthenticationToken) error {

	// run a query to create the authentication token
	authCookie := &authenticationToken{
		IP:        instance.IP(),
		Email:     "",
		Verified:  0,
		UserAgent: instance.UserAgent(),
		DeviceId:  instance.DeviceId(),
		Location:  location.Serialize(instance.Location()),
		UniqueId:  instance.UniqueId(),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return fmt.Errorf("failed to marshal token: %v", err)
	}

	newVal, err := crypt.Encrypt(string(val))

	if err != nil {
		return fmt.Errorf("failed to encrypt token: %v", err)
	}

	ok, err := r.client.WithContext(ctx).SetNX(ctx, authenticationTokenPrefix+instance.Token(), newVal, instance.Expiration()).Result()

	if err != nil {
		return fmt.Errorf("failed to create token: %v", err)
	}

	if !ok {
		return errors.New("duplicate key")
	}

	return nil
}

func (r AuthenticationTokenRepository) UpdateAuthenticationToken(ctx context.Context, passport *passport.Passport, id, secret string, updateFn func(instance *token.AuthenticationToken) error) (*token.AuthenticationToken, error) {

	instance, err := r.GetAuthenticationToken(ctx, passport, id, &secret)

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

	email, err := instance.ViewEmailWithSecret(secret)

	if err != nil {
		return nil, err
	}

	// get authentication cookie with this ID
	authCookie := &authenticationToken{
		IP:        instance.IP(),
		Verified:  redeemed,
		DeviceId:  instance.DeviceId(),
		Email:     email,
		UserAgent: instance.UserAgent(),
		Location:  location.Serialize(instance.Location()),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return nil, fmt.Errorf("failed to marshal token: %v", err)
	}

	newVal, err := crypt.Encrypt(string(val))

	if err != nil {
		return nil, fmt.Errorf("failed to encrypt token: %v", err)
	}

	_, err = r.client.WithContext(ctx).Set(ctx, authenticationTokenPrefix+instance.Token(), newVal, instance.Expiration()).Result()

	if err != nil {
		return nil, fmt.Errorf("failed to update token: %v", err)
	}

	return instance, nil
}
