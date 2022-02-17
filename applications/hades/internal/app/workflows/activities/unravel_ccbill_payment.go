package activities

import (
	"context"
	"overdoll/applications/hades/internal/domain/ccbill"
	hades "overdoll/applications/hades/proto"
)

func (h *Activities) UnravelCCBillPaymentLink(ctx context.Context, locker string) (*hades.CCBillPayment, error) {

	result, err := ccbill.DecryptCCBillPayment(locker)

	if err != nil {
		return nil, err
	}

	return result, nil
}
