package cache

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
	"time"
)

func createNew(config IndexConfig) *cobra.Command {

	var indexNames []string

	for indexName, _ := range config.Registry.registry {
		indexNames = append(indexNames, indexName)
	}

	return &cobra.Command{
		Use:       "create",
		ValidArgs: indexNames,
		Run: func(cmd *cobra.Command, args []string) {

			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			bootstrap.NewBootstrap()
			client := bootstrap.InitializeElasticSearchSession()

			for _, index := range args {
				start := time.Now().UTC()

				timestampIndex := withPrefixAndTimestamp(index)

				// create index, with our name and add a timestamp as the prefix
				_, err := client.CreateIndex(timestampIndex).BodyString(config.Registry.registry[index]).Do(ctx)

				if err != nil {
					zap.S().Fatalw("failed to create new index", zap.Error(err))
				}

				zap.S().Infof(
					"successfully created index %s in %s!",
					timestampIndex,
					time.Since(start).Truncate(time.Millisecond),
				)
			}
		},
	}
}
