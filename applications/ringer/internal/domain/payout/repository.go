package payout

import (
	"context"
	"overdoll/libraries/paging"
	"overdoll/libraries/principal"
	"time"
)

type Repository interface {
	CreateClubPayout(ctx context.Context, payout *ClubPayout, paymentIds []string) error
	GetDepositRequestsForMonth(ctx context.Context, time time.Time) ([]*DepositRequest, error)
	GetPayoutWorkflowId(ctx context.Context, payoutId string) (*string, error)
	GetAccountPayoutMethods(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, accountId string) ([]*AccountPayoutMethod, error)
	GetAccountPayoutMethodsOperator(ctx context.Context, accountId string) ([]*AccountPayoutMethod, error)
	GetClubPayoutsByClub(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, payoutId string) ([]*ClubPayout, error)
	GetClubPayoutById(ctx context.Context, requester *principal.Principal, payoutId string) (*ClubPayout, error)
	GetClubPayoutByIdOperator(ctx context.Context, payoutId string) (*ClubPayout, error)
	CreateAccountPayoutMethod(ctx context.Context, pay *AccountPayoutMethod) error
	GetAccountPayoutMethodById(ctx context.Context, accountPayoutMethodId string) (*AccountPayoutMethod, error)
	AddPayoutToDepositRequest(ctx context.Context, depositRequestId string, payout *ClubPayout) error
	CreateDepositRequest(ctx context.Context, deposit *DepositRequest) error
	GetClubPayoutsByDepositRequest(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor, depositRequestId string) ([]*DepositRequest, error)
	GetDepositRequests(ctx context.Context, requester *principal.Principal, cursor *paging.Cursor) ([]*DepositRequest, error)
	UpdatePayoutState(ctx context.Context, payoutId string, updateFn func(pay *ClubPayout) error) (*ClubPayout, error)
	UpdatePayoutDepositDate(ctx context.Context, payoutId string, updateFn func(pay *ClubPayout) error) (*ClubPayout, error)
	UpdatePayoutEvents(ctx context.Context, payoutId string, updateFn func(pay *ClubPayout) error) (*ClubPayout, error)
	CanInitiateClubPayout(ctx context.Context, requester *principal.Principal, clubId string) error
}
