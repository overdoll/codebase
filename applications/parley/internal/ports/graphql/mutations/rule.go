package mutations

import (
	"context"
	"overdoll/applications/parley/internal/app/command"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/passport"
	"overdoll/libraries/principal"
)

func (r MutationResolver) CreateRule(ctx context.Context, input types.CreateRuleInput) (*types.CreateRulePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	rule, err := r.App.Commands.CreateRule.
		Handle(
			ctx,
			command.CreateRule{
				Principal:   principal.FromContext(ctx),
				Title:       input.Title,
				Description: input.Description,
				Infraction:  input.Infraction,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.CreateRulePayload{
		Rule: types.MarshalRuleToGraphQL(ctx, rule),
	}, nil
}

func (r MutationResolver) UpdateRuleTitle(ctx context.Context, input types.UpdateRuleTitleInput) (*types.UpdateRuleTitlePayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	rule, err := r.App.Commands.UpdateRuleTitle.
		Handle(
			ctx,
			command.UpdateRuleTitle{
				Principal: principal.FromContext(ctx),
				RuleId:    input.RuleID.GetID(),
				Title:     input.Title,
				Locale:    input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateRuleTitlePayload{
		Rule: types.MarshalRuleToGraphQL(ctx, rule),
	}, nil
}

func (r MutationResolver) UpdateRuleDescription(ctx context.Context, input types.UpdateRuleDescriptionInput) (*types.UpdateRuleDescriptionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	rule, err := r.App.Commands.UpdateRuleDescription.
		Handle(
			ctx,
			command.UpdateRuleDescription{
				Principal:   principal.FromContext(ctx),
				RuleId:      input.RuleID.GetID(),
				Description: input.Description,
				Locale:      input.Locale,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateRuleDescriptionPayload{
		Rule: types.MarshalRuleToGraphQL(ctx, rule),
	}, nil
}

func (r MutationResolver) UpdateRuleInfraction(ctx context.Context, input types.UpdateRuleInfractionInput) (*types.UpdateRuleInfractionPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	rule, err := r.App.Commands.UpdateRuleInfraction.
		Handle(
			ctx,
			command.UpdateRuleInfraction{
				Principal:  principal.FromContext(ctx),
				RuleId:     input.RuleID.GetID(),
				Infraction: input.Infraction,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateRuleInfractionPayload{
		Rule: types.MarshalRuleToGraphQL(ctx, rule),
	}, nil
}

func (r MutationResolver) UpdateRuleDeprecated(ctx context.Context, input types.UpdateRuleDeprecatedInput) (*types.UpdateRuleDeprecatedPayload, error) {

	if err := passport.FromContext(ctx).Authenticated(); err != nil {
		return nil, err
	}

	rule, err := r.App.Commands.UpdateRuleDeprecated.
		Handle(
			ctx,
			command.UpdateRuleDeprecated{
				Principal:  principal.FromContext(ctx),
				RuleId:     input.RuleID.GetID(),
				Deprecated: input.Deprecated,
			},
		)

	if err != nil {
		return nil, err
	}

	return &types.UpdateRuleDeprecatedPayload{
		Rule: types.MarshalRuleToGraphQL(ctx, rule),
	}, nil
}
