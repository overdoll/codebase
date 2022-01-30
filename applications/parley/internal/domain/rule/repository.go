package rule

import (
	"context"
	"overdoll/libraries/paging"
)

type Repository interface {
	GetRuleById(ctx context.Context, id string) (*Rule, error)
	GetRules(ctx context.Context, cursor *paging.Cursor, deprecated bool) ([]*Rule, error)

	CreateRule(ctx context.Context, rule *Rule) error
	UpdateRuleTitle(ctx context.Context, ruleId string, updateFn func(rule *Rule) error) (*Rule, error)
	UpdateRuleDescription(ctx context.Context, ruleId string, updateFn func(rule *Rule) error) (*Rule, error)
	UpdateRuleDeprecated(ctx context.Context, ruleId string, updateFn func(rule *Rule) error) (*Rule, error)
	UpdateRuleInfraction(ctx context.Context, ruleId string, updateFn func(rule *Rule) error) (*Rule, error)
}
