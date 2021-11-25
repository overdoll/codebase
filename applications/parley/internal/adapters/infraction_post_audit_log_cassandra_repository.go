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
		"post_rejection_reason_id",
		"notes",
		"reverted",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{"id"},
})

type postAuditLogByPost struct {
	Id                    string  `db:"id"`
	Bucket                int     `db:"bucket"`
	PostId                string  `db:"post_id"`
	ContributorId         string  `db:"contributor_account_id"`
	ModeratorId           string  `db:"moderator_account_id"`
	AccountInfractionId   string  `db:"account_infraction_id"`
	Action                string  `db:"action"`
	PostRejectionReasonId string  `db:"post_rejection_reason_id"`
	Notes                 *string `db:"notes"`
	Reverted              bool    `db:"reverted"`
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
		"post_rejection_reason_id",
		"notes",
		"reverted",
	},
	PartKey: []string{"moderator_account_id", "bucket"},
	SortKey: []string{"id"},
})

type postAuditLogByModerator struct {
	Id                    string  `db:"id"`
	Bucket                int     `db:"bucket"`
	PostId                string  `db:"post_id"`
	ContributorId         string  `db:"contributor_account_id"`
	ModeratorId           string  `db:"moderator_account_id"`
	AccountInfractionId   *string `db:"account_infraction_id"`
	Action                string  `db:"action"`
	PostRejectionReasonId *string `db:"post_rejection_reason_id"`
	Notes                 *string `db:"notes"`
	Reverted              bool    `db:"reverted"`
}

func marshalPostAuditLogToDatabase(auditLog *infraction.PostAuditLog) (*postAuditLogByModerator, error) {

	var userInfractionId *string
	var reason *string

	if auditLog.IsDeniedWithInfraction() && auditLog.AccountInfraction() != nil {
		id := auditLog.AccountInfraction().ID()
		userInfractionId = &id
	}

	if auditLog.IsDenied() {
		id := auditLog.RejectionReason().ID()
		reason = &id
	}

	buck, err := bucket.MakeBucketFromKSUID(auditLog.ID())

	if err != nil {
		return nil, err
	}

	return &postAuditLogByModerator{
		Id:                    auditLog.ID(),
		Bucket:                buck,
		PostId:                auditLog.PostID(),
		ModeratorId:           auditLog.ModeratorId(),
		ContributorId:         auditLog.ContributorId(),
		AccountInfractionId:   userInfractionId,
		Action:                auditLog.Status().String(),
		PostRejectionReasonId: reason,
		Notes:                 auditLog.Notes(),
		Reverted:              auditLog.Reverted(),
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
		marshalledAuditLog.PostRejectionReasonId,
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
		marshalledAuditLog.PostRejectionReasonId,
		marshalledAuditLog.Notes,
		marshalledAuditLog.Reverted,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create audit log: %v", err)
	}

	// if denied with infraction, add to infraction history for this user
	if auditLog.IsDeniedWithInfraction() {
		if err := r.CreateAccountInfractionHistory(ctx, auditLog.AccountInfraction()); err != nil {
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

	if pendingPostAuditLogByModerator.AccountInfractionId != nil {
		userInfractionHistory, err = r.GetAccountInfractionHistoryById(
			ctx,
			requester,
			pendingPostAuditLogByModerator.ContributorId,
			*pendingPostAuditLogByModerator.AccountInfractionId,
		)

		if err != nil {
			return nil, err
		}
	}

	var rejectionReason *infraction.PostRejectionReason
	if pendingPostAuditLogByModerator.PostRejectionReasonId != nil {
		rejectionReason, err = r.GetPostRejectionReason(
			ctx,
			requester,
			*pendingPostAuditLogByModerator.PostRejectionReasonId,
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
		rejectionReason,
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

	info := map[string]interface{}{}

	if filter.ModeratorId() != nil {
		builder = qb.Select(postAuditLogByModeratorTable.Name()).
			Where(qb.In("bucket"), qb.Eq("moderator_account_id"))

		info["bucket"] = bucket.MakeBucketsFromTimeRange(*filter.From(), *filter.To())
		info["moderator_account_id"] = *filter.ModeratorId()
	}

	if filter.PostId() != nil {
		builder = qb.Select(postAuditLogByPostTable.Name()).
			Where(qb.Eq("post_id"))

		info["post_id"] = *filter.PostId()
	}

	cursor.BuildCassandra(builder, "id")

	var results []*postAuditLogByModerator

	if err := builder.
		// this say this may be nil but it would never actually happen because theres a validator on the filter level
		Query(r.session).
		// need to disable paging since we do orderBy and IN queries
		PageSize(0).
		BindMap(info).
		Select(&results); err != nil {
		return nil, fmt.Errorf("failed to search audit logs: %v", err)
	}

	rejectionReasonMap, err := r.getPostRejectionReasonsAsMap(ctx, requester)
	if err != nil {
		return nil, err
	}

	var pendingPostAuditLogs []*infraction.PostAuditLog

	for _, pendingPostAuditLog := range results {

		var userInfractionHistory *infraction.AccountInfractionHistory
		var postRejectionReason *infraction.PostRejectionReason

		// if rejection reason not nil, get it
		if pendingPostAuditLog.PostRejectionReasonId != nil {
			if rejectionReason, ok := rejectionReasonMap[*pendingPostAuditLog.PostRejectionReasonId]; ok {
				postRejectionReason = rejectionReason

				// then, get infraction record
				if pendingPostAuditLog.AccountInfractionId != nil {
					userInfractionHistory = infraction.UnmarshalAccountInfractionHistoryFromDatabase(
						*pendingPostAuditLog.AccountInfractionId,
						pendingPostAuditLog.ContributorId,
						postRejectionReason,
						time.Now(),
					)
				}
			} else {
				return nil, infraction.ErrPostRejectionReasonNotFound
			}
		}

		result := infraction.UnmarshalPostAuditLogFromDatabase(
			pendingPostAuditLog.Id,
			pendingPostAuditLog.PostId,
			pendingPostAuditLog.ModeratorId,
			pendingPostAuditLog.ContributorId,
			pendingPostAuditLog.Action,
			postRejectionReason,
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
