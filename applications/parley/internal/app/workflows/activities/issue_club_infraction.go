package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
)

type IssueClubInfraction struct {
	AccountId string
	ClubId    string
	RuleId    string
}

func (h *Activities) IssueClubInfraction(ctx context.Context, input IssueClubInfraction) error {

	pastInfractionHistory, err := h.cr.GetAllClubInfractionHistoryByClubIdOperator(ctx, input.ClubId)

	if err != nil {
		return err
	}

	// create a new infraction for this club
	infraction, err := club_infraction.IssueClubInfractionHistoryFromPostModeration(input.AccountId, input.ClubId, pastInfractionHistory, input.RuleId)

	if err != nil {
		return err
	}

	if err := h.cr.CreateClubInfractionHistory(ctx, infraction); err != nil {
		return err
	}

	return nil
}
