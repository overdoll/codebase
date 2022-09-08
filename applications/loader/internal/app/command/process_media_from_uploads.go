package command

import (
	"context"
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/upload"
	"overdoll/libraries/media"
	"overdoll/libraries/media/proto"
	"overdoll/libraries/uuid"
	"strings"
)

type ProcessMediaFromUploads struct {
	Link      *proto.MediaLink
	UploadIds []string
	Source    string
}

type CreateOrGetResourcesFromUploadsHandler struct {
	ur    upload.Repository
	event event.Repository
}

func NewCreateOrGetResourcesFromUploadsHandler(ur upload.Repository, event event.Repository) CreateOrGetResourcesFromUploadsHandler {
	return CreateOrGetResourcesFromUploadsHandler{ur: ur, event: event}
}

func (h CreateOrGetResourcesFromUploadsHandler) Handle(ctx context.Context, cmd ProcessMediaFromUploads) ([]*media.Media, error) {

	var results []*media.Media

	for _, uploadId := range cmd.UploadIds {
		newUploadId := getUploadIdWithoutExtension(uploadId)
		final, err := h.ur.GetUpload(ctx, newUploadId)
		if err != nil {
			return nil, err
		}

		sourceMedia := &proto.Media{
			Id:               uuid.New().String(),
			UploadId:         final.FileId(),
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
