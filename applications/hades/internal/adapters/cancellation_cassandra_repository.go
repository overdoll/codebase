package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/hades/internal/domain/cancellation"
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

type CancellationCassandraRepository struct {
	session gocqlx.Session
}

func NewCancellationCassandraRepository(session gocqlx.Session) CancellationCassandraRepository {
	return CancellationCassandraRepository{session: session}
}

func marshalCancellationReasonToDatabase(clubInfractionRs *cancellation.Reason) *cancellationReason {
	return &cancellationReason{
		Id:         clubInfractionRs.ID(),
		Deprecated: clubInfractionRs.Deprecated(),
		Bucket:     0,
		Title:      localization.MarshalTranslationToDatabase(clubInfractionRs.Title()),
	}
}

func (r CancellationCassandraRepository) CreateReason(ctx context.Context, reasonItem *cancellation.Reason) error {

	if err := r.session.
		Query(cancellationReasonsTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalCancellationReasonToDatabase(reasonItem)).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create cancellation reason: %v", err)
	}

	return nil
}

func (r CancellationCassandraRepository) GetReasons(ctx context.Context, cursor *paging.Cursor, deprecated bool) ([]*cancellation.Reason, error) {

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

	var rulesItems []*cancellation.Reason
	for _, ruleSingle := range dbRules {

		// skip over deprecated
		if ruleSingle.Deprecated && !deprecated {
			continue
		}

		reason := cancellation.UnmarshalReasonFromDatabase(
			ruleSingle.Id,
			ruleSingle.Title,
			ruleSingle.Deprecated,
		)
		reason.Node = paging.NewNode(ruleSingle.Id)
		rulesItems = append(rulesItems, reason)
	}

	return rulesItems, nil
}

func (r CancellationCassandraRepository) getReasonById(ctx context.Context, reasonId string) (*cancellation.Reason, error) {

	var ruleSingle cancellationReason

	if err := r.session.
		Query(cancellationReasonsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&cancellationReason{Id: reasonId, Bucket: 0}).
		Get(&ruleSingle); err != nil {

		if err == gocql.ErrNotFound {
			return nil, cancellation.ErrReasonNotFound
		}

		return nil, fmt.Errorf("failed to get cancellation reason by id: %v", err)
	}

	return cancellation.UnmarshalReasonFromDatabase(
		ruleSingle.Id,
		ruleSingle.Title,
		ruleSingle.Deprecated,
	), nil
}

func (r CancellationCassandraRepository) GetReasonById(ctx context.Context, id string) (*cancellation.Reason, error) {
	return r.getReasonById(ctx, id)
}

func (r CancellationCassandraRepository) updateReason(ctx context.Context, ruleId string, updateFn func(reason *cancellation.Reason) error, columns []string) (*cancellation.Reason, error) {

	ruleItem, err := r.getReasonById(ctx, ruleId)

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

func (r CancellationCassandraRepository) UpdateReasonDeprecated(ctx context.Context, reasonId string, updateFn func(reason *cancellation.Reason) error) (*cancellation.Reason, error) {
	return r.updateReason(ctx, reasonId, updateFn, []string{"deprecated"})
}

func (r CancellationCassandraRepository) UpdateReasonTitle(ctx context.Context, reasonId string, updateFn func(reason *cancellation.Reason) error) (*cancellation.Reason, error) {
	return r.updateReason(ctx, reasonId, updateFn, []string{"title"})
}
