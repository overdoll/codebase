package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/post"
	"overdoll/libraries/principal"
)

type UpdateAudienceBanner struct {
	Principal  *principal.Principal
	AudienceId string
	Banner     string
}

type UpdateAudienceBannerHandler struct {
	pr     post.Repository
	loader LoaderService
}

func NewUpdateAudienceBannerHandler(pr post.Repository, loader LoaderService) UpdateAudienceBannerHandler {
	return UpdateAudienceBannerHandler{pr: pr, loader: loader}
}

func (h UpdateAudienceBannerHandler) Handle(ctx context.Context, cmd UpdateAudienceBanner) (*post.Audience, error) {

	aud, err := h.pr.UpdateAudienceBanner(ctx, cmd.Principal, cmd.AudienceId, func(audience *post.Audience) error {

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.AudienceId, []string{cmd.Banner}, false, "AUDIENCE_BANNER", true, 480, 640)

		if err != nil {
			return err
		}

		return audience.UpdateBanner(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	return aud, nil
}
