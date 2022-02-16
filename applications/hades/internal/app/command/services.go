package command

import "context"

type StellaService interface {
	CanAccountViewClub(ctx context.Context, clubId, accountId string) (bool, error)
}
