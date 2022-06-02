package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var rulesTable = table.New(table.Metadata{
	Name: "rules",
	Columns: []string{
		"id",
		"bucket",
		"title",
		"description",
		"deprecated",
		"infraction",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

type rules struct {
	Id          string            `db:"id"`
	Deprecated  bool              `db:"deprecated"`
	Infraction  bool              `db:"infraction"`
	Bucket      int               `db:"bucket"`
	Title       map[string]string `db:"title"`
	Description map[string]string `db:"description"`
}

type RuleCassandraRepository struct {
	session gocqlx.Session
}

func NewRuleCassandraRepository(session gocqlx.Session) RuleCassandraRepository {
	return RuleCassandraRepository{session: session}
}

func marshalRuleToDatabase(clubInfractionRs *rule.Rule) *rules {
	return &rules{
		Id:          clubInfractionRs.ID(),
		Deprecated:  clubInfractionRs.Deprecated(),
		Infraction:  clubInfractionRs.Infraction(),
		Bucket:      0,
		Title:       localization.MarshalTranslationToDatabase(clubInfractionRs.Title()),
		Description: localization.MarshalTranslationToDatabase(clubInfractionRs.Description()),
	}
}

func (r RuleCassandraRepository) CreateRule(ctx context.Context, ruleItem *rule.Rule) error {

	if err := r.session.
		Query(rulesTable.Insert()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalRuleToDatabase(ruleItem)).
		ExecRelease(); err != nil {
		return errors.Wrap(err, "CreateRule")
	}

	return nil
}

func (r RuleCassandraRepository) GetRules(ctx context.Context, cursor *paging.Cursor, deprecated bool) ([]*rule.Rule, error) {

	builder := rulesTable.SelectBuilder()

	data := &rules{Bucket: 0}

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", false); err != nil {
			return nil, err
		}
	}

	var dbRules []rules

	if err := builder.
		Query(r.session).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(data).
		SelectRelease(&dbRules); err != nil {
		return nil, errors.Wrap(err, "GetRules")
	}

	var rulesItems []*rule.Rule
	for _, ruleSingle := range dbRules {

		// skip over deprecated
		if ruleSingle.Deprecated && !deprecated {
			continue
		}

		reason := rule.UnmarshalRuleFromDatabase(
			ruleSingle.Id,
			ruleSingle.Title,
			ruleSingle.Description,
			ruleSingle.Infraction,
			ruleSingle.Deprecated,
		)
		reason.Node = paging.NewNode(ruleSingle.Id)
		rulesItems = append(rulesItems, reason)
	}

	return rulesItems, nil
}

func (r RuleCassandraRepository) getRuleById(ctx context.Context, ruleId string) (*rule.Rule, error) {

	var ruleSingle rules

	if err := r.session.
		Query(rulesTable.Get()).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(&rules{Id: ruleId, Bucket: 0}).
		GetRelease(&ruleSingle); err != nil {

		if err == gocql.ErrNotFound {
			return nil, domainerror.NewNotFoundError("rule", ruleId)
		}

		return nil, errors.Wrap(err, "getRuleById")
	}

	return rule.UnmarshalRuleFromDatabase(
		ruleSingle.Id,
		ruleSingle.Title,
		ruleSingle.Description,
		ruleSingle.Infraction,
		ruleSingle.Deprecated,
	), nil
}

func (r RuleCassandraRepository) GetRuleById(ctx context.Context, id string) (*rule.Rule, error) {
	return r.getRuleById(ctx, id)
}

func (r RuleCassandraRepository) updateRule(ctx context.Context, ruleId string, updateFn func(rule *rule.Rule) error, columns []string) (*rule.Rule, error) {

	ruleItem, err := r.getRuleById(ctx, ruleId)

	if err != nil {
		return nil, err
	}

	err = updateFn(ruleItem)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(rulesTable.Update(
			columns...,
		)).
		WithContext(ctx).
		Idempotent(true).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalRuleToDatabase(ruleItem)).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(err, "updateRule")
	}

	return ruleItem, nil
}

func (r RuleCassandraRepository) UpdateRuleDeprecated(ctx context.Context, ruleId string, updateFn func(rule *rule.Rule) error) (*rule.Rule, error) {
	return r.updateRule(ctx, ruleId, updateFn, []string{"deprecated"})
}

func (r RuleCassandraRepository) UpdateRuleTitle(ctx context.Context, ruleId string, updateFn func(rule *rule.Rule) error) (*rule.Rule, error) {
	return r.updateRule(ctx, ruleId, updateFn, []string{"title"})
}

func (r RuleCassandraRepository) UpdateRuleDescription(ctx context.Context, ruleId string, updateFn func(rule *rule.Rule) error) (*rule.Rule, error) {
	return r.updateRule(ctx, ruleId, updateFn, []string{"description"})
}

func (r RuleCassandraRepository) UpdateRuleInfraction(ctx context.Context, ruleId string, updateFn func(rule *rule.Rule) error) (*rule.Rule, error) {
	return r.updateRule(ctx, ruleId, updateFn, []string{"infraction"})
}
