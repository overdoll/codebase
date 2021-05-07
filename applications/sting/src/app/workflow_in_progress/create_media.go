package workflow

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/post"
)

type CreateMediaHandler struct {
	pr post.Repository
	pi post.IndexRepository
}

func NewCreateMediaHandler(pr post.Repository, pi post.IndexRepository) CreateMediaHandler {
	return CreateMediaHandler{pr: pr, pi: pi}
}

func (h CreateMediaHandler) HandlerName() string {
	return "CreateMediaHandler"
}

func (h CreateMediaHandler) NewCommand() interface{} {
	return &sting.MediaCreated{}
}

func (h CreateMediaHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.MediaCreated)

	media, err := post.UnmarshalMediaFromProtoArray(cmd.Media)

	if err != nil {
		return nil
	}

	// Create Media (from database)
	err = h.pr.CreateMedias(ctx, media)

	if err != nil {
		return err
	}

	// Bulk index
	err = h.pi.BulkIndexMedia(ctx, media)

	if err != nil {
		return err
	}

	return nil
}
