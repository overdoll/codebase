package resource

import (
	"context"

	tusd "github.com/tus/tusd/pkg/handler"
)

type Repository interface {
	ProcessContent(ctx context.Context, prefix string, content []string) ([]string, error)
	MakeProcessedContentPublic(ctx context.Context, prefix string, content []string) ([]string, error)
	DeletePublicContent(ctx context.Context, content []string) error
	DeleteProcessedContent(ctx context.Context, prefix string, content []string) error

	GetComposer(ctx context.Context) (*tusd.StoreComposer, error)
}
