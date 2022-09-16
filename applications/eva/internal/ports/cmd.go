package ports

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/command"
)

func InitializeCommands(app func() *app.Application) []*cobra.Command {

	accountRoleRootCmd := &cobra.Command{
		Use: "roles",
	}

	accountRoleRootCmd.AddCommand(&cobra.Command{
		Use:  "assign-worker [account_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.AssignAccountWorkerRole.Handle(context.Background(), command.AssignAccountWorkerRole{
				TargetAccountId: args[0],
			}); err != nil {
				zap.S().Fatalw("failed to assign account worker role", zap.Error(err))
			}
		},
	})

	accountRoleRootCmd.AddCommand(&cobra.Command{
		Use:  "revoke-worker [account_id]",
		Args: cobra.ExactArgs(1),
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.RevokeAccountWorkerRole.Handle(context.Background(), command.RevokeAccountWorkerRole{
				TargetAccountId: args[0],
			}); err != nil {
				zap.S().Fatalw("failed to revoke account worker role", zap.Error(err))
			}
		},
	})

	sendNewRegistrationNotification := &cobra.Command{
		Use: "new-acc-reg [account_id]",
		Run: func(cmd *cobra.Command, args []string) {
			if err := app().Commands.NewAccountRegistration.Handle(context.Background(), command.NewAccountRegistration{
				AccountId: args[0],
			}); err != nil {
				zap.S().Fatalw("failed to send new account registration", zap.Error(err))
			}
		},
	}

	return []*cobra.Command{accountRoleRootCmd, sendNewRegistrationNotification}
}
