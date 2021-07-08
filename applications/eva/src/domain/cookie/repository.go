package cookie

import (
	"context"
)

type Repository interface {
	GetCookieById(context.Context, string) (*Cookie, error)
	DeleteCookieById(context.Context, string) error
	CreateCookie(context.Context, *Cookie) error
	UpdateCookie(context.Context, string, func(*Cookie) error) (*Cookie, error)
}
