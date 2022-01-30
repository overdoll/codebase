package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/principal"
)

type UpdateRuleInfraction struct {
	Principal  *principal.Principal
	RuleId     string
	Infraction bool
}

type UpdateRuleInfractionHandler struct {
	rr rule.Repository
}

func NewUpdateRuleInfractionHandler(rr rule.Repository) UpdateRuleInfractionHandler {
	return UpdateRuleInfractionHandler{rr: rr}
}

func (h UpdateRuleInfractionHandler) Handle(ctx context.Context, cmd UpdateRuleInfraction) (*rule.Rule, error) {

	ruleItem, err := h.rr.UpdateRuleInfraction(ctx, cmd.RuleId, func(rule *rule.Rule) error {
		return rule.UpdateInfraction(cmd.Principal, cmd.Infraction)
	})

	if err != nil {
		return nil, err
	}

	return ruleItem, nil
}
