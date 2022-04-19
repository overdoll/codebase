package payout

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type Repository interface {
	GetAccountPayoutMethods(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*AccountPayoutMethod, error)
	GetAccountPayoutMethodsOperator(ctx context.Context, accountId string) ([]*AccountPayoutMethod, error)
	CreateAccountPayoutMethod(ctx context.Context, pay *AccountPayoutMethod) error
	GetAccountPayoutMethodById(ctx context.Context, accountPayoutMethodId string) (*AccountPayoutMethod, error)

	CreateClubPayout(ctx context.Context, payout *ClubPayout) error
	GetClubPayoutById(ctx context.Context, requester *principal.Principal, payoutId string) (*ClubPayout, error)
	GetClubPayoutByIdOperator(ctx context.Context, payoutId string) (*ClubPayout, error)
	UpdateClubPayoutState(ctx context.Context, payoutId string, updateFn func(pay *ClubPayout) error) (*ClubPayout, error)
	UpdateClubPayoutDepositDate(ctx context.Context, payoutId string, updateFn func(pay *ClubPayout) error) (*ClubPayout, error)
	UpdateClubPayoutEvents(ctx context.Context, payoutId string, updateFn func(pay *ClubPayout) error) (*ClubPayout, error)
	CanInitiateClubPayout(ctx context.Context, requester *principal.Principal, clubId string) error

	CreateDepositRequest(ctx context.Context, deposit *DepositRequest) error
	GetDepositRequestById(ctx context.Context, id string) (*DepositRequest, error)
	GetDepositRequests(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*DepositRequest, error)
	AppendPayoutToDepositRequest(ctx context.Context, depositRequestId string, payoutId string) error
	GetDepositRequestsForMonth(ctx context.Context, time time.Time) ([]*DepositRequest, error)
}

type IndexRepository interface {
	SearchClubPayouts(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, filters *ClubPayoutsFilters) ([]*ClubPayout, error)
	IndexAllClubPayouts(ctx context.Context) error
	DeleteClubPayoutsIndex(ctx context.Context) error
	IndexClubPayout(ctx context.Context, pay *ClubPayout) error
}
