package adapters

import (
	"context"
	"encoding/json"
	"overdoll/applications/eva/internal/domain/location"
	"overdoll/libraries/errors"
	"overdoll/libraries/passport"
	"strings"
	"time"

	"github.com/go-redis/redis/v8"
	"overdoll/applications/eva/internal/domain/session"
	"overdoll/libraries/crypt"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

const (
	sessionPrefix = "session:"
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
func (r SessionRepository) getSessionById(ctx context.Context, passport *passport.Passport, sessionId string) (*session.Session, error) {

	val, err := r.client.WithContext(ctx).Get(ctx, sessionPrefix+sessionId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, session.ErrSessionsNotFound
		}

		return nil, errors.Wrap(err, "failed to get session by id")
	}

	// decrypt session - since value is initially encrypted
	details, err := crypt.Decrypt(val)

	if err != nil {
		return nil, errors.Wrap(err, "failed to decrypt session")
	}

	var sessionItem sessions

	if err := json.Unmarshal([]byte(details), &sessionItem); err != nil {
		return nil, errors.Wrap(err, "failed to unmarshal session")
	}

	current := false

	if passport != nil {
		if sessionId == passport.SessionID() {
			current = true
		}
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

	return res, nil
}

// GetSessionById - get session by ID
func (r SessionRepository) GetSessionById(ctx context.Context, requester *principal.Principal, passport *passport.Passport, sessionId string) (*session.Session, error) {

	res, err := r.getSessionById(ctx, passport, sessionId)

	if err != nil {
		return nil, err
	}

	if err := res.CanView(requester); err != nil {
		return nil, err
	}

	return res, nil
}

func (r SessionRepository) scanKeys(ctx context.Context, accountId string, count int64) ([]string, error) {
	var keys []string

	curse := 0

	getKeys := func() ([]string, uint64, error) {
		// infinite scan
		newKeys, newCursor, err := r.client.WithContext(ctx).Scan(ctx, uint64(curse), sessionPrefix+session.GetSearchTermForAccounts(accountId), count).Result()

		if err != nil {

			if err == redis.Nil {
				return nil, 0, session.ErrSessionsNotFound
			}

			return nil, 0, errors.Wrap(err, "failed to get sessions for account")
		}

		return newKeys, newCursor, nil
	}

	for {
		newKeys, newCursor, err := getKeys()

		if err != nil {
			return nil, err
		}

		keys = append(keys, newKeys...)

		if newCursor == 0 {
			break
		} else {
			curse = int(newCursor)
		}
	}

	return keys, nil
}

func (r SessionRepository) DeleteAccountSessionData(ctx context.Context, accountId string) error {

	keys, err := r.scanKeys(ctx, accountId, 0)

	if err != nil {
		return err
	}

	for _, key := range keys {

		_, err := r.client.WithContext(ctx).Del(ctx, key).Result()

		if err != nil {
			return errors.Wrap(err, "failed to delete session")
		}
	}

	return nil
}

func (r SessionRepository) GetLastActiveSessionByAccountIdOperator(ctx context.Context, accountId string) (*session.Session, error) {

	keys, err := r.scanKeys(ctx, accountId, 0)

	if err != nil {
		return nil, err
	}

	var lastActiveSession *session.Session

	for _, sessionID := range keys {

		// remove prefix
		sess, err := r.getSessionById(ctx, nil, strings.TrimLeft(sessionID, sessionPrefix))

		if err != nil {
			return nil, err
		}

		if lastActiveSession == nil {
			lastActiveSession = sess
		} else {
			// if the new session is after the one we saved, we use it
			// since we want to use the most recent session for that account
			if sess.LastSeen().After(lastActiveSession.LastSeen()) {
				lastActiveSession = sess
			}
		}
	}

	return lastActiveSession, nil
}

// GetSessionsByAccountId - Get sessions
func (r SessionRepository) GetSessionsByAccountId(ctx context.Context, requester *principal.Principal, passport *passport.Passport, cursor *paging.Cursor, accountId string) ([]*session.Session, error) {

	keys, err := r.scanKeys(ctx, accountId, 0)

	if err != nil {
		return nil, err
	}

	// sort keys - based on cursor
	if cursor != nil {
		keys, err = cursor.BuildRedis(keys)

		if err != nil {
			return nil, err
		}
	}

	var sessions []*session.Session

	for _, sessionID := range keys {

		// remove prefix
		sess, err := r.getSessionById(ctx, passport, strings.TrimLeft(sessionID, sessionPrefix))

		if err != nil {
			return nil, err
		}

		if err := sess.CanView(requester); err != nil {
			return nil, err
		}

		sessions = append(sessions, sess)
	}

	return sessions, nil
}

// RevokeSessionById - revoke session
func (r SessionRepository) revokeSessionById(ctx context.Context, sessionId string) error {

	// make sure that we delete the session that belongs to this user only
	_, err := r.client.WithContext(ctx).Del(ctx, sessionPrefix+sessionId).Result()

	if err != nil {

		if err == redis.Nil {
			return session.ErrSessionsNotFound
		}

		return errors.Wrap(err, "failed to revoke session by id")
	}

	return nil
}

// RevokeSessionById - revoke session
func (r SessionRepository) RevokeSessionById(ctx context.Context, requester *principal.Principal, passport *passport.Passport, sessionId string) error {

	ss, err := r.GetSessionById(ctx, requester, passport, sessionId)

	if err != nil {
		return err
	}

	if err := ss.CanRevoke(requester); err != nil {
		return err
	}

	return r.revokeSessionById(ctx, sessionId)
}

func (r SessionRepository) CreateSessionOperator(ctx context.Context, session *session.Session) error {

	val, err := json.Marshal(&sessions{
		Location:  location.Serialize(session.Location()),
		UserAgent: session.Device(),
		IP:        session.IP(),
		Created:   session.Created().Unix(),
		LastSeen:  session.LastSeen().Unix(),
		AccountId: session.AccountID(),
	})

	if err != nil {
		return errors.Wrap(err, "failed to marshal session")
	}

	valReal, err := crypt.Encrypt(string(val))
	if err != nil {
		return errors.Wrap(err, "failed to encrypt session")
	}

	ok, err := r.client.WithContext(ctx).SetNX(ctx, sessionPrefix+session.ID(), valReal, time.Second*time.Duration(session.Duration())).Result()

	if err != nil {
		return errors.Wrap(err, "failed to create session")
	}

	if !ok {
		return errors.New("conflicting session")
	}

	return nil
}

func (r SessionRepository) UpdateSessionOperator(ctx context.Context, sessionId string, updateFn func(session *session.Session) error) (*session.Session, error) {

	session, err := r.getSessionById(ctx, nil, sessionId)

	if err != nil {
		return nil, err
	}

	if err := updateFn(session); err != nil {
		return nil, err
	}

	val, err := json.Marshal(&sessions{
		Location:  location.Serialize(session.Location()),
		UserAgent: session.Device(),
		IP:        session.IP(),
		Created:   session.Created().Unix(),
		LastSeen:  session.LastSeen().Unix(),
		AccountId: session.AccountID(),
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal session")
	}

	valReal, err := crypt.Encrypt(string(val))
	if err != nil {
		return nil, errors.Wrap(err, "failed to encrypt session")
	}

	_, err = r.client.WithContext(ctx).Set(ctx, sessionPrefix+session.ID(), valReal, time.Second*time.Duration(session.Duration())).Result()

	if err != nil {
		return nil, errors.Wrap(err, "failed to update session")
	}

	return session, nil
}

func (r SessionRepository) RevokeSessionOperator(ctx context.Context, sessionId string) error {
	return r.revokeSessionById(ctx, sessionId)
}
