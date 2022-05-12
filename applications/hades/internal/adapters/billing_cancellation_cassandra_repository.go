package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
)

var cancellationReasonsTable = table.New(table.Metadata{
	Name: "cancellation_reasons",
	Columns: []string{
		"id",
		"bucket",
		"title",
		"deprecated",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

type cancellationReason struct {
	Id         string            `db:"id"`
	Deprecated bool              `db:"deprecated"`
	Bucket     int               `db:"bucket"`
	Title      map[string]string `db:"title"`
}

func marshalCancellationReasonToDatabase(clubInfractionRs *billing.CancellationReason) *cancellationReason {
	return &cancellationReason{
		Id:         clubInfractionRs.ID(),
		Deprecated: clubInfractionRs.Deprecated(),
		Bucket:     0,
		Title:      localization.MarshalTranslationToDatabase(clubInfractionRs.Title()),
	}
}

func (r BillingCassandraElasticsearchRepository) CreateCancellationReason(ctx context.Context, reasonItem *billing.CancellationReason) error {

	if err := r.session.
		Query(cancellationReasonsTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalCancellationReasonToDatabase(reasonItem)).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create cancellation reason: %v", err)
	}

	return nil
}

func (r BillingCassandraElasticsearchRepository) GetCancellationReasons(ctx context.Context, cursor *paging.Cursor, deprecated bool) ([]*billing.CancellationReason, error) {

	builder := cancellationReasonsTable.SelectBuilder()

	data := &cancellationReason{Bucket: 0}

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", false); err != nil {
			return nil, err
		}
	}

	var dbRules []cancellationReason

	if err := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data).
		Select(&dbRules); err != nil {
		return nil, fmt.Errorf("failed to get cancellationReason: %v", err)
	}

	var rulesItems []*billing.CancellationReason
	for _, ruleSingle := range dbRules {

		// skip over deprecated
		if ruleSingle.Deprecated && !deprecated {
			continue
		}

		reason := billing.UnmarshalCancellationReasonFromDatabase(
			ruleSingle.Id,
			ruleSingle.Title,
			ruleSingle.Deprecated,
		)
		reason.Node = paging.NewNode(ruleSingle.Id)
		rulesItems = append(rulesItems, reason)
	}

	return rulesItems, nil
}

func (r BillingCassandraElasticsearchRepository) getCancellationReasonById(ctx context.Context, reasonId string) (*billing.CancellationReason, error) {

	var ruleSingle cancellationReason

	if err := r.session.
		Query(cancellationReasonsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&cancellationReason{Id: reasonId, Bucket: 0}).
		Get(&ruleSingle); err != nil {

		if err == gocql.ErrNotFound {
			return nil, billing.ErrReasonNotFound
		}

		return nil, fmt.Errorf("failed to get cancellation reason by id: %v", err)
	}

	return billing.UnmarshalCancellationReasonFromDatabase(
		ruleSingle.Id,
		ruleSingle.Title,
		ruleSingle.Deprecated,
	), nil
}

func (r BillingCassandraElasticsearchRepository) GetCancellationReasonById(ctx context.Context, id string) (*billing.CancellationReason, error) {
	return r.getCancellationReasonById(ctx, id)
}

func (r BillingCassandraElasticsearchRepository) updateCancellationReason(ctx context.Context, ruleId string, updateFn func(reason *billing.CancellationReason) error, columns []string) (*billing.CancellationReason, error) {

	ruleItem, err := r.getCancellationReasonById(ctx, ruleId)

	if err != nil {
		return nil, err
	}

	err = updateFn(ruleItem)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(cancellationReasonsTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalCancellationReasonToDatabase(ruleItem)).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update cancellation reason: %v", err)
	}

	return ruleItem, nil
}

func (r BillingCassandraElasticsearchRepository) UpdateCancellationReasonDeprecated(ctx context.Context, reasonId string, updateFn func(reason *billing.CancellationReason) error) (*billing.CancellationReason, error) {
	return r.updateCancellationReason(ctx, reasonId, updateFn, []string{"deprecated"})
}

func (r BillingCassandraElasticsearchRepository) UpdateCancellationReasonTitle(ctx context.Context, reasonId string, updateFn func(reason *billing.CancellationReason) error) (*billing.CancellationReason, error) {
	return r.updateCancellationReason(ctx, reasonId, updateFn, []string{"title"})
}
