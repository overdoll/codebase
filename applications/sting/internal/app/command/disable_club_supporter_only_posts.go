package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type DisableClubSupporterOnlyPosts struct {
	ClubId    string
	Principal *principal.Principal
}

type DisableClubSupporterOnlyPostsHandler struct {
	cr club.Repository
}

func NewDisableClubSupporterOnlyPostsHandler(cr club.Repository) DisableClubSupporterOnlyPostsHandler {
	return DisableClubSupporterOnlyPostsHandler{cr: cr}
}

func (h DisableClubSupporterOnlyPostsHandler) Handle(ctx context.Context, cmd DisableClubSupporterOnlyPosts) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSupporterOnlyPostsDisabled(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.UpdateDisableSupporterOnlyPosts(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
