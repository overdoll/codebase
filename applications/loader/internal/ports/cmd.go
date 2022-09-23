package ports

import (
	"github.com/spf13/cobra"
	"overdoll/applications/loader/internal/app"
)

func InitializeCommands(getApp func() *app.Application) []*cobra.Command {
	return []*cobra.Command{}
}
