package activities

import (
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/post_audit_log"
)

type Activities struct {
	pr    post_audit_log.Repository
	cr    club_infraction.Repository
	sting StingService
}

func NewActivitiesHandler(pr post_audit_log.Repository, cr club_infraction.Repository, sting StingService) *Activities {
	return &Activities{cr: cr, pr: pr, sting: sting}
}
