package command

import (
	"context"
)

type NewCreatorLead struct {
	Username  string
	Email     string
	Details   string
	Portfolio string
}

type NewCreatorLeadHandler struct {
	carrier CarrierService
}

func NewNewCreatorLeadHandler(carrier CarrierService) NewCreatorLeadHandler {
	return NewCreatorLeadHandler{carrier: carrier}
}

func (h NewCreatorLeadHandler) Handle(ctx context.Context, cmd NewCreatorLead) error {
	return h.carrier.NewCreatorLead(ctx, cmd.Username, cmd.Email, cmd.Portfolio, cmd.Details)
}
