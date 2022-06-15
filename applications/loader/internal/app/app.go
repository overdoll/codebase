package app

import (
	"overdoll/applications/loader/internal/app/command"
	"overdoll/applications/loader/internal/app/query"
	"overdoll/applications/loader/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	TusComposer                        command.TusComposerHandler
	NewCreateOrGetResourcesFromUploads command.CreateOrGetResourcesFromUploadsHandler
	DeleteResources                    command.DeleteResourcesHandler
	CopyResourcesAndApplyFilters       command.CopyResourcesAndApplyFiltersHandler
}

type Queries struct {
	ResourcesByIds query.ResourcesByIdsHandler
}
