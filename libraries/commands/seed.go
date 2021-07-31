package commands

import (
	"context"
	"encoding/json"
	"io/ioutil"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"overdoll/libraries/bootstrap"
)

var Seed = &cobra.Command{
	Use: "seed [seeder files]",
	Run: func(cmd *cobra.Command, args []string) {

		ctx, cancelFn := context.WithTimeout(context.Background(), time.Second*5)
		defer cancelFn()

		bootstrap.NewBootstrap(ctx)

		session := bootstrap.InitializeDatabaseSession()

		seeders := viper.GetString("root_directory") + "/database/seeders"

		file, err := os.Open(seeders)

		if err != nil {
			zap.S().Fatal("failed opening seeders directory", zap.Error(err))
		}

		defer file.Close()

		start := time.Now().UTC()

		batch := session.NewBatch(gocql.UnloggedBatch).WithContext(ctx)

		count := 0

		list, _ := file.Readdirnames(0) // 0 to read all files and folders
		for _, name := range list {

			trimmedName := strings.TrimSuffix(name, filepath.Ext(name))

			foundTarget := false

			// run all seeders if no argument is provided
			if len(args) == 0 {
				foundTarget = true
			}

			for _, target := range args {

				if trimmedName == target {

					foundTarget = true

				}
			}

			// only run if we found our target
			if !foundTarget {
				continue
			}

			// Read JSON file
			data, err := ioutil.ReadFile(seeders + "/" + name)

			if err != nil {
				zap.S().Fatal("failed to read file", zap.Error(err))
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

		zap.S().Infof(
			"sucessfuly seeded [%s] rows in %s \n",
			strconv.Itoa(count),
			time.Since(start).Truncate(time.Millisecond),
		)
	},
}
