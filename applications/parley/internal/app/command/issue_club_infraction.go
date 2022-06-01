package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/event"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/principal"
	"overdoll/libraries/uuid"
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
	event  event.Repository
	stella StellaService
}

func NewIssueClubInfractionHandler(cr club_infraction.Repository, rr rule.Repository, event event.Repository, ss StellaService) IssueClubInfractionHandler {
	return IssueClubInfractionHandler{cr: cr, rr: rr, event: event, stella: ss}
}

func (h IssueClubInfractionHandler) Handle(ctx context.Context, cmd IssueClubInfraction) (*club_infraction.ClubInfractionHistory, error) {

	if err := h.stella.GetClubById(ctx, cmd.ClubId); err != nil {
		return nil, err
	}

	ruleItem, err := h.rr.GetRuleById(ctx, cmd.RuleId)

	if err != nil {
		return nil, err
	}

	if err := h.event.IssueClubInfraction(ctx, cmd.Principal, cmd.ClubId, ruleItem); err != nil {
		return nil, err
	}

	return club_infraction.UnmarshalClubInfractionHistoryFromDatabase(
		uuid.New().String(),
		cmd.ClubId,
		cmd.Principal.AccountId(),
		"MANUAL",
		ruleItem.ID(),
		time.Now(),
		time.Now(),
		0,
	), nil
}
