package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/media"
	"overdoll/libraries/principal"
)

type UpdateClubHeader struct {
	Principal *principal.Principal

	ClubId string
	Header string
}

type UpdateClubHeaderHandler struct {
	cr     club.Repository
	loader LoaderService
}

func NewUpdateClubHeaderHandler(cr club.Repository, loader LoaderService) UpdateClubHeaderHandler {
	return UpdateClubHeaderHandler{cr: cr, loader: loader}
}

func (h UpdateClubHeaderHandler) Handle(ctx context.Context, cmd UpdateClubHeader) (*club.Club, error) {

	clb, err := h.cr.UpdateClubHeader(ctx, cmd.ClubId, func(clb *club.Club) error {

		// create resources from content
		resourceIds, err := h.loader.ProcessMediaFromUploads(ctx, []string{cmd.Header}, media.NewClubHeaderMediaLink(cmd.ClubId))

		if err != nil {
			return err
		}

		return clb.UpdateHeader(cmd.Principal, resourceIds[0])
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
