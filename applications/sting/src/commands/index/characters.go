package index

import (
	"github.com/spf13/cobra"
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
	s := CreateServer()

	s.IndexCharacters()
}