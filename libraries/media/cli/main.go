package main

import (
	"context"
	"fmt"
	"github.com/spf13/cobra"
	"google.golang.org/protobuf/encoding/protojson"
	"os"
	"overdoll/libraries/media"
)

func main() {
	var rootCmd = &cobra.Command{
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			med, err := media.UnmarshalMediaFromDatabase(context.Background(), &args[0])
			if err == nil {
				fmt.Println(protojson.Format(med.RawProto()))
			}
		},
	}

	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
