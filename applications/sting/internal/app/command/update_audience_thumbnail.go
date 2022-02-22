package command

import (
	"context"
	"github.com/pkg/errors"
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
	pi     post.IndexRepository
	loader LoaderService
}

func NewUpdateAudienceThumbnailHandler(pr post.Repository, pi post.IndexRepository, loader LoaderService) UpdateAudienceThumbnailHandler {
	return UpdateAudienceThumbnailHandler{pr: pr, pi: pi, loader: loader}
}

func (h UpdateAudienceThumbnailHandler) Handle(ctx context.Context, cmd UpdateAudienceThumbnail) (*post.Audience, error) {

	aud, err := h.pr.UpdateAudienceThumbnail(ctx, cmd.Principal, cmd.AudienceId, func(audience *post.Audience) error {

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.AudienceId, []string{cmd.Thumbnail}, false)

		if err != nil {
			return errors.Wrap(err, "failed to get or create resources from uploads")
		}

		return audience.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	if err := h.pi.IndexAudience(ctx, aud); err != nil {
		return nil, err
	}

	return aud, nil
}
