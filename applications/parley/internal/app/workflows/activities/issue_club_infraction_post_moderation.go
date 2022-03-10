package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
)

type IssueClubInfractionPostModerationInput struct {
	AccountId string
	ClubId    string
	RuleId    string
}

func (h *Activities) IssueClubInfractionPostModeration(ctx context.Context, input IssueClubInfractionPostModerationInput) (int64, error) {

	pastInfractionHistory, err := h.cr.GetAllClubInfractionHistoryByClubIdOperator(ctx, input.ClubId)

	if err != nil {
		return 0, err
	}

	// create a new infraction for this club
	infraction, err := club_infraction.IssueClubInfractionHistoryFromPostModeration(input.AccountId, input.ClubId, pastInfractionHistory, input.RuleId)

	if err != nil {
		return 0, err
	}

	if err := h.cr.CreateClubInfractionHistory(ctx, infraction); err != nil {
		return 0, err
	}

	return infraction.ClubSuspensionLength(), nil
}
