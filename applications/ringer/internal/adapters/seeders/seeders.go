package seeders

import (
	"context"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/applications/ringer/internal/adapters/seeders/data"
	"overdoll/libraries/database"
)

func afterSeeders(ctx context.Context, session gocqlx.Session) error {
	return nil
}

var SeederConfig = database.SeederConfig{
	SeederFiles:     data.Files,
	SeederCallbacks: afterSeeders,
}
