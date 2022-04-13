package app

import (
	"overdoll/applications/ringer/internal/app/query"
	"overdoll/applications/ringer/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct{}

type Queries struct {
	PrincipalById query.PrincipalByIdHandler
}
