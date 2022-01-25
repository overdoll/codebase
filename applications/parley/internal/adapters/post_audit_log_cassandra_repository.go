package adapters

import (
	"context"
	"fmt"
	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/scylladb/gocqlx/v2/table"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/libraries/bucket"
	"overdoll/libraries/localization"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
)

type postAuditLog struct {
	Id                    string  `db:"id"`
	Bucket                int     `db:"bucket"`
	PostId                string  `db:"post_id"`
	ModeratorAccountId    string  `db:"moderator_account_id"`
	Action                string  `db:"action"`
	PostRejectionReasonId *string `db:"post_rejection_reason_id"`
	Notes                 *string `db:"notes"`
}

var postAuditLogTable = table.New(table.Metadata{
	Name: "post_audit_logs",
	Columns: []string{
		"id",
		"bucket",
		"post_id",
		"moderator_account_id",
		"action",
		"post_rejection_reason_id",
		"notes",
	},
	PartKey: []string{"id"},
	SortKey: []string{},
})

var postAuditLogByPostTable = table.New(table.Metadata{
	Name: "post_audit_logs_by_post",
	Columns: []string{
		"id",
		"bucket",
		"post_id",
		"moderator_account_id",
		"action",
		"post_rejection_reason_id",
		"notes",
	},
	PartKey: []string{"post_id"},
	SortKey: []string{"id"},
})

var postAuditLogByModeratorTable = table.New(table.Metadata{
	Name: "post_audit_logs_by_moderator",
	Columns: []string{
		"id",
		"bucket",
		"post_id",
		"moderator_account_id",
		"action",
		"post_rejection_reason_id",
		"notes",
	},
	PartKey: []string{"moderator_account_id", "bucket"},
	SortKey: []string{"id"},
})

var postRejectionReasonTable = table.New(table.Metadata{
	Name: "post_rejection_reasons",
	Columns: []string{
		"id",
		"bucket",
		"club_infraction_reason_id",
		"reason",
		"deprecated",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

type postRejectionReason struct {
	Id                     string            `db:"id"`
	Bucket                 int               `db:"bucket"`
	ClubInfractionReasonId string            `db:"club_infraction_reason_id"`
	Reason                 map[string]string `db:"reason"`
	Deprecated             bool              `db:"deprecated"`
}

type PostAuditLogCassandraRepository struct {
	session gocqlx.Session
}

func NewPostAuditLogCassandraRepository(session gocqlx.Session) PostAuditLogCassandraRepository {
	return PostAuditLogCassandraRepository{session: session}
}

func marshalPostAuditLogToDatabase(auditLog *post_audit_log.PostAuditLog) (*postAuditLog, error) {

	var reason *string

	if auditLog.IsDenied() {
		id := auditLog.RejectionReason().ID()
		reason = &id
	}

	buck, err := bucket.MakeBucketFromKSUID(auditLog.ID())

	if err != nil {
		return nil, err
	}

	return &postAuditLog{
		Id:                    auditLog.ID(),
		Bucket:                buck,
		PostId:                auditLog.PostId(),
		ModeratorAccountId:    auditLog.ModeratorId(),
		Action:                auditLog.Action().String(),
		PostRejectionReasonId: reason,
		Notes:                 auditLog.Notes(),
	}, nil
}

func (r PostAuditLogCassandraRepository) CreatePostAuditLog(ctx context.Context, auditLog *post_audit_log.PostAuditLog) error {

	marshalledAuditLog, err := marshalPostAuditLogToDatabase(auditLog)

	if err != nil {
		return err
	}

	batch := r.session.NewBatch(gocql.LoggedBatch)

	stmt, _ := postAuditLogTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ModeratorAccountId,
		marshalledAuditLog.Action,
		marshalledAuditLog.PostRejectionReasonId,
		marshalledAuditLog.Notes,
	)

	stmt, _ = postAuditLogByPostTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ModeratorAccountId,
		marshalledAuditLog.Action,
		marshalledAuditLog.PostRejectionReasonId,
		marshalledAuditLog.Notes,
	)

	stmt, _ = postAuditLogByModeratorTable.Insert()

	batch.Query(stmt,
		marshalledAuditLog.Id,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.PostId,
		marshalledAuditLog.ModeratorAccountId,
		marshalledAuditLog.Action,
		marshalledAuditLog.PostRejectionReasonId,
		marshalledAuditLog.Notes,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return fmt.Errorf("failed to create audit log: %v", err)
	}

	return nil
}

func (r PostAuditLogCassandraRepository) getPostAuditLogById(ctx context.Context, logId string) (*post_audit_log.PostAuditLog, error) {

	var postAudit postAuditLog

	if err := r.session.
		Query(postAuditLogTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postAuditLog{
			Id: logId,
		}).
		Get(&postAudit); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post_audit_log.ErrPostAuditLogNotFound
		}

		return nil, fmt.Errorf("failed to get audit log for post: %v", err)
	}
	var rejectionReason *post_audit_log.PostRejectionReason
	var err error

	if postAudit.PostRejectionReasonId != nil {
		rejectionReason, err = r.getPostRejectionReasonById(
			ctx,
			*postAudit.PostRejectionReasonId,
		)

		if err != nil {
			return nil, err
		}
	}

	infractionReason := post_audit_log.UnmarshalPostAuditLogFromDatabase(
		postAudit.Id,
		postAudit.PostId,
		postAudit.ModeratorAccountId,
		postAudit.Action,
		rejectionReason,
		postAudit.Notes,
	)

	return infractionReason, nil
}

func (r PostAuditLogCassandraRepository) GetPostAuditLogByIdOperator(ctx context.Context, logId string) (*post_audit_log.PostAuditLog, error) {
	return r.getPostAuditLogById(ctx, logId)
}

func (r PostAuditLogCassandraRepository) GetPostAuditLogById(ctx context.Context, requester *principal.Principal, logId string) (*post_audit_log.PostAuditLog, error) {
	auditLog, err := r.getPostAuditLogById(ctx, logId)

	if err != nil {
		return nil, err
	}

	if err := auditLog.CanView(requester); err != nil {
		return nil, err
	}

	return auditLog, nil
}

func (r PostAuditLogCassandraRepository) SearchPostAuditLogs(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filter *post_audit_log.PostAuditLogFilters) ([]*post_audit_log.PostAuditLog, error) {

	var auditLogs []*post_audit_log.PostAuditLog

	if cursor.IsEmpty() {
		return auditLogs, nil
	}

	if err := post_audit_log.CanViewWithFilters(requester, filter); err != nil {
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

	if err := cursor.BuildCassandra(builder, "id", true); err != nil {
		return nil, err
	}

	var results []*postAuditLog

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

	var pendingPostAuditLogs []*post_audit_log.PostAuditLog

	for _, auditLog := range results {

		var postRejectionReason *post_audit_log.PostRejectionReason

		// if rejection reason not nil, get it
		if auditLog.PostRejectionReasonId != nil {
			if rejectionReason, ok := rejectionReasonMap[*auditLog.PostRejectionReasonId]; ok {
				postRejectionReason = rejectionReason
			} else {
				return nil, post_audit_log.ErrPostRejectionReasonNotFound
			}
		}

		result := post_audit_log.UnmarshalPostAuditLogFromDatabase(
			auditLog.Id,
			auditLog.PostId,
			auditLog.ModeratorAccountId,
			auditLog.Action,
			postRejectionReason,
			auditLog.Notes,
		)

		result.Node = paging.NewNode(auditLog.Id)
		pendingPostAuditLogs = append(pendingPostAuditLogs, result)
	}

	return pendingPostAuditLogs, nil
}

func (r PostAuditLogCassandraRepository) getPostRejectionReasonById(ctx context.Context, id string) (*post_audit_log.PostRejectionReason, error) {

	var rejectionReason postRejectionReason

	if err := r.session.
		Query(postRejectionReasonTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postRejectionReason{Id: id, Bucket: 0}).
		Get(&rejectionReason); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post_audit_log.ErrPostRejectionReasonNotFound
		}

		return nil, fmt.Errorf("failed to get post rejection reason: %v", err)
	}

	reason := post_audit_log.UnmarshalPostRejectionReasonFromDatabase(
		rejectionReason.Id,
		rejectionReason.Reason,
		rejectionReason.ClubInfractionReasonId,
		rejectionReason.Deprecated,
	)

	return reason, nil
}

func (r PostAuditLogCassandraRepository) CreatePostRejectionReason(ctx context.Context, postRejection *post_audit_log.PostRejectionReason) error {

	if err := r.session.
		Query(postRejectionReasonTable.Insert()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postRejectionReason{
			Id:                     postRejection.ID(),
			Deprecated:             postRejection.Deprecated(),
			Bucket:                 0,
			Reason:                 localization.MarshalTranslationToDatabase(postRejection.Reason()),
			ClubInfractionReasonId: postRejection.ClubInfractionReasonId(),
		}).
		ExecRelease(); err != nil {
		return fmt.Errorf("failed to create post rejection reason: %v", err)
	}

	return nil
}

func (r PostAuditLogCassandraRepository) GetPostRejectionReasonById(ctx context.Context, requester *principal.Principal, id string) (*post_audit_log.PostRejectionReason, error) {

	reason, err := r.getPostRejectionReasonById(ctx, id)

	if err != nil {
		return nil, err
	}

	if err := reason.CanView(requester); err != nil {
		return nil, err
	}

	return reason, nil
}

func (r PostAuditLogCassandraRepository) GetPostRejectionReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, deprecated bool) ([]*post_audit_log.PostRejectionReason, error) {

	if err := post_audit_log.CanViewRejectionReasons(requester); err != nil {
		return nil, err
	}

	builder := postRejectionReasonTable.SelectBuilder()

	data := &postRejectionReason{Bucket: 0}

	if cursor != nil {
		if err := cursor.BuildCassandra(builder, "id", true); err != nil {
			return nil, err
		}
	}

	rejectionReasonsQuery := builder.
		Query(r.session).
		Consistency(gocql.LocalQuorum).
		BindStruct(data)

	var dbRejectionReasons []postRejectionReason

	if err := rejectionReasonsQuery.Select(&dbRejectionReasons); err != nil {
		return nil, fmt.Errorf("failed to get rejection reasons: %v", err)
	}

	var rejectionReasons []*post_audit_log.PostRejectionReason
	for _, rejectionReason := range dbRejectionReasons {

		if rejectionReason.Deprecated != deprecated {
			continue
		}

		reason := post_audit_log.UnmarshalPostRejectionReasonFromDatabase(
			rejectionReason.Id,
			rejectionReason.Reason,
			rejectionReason.ClubInfractionReasonId,
			rejectionReason.Deprecated,
		)

		reason.Node = paging.NewNode(rejectionReason.Id)
		rejectionReasons = append(rejectionReasons, reason)
	}

	return rejectionReasons, nil
}

// since we dont want to duplicate rejection reasons (they're subject to changes like translations or updates) we can use this function to get all
// rejection reasons as a map, which can then be used to map audit logs and infraction history without a performance penalty on hitting multiple partitions
func (r PostAuditLogCassandraRepository) getPostRejectionReasonsAsMap(ctx context.Context, requester *principal.Principal) (map[string]*post_audit_log.PostRejectionReason, error) {

	rejectionReasons, err := r.GetPostRejectionReasons(ctx, requester, nil, true)

	if err != nil {
		return nil, err
	}

	rejectionReasonMap := make(map[string]*post_audit_log.PostRejectionReason)

	for _, reason := range rejectionReasons {
		rejectionReasonMap[reason.ID()] = reason
	}

	return rejectionReasonMap, nil
}

func (r PostAuditLogCassandraRepository) updatePostRejectionReason(ctx context.Context, postRejectionReasonId string, updateFn func(postRejectionReason *post_audit_log.PostRejectionReason) error, columns []string) (*post_audit_log.PostRejectionReason, error) {

	postRejection, err := r.getPostRejectionReasonById(ctx, postRejectionReasonId)

	if err != nil {
		return nil, err
	}

	err = updateFn(postRejection)

	if err != nil {
		return nil, err
	}

	if err := r.session.
		Query(postRejectionReasonTable.Update(
			columns...,
		)).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postRejectionReason{
			Id:                     postRejection.ID(),
			Deprecated:             postRejection.Deprecated(),
			Bucket:                 0,
			Reason:                 localization.MarshalTranslationToDatabase(postRejection.Reason()),
			ClubInfractionReasonId: postRejection.ClubInfractionReasonId(),
		}).
		ExecRelease(); err != nil {
		return nil, fmt.Errorf("failed to update post rejection reason: %v", err)
	}

	return postRejection, nil
}

func (r PostAuditLogCassandraRepository) UpdatePostRejectionReasonDeprecated(ctx context.Context, postRejectionReasonId string, updateFn func(postRejectionReason *post_audit_log.PostRejectionReason) error) (*post_audit_log.PostRejectionReason, error) {
	return r.updatePostRejectionReason(ctx, postRejectionReasonId, updateFn, []string{"deprecated"})
}

func (r PostAuditLogCassandraRepository) UpdatePostRejectionReasonText(ctx context.Context, postRejectionReasonId string, updateFn func(postRejectionReason *post_audit_log.PostRejectionReason) error) (*post_audit_log.PostRejectionReason, error) {
	return r.updatePostRejectionReason(ctx, postRejectionReasonId, updateFn, []string{"reason"})
}

func (r PostAuditLogCassandraRepository) UpdatePostRejectionReasonClubInfractionReason(ctx context.Context, postRejectionReasonId string, updateFn func(postRejectionReason *post_audit_log.PostRejectionReason) error) (*post_audit_log.PostRejectionReason, error) {
	return r.updatePostRejectionReason(ctx, postRejectionReasonId, updateFn, []string{"club_infraction_reason_id"})
}
