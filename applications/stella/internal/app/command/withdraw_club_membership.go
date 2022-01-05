package command

import (
	"context"
	"overdoll/applications/stella/internal/domain/club"

	"overdoll/libraries/principal"
)

type WithdrawClubMembership struct {
	Principal *principal.Principal
	ClubId    string
}

type WithdrawClubMembershipHandler struct {
	cr club.Repository
}

func NewWithdrawClubMembershipHandler(cr club.Repository) WithdrawClubMembershipHandler {
	return WithdrawClubMembershipHandler{cr: cr}
}

func (h WithdrawClubMembershipHandler) Handle(ctx context.Context, cmd WithdrawClubMembership) error {

	if err := h.cr.DeleteClubMember(ctx, cmd.Principal, cmd.ClubId, cmd.Principal.AccountId()); err != nil {
		return err
	}

	return nil
}
