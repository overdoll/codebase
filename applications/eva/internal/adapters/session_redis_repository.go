package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/passport"
	"time"

	"github.com/go-redis/redis/v8"
	"overdoll/applications/eva/internal/domain/session"
	"overdoll/libraries/crypt"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

const (
	sessionPrefix = "session:"
	accountPrefix = "account:"
)

type sessions struct {
	Location  location.Serializable
	UserAgent string `json:"userAgent"`
	IP        string `json:"ip"`
	Created   int64  `json:"created"`
	LastSeen  int64  `json:"lastSeen"`
	AccountId string `json:"accountId"`
}

type SessionRepository struct {
	client *redis.Client
}

func NewSessionRepository(client *redis.Client) SessionRepository {
	return SessionRepository{client: client}
}

// getSessionById - get session by ID
func (r SessionRepository) GetSessionById(ctx context.Context, requester *principal.Principal, passport *passport.Passport, sessionId string) (*session.Session, error) {

	val, err := r.client.Get(ctx, sessionPrefix+sessionId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, session.ErrSessionsNotFound
		}

		return nil, fmt.Errorf("failed to get session by id: %v", err)
	}

	// decrypt session - since value is initially encrypted
	details, err := crypt.DecryptSession(val)

	if err != nil {
		return nil, fmt.Errorf("failed to decrypt session: %v", err)
	}

	var sessionItem sessions

	if err := json.Unmarshal([]byte(details), &sessionItem); err != nil {
		return nil, fmt.Errorf("failed to unmarshal session: %v", err)
	}

	current := false

	if sessionId == passport.SessionID() {
		current = true
	}

	res := session.UnmarshalSessionFromDatabase(sessionId,
		sessionItem.AccountId,
		sessionItem.UserAgent,
		sessionItem.IP,
		sessionItem.Created,
		sessionItem.LastSeen,
		current,
		location.UnmarshalLocationFromSerialized(sessionItem.Location),
	)

	res.Node = paging.NewNode(sessionId)

	if err := res.CanView(requester); err != nil {
		return nil, err
	}

	return res, nil
}

// GetSessionsByAccountId - Get sessions
func (r SessionRepository) GetSessionsByAccountId(ctx context.Context, requester *principal.Principal, passport *passport.Passport, cursor *paging.Cursor, accountId string) ([]*session.Session, error) {

	// for grabbing sessions, we get the first "100" results, and then filter based on the cursor
	keys, _, err := r.client.Scan(ctx, 0, sessionPrefix+"*:"+accountPrefix+accountId, 100).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, session.ErrSessionsNotFound
		}

		return nil, fmt.Errorf("failed to get sessions for account: %v", err)
	}

	// sort keys - based on cursor
	if cursor != nil {
		keys = cursor.BuildRedis(keys)
	}

	var sessions []*session.Session

	for _, sessionID := range keys {
		sess, err := r.GetSessionById(ctx, requester, passport, sessionID)

		if err != nil {
			return nil, err
		}

		sessions = append(sessions, sess)
	}

	return sessions, nil
}

// RevokeSessionById - revoke session
func (r SessionRepository) RevokeSessionById(ctx context.Context, requester *principal.Principal, passport *passport.Passport, sessionId string) error {

	// decrypt, since we send it as encrypted
	key, err := crypt.Decrypt(sessionId)

	if err != nil {
		return fmt.Errorf("failed to decrypt session id: %v", err)
	}

	_, err = r.GetSessionById(ctx, requester, passport, key)

	if err != nil {
		return err
	}

	if sessionId == passport.SessionID() {
		return errors.New("cannot revoke session same as logged in account")
	}

	// make sure that we delete the session that belongs to this user only
	_, err = r.client.Del(ctx, key).Result()

	if err != nil {

		if err == redis.Nil {
			return session.ErrSessionsNotFound
		}

		return fmt.Errorf("failed to revoke session by id: %v", err)
	}

	return nil
}

func (r SessionRepository) CreateSession(ctx context.Context, requester *principal.Principal, passport *passport.Passport, session *session.Session) error {

	val, err := json.Marshal(session)

	if err != nil {
		return err
	}

	valReal, err := crypt.EncryptSession(string(val))
	if err != nil {
		return err
	}

	ok, err := r.client.SetNX(ctx, sessionPrefix+session.AccountID(), valReal, time.Hour*24).Result()

	if err != nil {
		return err
	}

	if !ok {
		return errors.New("conflicting session")
	}

	return nil
}
