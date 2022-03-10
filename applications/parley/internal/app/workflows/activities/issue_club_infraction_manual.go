package activities

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"time"
)

type IssueClubInfractionManualInput struct {
	AccountId     string
	ClubId        string
	RuleId        string
	CustomEndTime *time.Time
}

func (h *Activities) IssueClubInfractionManual(ctx context.Context, input IssueClubInfractionManualInput) (int64, error) {

	var clubInfractionHistory *club_infraction.ClubInfractionHistory
	var err error

	if input.CustomEndTime != nil {

		clubInfractionHistory, err = club_infraction.IssueClubInfractionHistoryManualWithCustomLength(
			input.AccountId,
			input.ClubId,
			input.RuleId,
			*input.CustomEndTime,
		)

		if err != nil {
			return 0, err
		}

	} else {

		pastClubInfractionHistory, err := h.cr.GetAllClubInfractionHistoryByClubIdOperator(ctx, input.ClubId)

		if err != nil {
			return 0, err
		}

		clubInfractionHistory, err = club_infraction.IssueClubInfractionHistoryManual(
			input.AccountId,
			input.ClubId,
			pastClubInfractionHistory,
			input.RuleId,
		)

		if err != nil {
			return 0, err
		}
	}

	if err := h.cr.CreateClubInfractionHistory(ctx, clubInfractionHistory); err != nil {
		return 0, err
	}

	return clubInfractionHistory.ClubSuspensionLength(), nil
}
