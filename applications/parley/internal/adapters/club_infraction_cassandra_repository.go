package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/localization"
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
		"infraction_id",
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
	InfractionId         string    `db:"infraction_id"`
	Source               string    `db:"source"`
	ClubSuspensionLength int64     `db:"club_suspension_length"`
	IssuedAt             time.Time `db:"issued_at"`
	ExpiresAt            time.Time `db:"expires_at"`
}

var clubInfractionReasonsTable = table.New(table.Metadata{
	Name: "post_rejection_reasons",
	Columns: []string{
		"id",
		"bucket",
		"reason",
		"deprecated",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

type clubInfractionReason struct {
	Id         string            `db:"id"`
	Deprecated bool              `db:"deprecated"`
	Bucket     int               `db:"bucket"`
	Reason     map[string]string `db:"reason"`
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
		InfractionId:         infractionHistory.Reason().ID(),
		IssuerAccountId:      infractionHistory.IssuerAccountId(),
		Source:               infractionHistory.Source().String(),
		ClubSuspensionLength: infractionHistory.ClubSuspensionLength(),
		IssuedAt:             infractionHistory.IssuedAt(),
		ExpiresAt:            infractionHistory.ExpiresAt(),
	}
}

func (r ClubInfractionCassandraRepository) CreateClubInfractionReason(ctx context.Context, clubInfractionRs *club_infraction.ClubInfractionReason) error {

	if err := r.session.
		Query(clubInfractionReasonsTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubInfractionReason{
			Id:         clubInfractionRs.ID(),
			Deprecated: clubInfractionRs.Deprecated(),
			Bucket:     0,
			Reason:     localization.MarshalTranslationToDatabase(clubInfractionRs.Reason()),
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create club infraction reason: %v", err)
	}

	return nil
}

func (r ClubInfractionCassandraRepository) GetClubInfractionReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, deprecated bool) ([]*club_infraction.ClubInfractionReason, error) {

	builder := clubInfractionReasonsTable.SelectBuilder()

	data := &clubInfractionReason{Bucket: 0}

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", false); err != nil {
			return nil, err
		}
	}

	clubInfractionReasonsQuery := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data)

	var dbClubInfractionReasons []clubInfractionReason

	if err := clubInfractionReasonsQuery.Select(&dbClubInfractionReasons); err != nil {
		return nil, fmt.Errorf("failed to get club infraction reasons: %v", err)
	}

	var clubInfractionReasons []*club_infraction.ClubInfractionReason
	for _, clubInfractionR := range dbClubInfractionReasons {

		if deprecated != clubInfractionR.Deprecated {
			continue
		}

		reason := club_infraction.UnmarshalClubInfractionReasonFromDatabase(clubInfractionR.Id, clubInfractionR.Reason, clubInfractionR.Deprecated)
		reason.Node = paging.NewNode(clubInfractionR.Id)
		clubInfractionReasons = append(clubInfractionReasons, reason)
	}

	return clubInfractionReasons, nil
}

func (r ClubInfractionCassandraRepository) getClubInfractionReasonById(ctx context.Context, clubInfractionReasonId string) (*club_infraction.ClubInfractionReason, error) {

	var clubInfractionR clubInfractionReason

	if err := r.session.
		Query(clubInfractionReasonsTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubInfractionReason{Id: clubInfractionReasonId, Bucket: 0}).
		Get(&clubInfractionR); err != nil {
		return nil, fmt.Errorf("failed to get club infraction reasons: %v", err)
	}

	return club_infraction.UnmarshalClubInfractionReasonFromDatabase(clubInfractionR.Id, clubInfractionR.Reason, clubInfractionR.Deprecated), nil
}

func (r ClubInfractionCassandraRepository) GetClubInfractionReasonById(ctx context.Context, requester *principal.Principal, clubInfractionReasonId string) (*club_infraction.ClubInfractionReason, error) {
	return r.getClubInfractionReasonById(ctx, clubInfractionReasonId)
}

func (r ClubInfractionCassandraRepository) updateClubInfractionReason(ctx context.Context, clubInfractionReasonId string, updateFn func(clubInfractionReason *club_infraction.ClubInfractionReason) error, columns []string) (*club_infraction.ClubInfractionReason, error) {

	clubInfractionR, err := r.getClubInfractionReasonById(ctx, clubInfractionReasonId)

	if err != nil {
		return nil, err
	}

	err = updateFn(clubInfractionR)

	if err != nil {
		return nil, err
	}

	updateCatQuery := r.session.
		Query(clubInfractionReasonsTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubInfractionReason{
			Id:         clubInfractionR.ID(),
			Deprecated: clubInfractionR.Deprecated(),
			Bucket:     0,
			Reason:     localization.MarshalTranslationToDatabase(clubInfractionR.Reason()),
		})

	if err := updateCatQuery.ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update club infraction reason: %v", err)
	}

	return clubInfractionR, nil
}

func (r ClubInfractionCassandraRepository) UpdateClubInfractionReasonDeprecated(ctx context.Context, clubInfractionReasonId string, updateFn func(clubInfractionReason *club_infraction.ClubInfractionReason) error) (*club_infraction.ClubInfractionReason, error) {
	return r.updateClubInfractionReason(ctx, clubInfractionReasonId, updateFn, []string{"deprecated"})
}

func (r ClubInfractionCassandraRepository) UpdateClubInfractionReasonText(ctx context.Context, clubInfractionReasonId string, updateFn func(clubInfractionReason *club_infraction.ClubInfractionReason) error) (*club_infraction.ClubInfractionReason, error) {
	return r.updateClubInfractionReason(ctx, clubInfractionReasonId, updateFn, []string{"reason"})
}

func (r ClubInfractionCassandraRepository) CreateClubInfractionHistory(ctx context.Context, clubInfraction *club_infraction.ClubInfractionHistory) error {

	if err := r.session.
		Query(clubInfractionHistoryTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalClubInfractionHistoryToDatabase(clubInfraction)).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create club infraction: %v", err)
	}

	return nil
}

func (r ClubInfractionCassandraRepository) DeleteClubInfractionHistory(ctx context.Context, requester *principal.Principal, clubInfraction *club_infraction.ClubInfractionHistory) error {

	if err := clubInfraction.CanDelete(requester); err != nil {
		return err
	}

	if err := r.session.
		Query(clubInfractionHistoryTable.Delete()).
		Consistency(gocql.LocalQuorum).
		BindStruct(marshalClubInfractionHistoryToDatabase(clubInfraction)).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to delete club infraction: %v", err)
	}

	return nil
}

// since we dont want to duplicate rejection reasons (they're subject to changes like translations or updates) we can use this function to get all
// rejection reasons as a map, which can then be used to map audit logs and infraction history without a performance penalty on hitting multiple partitions
func (r ClubInfractionCassandraRepository) getClubInfractionReasonsAsMap(ctx context.Context, requester *principal.Principal) (map[string]*club_infraction.ClubInfractionReason, error) {

	clubInfractionReasons, err := r.GetClubInfractionReasons(ctx, requester, nil, true)

	if err != nil {
		return nil, err
	}

	rejectionReasonMap := make(map[string]*club_infraction.ClubInfractionReason)

	for _, reason := range clubInfractionReasons {
		rejectionReasonMap[reason.ID()] = reason
	}

	return rejectionReasonMap, nil
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

	infractionHistoryQuery := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data)

	var dbClubInfractionHistory []clubInfractionHistory

	if err := infractionHistoryQuery.Select(&dbClubInfractionHistory); err != nil {
		return nil, fmt.Errorf("failed to get infraction history for account: %v", err)
	}

	clubInfractionReasonsMap, err := r.getClubInfractionReasonsAsMap(ctx, requester)

	if err != nil {
		return nil, err
	}

	var infractionHistory []*club_infraction.ClubInfractionHistory
	for _, infractionHist := range dbClubInfractionHistory {
		if clubInfractionReason, ok := clubInfractionReasonsMap[infractionHist.InfractionId]; ok {
			infract := club_infraction.UnmarshalClubInfractionHistoryFromDatabase(
				infractionHist.Id,
				infractionHist.ClubId,
				infractionHist.IssuerAccountId,
				infractionHist.Source,
				clubInfractionReason,
				infractionHist.IssuedAt,
				infractionHist.ExpiresAt,
				infractionHist.ClubSuspensionLength,
			)
			infract.Node = paging.NewNode(infractionHist.Id)
			infractionHistory = append(infractionHistory, infract)
		} else {
			return nil, post_audit_log.ErrPostRejectionReasonNotFound
		}
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
		Consistency(gocql.LocalQuorum).
		BindStruct(&clubInfractionHistory{Id: id, ClubId: userId}).
		Get(&dbAccountInfractionHistory); err != nil {

		if err == gocql.ErrNotFound {
			return nil, club_infraction.ErrClubInfractionHistoryNotFound
		}

		return nil, fmt.Errorf("failed to get club infraction history: %v", err)
	}

	clubInfractionReason, err := r.GetClubInfractionReasonById(ctx, requester, dbAccountInfractionHistory.InfractionId)

	if err != nil {
		return nil, err
	}

	return club_infraction.UnmarshalClubInfractionHistoryFromDatabase(
		dbAccountInfractionHistory.Id,
		dbAccountInfractionHistory.ClubId,
		dbAccountInfractionHistory.IssuerAccountId,
		dbAccountInfractionHistory.Source,
		clubInfractionReason,
		dbAccountInfractionHistory.IssuedAt,
		dbAccountInfractionHistory.ExpiresAt,
		dbAccountInfractionHistory.ClubSuspensionLength,
	), nil
}
