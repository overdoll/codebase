package command

import (
	"context"
	"overdoll/applications/ringer/internal/domain/details"
	"overdoll/libraries/principal"
)

type UpdateAccountDetails struct {
	Principal          *principal.Principal
	AccountId          string
	FirstName          string
	LastName           string
	CountryOfResidence string
}

type UpdateAccountDetailsHandler struct {
	ir details.Repository
}

func NewUpdateAccountDetailsHandler(ir details.Repository) UpdateAccountDetailsHandler {
	return UpdateAccountDetailsHandler{ir: ir}
}

func (h UpdateAccountDetailsHandler) Handle(ctx context.Context, cmd UpdateAccountDetails) (*details.AccountDetails, error) {

	id, err := h.ir.UpdateAccountDetails(ctx, cmd.Principal, cmd.AccountId, func(id *details.AccountDetails) error {

		if err := id.UpdateFirstName(cmd.FirstName); err != nil {
			return err
		}

		if err := id.UpdateLastName(cmd.LastName); err != nil {
			return err
		}

		return id.UpdateCountry(cmd.CountryOfResidence)
	})

	if err != nil {
		return nil, err
	}

	return id, nil
}
