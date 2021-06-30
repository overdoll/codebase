package session

import (
	"errors"
)

type Session struct {
	id        string
	userAgent string
	ip        string
	created   string
}

var (
	ErrSessionsNotFound    = errors.New("sessions not found")
)

func UnmarshalSessionFromDatabase(id, userAgent, ip, created string) *Session {
	return &Session{
		id:        id,
		userAgent: userAgent,
		ip:        ip,
		created:   created,
	}
}

func NewSession(id, userAgent, ip, created string) *Session {
	return &Session{
		id:        id,
		userAgent: userAgent,
		ip:        ip,
		created:   created,
	}
}

func (s *Session) ID() string {
	return s.id
}

func (s *Session) UserAgent() string {
	return s.userAgent
}

func (s *Session) IP() string {
	return s.ip
}

func (s *Session) Created() string {
	return s.created
}
