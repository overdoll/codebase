package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/principal"
	"time"
)

type IssueClubInfraction struct {
	Principal     *principal.Principal
	ClubId        string
	RuleId        string
	CustomEndTime *time.Time
}

type IssueClubInfractionHandler struct {
	cr     club_infraction.Repository
	rr     rule.Repository
	stella StellaService
}

func NewIssueClubInfractionHandler(cr club_infraction.Repository, rr rule.Repository, ss StellaService) IssueClubInfractionHandler {
	return IssueClubInfractionHandler{cr: cr, rr: rr, stella: ss}
}

func (h IssueClubInfractionHandler) Handle(ctx context.Context, cmd IssueClubInfraction) (*club_infraction.ClubInfractionHistory, error) {

	if err := h.stella.GetClubById(ctx, cmd.ClubId); err != nil {
		return nil, err
	}

	ruleItem, err := h.rr.GetRuleById(ctx, cmd.RuleId)

	if err != nil {
		return nil, err
	}

	var clubInfractionHistory *club_infraction.ClubInfractionHistory

	if cmd.CustomEndTime != nil {

		clubInfractionHistory, err = club_infraction.IssueClubInfractionHistoryManualWithCustomLength(
			cmd.Principal,
			cmd.ClubId,
			ruleItem,
			*cmd.CustomEndTime,
		)

		if err != nil {
			return nil, err
		}

	} else {

		pastClubInfractionHistory, err := h.cr.GetClubInfractionHistoryByClubId(ctx, cmd.Principal, nil, cmd.ClubId)

		if err != nil {
			return nil, err
		}

		clubInfractionHistory, err = club_infraction.IssueClubInfractionHistoryManual(
			cmd.Principal,
			cmd.ClubId,
			pastClubInfractionHistory,
			ruleItem,
		)

		if err != nil {
			return nil, err
		}
	}

	if err := h.cr.CreateClubInfractionHistory(ctx, clubInfractionHistory); err != nil {
		return nil, err
	}

	return clubInfractionHistory, nil
}
