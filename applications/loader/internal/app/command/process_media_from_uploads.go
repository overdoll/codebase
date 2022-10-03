package command

import (
	"context"
	"errors"
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/media_storage"
	"overdoll/applications/loader/internal/domain/upload"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"strings"
)

type ProcessMediaFromUploads struct {
	Link          *proto.MediaLink
	UploadIds     []string
	ExistingMedia []*proto.Media
	Source        string
	Reprocess     bool
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

	var existingMedia []*media.Media

	if cmd.Link != nil {
		existingMedia, err := h.sr.GetMediaByLink(ctx, media.LinkFromProto(cmd.Link))

		if err != nil {
			return nil, err
		}

		// if reprocessing, set existing media as current upload ids - basically reprocess all resources associated to this post id
		if len(cmd.UploadIds) == 0 && cmd.Reprocess {
			for _, existing := range existingMedia {
				cmd.UploadIds = append(cmd.UploadIds, existing.ID())
			}
		}
	} else {
		for _, med := range cmd.ExistingMedia {
			existingMedia = append(existingMedia, media.FromProto(med))
			cmd.UploadIds = append(cmd.UploadIds, med.Id)
		}
	}

	var results []*media.Media

	for _, uploadId := range cmd.UploadIds {
		newUploadId := getUploadIdWithoutExtension(uploadId)
		final, err := h.ur.GetUpload(ctx, newUploadId)
		if err != nil {
			return nil, err
		}

		found := false
		var foundMedia *media.Media

		for _, existing := range existingMedia {
			if existing.ID() == final.FileId() {
				results = append(results, existing)
				found = true
				foundMedia = existing
				break
			}
		}

		if found && !cmd.Reprocess {
			continue
		}

		if !found && cmd.Reprocess {
			return nil, errors.New("could not find existing media [" + cmd.Link.Id + "] [" + uploadId + "] for processing")
		}

		var link *proto.MediaLink

		if cmd.Reprocess {
			link = foundMedia.RawProto().Link
		} else {
			link = cmd.Link
		}

		sourceMedia := &proto.Media{
			Id:               final.FileId(),
			IsUpload:         true,
			OriginalFileName: final.FileName(),
			Private:          true,
			Link:             link,
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

func getUploadIdWithoutExtension(uploadId string) string {
	// strip any urls or extensions
	splitPath := strings.Split(uploadId, "/")
	idWithOrWithoutExtension := splitPath[len(strings.Split(uploadId, "/"))-1]

	return strings.Split(idWithOrWithoutExtension, "+")[0]
}
