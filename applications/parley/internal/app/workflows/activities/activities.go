package activities

import (
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/applications/parley/internal/domain/rule"
)

type Activities struct {
	pr    post_audit_log.Repository
	mr    moderator.Repository
	rr    rule.Repository
	rpr   report.Repository
	cr    club_infraction.Repository
	sting StingService
}

func NewActivitiesHandler(mr moderator.Repository, rpr report.Repository, pr post_audit_log.Repository, rr rule.Repository, cr club_infraction.Repository, sting StingService) *Activities {
	return &Activities{mr: mr, pr: pr, rr: rr, cr: cr, rpr: rpr, sting: sting}
}
