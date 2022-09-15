package command

import (
	"context"
	"time"
)

type CarrierService interface {
	AccountNewRegistration(ctx context.Context, accountId string) error

	ConfirmAccountEmail(ctx context.Context, accountId, email, id, secret string) error
	NewLoginToken(ctx context.Context, email, token, secret string) error

	AccountDeletionBegin(ctx context.Context, accountId string, deletionDate time.Time) error
	AccountDeletionReminder(ctx context.Context, accountId string, deletionDate time.Time) error
	AccountDeleted(ctx context.Context, username, email string) error
}

type HadesService interface {
	DeleteAccountData(ctx context.Context, accountId string) error
	CanDeleteAccountData(ctx context.Context, accountId string) (bool, error)
}

type ParleyService interface {
	DeleteAccountData(ctx context.Context, accountId string) error
}

type RingerService interface {
	DeleteAccountData(ctx context.Context, accountId string) error
}

type StingService interface {
	DeleteAccountData(ctx context.Context, accountId string) error
	CanDeleteAccountData(ctx context.Context, accountId string) (bool, error)
}
