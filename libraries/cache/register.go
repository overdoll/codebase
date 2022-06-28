package cache

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
	"time"
)

func createRegister(config IndexConfig) *cobra.Command {
	return &cobra.Command{
		Use:       "register",
		ValidArgs: []string{},
		Run: func(cmd *cobra.Command, args []string) {

			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			bootstrap.NewBootstrap()
			client := bootstrap.InitializeElasticSearchSession()

			start := time.Now().UTC()

			// get all aliases
			var allAliases []string

			for indexName, _ := range config.Registry.registry {
				allAliases = append(allAliases, WriteAlias(indexName))
				allAliases = append(allAliases, ReadAlias(indexName))
			}

			aliasesResults, err := client.Aliases().
				Alias(allAliases...).
				Do(ctx)
			if err != nil {
				zap.S().Fatalw("failed to get all aliases", zap.Error(err))
			}

			for indexName, indexBody := range config.Registry.registry {

				writeAlias := WriteAlias(indexName)
				readAlias := ReadAlias(indexName)

				// write and read alias does not exist, create the index
				if len(aliasesResults.IndicesByAlias(writeAlias)) == 0 && len(aliasesResults.IndicesByAlias(readAlias)) == 0 {

					// create index, with our name and add a timestamp as the prefix
					result, err := client.CreateIndex(withPrefixAndTimestamp(indexName)).BodyString(indexBody).Do(ctx)

					if err != nil {
						zap.S().Fatalw("failed to create new index", zap.Error(err))
					}

					_, err = client.Alias().Add(writeAlias, result.Index).Add(readAlias, result.Index).Do(ctx)

					if err != nil {
						zap.S().Fatalw("failed to add new aliases", zap.Error(err))
					}
				}
			}

			zap.S().Infof(
				"successfully registered indexes in %s!",
				time.Since(start).Truncate(time.Millisecond),
			)
		},
	}
}
