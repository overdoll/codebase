package query

import (
	"context"
	"overdoll/applications/parley/internal/domain/rule"

	"overdoll/libraries/paging"
)

type Rules struct {
	Cursor     *paging.Cursor
	Deprecated bool
}

type RulesHandler struct {
	rr rule.Repository
}

func NewRulesHandler(rr rule.Repository) RulesHandler {
	return RulesHandler{rr: rr}
}

func (h RulesHandler) Handle(ctx context.Context, query Rules) ([]*rule.Rule, error) {

	reasons, err := h.rr.GetRules(ctx, query.Cursor, query.Deprecated)

	if err != nil {
		return nil, err
	}

	return reasons, nil
}
