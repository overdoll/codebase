package event

import "context"

type Repository interface {
	DeleteAccount(ctx context.Context, accountId string) error
	CancelAccountDeletion(ctx context.Context, workflowId string) error
}
