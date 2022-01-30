package command

import (
	"context"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/principal"
)

type CreateRule struct {
	Principal   *principal.Principal
	Title       string
	Description string
	Infraction  bool
}

type CreateRuleHandler struct {
	rr rule.Repository
}

func NewCreateRuleHandler(rr rule.Repository) CreateRuleHandler {
	return CreateRuleHandler{rr: rr}
}

func (h CreateRuleHandler) Handle(ctx context.Context, cmd CreateRule) (*rule.Rule, error) {

	resultRule, err := rule.NewRule(
		cmd.Principal,
		cmd.Title,
		cmd.Description,
		cmd.Infraction,
	)

	if err != nil {
		return nil, err
	}

	if err := h.rr.CreateRule(ctx, resultRule); err != nil {
		return nil, err
	}

	return resultRule, nil
}
