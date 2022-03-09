package service_test

import (
	"context"
	"github.com/segmentio/ksuid"
	"github.com/stretchr/testify/require"
	"overdoll/applications/parley/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"testing"
)

type IssueClubInfraction struct {
	IssueClubInfraction *struct {
		ClubInfractionHistory *ClubInfractionHistoryModified
	} `graphql:"issueClubInfraction(input: $input)"`
}

type RemoveClubInfractionHistory struct {
	RemoveClubInfractionHistory *struct {
		ClubInfractionHistoryId *relay.ID
	} `graphql:"removeClubInfractionHistory(input: $input)"`
}

func TestIssueClubManualInfraction_and_remove(t *testing.T) {
	rule := seedRuleInfraction(t)
	ruleIdRelay := convertRuleIdToRelayId(rule.ID())

	clubId := convertClubIdToRelayId(ksuid.New().String())

	client := getHttpClientWithAuthenticatedAccount(t, "1q7MJ5IyRTV0X4J27F3m5wGD5mj")

	var issueClubInfraction IssueClubInfraction

	err := client.Mutate(context.Background(), &issueClubInfraction, map[string]interface{}{
		"input": types.IssueClubInfractionInput{
			ClubID:        clubId,
			RuleID:        ruleIdRelay,
			CustomEndTime: nil,
		},
	})

	require.NoError(t, err, "no error issuing manual infraction")

	clubInfractionHistory := getClubInfractionHistory(t, client, clubId)

	require.Equal(t, 1, len(clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges), "should have 1 infraction history")
	require.Equal(t, types.ClubInfractionHistorySourceManual, clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges[0].Node.Source, "correct source")

	infractionId := clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges[0].Node.ID

	var removeClubInfractionHistory RemoveClubInfractionHistory

	err = client.Mutate(context.Background(), &removeClubInfractionHistory, map[string]interface{}{
		"input": types.RemoveClubInfractionHistoryInput{ClubInfractionHistoryID: infractionId},
	})

	require.NoError(t, err, "no error removing infraction history")

	clubInfractionHistory = getClubInfractionHistory(t, client, clubId)

	require.Equal(t, 0, len(clubInfractionHistory.Entities[0].Club.InfractionHistory.Edges), "should have no infraction history")
}
