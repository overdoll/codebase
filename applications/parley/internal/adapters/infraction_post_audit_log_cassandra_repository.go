package adapters

import (
	"context"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/infraction"
	"overdoll/libraries/bucket"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

var postAuditLogTable = table.New(table.Metadata{
	Name: "post_audit_logs",
	Columns: []string{
		"id",
		"moderator_account_id",
		"bucket",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

type postAuditLog struct {
	Id          string `db:"id"`
	Bucket      int    `db:"bucket"`
	ModeratorId string `db:"moderator_account_id"`
}

var postAuditLogByPostTable = table.New(table.Metadata{
	Name: "post_audit_logs_by_post",
	Columns: []string{
		"id",
		"moderator_account_id",
		"bucket",
		"post_id",
		"contributor_account_id",
		"account_infraction_id",
		"action",
		"reason",
		"notes",
		"reverted",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{"id"},
})

type postAuditLogByPost struct {
	Id                  string `db:"id"`
	Bucket              int    `db:"bucket"`
	PostId              string `db:"post_id"`
	ContributorId       string `db:"contributor_account_id"`
	ModeratorId         string `db:"moderator_account_id"`
	AccountInfractionId string `db:"account_infraction_id"`
	Action              string `db:"action"`
	Reason              string `db:"reason"`
	Notes               string `db:"notes"`
	Reverted            bool   `db:"reverted"`
}

var postAuditLogByModeratorTable = table.New(table.Metadata{
	Name: "post_audit_logs_by_moderator",
	Columns: []string{
		"id",
		"moderator_account_id",
		"bucket",
		"post_id",
		"contributor_account_id",
		"account_infraction_id",
		"action",
		"reason",
		"notes",
		"reverted",
	},
	PartKey: []string{"moderator_account_id", "bucket"},
	SortKey: []string{"id"},
})

type postAuditLogByModerator struct {
	Id                  string `db:"id"`
	Bucket              int    `db:"bucket"`
	PostId              string `db:"post_id"`
	ContributorId       string `db:"contributor_account_id"`
	ModeratorId         string `db:"moderator_account_id"`
	AccountInfractionId string `db:"account_infraction_id"`
	Action              string `db:"action"`
	Reason              string `db:"reason"`
	Notes               string `db:"notes"`
	Reverted            bool   `db:"reverted"`
}

func marshalPostAuditLogToDatabase(auditLog *infraction.PostAuditLog) (*postAuditLogByModerator, error) {

	userInfractionId := ""
	reason := ""

	if auditLog.IsDeniedWithInfraction() {
		userInfractionId = auditLog.UserInfraction().ID()
	}

	if auditLog.IsDenied() {
		reason = auditLog.RejectionReason().Reason()
	}

	buck, err := bucket.MakeBucketFromKSUID(auditLog.ID())

	if err != nil {
		return nil, err
	}

	return &postAuditLogByModerator{
		Id:                  auditLog.ID(),
		Bucket:              buck,
		PostId:              auditLog.PostID(),
		ModeratorId:         auditLog.ModeratorId(),
		ContributorId:       auditLog.ContributorId(),
		AccountInfractionId: userInfractionId,
		Action:              auditLog.Status(),
		Reason:              reason,
		Notes:               auditLog.Notes(),
		Reverted:            auditLog.Reverted(),
	}, nil
}

func (r InfractionCassandraRepository) CreatePostAuditLog(ctx context.Context, auditLog *infraction.PostAuditLog) error {

	marshalledAuditLog, err := marshalPostAuditLogToDatabase(auditLog)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := postAuditLogTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.ModeratorId,
		marshalledAuditLog.Bucket,
	)

	stmt, _ = postAuditLogByPostTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.ModeratorId,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ContributorId,
		marshalledAuditLog.AccountInfractionId,
		marshalledAuditLog.Action,
		marshalledAuditLog.Reason,
		marshalledAuditLog.Notes,
		marshalledAuditLog.Reverted,
	)

	stmt, _ = postAuditLogByModeratorTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.ModeratorId,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ContributorId,
		marshalledAuditLog.AccountInfractionId,
		marshalledAuditLog.Action,
		marshalledAuditLog.Reason,
		marshalledAuditLog.Notes,
		marshalledAuditLog.Reverted,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create audit log: %v", err)
	}

	// if denied with infraction, add to infraction history for this user
	if auditLog.IsDeniedWithInfraction() {
		if err := r.CreateAccountInfractionHistory(ctx, auditLog.UserInfraction()); err != nil {
			return err
		}
	}

	return nil
}

func (r InfractionCassandraRepository) GetPostAuditLog(ctx context.Context, requester *principal.Principal, logId string) (*infraction.PostAuditLog, error) {

	// grab the pending post audit log to get all of the composite keys
	postAuditLogQuery := r.session.
		Query(postAuditLogTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postAuditLog{
			Id: logId,
		})

	var postAuditLog postAuditLog

	if err := postAuditLogQuery.Get(&postAuditLog); err != nil {

		if err == gocql.ErrNotFound {
			return nil, infraction.ErrPostRejectionReasonNotFound
		}

		return nil, fmt.Errorf("failed to get audit log for post: %v", err)
	}

	postAuditLogByModeratorQuery := r.session.
		Query(postAuditLogByModeratorTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(postAuditLog)

	var pendingPostAuditLogByModerator postAuditLogByModerator

	if err := postAuditLogByModeratorQuery.Get(&pendingPostAuditLogByModerator); err != nil {

		if err == gocql.ErrNotFound {
			return nil, infraction.ErrPostRejectionReasonNotFound
		}

		return nil, fmt.Errorf("failed to get audit log by moderator: %v", err)
	}

	// grab the final audit log, which is stored in the moderator spot

	var userInfractionHistory *infraction.AccountInfractionHistory
	var err error

	if pendingPostAuditLogByModerator.AccountInfractionId != "" {
		userInfractionHistory, err = r.GetAccountInfractionHistoryById(
			ctx,
			requester,
			pendingPostAuditLogByModerator.ContributorId,
			pendingPostAuditLogByModerator.AccountInfractionId,
		)

		if err != nil {
			return nil, err
		}
	}

	infractionReason := infraction.UnmarshalPostAuditLogFromDatabase(
		pendingPostAuditLogByModerator.Id,
		pendingPostAuditLogByModerator.PostId,
		pendingPostAuditLogByModerator.ModeratorId,
		pendingPostAuditLogByModerator.ContributorId,
		pendingPostAuditLogByModerator.Action,
		pendingPostAuditLogByModerator.AccountInfractionId,
		pendingPostAuditLogByModerator.Reason,
		pendingPostAuditLogByModerator.Notes,
		pendingPostAuditLogByModerator.Reverted,
		userInfractionHistory,
	)

	if err := infractionReason.CanView(requester); err != nil {
		return nil, err
	}

	return infractionReason, nil
}

func (r InfractionCassandraRepository) SearchPostAuditLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *infraction.PostAuditLogFilters) ([]*infraction.PostAuditLog, error) {
	var auditLogs []*infraction.PostAuditLog

	if cursor.IsEmpty() {
		return auditLogs, nil
	}

	if err := infraction.CanViewWithFilters(requester, filter); err != nil {
		return nil, err
	}

	var builder *qb.SelectBuilder

	info := &postAuditLogByModerator{
		Bucket: bucket.MakeBucketFromTimestamp(time.Now()),
	}

	if filter.ModeratorId() != nil {
		builder = postAuditLogByModeratorTable.
			SelectBuilder()
		info.ModeratorId = *filter.ModeratorId()
	}

	if filter.PostId() != nil {
		builder = postAuditLogByPostTable.
			SelectBuilder()
		info.PostId = *filter.PostId()
	}

	if cursor != nil {
		cursor.BuildCassandra(builder, "id")
	}

	var results []*postAuditLogByModerator

	if err := builder.
		Query(r.session).
		BindStruct(info).
		Select(&results); err != nil {
		return nil, fmt.Errorf("failed to search audit logs: %v", err)
	}

	var pendingPostAuditLogs []*infraction.PostAuditLog

	for _, pendingPostAuditLog := range results {

		var userInfractionHistory *infraction.AccountInfractionHistory

		if pendingPostAuditLog.AccountInfractionId != "" {
			userInfractionHistory = infraction.UnmarshalAccountInfractionHistoryFromDatabase(
				pendingPostAuditLog.AccountInfractionId,
				pendingPostAuditLog.ContributorId,
				pendingPostAuditLog.Reason,
				time.Now(),
			)
		}

		result := infraction.UnmarshalPostAuditLogFromDatabase(
			pendingPostAuditLog.Id,
			pendingPostAuditLog.PostId,
			pendingPostAuditLog.ModeratorId,
			pendingPostAuditLog.ContributorId,
			pendingPostAuditLog.Action,
			pendingPostAuditLog.AccountInfractionId,
			pendingPostAuditLog.Reason,
			pendingPostAuditLog.Notes,
			pendingPostAuditLog.Reverted,
			userInfractionHistory,
		)

		result.Node = paging.NewNode(pendingPostAuditLog.Id)

		pendingPostAuditLogs = append(pendingPostAuditLogs, result)
	}

	return pendingPostAuditLogs, nil
}

func (r InfractionCassandraRepository) UpdatePostAuditLog(ctx context.Context, requester *principal.Principal, id string, updateFn func(auditLog *infraction.PostAuditLog) error) (*infraction.PostAuditLog, error) {

	auditLog, err := r.GetPostAuditLog(ctx, requester, id)

	if err != nil {
		return nil, err
	}

	if err := auditLog.CanUpdate(requester); err != nil {
		return nil, err
	}

	err = updateFn(auditLog)

	if err != nil {
		return nil, err
	}

	marshalledAuditLog, err := marshalPostAuditLogToDatabase(auditLog)

	if err != nil {
		return nil, err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := postAuditLogByPostTable.Update("account_infraction_id", "reverted")

	batch.Query(stmt,
		marshalledAuditLog.AccountInfractionId,
		marshalledAuditLog.Reverted,
		marshalledAuditLog.PostId,
		marshalledAuditLog.Id,
	)

	stmt, _ = postAuditLogByModeratorTable.Update("account_infraction_id", "reverted")

	batch.Query(stmt,
		marshalledAuditLog.AccountInfractionId,
		marshalledAuditLog.Reverted,
		marshalledAuditLog.ModeratorId,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.Id,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, fmt.Errorf("failed to update audit log: %v", err)
	}

	return auditLog, nil

}
