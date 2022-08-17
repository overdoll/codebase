package database

import (
	"context"
	"encoding/json"
	"io/fs"
	"io/ioutil"
	"overdoll/libraries/support"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
)

func createSeed(config SeederConfig) *cobra.Command {
	return &cobra.Command{
		Use: "seed [seeder files]",
		Run: func(cmd *cobra.Command, args []string) {

			if !support.IsDebug() {
				zap.S().Fatal("can only run seeders when debugging is enabled")
			}

			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			bootstrap.NewBootstrap()

			session := bootstrap.InitializeDatabaseSession()

			start := time.Now().UTC()

			count := 0

			fm, err := fs.Glob(config.SeederFiles, "*.json")

			if err != nil {
				zap.S().Fatalw("failed to open seeder files", zap.Error(err))
			}

			for _, path := range fm {

				trimmedName := strings.TrimSuffix(path, filepath.Ext(path))

				file, err := config.SeederFiles.Open(path)
				if err != nil {
					zap.S().Fatalw("error opening file", zap.Error(err))
				}

				data, err := ioutil.ReadAll(file)

				file.Close()

				if err != nil {
					zap.S().Fatalw("error reading file", zap.Error(err))
				}

				var obj []map[string]interface{}

				// Unmarshal json into list of interface
				err = json.Unmarshal(data, &obj)

				if err != nil {
					zap.S().Fatalw("error reading json", zap.Error(err))
				}

				// Insert into table, based on the filename (filename determines table)
				for _, row := range obj {

					jsonStr, err := json.Marshal(row)

					if err != nil {
						zap.S().Fatalw("error converting to json", zap.Error(err))
					}

					if err := session.Query("INSERT INTO "+trimmedName+" JSON ?", nil).Bind(string(jsonStr)).ExecRelease(); err != nil {
						zap.S().Fatalw("failed to insert rows", zap.Error(err))
					}
				}

				count += len(obj)
			}

			if err := config.SeederCallbacks(ctx, session); err != nil {
				zap.S().Fatalw("failed to run seeder callbacks", zap.Error(err))
			}

			zap.S().Infof(
				"successfully seeded [%s] rows in %s!",
				strconv.Itoa(count),
				time.Since(start).Truncate(time.Millisecond),
			)
		},
	}
}
