package content

import (
	"context"
)

type Repository interface {
	ProcessContent(context.Context, string, []string) ([]string, error)
	MakeProcessedContentPublic(context.Context, string, []string) ([]string, error)
	DeletePublicContent(context.Context, []string) error
	DeleteProcessedContent(context.Context, string, []string) error
}
