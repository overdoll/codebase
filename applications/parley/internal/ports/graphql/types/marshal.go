package types

import (
	"context"
	"overdoll/applications/parley/internal/domain/club_infraction"
	"overdoll/applications/parley/internal/domain/moderator"
	"overdoll/applications/parley/internal/domain/post_audit_log"
	"overdoll/applications/parley/internal/domain/report"
	"overdoll/applications/parley/internal/domain/rule"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/paging"
	"overdoll/libraries/passport"
)

func MarshalPostAuditLogToGraphQL(ctx context.Context, result *post_audit_log.PostAuditLog) *PostAuditLog {

	var ruleItem *Rule

	if result.RuleId() != nil {
		ruleItem = &Rule{
			ID: relay.NewID(Rule{}, *result.RuleId()),
		}
	}

	var action PostAuditLogAction

	if result.IsDenied() {
		action = PostAuditLogActionDenied
	}

	if result.IsApproved() {
		action = PostAuditLogActionApproved
	}

	if result.IsRemoved() {
		action = PostAuditLogActionRemoved
	}

	return &PostAuditLog{
		ID:        relay.NewID(PostAuditLog{}, result.PostId(), result.ID()),
		Moderator: &Account{ID: relay.NewID(Account{}, result.ModeratorId())},
		Action:    action,
		Rule:      ruleItem,
		Notes:     result.Notes(),
		Post:      &Post{ID: relay.NewID(Post{}, result.PostId())},
	}
}

func MarshalPostAuditLogToGraphQLConnection(ctx context.Context, results []*post_audit_log.PostAuditLog, cursor *paging.Cursor) *PostAuditLogConnection {

	var auditLogs []*PostAuditLogEdge

	conn := &PostAuditLogConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: auditLogs,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *post_audit_log.PostAuditLog

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *post_audit_log.PostAuditLog {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *post_audit_log.PostAuditLog {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		auditLogs = append(auditLogs, &PostAuditLogEdge{
			Node:   MarshalPostAuditLogToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = auditLogs

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalPostReportToGraphQL(ctx context.Context, result *report.PostReport) *PostReport {
	return &PostReport{
		ID:      relay.NewID(PostReport{}, result.PostID(), result.ID()),
		Account: &Account{ID: relay.NewID(Account{}, result.ReportingAccountId())},
		Rule: &Rule{
			ID: relay.NewID(Rule{}, result.RuleId()),
		},
	}
}

func MarshalPostReportToGraphQLConnection(ctx context.Context, results []*report.PostReport, cursor *paging.Cursor) *PostReportConnection {

	var postReports []*PostReportEdge

	conn := &PostReportConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: postReports,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *report.PostReport

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *report.PostReport {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *report.PostReport {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		postReports = append(postReports, &PostReportEdge{
			Node:   MarshalPostReportToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = postReports

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalClubInfractionHistoryToGraphQL(ctx context.Context, result *club_infraction.ClubInfractionHistory) *ClubInfractionHistory {

	var clubInfractionSource ClubInfractionHistorySource

	if result.Source() == club_infraction.ClubInfractionHistorySourceManual {
		clubInfractionSource = ClubInfractionHistorySourceManual
	}

	if result.Source() == club_infraction.ClubInfractionHistorySourcePostManualRemoval {
		clubInfractionSource = ClubInfractionHistorySourcePostManualRemoval
	}

	if result.Source() == club_infraction.ClubInfractionHistorySourcePostModerationRejection {
		clubInfractionSource = ClubInfractionHistorySourcePostModerationRejection
	}

	return &ClubInfractionHistory{
		ID: relay.NewID(ClubInfractionHistory{}, result.ClubId(), result.ID()),
		Club: &Club{
			ID: relay.NewID(Club{}, result.ID()),
		},
		IssuerAccount: &Account{
			ID: relay.NewID(Account{}, result.IssuerAccountId()),
		},
		Rule: &Rule{
			ID: relay.NewID(Rule{}, result.RuleId()),
		},
		Source:    clubInfractionSource,
		IssuedAt:  result.IssuedAt(),
		ExpiresAt: result.ExpiresAt(),
	}
}

func MarshalClubInfractionHistoryToGraphQLConnection(ctx context.Context, results []*club_infraction.ClubInfractionHistory, cursor *paging.Cursor) *ClubInfractionHistoryConnection {

	var infractionHistory []*ClubInfractionHistoryEdge

	conn := &ClubInfractionHistoryConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: infractionHistory,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *club_infraction.ClubInfractionHistory

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *club_infraction.ClubInfractionHistory {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *club_infraction.ClubInfractionHistory {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		infractionHistory = append(infractionHistory, &ClubInfractionHistoryEdge{
			Node:   MarshalClubInfractionHistoryToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = infractionHistory

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}

func MarshalModeratorSettingsToGraphQL(result *moderator.Moderator) *ModeratorSettings {

	if result == nil {
		return &ModeratorSettings{IsInModeratorQueue: false}
	}

	time := result.LastSelected()

	return &ModeratorSettings{
		IsInModeratorQueue: true,
		LastSelected:       &time,
	}
}

func MarshalRuleToGraphQL(ctx context.Context, result *rule.Rule) *Rule {

	var titleTranslations []*Translation

	for _, val := range result.Title().Translations() {
		titleTranslations = append(titleTranslations, &Translation{
			Language: &Language{
				Locale: val.Locale(),
				Name:   val.Name(),
			},
			Text: val.Data(),
		})
	}

	var descriptionTranslations []*Translation

	for _, val := range result.Description().Translations() {
		descriptionTranslations = append(descriptionTranslations, &Translation{
			Language: &Language{
				Locale: val.Locale(),
				Name:   val.Name(),
			},
			Text: val.Data(),
		})
	}

	return &Rule{
		ID:                      relay.NewID(Rule{}, result.ID()),
		Title:                   result.Title().Translate(passport.FromContext(ctx).Language(), result.ID()),
		TitleTranslations:       titleTranslations,
		Description:             result.Description().Translate(passport.FromContext(ctx).Language(), result.ID()),
		DescriptionTranslations: descriptionTranslations,
		Deprecated:              result.Deprecated(),
		Infraction:              result.Infraction(),
	}
}

func MarshalRuleToGraphQLConnection(ctx context.Context, results []*rule.Rule, cursor *paging.Cursor) *RuleConnection {

	var rules []*RuleEdge

	conn := &RuleConnection{
		PageInfo: &relay.PageInfo{
			HasNextPage:     false,
			HasPreviousPage: false,
			StartCursor:     nil,
			EndCursor:       nil,
		},
		Edges: rules,
	}

	limit := cursor.GetLimit()

	if len(results) == 0 {
		return conn
	}

	if len(results) == limit {
		conn.PageInfo.HasNextPage = cursor.First() != nil
		conn.PageInfo.HasPreviousPage = cursor.Last() != nil
		results = results[:len(results)-1]
	}

	var nodeAt func(int) *rule.Rule

	if cursor != nil && cursor.Last() != nil {
		n := len(results) - 1
		nodeAt = func(i int) *rule.Rule {
			return results[n-i]
		}
	} else {
		nodeAt = func(i int) *rule.Rule {
			return results[i]
		}
	}

	for i := range results {
		node := nodeAt(i)
		rules = append(rules, &RuleEdge{
			Node:   MarshalRuleToGraphQL(ctx, node),
			Cursor: node.Cursor(),
		})
	}

	conn.Edges = rules

	if len(results) > 0 {
		res := results[0].Cursor()
		conn.PageInfo.StartCursor = &res
		res = results[len(results)-1].Cursor()
		conn.PageInfo.EndCursor = &res
	}

	return conn
}
