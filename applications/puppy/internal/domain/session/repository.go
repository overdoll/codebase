package session

import (
	"github.com/gorilla/sessions"
)

type Repository interface {
	Load(id string) (*sessions.Session, error)
	Delete(id string) error
	Save(session *sessions.Session) error
}
