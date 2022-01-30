package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/principal"
)

type UpdateRuleDeprecated struct {
	Principal  *principal.Principal
	RuleId     string
	Deprecated bool
}

type UpdateRuleDeprecatedHandler struct {
	rr rule.Repository
}

func NewUpdateRuleDeprecatedHandler(rr rule.Repository) UpdateRuleDeprecatedHandler {
	return UpdateRuleDeprecatedHandler{rr: rr}
}

func (h UpdateRuleDeprecatedHandler) Handle(ctx context.Context, cmd UpdateRuleDeprecated) (*rule.Rule, error) {

	ruleItem, err := h.rr.UpdateRuleDeprecated(ctx, cmd.RuleId, func(rule *rule.Rule) error {
		return rule.UpdateDeprecated(cmd.Principal, cmd.Deprecated)
	})

	if err != nil {
		return nil, err
	}

	return ruleItem, nil
}
