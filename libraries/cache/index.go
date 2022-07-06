package cache

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
	"time"
)

func index(config IndexConfig, args []string) {
	ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
	defer cancelFn()

	bootstrap.NewBootstrap()

	for _, index := range args {

		start := time.Now().UTC()

		targetFunc := config.Registry.index[index]

		if err := targetFunc(ctx); err != nil {
			zap.S().Fatalw("failed to run re-index", zap.Error(err))
		}

		zap.S().Infof(
			"successfully re-indexed [%s] in %s!",
			index,
			time.Since(start).Truncate(time.Millisecond),
		)
	}
}

func createIndex(config IndexConfig) *cobra.Command {

	var indexNames []string

	for indexName, _ := range config.Registry.index {
		indexNames = append(indexNames, indexName)
	}

	rootIndexCmd := &cobra.Command{
		Use:   "index",
		Short: "index all indexes, or pass 1 to index only 1 index",
		Run: func(cmd *cobra.Command, args []string) {
			index(config, indexNames)
		},
	}

	for _, indexName := range indexNames {
		rootIndexCmd.AddCommand(&cobra.Command{
			Use: indexName,
			Run: func(cmd *cobra.Command, args []string) {
				index(config, []string{cmd.Use})
			}},
		)
	}

	return rootIndexCmd
}
