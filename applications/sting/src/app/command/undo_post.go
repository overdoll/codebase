package command

import (
	"context"

	"overdoll/applications/sting/src/domain/content"
	"overdoll/applications/sting/src/domain/post"
)

type UndoPostActivityHandler struct {
	pi  post.IndexRepository
	pr  post.Repository
	cr  content.Repository
	eva EvaService
}

func NewUndoPostActivityHandler(pr post.Repository, pi post.IndexRepository, cr content.Repository, eva EvaService) UndoPostActivityHandler {
	return UndoPostActivityHandler{pr: pr, pi: pi, cr: cr, eva: eva}
}

func (h UndoPostActivityHandler) Handle(ctx context.Context, id string) error {
	return nil
}
