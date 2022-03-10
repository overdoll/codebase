package activities

import (
	"context"
)

type GetRuleDetailsInput struct {
	RuleId string
}

type GetRuleDetailsPayload struct {
	IsInfraction bool
}

func (h *Activities) GetRuleDetails(ctx context.Context, input GetRuleDetailsInput) (*GetRuleDetailsPayload, error) {

	rule, err := h.rr.GetRuleById(ctx, input.RuleId)

	if err != nil {
		return nil, err
	}

	return &GetRuleDetailsPayload{
		IsInfraction: rule.Infraction(),
	}, nil
}
