package command

import (
	"context"
	"github.com/pkg/errors"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/libraries/principal"
)

type UpdateClubThumbnail struct {
	Principal *principal.Principal

	ClubId    string
	Thumbnail string
}

type UpdateClubThumbnailHandler struct {
	cr     club.Repository
	ci     club.IndexRepository
	loader LoaderService
}

func NewUpdateClubThumbnailHandler(cr club.Repository, ci club.IndexRepository, loader LoaderService) UpdateClubThumbnailHandler {
	return UpdateClubThumbnailHandler{cr: cr, ci: ci, loader: loader}
}

func (h UpdateClubThumbnailHandler) Handle(ctx context.Context, cmd UpdateClubThumbnail) (*club.Club, error) {

	clb, err := h.cr.UpdateClubThumbnail(ctx, cmd.ClubId, func(clb *club.Club) error {

		// create resources from content
		resourceIds, err := h.loader.CreateOrGetResourcesFromUploads(ctx, cmd.ClubId, []string{cmd.Thumbnail})

		if err != nil {
			return errors.Wrap(err, "failed to create processed resources from uploads")
		}

		return clb.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	if err := h.ci.IndexClub(ctx, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
