package command

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
)

type IndexAllMediaHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewIndexAllMediaHandler(pr post.Repository, pi post.IndexRepository) IndexAllMediaHandler {
	return IndexAllMediaHandler{pr: pr, pi: pi}
}

func (h IndexAllMediaHandler) HandlerName() string {
	return "IndexAllMediaHandler"
}

func (h IndexAllMediaHandler) NewCommand() interface{} {
	return &sting.IndexAllMedia{}
}

func (h IndexAllMediaHandler) Handle(ctx context.Context, c interface{}) error {
	err := h.pi.DeleteMediaIndex(ctx)

	if err != nil {

	}

	medias, err := h.pr.GetMedias(ctx)

	if err != nil {

	}

	err = h.pi.BulkIndexMedia(ctx, medias)

	if err != nil {

	}

	return nil
}
