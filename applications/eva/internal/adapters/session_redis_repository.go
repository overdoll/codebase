package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/segmentio/ksuid"
	"overdoll/applications/eva/internal/domain/session"
	"overdoll/libraries/crypt"
	"overdoll/libraries/paging"
)

const (
	sessionPrefix = "session:"
	accountPrefix = "account:"
)

type sessions struct {
	Passport string `json:"passport"`
	Details  sessionDetails
}

type sessionDetails struct {
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
func (r SessionRepository) GetSessionById(ctx context.Context, sessionId string) (*session.Session, error) {

	val, err := r.client.Get(ctx, sessionId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, session.ErrSessionsNotFound
		}

		return nil, fmt.Errorf("keys failed: '%s", err)
	}

	// decrypt session - since value is initially encrypted
	details, err := crypt.DecryptSession(val)
	if err != nil {
		return nil, err
	}

	var sessionItem sessions

	if err := json.Unmarshal([]byte(details), &sessionItem); err != nil {
		return nil, err
	}

	// we want to encrypt our session key
	encryptedKey, err := crypt.Encrypt(sessionId)
	if err != nil {
		return nil, err
	}

	res := session.UnmarshalSessionFromDatabase(encryptedKey, sessionItem.Passport, sessionItem.Details.UserAgent, sessionItem.Details.Ip, sessionItem.Details.Created)
	res.Node = paging.NewNode(encryptedKey)

	return res, nil
}

// GetSessionsByAccountId - Get sessions
func (r SessionRepository) GetSessionsByAccountId(ctx context.Context, cursor *paging.Cursor, sessionCookie, accountId string) ([]*session.Session, error) {

	keys, err := r.client.Keys(ctx, sessionPrefix+"*:"+accountPrefix+accountId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, session.ErrSessionsNotFound
		}

		return nil, fmt.Errorf("keys failed: '%s", err)
	}

	var sessions []*session.Session

	for _, sessionID := range keys {
		sess, err := r.GetSessionById(ctx, sessionID)

		if err != nil {
			return nil, err
		}

		if sess.ID() == strings.Split(sessionCookie, ".")[0] {
			sess.MakeCurrent()
		}

		sessions = append(sessions, sess)
	}

	return sessions, nil
}

// RevokeSessionById - revoke session
func (r SessionRepository) RevokeSessionById(ctx context.Context, accountId, sessionId string) error {

	// decrypt, since we send it as encrypted
	key, err := crypt.Decrypt(sessionId)
	if err != nil {
		return err
	}

	sess, err := r.GetSessionById(ctx, key)

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

	sessionData := &sessions{
		Passport: session.Passport().SerializeToBaseString(),
		Details:  sessionDetails{Ip: session.IP(), UserAgent: session.UserAgent(), Created: session.Created()},
	}

	val, err := json.Marshal(sessionData)

	if err != nil {
		return err
	}

	valReal, err := crypt.EncryptSession(string(val))
	if err != nil {
		return err
	}

	ok, err := r.client.SetNX(ctx, sessionPrefix+ksuid.New().String()+":"+accountPrefix+session.Passport().AccountID(), valReal, time.Hour*24).Result()

	if err != nil {
		return err
	}

	if !ok {
		return errors.New("conflicting session")
	}

	return nil
}
