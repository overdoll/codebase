package database

import (
	"context"
	"encoding/json"
	"io/fs"
	"io/ioutil"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
)

func createSeed(config SeederConfig) *cobra.Command {
	return &cobra.Command{
		Use: "seed [seeder files]",
		Run: func(cmd *cobra.Command, args []string) {

			ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
			defer cancelFn()

			bootstrap.NewBootstrap(ctx)

			session := bootstrap.InitializeDatabaseSession()

			start := time.Now().UTC()

			batch := session.NewBatch(gocql.UnloggedBatch).WithContext(ctx)

			count := 0

			fm, err := fs.Glob(config.SeederFiles, "*.json")

			if err != nil {
				zap.S().Fatal("failed to open seeder files", zap.Error(err))
			}

			for _, path := range fm {

				trimmedName := strings.TrimSuffix(path, filepath.Ext(path))

				file, err := config.SeederFiles.Open(path)
				if err != nil {
					zap.S().Fatal("error opening file", zap.Error(err))
				}

				data, err := ioutil.ReadAll(file)

				file.Close()

				if err != nil {
					zap.S().Fatal("error reading file", zap.Error(err))
				}

				var obj []map[string]interface{}

				// Unmarshal json into list of interface
				err = json.Unmarshal(data, &obj)

				if err != nil {
					zap.S().Fatal("error reading json", zap.Error(err))
				}

				// Insert into table, based on the filename (filename determines table)
				for _, row := range obj {

					jsonStr, err := json.Marshal(row)

					if err != nil {
						zap.S().Fatal("error converting to json", zap.Error(err))
					}

					batch.Entries = append(batch.Entries, gocql.BatchEntry{
						Stmt:       "INSERT INTO " + trimmedName + " JSON ? IF NOT EXISTS",
						Args:       []interface{}{string(jsonStr)},
						Idempotent: true,
					})
				}

				count += len(obj)
			}

			if err = session.ExecuteBatch(batch); err != nil {
				zap.S().Fatal("failed to insert rows", zap.Error(err))
			}

			if err := config.SeederCallbacks(ctx, session); err != nil {
				zap.S().Fatal("failed to run seeder callbacks", zap.Error(err))
			}

			zap.S().Infof(
				"sucessfuly seeded [%s] rows in %s ",
				strconv.Itoa(count),
				time.Since(start).Truncate(time.Millisecond),
			)
		},
	}
}
