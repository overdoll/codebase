package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/media_storage"
	"overdoll/applications/loader/internal/domain/upload"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"strings"
)

type ConvertResourcesToMedia struct {
	Source      string
	ItemId      string
	ResourceIds []string
}

type ConvertResourcesToMediaHandler struct {
	ur    upload.Repository
	sr    media_storage.Repository
	event event.Repository
}

func NewConvertResourcesToMediaHandler(ur upload.Repository, sr media_storage.Repository, event event.Repository) ConvertResourcesToMediaHandler {
	return ConvertResourcesToMediaHandler{event: event, sr: sr, ur: ur}
}

func (h ConvertResourcesToMediaHandler) Handle(ctx context.Context, cmd ConvertResourcesToMedia) ([]*media.Media, error) {

	legacyResources, err := h.sr.GetLegacyResourcesByItemId(ctx, cmd.ItemId)

	if err != nil {
		return nil, err
	}

	var targetLegacyResources []*media_storage.LegacyResource

	for _, legacyResource := range legacyResources {
		for _, resourceId := range cmd.ResourceIds {
			if resourceId == legacyResource.ID() {
				targetLegacyResources = append(targetLegacyResources, legacyResource)
				break
			}
		}
	}

	var results []*media.Media

	for _, legacyResource := range targetLegacyResources {
		// if it's a copy, run the copy pipeline
		if legacyResource.CopiedFromId() != "" {
			sourceIds := strings.Split(legacyResource.CopiedFromId(), "-")

			var pixelate *int

			if legacyResource.MediaLinkType() == proto.MediaLinkType_POST_CONTENT {
				pix := 30
				pixelate = &pix
			}

			sourceMediaLink := &proto.MediaLink{
				Id:   sourceIds[0],
				Type: proto.MediaLinkType_POST_CONTENT,
			}

			sourceMediaId := sourceIds[1]

			// get the originating post
			sourceMedia, err := h.sr.GetSingleMediaByLinkAndId(ctx, media.LinkFromProto(sourceMediaLink), sourceMediaId)

			if err != nil {
				return nil, err
			}

			newSourceMedia := &proto.Media{
				Id:               legacyResource.ID(),
				IsUpload:         false,
				OriginalFileName: "",
				Private:          true,
				Link: &proto.MediaLink{
					Id:   legacyResource.ItemId(),
					Type: legacyResource.MediaLinkType(),
				},
				State: &proto.MediaState{
					Processed: false,
					Failed:    false,
				},
				Version: proto.MediaVersion_ONE,
				Source: &proto.MediaSource{
					SourceMediaId: sourceMediaId,
					Link:          sourceMediaLink,
				},
			}

			newMedia := media.FromProto(newSourceMedia)

			if err := h.event.GenerateImageFromMedia(ctx, sourceMedia, newMedia, cmd.Source, pixelate); err != nil {
				return nil, err
			}

			results = append(results, newMedia)
			continue
		}

		final, err := h.ur.GetUpload(ctx, legacyResource.ID())
		if err != nil {
			return nil, err
		}

		sourceMedia := &proto.Media{
			Id:               final.FileId(),
			IsUpload:         true,
			OriginalFileName: final.FileName(),
			Private:          true,
			Link: &proto.MediaLink{
				Id:   legacyResource.ItemId(),
				Type: legacyResource.MediaLinkType(),
			},
			State: &proto.MediaState{
				Processed: false,
				Failed:    false,
			},
			Version: proto.MediaVersion_ONE,
		}

		if err != nil {
			return nil, err
		}

		newMedia := media.FromProto(sourceMedia)

		if err := h.event.ProcessMediaForUpload(ctx, newMedia, cmd.Source, final.IsPossibleVideo()); err != nil {
			return nil, err
		}

		results = append(results, newMedia)
	}

	return results, nil
}
