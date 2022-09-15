package activities

import (
	"overdoll/applications/loader/internal/domain/event"
	"overdoll/applications/loader/internal/domain/media_processing"
	"overdoll/applications/loader/internal/domain/media_storage"
	"overdoll/applications/loader/internal/domain/progress"
	"overdoll/applications/loader/internal/domain/upload"
)

type Activities struct {
	pr       progress.Repository
	ur       upload.Repository
	mr       media_processing.Repository
	sr       media_storage.Repository
	event    event.Repository
	callback CallbackService
}

func NewActivitiesHandler(pr progress.Repository, ur upload.Repository, mr media_processing.Repository, sr media_storage.Repository, callback CallbackService, event event.Repository) *Activities {
	return &Activities{pr: pr, ur: ur, mr: mr, sr: sr, callback: callback, event: event}
}
