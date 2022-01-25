package activities

import (
	"context"
)

type StingService interface {
	GetPost(context.Context, string) (string, string, error)
	PublishPost(context.Context, string) error
	RejectPost(context.Context, string) error
	DiscardPost(context.Context, string) error
	RemovePost(context.Context, string) error
}
