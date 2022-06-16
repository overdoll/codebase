package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdateAudienceThumbnail struct {
	Principal  *principal.Principal
	AudienceId string
	Thumbnail  string
}

type UpdateAudienceThumbnailHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewUpdateAudienceThumbnailHandler(pr post.Repository, loader LoaderService) UpdateAudienceThumbnailHandler {
	return UpdateAudienceThumbnailHandler{pr: pr, loader: loader}
}

func (h UpdateAudienceThumbnailHandler) Handle(ctx context.Context, cmd UpdateAudienceThumbnail) (*post.Audience, error) {

	var oldResourceId string

	aud, err := h.pr.UpdateAudienceThumbnail(ctx, cmd.Principal, cmd.AudienceId, func(audience *post.Audience) error {

		if audience.ThumbnailResource() != nil {
			oldResourceId = audience.ThumbnailResource().ID()
		}

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.AudienceId, []string{cmd.Thumbnail}, false, "AUDIENCE")

		if err != nil {
			return err
		}

		return audience.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if oldResourceId != "" {
		if err := h.loader.DeleteResources(ctx, cmd.AudienceId, []string{oldResourceId}); err != nil {
			return nil, err
		}
	}

	if err != nil {
		return nil, err
	}

	return aud, nil
}
