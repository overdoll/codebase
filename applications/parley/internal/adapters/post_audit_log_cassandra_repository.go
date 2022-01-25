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
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
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
}

var postRejectionReasonTable = table.New(table.Metadata{
	Name: "post_rejection_reasons",
	Columns: []string{
		"id",
		"infraction",
		"bucket",
		"reason",
	},
	PartKey: []string{"bucket"},
	SortKey: []string{"id"},
})

type postRejectionReason struct {
	Id         string            `db:"id"`
	Infraction bool              `db:"infraction"`
	Bucket     int               `db:"bucket"`
	Reason     map[string]string `db:"reason"`
}

type PostAuditLogCassandraRepository struct {
	session gocqlx.Session
}

func NewPostAuditLogCassandraRepository(session gocqlx.Session) PostAuditLogCassandraRepository {
	return PostAuditLogCassandraRepository{session: session}
}

func marshalPostAuditLogToDatabase(auditLog *post_audit_log.PostAuditLog) (*postAuditLogByModerator, error) {

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

func (r PostAuditLogCassandraRepository) GetPostAuditLog(ctx context.Context, requester *principal.Principal, logId string) (*post_audit_log.PostAuditLog, error) {

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
			return nil, post_audit_log.ErrPostRejectionReasonNotFound
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
			return nil, post_audit_log.ErrPostRejectionReasonNotFound
		}

		return nil, fmt.Errorf("failed to get audit log by moderator: %v", err)
	}

	// grab the final audit log, which is stored in the moderator spot

	var userInfractionHistory *club_infraction.ClubInfraction
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

	var rejectionReason *post_audit_log.PostRejectionReason
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

	infractionReason := post_audit_log.UnmarshalPostAuditLogFromDatabase(
		pendingPostAuditLogByModerator.Id,
		pendingPostAuditLogByModerator.PostId,
		pendingPostAuditLogByModerator.ModeratorId,
		pendingPostAuditLogByModerator.ContributorId,
		pendingPostAuditLogByModerator.Action,
		rejectionReason,
		pendingPostAuditLogByModerator.Notes,
		userInfractionHistory,
	)

	if err := infractionReason.CanView(requester); err != nil {
		return nil, err
	}

	return infractionReason, nil
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

	var pendingPostAuditLogs []*post_audit_log.PostAuditLog

	for _, pendingPostAuditLog := range results {

		var userInfractionHistory *club_infraction.ClubInfraction
		var postRejectionReason *post_audit_log.PostRejectionReason

		// if rejection reason not nil, get it
		if pendingPostAuditLog.PostRejectionReasonId != nil {
			if rejectionReason, ok := rejectionReasonMap[*pendingPostAuditLog.PostRejectionReasonId]; ok {
				postRejectionReason = rejectionReason

				// then, get infraction record
				if pendingPostAuditLog.AccountInfractionId != nil {
					userInfractionHistory = club_infraction.UnmarshalAccountInfractionHistoryFromDatabase(
						*pendingPostAuditLog.AccountInfractionId,
						pendingPostAuditLog.ContributorId,
						postRejectionReason,
						time.Now(),
					)
				}
			} else {
				return nil, post_audit_log.ErrPostRejectionReasonNotFound
			}
		}

		result := post_audit_log.UnmarshalPostAuditLogFromDatabase(
			pendingPostAuditLog.Id,
			pendingPostAuditLog.PostId,
			pendingPostAuditLog.ModeratorId,
			pendingPostAuditLog.ContributorId,
			pendingPostAuditLog.Action,
			postRejectionReason,
			pendingPostAuditLog.Notes,
			userInfractionHistory,
		)

		result.Node = paging.NewNode(pendingPostAuditLog.Id)

		pendingPostAuditLogs = append(pendingPostAuditLogs, result)
	}

	return pendingPostAuditLogs, nil
}

func (r PostAuditLogCassandraRepository) UpdatePostAuditLog(ctx context.Context, requester *principal.Principal, id string, updateFn func(auditLog *post_audit_log.PostAuditLog) error) (*post_audit_log.PostAuditLog, error) {

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

	stmt, _ := postAuditLogByPostTable.Update("account_infraction_id")

	batch.Query(stmt,
		marshalledAuditLog.AccountInfractionId,
		marshalledAuditLog.PostId,
		marshalledAuditLog.Id,
	)

	stmt, _ = postAuditLogByModeratorTable.Update("account_infraction_id")

	batch.Query(stmt,
		marshalledAuditLog.AccountInfractionId,
		marshalledAuditLog.ModeratorId,
		marshalledAuditLog.Bucket,
		marshalledAuditLog.Id,
	)

	if err := r.session.ExecuteBatch(batch); err != nil {
		return nil, fmt.Errorf("failed to update audit log: %v", err)
	}

	return auditLog, nil

}

func (r PostAuditLogCassandraRepository) GetPostRejectionReason(ctx context.Context, requester *principal.Principal, id string) (*post_audit_log.PostRejectionReason, error) {

	rejectionReasonQuery := r.session.
		Query(postRejectionReasonTable.Get()).
		Consistency(gocql.LocalQuorum).
		BindStruct(&postRejectionReason{Id: id, Bucket: 0})

	var rejectionReason postRejectionReason

	if err := rejectionReasonQuery.Get(&rejectionReason); err != nil {

		if err == gocql.ErrNotFound {
			return nil, post_audit_log.ErrPostRejectionReasonNotFound
		}

		return nil, fmt.Errorf("failed to get post rejection reason: %v", err)
	}

	reason := post_audit_log.UnmarshalPostRejectionReasonFromDatabase(rejectionReason.Id, rejectionReason.Reason, rejectionReason.Infraction)

	if err := reason.CanView(requester); err != nil {
		return nil, err
	}

	return reason, nil
}

func (r PostAuditLogCassandraRepository) GetPostRejectionReasons(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*post_audit_log.PostRejectionReason, error) {

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

		reason := post_audit_log.UnmarshalPostRejectionReasonFromDatabase(rejectionReason.Id, rejectionReason.Reason, rejectionReason.Infraction)

		reason.Node = paging.NewNode(rejectionReason.Id)
		rejectionReasons = append(rejectionReasons, reason)
	}

	return rejectionReasons, nil
}

// since we dont want to duplicate rejection reasons (they're subject to changes like translations or updates) we can use this function to get all
// rejection reasons as a map, which can then be used to map audit logs and infraction history without a performance penalty on hitting multiple partitions
func (r PostAuditLogCassandraRepository) getPostRejectionReasonsAsMap(ctx context.Context, requester *principal.Principal) (map[string]*post_audit_log.PostRejectionReason, error) {

	rejectionReasons, err := r.GetPostRejectionReasons(ctx, requester, nil)

	if err != nil {
		return nil, err
	}

	rejectionReasonMap := make(map[string]*post_audit_log.PostRejectionReason)

	for _, reason := range rejectionReasons {
		rejectionReasonMap[reason.ID()] = reason
	}

	return rejectionReasonMap, nil
}
