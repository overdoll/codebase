package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/principal"
)

type UpdateRuleDescription struct {
	Principal   *principal.Principal
	RuleId      string
	Description string
	Locale      string
}

type UpdateRuleDescriptionHandler struct {
	rr rule.Repository
}

func NewUpdateRuleDescriptionHandler(rr rule.Repository) UpdateRuleDescriptionHandler {
	return UpdateRuleDescriptionHandler{rr: rr}
}

func (h UpdateRuleDescriptionHandler) Handle(ctx context.Context, cmd UpdateRuleDescription) (*rule.Rule, error) {

	ruleItem, err := h.rr.UpdateRuleDescription(ctx, cmd.RuleId, func(rule *rule.Rule) error {
		return rule.UpdateDescription(cmd.Principal, cmd.Description, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return ruleItem, nil
}
