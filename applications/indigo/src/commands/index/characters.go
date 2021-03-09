package index

import (
	"context"
	"log"

	"github.com/spf13/cobra"
	"overdoll/applications/indigo/src/commands"
)

var characters = &cobra.Command{
	Use:   "characters",
	Short: "Index the whole characters table into elasticsearch",
	Run: Run,
}

func init() {
	root.AddCommand(characters)
}

func Run(cmd *cobra.Command, args []string) {
	ctx := context.Background()

	srv, err := commands.CreateServer(ctx)

	if err != nil {
		log.Fatalf("error creating server: %s", err)
	}

	srv.IndexAllCharacters()
}