package command

import (
	"context"

	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/domain/character"
	"overdoll/libraries/ksuid"
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

	var media []*character.Media

	for _, med := range cmd.Media {
		id, err := ksuid.Parse(med.Id)

		if err != nil {
			return err
		}

		media = append(media, character.NewMedia(id, med.Title, med.Thumbnail))
	}

	// Create Media (from database)
	err := h.mr.CreateMedias(ctx, media)

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
