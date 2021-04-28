package adapters

import (
	"context"

	"github.com/gomodule/redigo/redis"
	"overdoll/applications/eva/src/domain/session"
)

type SessionRedisRepository struct {
	conn redis.Conn
}

func NewSessionRedisRepository(conn redis.Conn) SessionRedisRepository {
	return SessionRedisRepository{conn: conn}
}

func (r SessionRedisRepository) RevokeSession(ctx context.Context, session *session.Session) error {
	// remove session from redis
	val, err := r.conn.Do("SREM", "session:"+session.Identifier(), session.Token())

	if val == nil || err != nil {
		return err
	}

	return nil
}

func (r SessionRedisRepository) CheckSession(ctx context.Context, session *session.Session) error {

	// make sure our session token also exists in the Redis Set
	_, err := r.conn.Do("SISMEMBER", "session:"+session.Identifier(), session.Token())

	if err != nil {
		return err
	}

	return nil
}

func (r SessionRedisRepository) CreateSession(ctx context.Context, session *session.Session) error {

	// TODO: Should capture stuff like IP, location, header so we can show the user the devices that are logged in for them
	_, err := r.conn.Do("SADD", "session:"+session.Identifier(), session.Token())

	if err != nil {
		return err
	}

	return nil
}
