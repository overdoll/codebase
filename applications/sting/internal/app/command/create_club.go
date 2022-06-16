package command

import (
	"context"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/applications/sting/internal/domain/event"

	"overdoll/libraries/principal"
)

type CreateClub struct {
	Principal *principal.Principal
	Slug      string
	Name      string
}

type CreateClubHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewCreateClubHandler(cr club.Repository, event event.Repository) CreateClubHandler {
	return CreateClubHandler{cr: cr, event: event}
}

func (h CreateClubHandler) Handle(ctx context.Context, cmd CreateClub) (*club.Club, error) {

	// get clubs count for account
	currentCount, err := h.cr.GetAccountClubsCount(ctx, cmd.Principal, cmd.Principal.AccountId())

	if err != nil {
		return nil, err
	}

	clb, err := club.NewClub(cmd.Principal, cmd.Slug, cmd.Name, currentCount)

	if err != nil {
		return nil, err
	}

	// reserve the slug for the club
	if err := h.cr.ReserveSlugForClub(ctx, clb); err != nil {
		return nil, err
	}

	if err := h.event.CreateClub(ctx, cmd.Principal, clb); err != nil {

		// if creating the club failed, delete the reserved slug, so it can be tried again
		if err := h.cr.DeleteReservedSlugForClub(ctx, clb); err != nil {
			return nil, err
		}

		return nil, err
	}

	if err := h.event.WaitForClubToBeReady(ctx, cmd.Principal, clb); err != nil {
		return nil, err
	}

	return clb, nil
}
