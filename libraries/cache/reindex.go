package cache

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"time"
)

func createReindex(config IndexConfig) *cobra.Command {

	var indexNames []string

	for indexName, _ := range config.Registry.reindex {
		indexNames = append(indexNames, indexName)
	}

	return &cobra.Command{
		Use:       "reindex",
		ValidArgs: indexNames,
		Run: func(cmd *cobra.Command, args []string) {

			if len(args) == 0 {
				args = indexNames
			}

			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			for _, index := range args {

				start := time.Now().UTC()

				targetFunc := config.Registry.reindex[index]

				if err := targetFunc(ctx); err != nil {
					zap.S().Fatalw("failed to run re-index", zap.Error(err))
				}

				zap.S().Infof(
					"successfully re-indexed %s in %s!",
					index,
					time.Since(start).Truncate(time.Millisecond),
				)
			}
		},
	}
}
