package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"
	"overdoll/applications/stella/internal/domain/event"

	"overdoll/libraries/principal"
)

type WithdrawClubMembership struct {
	Principal *principal.Principal
	ClubId    string
}

type WithdrawClubMembershipHandler struct {
	cr    club.Repository
	event event.Repository
}

func NewWithdrawClubMembershipHandler(cr club.Repository, event event.Repository) WithdrawClubMembershipHandler {
	return WithdrawClubMembershipHandler{cr: cr, event: event}
}

func (h WithdrawClubMembershipHandler) Handle(ctx context.Context, cmd WithdrawClubMembership) error {

	if err := h.cr.DeleteClubMember(ctx, cmd.Principal, cmd.ClubId, cmd.Principal.AccountId()); err != nil {
		return err
	}

	if err := h.event.RemoveClubMember(ctx, cmd.ClubId, cmd.Principal.AccountId()); err != nil {
		return err
	}

	return nil
}
