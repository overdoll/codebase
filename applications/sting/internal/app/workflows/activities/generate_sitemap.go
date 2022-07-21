package activities

import (
	"context"
)

func (h *Activities) GenerateSitemap(ctx context.Context) error {
	return h.pr.GenerateSitemap(ctx)
}
