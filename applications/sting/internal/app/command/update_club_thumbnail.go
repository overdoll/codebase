package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/principal"
)

type UpdateClubThumbnail struct {
	Principal *principal.Principal

	ClubId    string
	Thumbnail string
}

type UpdateClubThumbnailHandler struct {
	cr     club.Repository
	loader LoaderService
}

func NewUpdateClubThumbnailHandler(cr club.Repository, loader LoaderService) UpdateClubThumbnailHandler {
	return UpdateClubThumbnailHandler{cr: cr, loader: loader}
}

func (h UpdateClubThumbnailHandler) Handle(ctx context.Context, cmd UpdateClubThumbnail) (*club.Club, error) {

	var oldResourceId string

	clb, err := h.cr.UpdateClubThumbnail(ctx, cmd.ClubId, func(clb *club.Club) error {

		if clb.ThumbnailResource() != nil {
			if !clb.ThumbnailResource().IsProcessed() {
				return domainerror.NewValidation("cannot update thumbnail until resource is processed")
			}
		}

		if clb.ThumbnailResource() != nil {
			oldResourceId = clb.ThumbnailResource().ID()
		}

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.ClubId, []string{cmd.Thumbnail}, false, "CLUB")

		if err != nil {
			return err
		}

		return clb.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	if oldResourceId != "" {
		if err := h.loader.DeleteResources(ctx, cmd.ClubId, []string{oldResourceId}); err != nil {
			return nil, err
		}
	}

	return clb, nil
}
