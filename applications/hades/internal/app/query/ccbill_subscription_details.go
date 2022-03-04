package query

import (
	"context"
	"overdoll/applications/hades/internal/domain/billing"
	"overdoll/applications/hades/internal/domain/ccbill"
	"overdoll/libraries/principal"
)

type CCBillSubscriptionDetails struct {
	Principal            *principal.Principal
	CCBillSubscriptionId string
}

type CCBillSubscriptionDetailsHandler struct {
	br billing.Repository
	cr ccbill.Repository
}

func NewCCBillSubscriptionDetailsHandler(br billing.Repository, cr ccbill.Repository) CCBillSubscriptionDetailsHandler {
	return CCBillSubscriptionDetailsHandler{br: br, cr: cr}
}

func (h CCBillSubscriptionDetailsHandler) Handle(ctx context.Context, cmd CCBillSubscriptionDetails) (*billing.CCBillSubscriptionDetails, *ccbill.SubscriptionStatus, error) {

	ccbillSubscriptionDetails, err := h.br.GetCCBillSubscriptionDetailsById(ctx, cmd.Principal, cmd.CCBillSubscriptionId)

	if err != nil {
		return nil, nil, err
	}

	ccbillSubscriptionStatus, err := h.cr.ViewSubscriptionStatus(ctx, cmd.CCBillSubscriptionId)

	if err != nil {
		return nil, nil, err
	}

	return ccbillSubscriptionDetails, ccbillSubscriptionStatus, nil
}
