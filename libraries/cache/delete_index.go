package cache

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
	"strings"
	"time"
)

func createDeleteIndex(config IndexConfig) *cobra.Command {
	return &cobra.Command{
		Use:   "delete-index [index]",
		Args:  cobra.ExactArgs(1),
		Short: "delete an index. will ensure no aliases are assigned before deleting.",
		Run: func(cmd *cobra.Command, args []string) {

			indexTarget := args[0]

			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			bootstrap.NewBootstrap()
			client := bootstrap.InitializeElasticSearchSession()

			start := time.Now().UTC()

			aliases, err := client.Aliases().
				Index(indexTarget).
				Do(ctx)

			if err != nil {
				zap.S().Fatalw("failed to get aliases for index", zap.Error(err))
			}

			values, ok := aliases.Indices[indexTarget]

			if ok && len(values.Aliases) > 0 {
				var aliasValues []string

				for _, value := range values.Aliases {
					aliasValues = append(aliasValues, value.AliasName)
				}

				zap.S().Fatalf("cannot delete index [%s] since it points to aliases [%s]", indexTarget, strings.Join(aliasValues, ", "))
			}

			_, err = client.DeleteIndex(indexTarget).Do(ctx)

			if err != nil {
				zap.S().Fatalw("failed to delete index", zap.Error(err))
			}

			zap.S().Infof(
				"successfully deleted index [%s] in %s!",
				indexTarget,
				time.Since(start).Truncate(time.Millisecond),
			)
		},
	}
}
