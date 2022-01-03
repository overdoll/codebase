package mutations

import (
	"go.temporal.io/sdk/client"
	"overdoll/applications/sting/internal/app"
)

type MutationResolver struct {
	App    *app.Application
	Client client.Client
}
