package service_test

import (
	"context"
	"github.com/bxcodec/faker/v3"
	"testing"

	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/ports/graphql/types"
)

type Rules struct {
	Rules types.RuleConnection `graphql:"rules()"`
}

type CreateRule struct {
	CreateRule *struct {
		Rule *types.Rule
	} `graphql:"createRule(input: $input)"`
}

type UpdateRuleTitle struct {
	UpdateRuleTitle *struct {
		Rule *types.Rule
	} `graphql:"updateRuleTitle(input: $input)"`
}

type UpdateRuleDescription struct {
	UpdateRuleDescription *struct {
		Rule *types.Rule
	} `graphql:"updateRuleDescription(input: $input)"`
}

type UpdateRuleInfraction struct {
	UpdateRuleInfraction *struct {
		Rule *types.Rule
	} `graphql:"updateRuleInfraction(input: $input)"`
}

type UpdateRuleDeprecated struct {
	UpdateRuleDeprecated *struct {
		Rule *types.Rule
	} `graphql:"updateRuleDeprecated(input: $input)"`
}

func TestCreateRule_and_update(t *testing.T) {
	t.Parallel()

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	fake := TestRule{}
	err := faker.FakeData(&fake)
	require.NoError(t, err, "no error creating fake rule")

	var createRule CreateRule

	err = client.Mutate(context.Background(), &createRule, map[string]interface{}{
		"input": types.CreateRuleInput{
			Title:       fake.Title,
			Description: fake.Description,
			Infraction:  false,
		},
	})

	require.NoError(t, err, "no error creating rule")

	var rules Rules

	err = client.Query(context.Background(), &rules, nil)

	require.NoError(t, err, "no error querying rules")

	var foundRule *types.Rule

	for _, rule := range rules.Rules.Edges {
		if rule.Node.Title == fake.Title {
			foundRule = rule.Node
		}
	}

	require.NotNil(t, foundRule, "found the newly created rule")

	newFake := TestRule{}
	err = faker.FakeData(&fake)
	require.NoError(t, err, "no error generating new fake rule")

	var updateRuleTitle UpdateRuleTitle

	err = client.Mutate(context.Background(), &updateRuleTitle, map[string]interface{}{
		"input": types.UpdateRuleTitleInput{
			RuleID: foundRule.ID,
			Title:  newFake.Title,
			Locale: "en",
		},
	})

	require.NoError(t, err, "no error updating rule title")

	require.Equal(t, newFake.Title, updateRuleTitle.UpdateRuleTitle.Rule.Title, "new update should match")

	var updateRuleDescription UpdateRuleDescription

	err = client.Mutate(context.Background(), &updateRuleDescription, map[string]interface{}{
		"input": types.UpdateRuleDescriptionInput{
			RuleID:      foundRule.ID,
			Description: newFake.Description,
			Locale:      "en",
		},
	})

	require.NoError(t, err, "no error updating rule description")

	require.Equal(t, newFake.Description, updateRuleTitle.UpdateRuleTitle.Rule.Description, "new update should match")

	var updateRuleDeprecated UpdateRuleDeprecated

	err = client.Mutate(context.Background(), &updateRuleDeprecated, map[string]interface{}{
		"input": types.UpdateRuleDeprecatedInput{
			RuleID:     foundRule.ID,
			Deprecated: true,
		},
	})

	require.NoError(t, err, "no error updating rule deprecated")

	require.True(t, updateRuleDescription.UpdateRuleDescription.Rule.Deprecated, "new update should be deprecated")

	var updateRuleInfraction UpdateRuleInfraction

	err = client.Mutate(context.Background(), &updateRuleInfraction, map[string]interface{}{
		"input": types.UpdateRuleInfractionInput{
			RuleID:     foundRule.ID,
			Infraction: true,
		},
	})

	require.NoError(t, err, "no error updating rule infraction")

	require.True(t, updateRuleDescription.UpdateRuleDescription.Rule.Infraction, "new update should be an infraction")
}
