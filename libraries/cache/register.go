package cache

import (
	"context"
	"encoding/json"
	"github.com/spf13/cobra"
	"github.com/tidwall/gjson"
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
				} else {
					// index does exist, check if we need to update mappings
					mappings, err := client.GetMapping().Index(writeAlias).
						Do(ctx)

					if err != nil {
						zap.S().Fatalw("failed to get all aliases", zap.Error(err))
					}

					newMappings := make(map[string]interface{})

					for _, index := range mappings {

						res, err := json.Marshal(index)

						if err != nil {
							zap.S().Fatalw("failed to marshal json", zap.Error(err))
						}

						gjson.Get(indexBody, "mappings.properties").ForEach(func(key, value gjson.Result) bool {
							// if a new mapping property doesn't exist, we will add it
							// we only check 1 level deep - maybe check recursively for updated "properties" fields too?
							// we should also ensure that if a field has a custom analyzer, and the analyzer is not defined in "settings",
							// we will warn about the custom analyzer not present and default to a "keyword" analyzer to ensure no errors occur
							if !gjson.Get(string(res), "mappings.properties."+key.Str).Exists() {
								newMappings[key.Str] = value.Str
							}

							return true
						})
					}

					if len(newMappings) > 0 {
						_, err := client.PutMapping().Index(writeAlias).BodyJson(newMappings).
							Do(ctx)

						if err != nil {
							zap.S().Fatalw("failed to put mapping", zap.Error(err))
						}

						zap.S().Infof(
							"updated mappings for index [%s] in %s!",
							indexName,
							time.Since(start).Truncate(time.Millisecond),
						)
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
