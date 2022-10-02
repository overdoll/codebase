package stats

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type Repository interface {
	AddPostObservations(ctx context.Context, requester *principal.Principal, posts []*post.Post) ([]string, error)
}
