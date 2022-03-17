package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/principal"
)

type RuleByPostId struct {
	Principal *principal.Principal
	PostId    string
}

type RuleByPostIdIdHandler struct {
	rr rule.Repository
	ar post_audit_log.Repository
}

func NewRuleByPostIdIdHandler(rr rule.Repository, ar post_audit_log.Repository) RuleByPostIdIdHandler {
	return RuleByPostIdIdHandler{rr: rr, ar: ar}
}

func (h RuleByPostIdIdHandler) Handle(ctx context.Context, query RuleByPostId) (*rule.Rule, error) {

	ruleId, err := h.ar.GetRuleIdForPost(ctx, query.Principal, query.PostId)

	if err != nil {
		return nil, err
	}

	rule, err := h.rr.GetRuleById(ctx, *ruleId)

	if err != nil {
		return nil, err
	}

	return rule, nil
}
