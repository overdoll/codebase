package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/principal"
)

type UpdateRuleTitle struct {
	Principal *principal.Principal
	RuleId    string
	Title     string
	Locale    string
}

type UpdateRuleTitleHandler struct {
	rr rule.Repository
}

func NewUpdateRuleTitleHandler(rr rule.Repository) UpdateRuleTitleHandler {
	return UpdateRuleTitleHandler{rr: rr}
}

func (h UpdateRuleTitleHandler) Handle(ctx context.Context, cmd UpdateRuleTitle) (*rule.Rule, error) {

	ruleItem, err := h.rr.UpdateRuleTitle(ctx, cmd.RuleId, func(rule *rule.Rule) error {
		return rule.UpdateTitle(cmd.Principal, cmd.Title, cmd.Locale)
	})

	if err != nil {
		return nil, err
	}

	return ruleItem, nil
}
