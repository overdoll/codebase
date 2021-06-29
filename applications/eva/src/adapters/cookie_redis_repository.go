package adapters

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/go-redis/redis/v8"
	"overdoll/applications/eva/src/domain/cookie"
)

const (
	CookiePrefix = "authCookie:"
)

type AuthenticationCookie struct {
	Email    string `json:"email"`
	Redeemed int    `json:"redeemed"`
	Session  string `json:"session"`
}

type CookieRepository struct {
	client *redis.Client
}

func NewCookieRedisRepository(client *redis.Client) CookieRepository {
	return CookieRepository{client: client}
}

// GetCookieById - Get authentication cookie by ID
func (r CookieRepository) GetCookieById(ctx context.Context, id string) (*cookie.Cookie, error) {

	val, err := r.client.Get(ctx, CookiePrefix+id).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, cookie.ErrCookieNotFound
		}

		return nil, fmt.Errorf("get failed: '%s", err)
	}

	var cookieItem AuthenticationCookie

	if err := json.Unmarshal([]byte(val), &cookieItem); err != nil {
		return nil, err
	}

	return cookie.UnmarshalCookieFromDatabase(
		id,
		cookieItem.Email,
		cookieItem.Redeemed == 1,
		cookieItem.Session,
	), nil
}

// DeleteCookieById - Delete cookie by ID
func (r CookieRepository) DeleteCookieById(ctx context.Context, id string) error {

	_, err := r.client.Del(ctx, CookiePrefix+id).Result()

	if err != nil {
		return fmt.Errorf("del failed: '%s", err)
	}

	return nil
}

// CreateCookie - Create a Cookie
func (r CookieRepository) CreateCookie(ctx context.Context, instance *cookie.Cookie) error {

	// run a query to create the authentication token
	authCookie := &AuthenticationCookie{
		Email:    instance.Email(),
		Redeemed: 0,
		Session:  instance.Session(),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return err
	}

	_, err = r.client.SetNX(ctx, CookiePrefix+instance.Cookie(), val, instance.Expiration()).Result()

	if err != nil {
		return fmt.Errorf("set failed: '%s", err)
	}

	return nil
}

func (r CookieRepository) UpdateCookie(ctx context.Context, instance *cookie.Cookie) error {

	redeemed := 0

	if instance.Redeemed() {
		redeemed = 1
	}

	// get authentication cookie with this ID
	authCookie := &AuthenticationCookie{
		Redeemed: redeemed,
		Email:    instance.Email(),
		Session:  instance.Session(),
	}

	val, err := json.Marshal(authCookie)

	if err != nil {
		return err
	}

	_, err = r.client.SetNX(ctx, CookiePrefix+instance.Cookie(), val, instance.Expiration()).Result()

	if err != nil {
		return fmt.Errorf("set failed: '%s", err)
	}

	return nil
}
