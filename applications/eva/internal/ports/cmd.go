package ports

import (
	"context"
	"github.com/spf13/cobra"
	"go.uber.org/zap"
	"overdoll/applications/eva/internal/app"
	"overdoll/applications/eva/internal/app/command"
	"overdoll/applications/eva/internal/app/query"
	"time"
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

	accountSessions := &cobra.Command{
		Use: "sessions [account_id]",
		Run: func(cmd *cobra.Command, args []string) {
			sessions, err := app().Queries.AccountSessionsByAccountOperator.Handle(context.Background(), query.AccountSessionsByAccountOperator{
				AccountId: args[0],
			})

			if err != nil {
				zap.S().Fatalw("failed to send new account registration", zap.Error(err))
			}

			for _, sess := range sessions {
				zap.S().Info("account session: " + sess.ID() + ". last seen: " + time.Now().Sub(sess.LastSeen()).String() + ".")
			}
		},
	}

	return []*cobra.Command{accountRoleRootCmd, sendNewRegistrationNotification, accountSessions}
}
