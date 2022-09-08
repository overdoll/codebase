package activities

import (
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/progress"
	"overdoll/applications/loader/internal/domain/upload"
)

type Activities struct {
	pr       progress.Repository
	ur       upload.Repository
	event    event.Repository
	callback CallbackService
}

func NewActivitiesHandler(pr progress.Repository, ur upload.Repository, callback CallbackService, event event.Repository) *Activities {
	return &Activities{pr: pr, ur: ur, callback: callback, event: event}
}
