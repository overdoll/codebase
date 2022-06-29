package cache

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
	"strconv"
	"time"
)

func createRegister(config IndexConfig) *cobra.Command {
	return &cobra.Command{
		Use: "register",
		Run: func(cmd *cobra.Command, args []string) {

			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			bootstrap.NewBootstrap()
			client := bootstrap.InitializeElasticSearchSession()

			start := time.Now().UTC()

			aliasesResults, err := client.Aliases().
				Do(ctx)

			if err != nil {
				zap.S().Fatalw("failed to get all aliases", zap.Error(err))
			}

			registerCount := 0

			for indexName, indexBody := range config.Registry.registry {

				writeAlias := writeLocalAlias(indexName)
				readAlias := readLocalAlias(indexName)

				// write and read alias does not exist, create the index
				if len(aliasesResults.IndicesByAlias(writeAlias)) == 0 && len(aliasesResults.IndicesByAlias(readAlias)) == 0 {

					registerCount += 1
					// create index, with our name and add a timestamp as the prefix
					result, err := client.CreateIndex(withLocalPrefixAndTimestamp(indexName)).BodyString(indexBody).Do(ctx)

					if err != nil {
						zap.S().Fatalw("failed to create new index", zap.Error(err), zap.String("index", indexName))
					}

					_, err = client.Alias().Add(result.Index, writeAlias).Add(result.Index, readAlias).Do(ctx)

					if err != nil {
						zap.S().Fatalw("failed to add new aliases", zap.Error(err), zap.String("index", result.Index))
					}
				}
			}

			zap.S().Infof(
				"successfully registered [%s] indexes in %s!",
				strconv.Itoa(registerCount),
				time.Since(start).Truncate(time.Millisecond),
			)
		},
	}
}
