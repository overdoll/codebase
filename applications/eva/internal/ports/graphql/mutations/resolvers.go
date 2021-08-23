package mutations

import (
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/ports/graphql/types"
)

type MutationResolver struct {
	App *app.Application
}
