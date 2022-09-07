package main

import (
	"fmt"
	"github.com/spf13/cobra"
	"os"
	"overdoll/libraries/crypt"
)

var rootCmd = &cobra.Command{
	Use: "crypt",
}

var decryptCmd = &cobra.Command{
	Use:   "decrypt",
	Short: "Decrypts a string",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		decrypted, err := crypt.Decrypt(args[0])
		if err != nil {
			fmt.Printf("failed to decrypt: %s", err)
			return
		}

		fmt.Println(decrypted)
	},
}

func init() {
	rootCmd.AddCommand(decryptCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "crypt error: '%s'", err)
		os.Exit(1)
	}
}
