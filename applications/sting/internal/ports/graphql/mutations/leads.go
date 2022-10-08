package mutations

import (
	"context"
	"overdoll/applications/sting/internal/app/command"
	"overdoll/applications/sting/internal/ports/graphql/types"
)

func (r *MutationResolver) NewCreatorLead(ctx context.Context, input types.NewCreatorLeadInput) (*types.NewCreatorLeadPayload, error) {

	if err := r.App.Commands.NewCreatorLead.
		Handle(
			ctx,
			command.NewCreatorLead{
				Username:  input.Username,
				Email:     input.Email,
				Details:   input.Details,
				Portfolio: input.Portfolio,
			},
		); err != nil {
		return nil, err
	}

	return &types.NewCreatorLeadPayload{Validation: nil}, nil
}
