package command

import (
	"context"

	"overdoll/applications/sting/src/domain/post"
)

type DiscardPostActivityHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	eva EvaService
}

func NewDiscardPostActivityHandler(pr post.Repository, pi post.IndexRepository, eva EvaService) DiscardPostActivityHandler {
	return DiscardPostActivityHandler{pr: pr, pi: pi, eva: eva}
}

func (h DiscardPostActivityHandler) Handle(ctx context.Context, id string) error {
	return nil
}
