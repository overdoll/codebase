package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/rule"
)

type RuleById struct {
	RuleId string
}

type RuleByIdHandler struct {
	rr rule.Repository
}

func NewRuleByIdHandler(rr rule.Repository) RuleByIdHandler {
	return RuleByIdHandler{rr: rr}
}

func (h RuleByIdHandler) Handle(ctx context.Context, query RuleById) (*rule.Rule, error) {

	rule, err := h.rr.GetRuleById(ctx, query.RuleId)

	if err != nil {
		return nil, err
	}

	return rule, nil
}
