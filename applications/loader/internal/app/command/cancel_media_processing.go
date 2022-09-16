package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/media_storage"
	"overdoll/libraries/errors/apperror"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
)

type CancelMediaProcessing struct {
	Source []*proto.Media
}

type CancelMediaProcessingHandler struct {
	sr    media_storage.Repository
	event event.Repository
}

func NewCancelMediaProcessingHandler(sr media_storage.Repository, event event.Repository) CancelMediaProcessingHandler {
	return CancelMediaProcessingHandler{event: event, sr: sr}
}

func (h CancelMediaProcessingHandler) Handle(ctx context.Context, cmd CancelMediaProcessing) error {

	for _, source := range cmd.Source {

		existingMedia, err := h.sr.GetSingleMediaByLinkAndId(ctx, media.LinkFromProto(source.Link), source.Id)

		if err != nil {

			if apperror.IsNotFoundError(err) {
				return nil
			}

			return err
		}

		if existingMedia.IsProcessed() {
			return nil
		}

		if err := h.event.CancelMediaProcessing(ctx, existingMedia); err != nil {
			return err
		}

	}

	return nil
}
