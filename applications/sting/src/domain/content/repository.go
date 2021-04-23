package content

import (
	"context"
)

type Repository interface {
	ProcessContent(context.Context, string, []string) ([]string, error)
}
