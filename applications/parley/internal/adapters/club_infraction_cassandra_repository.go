package adapters

import (
	"context"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/libraries/errors"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

var clubInfractionHistoryTable = table.New(table.Metadata{
	Name: "club_infraction_history",
	Columns: []string{
		"id",
		"club_id",
		"issuer_account_id",
		"rule_id",
		"source",
		"club_suspension_length",
		"issued_at",
		"expires_at",
	},
	PartKey: []string{"club_id"},
	SortKey: []string{"id"},
})

type clubInfractionHistory struct {
	Id                   string    `db:"id"`
	ClubId               string    `db:"club_id"`
	IssuerAccountId      string    `db:"issuer_account_id"`
	RuleId               string    `db:"rule_id"`
	Source               string    `db:"source"`
	ClubSuspensionLength int64     `db:"club_suspension_length"`
	IssuedAt             time.Time `db:"issued_at"`
	ExpiresAt            time.Time `db:"expires_at"`
}

type ClubInfractionCassandraRepository struct {
	session gocqlx.Session
}

func NewClubInfractionCassandraRepository(session gocqlx.Session) ClubInfractionCassandraRepository {
	return ClubInfractionCassandraRepository{session: session}
}

func marshalClubInfractionHistoryToDatabase(infractionHistory *club_infraction.ClubInfractionHistory) *clubInfractionHistory {
	return &clubInfractionHistory{
		Id:                   infractionHistory.ID(),
		ClubId:               infractionHistory.ClubId(),
		RuleId:               infractionHistory.RuleId(),
		IssuerAccountId:      infractionHistory.IssuerAccountId(),
		Source:               infractionHistory.Source().String(),
		ClubSuspensionLength: infractionHistory.ClubSuspensionLength(),
		IssuedAt:             infractionHistory.IssuedAt(),
		ExpiresAt:            infractionHistory.ExpiresAt(),
	}
}

func (r ClubInfractionCassandraRepository) CreateClubInfractionHistory(ctx context.Context, clubInfraction *club_infraction.ClubInfractionHistory) error {

	if err := r.session.
		Query(clubInfractionHistoryTable.Insert()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalClubInfractionHistoryToDatabase(clubInfraction)).
		ExecRelease(); err != nil {
		return errors.Wrap(err, "failed to create club infraction")
	}

	return nil
}

func (r ClubInfractionCassandraRepository) DeleteClubInfractionHistory(ctx context.Context, requester *principal.Principal, clubInfraction *club_infraction.ClubInfractionHistory) error {

	if err := clubInfraction.CanDelete(requester); err != nil {
		return err
	}

	if err := r.session.
		Query(clubInfractionHistoryTable.Delete()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalClubInfractionHistoryToDatabase(clubInfraction)).
		ExecRelease(); err != nil {
		return errors.Wrap(err, "failed to delete club infraction")
	}

	return nil
}

func (r ClubInfractionCassandraRepository) GetAllClubInfractionHistoryByClubIdOperator(ctx context.Context, accountId string) ([]*club_infraction.ClubInfractionHistory, error) {

	var dbClubInfractionHistory []clubInfractionHistory

	if err := clubInfractionHistoryTable.SelectBuilder().
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubInfractionHistory{ClubId: accountId}).
		SelectRelease(&dbClubInfractionHistory); err != nil {
		return nil, errors.Wrap(err, "failed to get infraction history for account")
	}

	var infractionHistory []*club_infraction.ClubInfractionHistory
	for _, infractionHist := range dbClubInfractionHistory {
		infract := club_infraction.UnmarshalClubInfractionHistoryFromDatabase(
			infractionHist.Id,
			infractionHist.ClubId,
			infractionHist.IssuerAccountId,
			infractionHist.Source,
			infractionHist.RuleId,
			infractionHist.IssuedAt,
			infractionHist.ExpiresAt,
			infractionHist.ClubSuspensionLength,
		)
		infractionHistory = append(infractionHistory, infract)
	}

	return infractionHistory, nil
}

func (r ClubInfractionCassandraRepository) GetClubInfractionHistoryByClubId(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*club_infraction.ClubInfractionHistory, error) {

	if err := club_infraction.CanViewClubInfractionHistory(requester); err != nil {
		return nil, err
	}

	builder := clubInfractionHistoryTable.SelectBuilder()

	data := &clubInfractionHistory{ClubId: accountId}

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", true); err != nil {
			return nil, err
		}
	}

	var dbClubInfractionHistory []clubInfractionHistory

	if err := builder.
		Query(r.session).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(data).
		SelectRelease(&dbClubInfractionHistory); err != nil {
		return nil, errors.Wrap(err, "failed to get infraction history for account")
	}

	var infractionHistory []*club_infraction.ClubInfractionHistory
	for _, infractionHist := range dbClubInfractionHistory {
		infract := club_infraction.UnmarshalClubInfractionHistoryFromDatabase(
			infractionHist.Id,
			infractionHist.ClubId,
			infractionHist.IssuerAccountId,
			infractionHist.Source,
			infractionHist.RuleId,
			infractionHist.IssuedAt,
			infractionHist.ExpiresAt,
			infractionHist.ClubSuspensionLength,
		)
		infract.Node = paging.NewNode(infractionHist.Id)
		infractionHistory = append(infractionHistory, infract)
	}

	return infractionHistory, nil
}

func (r ClubInfractionCassandraRepository) GetClubInfractionHistoryById(ctx context.Context, requester *principal.Principal, clubId, historyId string) (*club_infraction.ClubInfractionHistory, error) {

	history, err := r.getClubInfractionHistoryById(ctx, requester, clubId, historyId)

	if err != nil {
		return nil, err
	}

	if err := history.CanView(requester); err != nil {
		return nil, err
	}

	return history, nil
}

func (r ClubInfractionCassandraRepository) getClubInfractionHistoryById(ctx context.Context, requester *principal.Principal, userId, id string) (*club_infraction.ClubInfractionHistory, error) {

	var dbAccountInfractionHistory clubInfractionHistory

	if err := r.session.
		Query(clubInfractionHistoryTable.Select()).
		WithContext(ctx).
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubInfractionHistory{Id: id, ClubId: userId}).
		GetRelease(&dbAccountInfractionHistory); err != nil {

		if err == gocql.ErrNotFound {
			return nil, club_infraction.ErrClubInfractionHistoryNotFound
		}

		return nil, errors.Wrap(err, "failed to get club infraction history")
	}

	return club_infraction.UnmarshalClubInfractionHistoryFromDatabase(
		dbAccountInfractionHistory.Id,
		dbAccountInfractionHistory.ClubId,
		dbAccountInfractionHistory.IssuerAccountId,
		dbAccountInfractionHistory.Source,
		dbAccountInfractionHistory.RuleId,
		dbAccountInfractionHistory.IssuedAt,
		dbAccountInfractionHistory.ExpiresAt,
		dbAccountInfractionHistory.ClubSuspensionLength,
	), nil
}
