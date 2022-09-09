package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
)

type GenerateImageFromMedia struct {
	SourceMedias []*proto.Media
	Link         *proto.MediaLink
	Source       string
	Pixelate     *int
}

type GenerateImageFromMediaHandler struct {
	event event.Repository
}

func NewCopyResourcesAndApplyFiltersHandler(event event.Repository) GenerateImageFromMediaHandler {
	return GenerateImageFromMediaHandler{event: event}
}

func (h GenerateImageFromMediaHandler) Handle(ctx context.Context, cmd GenerateImageFromMedia) ([]*media.Media, error) {

	var results []*media.Media

	for _, mediaSource := range cmd.SourceMedias {
		newSourceMedia := &proto.Media{
			Id: uuid.New().String(),
			// no upload linked to this media since it's a copy
			IsUpload: false,
			// no filename linked since it's a copy
			OriginalFileName: "",
			Private:          true,
			Link:             cmd.Link,
			State: &proto.MediaState{
				Processed: false,
				Failed:    false,
			},
			Version: proto.MediaVersion_ONE,
			Source: &proto.MediaSource{
				SourceMediaId: mediaSource.Id,
				Link:          mediaSource.Link,
			},
		}

		newMedia := media.FromProto(newSourceMedia)

		if err := h.event.GenerateImageFromMedia(ctx, media.FromProto(mediaSource), newMedia, cmd.Source, cmd.Pixelate); err != nil {
			return nil, err
		}

		results = append(results, newMedia)
	}

	return results, nil
}
