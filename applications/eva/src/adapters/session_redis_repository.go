package adapters

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	"github.com/go-redis/redis/v8"
	"overdoll/applications/eva/src/domain/session"
	"overdoll/libraries/crypt"
)

const (
	SessionPrefix = "sess:"
)

type Session struct {
	Ip        string `json:"ip"`
	UserAgent string `json:"userAgent"`
	Created   string `json:"created"`
}

type SessionRepository struct {
	client *redis.Client
}

func NewSessionRepository(client *redis.Client) SessionRepository {
	return SessionRepository{client: client}
}

// GetSessionsByAccountId - Get sessions
func (r SessionRepository) GetSessionsByAccountId(ctx context.Context, accountId string) ([]*session.Session, error) {

	keys, err := r.client.Keys(ctx, SessionPrefix+"*:"+accountId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, session.ErrSessionsNotFound
		}

		return nil, fmt.Errorf("keys failed: '%s", err)
	}

	var sessions []*session.Session

	for _, key := range keys {

		// get each key's value
		val, err := r.client.Get(ctx, key).Result()

		if err != nil {
			return nil, err
		}

		var sessionItem Session

		if err := json.Unmarshal([]byte(val), &sessionItem); err != nil {
			return nil, err
		}

		// we grab the SessionID, which is the middle of the array
		sessionID := strings.Split(key, ":")

		// we want to encrypt our session key
		encryptedKey := crypt.Encrypt([]byte(sessionID[1]), os.Getenv("APP_KEY"))

		session.UnmarshalSessionFromDatabase(string(encryptedKey), sessionItem.UserAgent, sessionItem.Ip, sessionItem.Created)
	}

	return sessions, nil
}

// RevokeSessionById - revoke session
func (r SessionRepository) RevokeSessionById(ctx context.Context, accountId, sessionId string) error {

	// decrypt, since we send it as encrypted
	key := crypt.Decrypt([]byte(sessionId), os.Getenv("APP_KEY"))
	// make sure that we delete the session that belongs to this user only
	_, err := r.client.Del(ctx, SessionPrefix+string(key)+":"+accountId).Result()

	if err != nil {

		if err == redis.Nil {
			return session.ErrSessionsNotFound
		}

		return fmt.Errorf("keys failed: '%s", err)
	}

	return nil
}
