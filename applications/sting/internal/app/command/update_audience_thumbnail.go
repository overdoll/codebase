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

	aud, err := h.pr.UpdateAudienceThumbnail(ctx, cmd.Principal, cmd.AudienceId, func(audience *post.Audience) error {

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.AudienceId, []string{cmd.Thumbnail}, false, "AUDIENCE", true, 100, 100)

		if err != nil {
			return err
		}

		return audience.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	return aud, nil
}
