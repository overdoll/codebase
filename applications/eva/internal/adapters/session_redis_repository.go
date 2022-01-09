package adapters

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"overdoll/applications/eva/internal/domain/location"
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

	val, err := r.client.Get(ctx, sessionPrefix+sessionId).Result()

	if err != nil {

		if err == redis.Nil {
			return nil, session.ErrSessionsNotFound
		}

		return nil, fmt.Errorf("failed to get session by id: %v", err)
	}

	// decrypt session - since value is initially encrypted
	details, err := crypt.Decrypt(val)

	if err != nil {
		return nil, fmt.Errorf("failed to decrypt session: %v", err)
	}

	var sessionItem sessions

	if err := json.Unmarshal([]byte(details), &sessionItem); err != nil {
		return nil, fmt.Errorf("failed to unmarshal session: %v", err)
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

// getSessionById - get session by ID
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

// GetSessionsByAccountId - Get sessions
func (r SessionRepository) GetSessionsByAccountId(ctx context.Context, requester *principal.Principal, passport *passport.Passport, cursor *paging.Cursor, accountId string) ([]*session.Session, error) {

	var keys []string

	curse := 0

	getKeys := func() ([]string, uint64, error) {
		// for grabbing sessions, we get the first "100" results, and then filter based on the cursor
		newKeys, newCursor, err := r.client.Scan(ctx, uint64(curse), sessionPrefix+session.GetSearchTermForAccounts(accountId), 100).Result()

		if err != nil {

			if err == redis.Nil {
				return nil, 0, session.ErrSessionsNotFound
			}

			return nil, 0, fmt.Errorf("failed to get sessions for account: %v", err)
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

	// sort keys - based on cursor
	if cursor != nil {
		keys = cursor.BuildRedis(keys)
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
	_, err := r.client.Del(ctx, sessionPrefix+sessionId).Result()

	if err != nil {

		if err == redis.Nil {
			return session.ErrSessionsNotFound
		}

		return fmt.Errorf("failed to revoke session by id: %v", err)
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
		return err
	}

	valReal, err := crypt.Encrypt(string(val))
	if err != nil {
		return err
	}

	ok, err := r.client.SetNX(ctx, sessionPrefix+session.ID(), valReal, time.Second*time.Duration(session.Duration())).Result()

	if err != nil {
		return err
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
		return nil, err
	}

	valReal, err := crypt.Encrypt(string(val))
	if err != nil {
		return nil, err
	}

	_, err = r.client.Set(ctx, sessionPrefix+session.ID(), valReal, time.Second*time.Duration(session.Duration())).Result()

	if err != nil {
		return nil, err
	}

	return session, nil
}

func (r SessionRepository) RevokeSessionOperator(ctx context.Context, sessionId string) error {
	return r.revokeSessionById(ctx, sessionId)
}
