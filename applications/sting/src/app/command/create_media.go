package command

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/character"
)

type CreateMediaHandler struct {
	mr  character.Repository
	mir character.IndexRepository
}

func NewCreateMediaHandler(mr character.Repository, mir character.IndexRepository) CreateMediaHandler {
	return CreateMediaHandler{mr: mr, mir: mir}
}

func (h CreateMediaHandler) HandlerName() string {
	return "CreateMediaHandler"
}

func (h CreateMediaHandler) NewCommand() interface{} {
	return &sting.MediaCreated{}
}

func (h CreateMediaHandler) Handle(ctx context.Context, c interface{}) error {
	cmd := c.(*sting.MediaCreated)

	media, err := character.UnmarshalMediaFromProtoArray(cmd.Media)

	if err != nil {
		return nil
	}

	// Create Media (from database)
	err = h.mr.CreateMedias(ctx, media)

	if err != nil {
		return err
	}

	// Bulk index
	err = h.mir.BulkIndexMedia(ctx, media)

	if err != nil {
		return err
	}

	return nil
}
