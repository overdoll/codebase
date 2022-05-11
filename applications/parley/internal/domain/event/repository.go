package event

import (
	"context"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/libraries/principal"
)

type Repository interface {
	PutPostIntoModeratorQueue(ctx context.Context, postId string) error
	IssueClubInfraction(ctx context.Context, requester *principal.Principal, clubId, ruleId string) error
	ApprovePost(ctx context.Context, requester *principal.Principal, postId string) error
	RemovePost(ctx context.Context, requester *principal.Principal, clubId, postId, ruleId string, notes *string) error
	RejectPost(ctx context.Context, requester *principal.Principal, clubId, postId, ruleId string, notes *string) error
	ReportPost(ctx context.Context, report *report.PostReport) error
}
