package cache

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
	"time"
)

func swap(alias string) func(cmd *cobra.Command, args []string) {
	return func(cmd *cobra.Command, args []string) {
		destinationIndex := args[0]

		start := time.Now().UTC()

		ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
		defer cancelFn()

		bootstrap.NewBootstrap()
		client := bootstrap.InitializeElasticSearchSession()

		aliases, err := client.Aliases().
			Alias(alias).
			Do(ctx)

		if err != nil {
			zap.S().Fatalw("failed to get aliases", zap.Error(err))
		}

		writerIndexesByAlias := aliases.IndicesByAlias(alias)

		if len(writerIndexesByAlias) != 1 {
			zap.S().Fatalw("alias contained invalid amount of indexes, should only contain 1", zap.Strings("indexes", writerIndexesByAlias))
		}

		originalIndex := writerIndexesByAlias[0]

		// ensure that first our target index exists
		res, err := client.CatIndices().Index(destinationIndex).Do(ctx)

		if err != nil {
			zap.S().Fatalw("failed to cat index", zap.Error(err))
		}

		if len(res) == 0 {
			zap.S().Fatalw("index not found", zap.String("index", destinationIndex))
		}

		// add index to writer alias, and remove our old one
		_, err = client.Alias().Add(destinationIndex, alias).Remove(writerIndexesByAlias[0], alias).Do(ctx)

		if err != nil {
			zap.S().Fatalw("could not alias index", zap.Error(err), zap.String("index", destinationIndex), zap.String("alias", alias))
		}

		zap.S().Infof(
			"successfully swapped alias [%s] from index [%s] to index [%s] in %s!",
			alias,
			originalIndex,
			destinationIndex,
			time.Since(start).Truncate(time.Millisecond),
		)
	}
}

func createSwap(config IndexConfig) *cobra.Command {

	reIndexCmd := &cobra.Command{
		Use:   "swap",
		Short: "swap a specific index for a new index",
	}

	writerCmd := &cobra.Command{
		Use: "writer",
	}

	readerCmd := &cobra.Command{
		Use: "reader",
	}

	for indexName, _ := range config.Registry.registry {
		writerCmd.AddCommand(&cobra.Command{
			Use:  indexName,
			Args: cobra.ExactArgs(1),
			Run:  swap(writeLocalAlias(indexName)),
		})

		readerCmd.AddCommand(&cobra.Command{
			Use:  indexName,
			Args: cobra.ExactArgs(1),
			Run:  swap(readLocalAlias(indexName)),
		})
	}

	reIndexCmd.AddCommand(writerCmd)
	reIndexCmd.AddCommand(readerCmd)

	return reIndexCmd
}
