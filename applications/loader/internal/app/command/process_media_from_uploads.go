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

type ProcessMediaFromUploads struct {
	Link      *proto.MediaLink
	UploadIds []string
	Source    string
}

type ProcessMediaFromUploadsHandler struct {
	sr    media_storage.Repository
	ur    upload.Repository
	event event.Repository
}

func NewProcessMediaFromUploadsHandler(ur upload.Repository, sr media_storage.Repository, event event.Repository) ProcessMediaFromUploadsHandler {
	return ProcessMediaFromUploadsHandler{ur: ur, event: event, sr: sr}
}

func (h ProcessMediaFromUploadsHandler) Handle(ctx context.Context, cmd ProcessMediaFromUploads) ([]*media.Media, error) {

	existingMedia, err := h.sr.GetMediaByLink(ctx, media.LinkFromProto(cmd.Link))

	if err != nil {
		return nil, err
	}

	var results []*media.Media

	for _, uploadId := range cmd.UploadIds {
		newUploadId := getUploadIdWithoutExtension(uploadId)
		final, err := h.ur.GetUpload(ctx, newUploadId)
		if err != nil {
			return nil, err
		}

		found := false

		for _, existing := range existingMedia {
			if existing.ID() == final.FileId() {
				results = append(results, existing)
				found = true
				break
			}
		}

		if found {
			continue
		}

		sourceMedia := &proto.Media{
			Id:               final.FileId(),
			IsUpload:         true,
			OriginalFileName: final.FileName(),
			Private:          true,
			Link:             cmd.Link,
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

		if err := h.event.ProcessMediaForUpload(ctx, newMedia, cmd.Source); err != nil {
			return nil, err
		}

		results = append(results, newMedia)
	}

	return results, nil
}

func getUploadIdWithoutExtension(uploadId string) string {
	// strip any urls or extensions
	splitPath := strings.Split(uploadId, "/")
	idWithOrWithoutExtension := splitPath[len(strings.Split(uploadId, "/"))-1]

	return strings.Split(idWithOrWithoutExtension, "+")[0]
}
