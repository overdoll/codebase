package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/segmentio/ksuid"
	"overdoll/applications/eva/src/domain/session"
	"overdoll/libraries/crypt"
)

const (
	SessionPrefix = "session:"
	AccountPrefix = "account:"
)

type Session struct {
	Passport string `json:"passport"`
	Details  SessionDetails
}

type SessionDetails struct {
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

// getSessionById - get session by ID
func (r SessionRepository) getSessionById(ctx context.Context, sessionId string) (*session.Session, error) {

	val, err := r.client.Get(ctx, sessionId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, session.ErrSessionsNotFound
		}

		return nil, fmt.Errorf("keys failed: '%s", err)
	}

	// decrypt session - since value is initially encrypted
	details := crypt.DecryptSession(val)

	var sessionItem Session

	if err := json.Unmarshal([]byte(details), &sessionItem); err != nil {
		return nil, err
	}

	// we want to encrypt our session key
	encryptedKey := crypt.Encrypt(sessionId)

	return session.UnmarshalSessionFromDatabase(encryptedKey, sessionItem.Passport, sessionItem.Details.UserAgent, sessionItem.Details.Ip, sessionItem.Details.Created), nil
}

// GetSessionsByAccountId - Get sessions
func (r SessionRepository) GetSessionsByAccountId(ctx context.Context, accountId string) ([]*session.Session, error) {

	keys, err := r.client.Keys(ctx, SessionPrefix+"*:"+AccountPrefix+accountId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, session.ErrSessionsNotFound
		}

		return nil, fmt.Errorf("keys failed: '%s", err)
	}

	var sessions []*session.Session

	for _, sessionID := range keys {
		sess, err := r.getSessionById(ctx, sessionID)

		if err != nil {
			return nil, err
		}

		sessions = append(sessions, sess)
	}

	return sessions, nil
}

// RevokeSessionById - revoke session
func (r SessionRepository) RevokeSessionById(ctx context.Context, accountId string, sessionId string) error {

	// decrypt, since we send it as encrypted
	key := crypt.Decrypt(sessionId)

	sess, err := r.getSessionById(ctx, key)

	if err != nil {
		return err
	}

	if sess.Passport().AccountID() != accountId {
		return session.ErrSessionsNotFound
	}

	// make sure that we delete the session that belongs to this user only
	_, err = r.client.Del(ctx, key).Result()

	if err != nil {

		if err == redis.Nil {
			return session.ErrSessionsNotFound
		}

		return fmt.Errorf("keys failed: '%s", err)
	}

	return nil
}

// CreateSessionForAccount - create a session for the account
// NOTE: only use for tests! sessions are created and managed by express-session
func (r SessionRepository) CreateSessionForAccount(ctx context.Context, session *session.Session) error {

	sessionData := &Session{
		Passport: session.Passport().SerializeToBaseString(),
		Details:  SessionDetails{Ip: session.IP(), UserAgent: session.UserAgent(), Created: session.Created()},
	}

	val, err := json.Marshal(sessionData)

	if err != nil {
		return err
	}

	valReal := crypt.EncryptSession(string(val))

	ok, err := r.client.SetNX(ctx, SessionPrefix+ksuid.New().String()+":"+AccountPrefix+session.Passport().AccountID(), valReal, time.Hour*24).Result()

	if err != nil {
		return err
	}

	if !ok {
		return errors.New("conflicting session")
	}

	return nil
}
