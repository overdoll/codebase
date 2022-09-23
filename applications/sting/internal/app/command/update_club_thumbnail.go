package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/media"
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

	clb, err := h.cr.UpdateClubThumbnail(ctx, cmd.ClubId, func(clb *club.Club) error {

		// create resources from content
		resourceIds, err := h.loader.ProcessMediaFromUploads(ctx, []string{cmd.Thumbnail}, media.NewClubThumbnailMediaLink(cmd.ClubId))

		if err != nil {
			return err
		}

		return clb.UpdateThumbnail(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
