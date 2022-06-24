package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"

	"overdoll/libraries/principal"
)

type EnableClubSupporterOnlyPosts struct {
	ClubId    string
	Principal *principal.Principal
}

type EnableClubSupporterOnlyPostsHandler struct {
	cr club.Repository
}

func NewEnableClubSupporterOnlyPostsHandler(cr club.Repository) EnableClubSupporterOnlyPostsHandler {
	return EnableClubSupporterOnlyPostsHandler{cr: cr}
}

func (h EnableClubSupporterOnlyPostsHandler) Handle(ctx context.Context, cmd EnableClubSupporterOnlyPosts) (*club.Club, error) {

	clb, err := h.cr.UpdateClubSupporterOnlyPostsDisabled(ctx, cmd.ClubId, func(club *club.Club) error {
		return club.UpdateEnableSupporterOnlyPosts(cmd.Principal)
	})

	if err != nil {
		return nil, err
	}

	return clb, nil
}
