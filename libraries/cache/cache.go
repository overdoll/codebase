package cache

import (
	"github.com/spf13/cobra"
)

func CreateCacheCommands(indexConfig IndexConfig) *cobra.Command {

	prefix = indexConfig.Prefix

	// set our global prefix for this application
	index := &cobra.Command{
		Use: "cache",
	}

	// register indexes as part of initial run - similar to what a "migration" command might do in a database
	index.AddCommand(createRegister(indexConfig))

	// if you need to change index mapping, use this command to create an index with the specific name from the index registry
	index.AddCommand(createNew(indexConfig))

	// once you have created your destination index, use this command to swap the index - first the writer, and then the reader after re-indexing is finished
	index.AddCommand(createSwap(indexConfig))

	// use this command to perform re-indexing after swapping the writer.
	index.AddCommand(createReindex(indexConfig))

	return index
}
