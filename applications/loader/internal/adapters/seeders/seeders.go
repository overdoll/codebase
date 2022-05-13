package seeders

import (
	"context"
	"embed"
	"github.com/scylladb/gocqlx/v2"
	"overdoll/libraries/database"
)

// Files contains seeders
//go:embed data/*.json
var files embed.FS

func afterSeeders(ctx context.Context, session gocqlx.Session) error {
	return nil
}

var SeederConfig = database.SeederConfig{
	SeederFiles:     files,
	SeederCallbacks: afterSeeders,
}
