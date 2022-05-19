package event

import (
	"context"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/principal"
)

type Repository interface {
	PutPostIntoModeratorQueue(ctx context.Context, postId string) error
	IssueClubInfraction(ctx context.Context, requester *principal.Principal, clubId string, rule *rule.Rule) error
	ApprovePost(ctx context.Context, requester *principal.Principal, moderator *moderator.PostModerator, postId string) error
	RemovePost(ctx context.Context, requester *principal.Principal, clubId, postId string, rule *rule.Rule, notes *string) error
	RejectPost(ctx context.Context, requester *principal.Principal, moderator *moderator.PostModerator, clubId, postId string, rule *rule.Rule, notes *string) error
	ReportPost(ctx context.Context, report *report.PostReport) error
}
