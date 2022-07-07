package cache

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
	"strings"
	"time"
)

func list() func(cmd *cobra.Command, args []string) {
	return func(cmd *cobra.Command, args []string) {
		destinationIndex := cmd.Use

		ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
		defer cancelFn()

		bootstrap.NewBootstrap()
		client := bootstrap.InitializeElasticSearchSession()

		writeAlias := writeLocalAlias(destinationIndex)
		readAlias := readLocalAlias(destinationIndex)

		aliases, err := client.Aliases().
			Alias(writeAlias, readAlias).
			Do(ctx)

		if err != nil {
			zap.S().Fatalw("failed to get aliases", zap.Error(err))
		}

		writerIndexesByAlias := aliases.IndicesByAlias(writeAlias)
		readerIndexesByAlias := aliases.IndicesByAlias(readAlias)

		zap.S().Infof(
			"writer alias [%s] currently has assigned indexes: [%s]",
			writeAlias,
			strings.Join(writerIndexesByAlias, ", "),
		)

		zap.S().Infof(
			"reader alias [%s] currently has assigned indexes: [%s]",
			readAlias,
			strings.Join(readerIndexesByAlias, ", "),
		)
	}
}

func createList(config IndexConfig) *cobra.Command {

	listCmd := &cobra.Command{
		Use:   "list",
		Short: "list indexes and their aliases",
	}

	for indexName, _ := range config.Registry.registry {
		listCmd.AddCommand(&cobra.Command{
			Use: indexName,
			Run: list(),
		})
	}

	return listCmd
}
