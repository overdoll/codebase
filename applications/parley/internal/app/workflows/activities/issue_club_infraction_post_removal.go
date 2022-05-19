package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
)

type IssueClubInfractionPostRemovalInput struct {
	AccountId string
	ClubId    string
	RuleId    string
}

func (h *Activities) IssueClubInfractionPostRemoval(ctx context.Context, input IssueClubInfractionPostRemovalInput) (int64, error) {

	pastInfractionHistory, err := h.cr.GetAllClubInfractionHistoryByClubIdOperator(ctx, input.ClubId)

	if err != nil {
		return 0, err
	}

	// create a new infraction for this club
	infraction, err := club_infraction.IssueClubInfractionHistoryFromPostManualRemoval(input.AccountId, input.ClubId, pastInfractionHistory, input.RuleId)

	if err != nil {
		return 0, err
	}

	if err := h.cr.CreateClubInfractionHistory(ctx, infraction); err != nil {
		return 0, err
	}

	return infraction.ClubSuspensionLength(), nil
}
