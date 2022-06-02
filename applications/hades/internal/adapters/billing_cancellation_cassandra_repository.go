package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/libraries/errors"
	"overdoll/libraries/errors/domainerror"
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
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalCancellationReasonToDatabase(reasonItem)).
		ExecRelease(); err != nil {
		return errors.Wrap(err, "failed to create cancellation reason")
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
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(data).
		SelectRelease(&dbRules); err != nil {
		return nil, errors.Wrap(err, "failed to get cancellation reason")
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
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&cancellationReason{Id: reasonId, Bucket: 0}).
		GetRelease(&ruleSingle); err != nil {

		if err == gocql.ErrNotFound {
			return nil, domainerror.NewNotFoundError("cancellation reason", reasonId)
		}

		return nil, errors.Wrap(err, "failed to get cancellation reason by id")
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
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalCancellationReasonToDatabase(ruleItem)).
		ExecRelease(); err != nil {
		return nil, errors.Wrap(err, "failed to update cancellation reason")
	}

	return ruleItem, nil
}

func (r BillingCassandraElasticsearchRepository) UpdateCancellationReasonDeprecated(ctx context.Context, reasonId string, updateFn func(reason *billing.CancellationReason) error) (*billing.CancellationReason, error) {
	return r.updateCancellationReason(ctx, reasonId, updateFn, []string{"deprecated"})
}

func (r BillingCassandraElasticsearchRepository) UpdateCancellationReasonTitle(ctx context.Context, reasonId string, updateFn func(reason *billing.CancellationReason) error) (*billing.CancellationReason, error) {
	return r.updateCancellationReason(ctx, reasonId, updateFn, []string{"title"})
}
