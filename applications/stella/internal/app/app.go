package app

import (
	"overdoll/applications/stella/internal/app/command"
	"overdoll/applications/stella/internal/app/query"
	"overdoll/applications/stella/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	DeleteAndRecreateClubsIndex       command.DeleteAndRecreateClubsIndexHandler
	DeleteAndRecreateClubMembersIndex command.DeleteAndRecreateClubMembersIndexHandler

	CreateClub                    command.CreateClubHandler
	UpdateClubName                command.UpdateClubNameHandler
	UpdateClubThumbnail           command.UpdateClubThumbnailHandler
	RemoveClubSlugAlias           command.RemoveClubSlugAliasHandler
	AddClubSlugAlias              command.AddClubSlugAliasHandler
	PromoteClubSlugAliasToDefault command.PromoteClubSlugAliasToDefaultHandler
	JoinClub                      command.JoinClubHandler
	LeaveClub                     command.LeaveClubHandler

	AddClubSupporter    command.AddClubSupporterHandler
	RemoveClubSupporter command.RemoveClubSupporterHandler

	SuspendClub   command.SuspendClubHandler
	UnSuspendClub command.UnSuspendClubHandler

	TerminateClub   command.TerminateClubHandler
	UnTerminateClub command.UnTerminateClubHandler

	SuspendClubOperator command.SuspendClubOperatorHandler

	DeleteAccountData command.DeleteAccountDataHandler

	NewSupporterPost command.NewSupporterPostHandler
}

type Queries struct {
	SearchClubs                 query.SearchClubsHandler
	ClubBySlug                  query.ClubBySlugHandler
	ClubById                    query.ClubByIdHandler
	ClubsByIds                  query.ClubsByIdsHandler
	ClubSlugAliasesLimit        query.ClubSlugAliasesLimitHandler
	AccountClubMembershipsLimit query.AccountClubMembershipsLimitHandler
	AccountClubMembershipsCount query.AccountClubMembershipsCountHandler

	AccountClubDigest query.AccountClubDigestHandler

	AccountClubsCount query.AccountClubsCountHandler
	AccountClubsLimit query.AccountClubsLimitHandler

	PrincipalById  query.PrincipalByIdHandler
	ClubMemberById query.ClubMemberByIdHandler

	SearchClubMemberships query.SearchClubMembershipsHandler

	ClubSuspensionLogs   query.ClubSuspensionLogsHandler
	CanDeleteAccountData query.CanDeleteAccountDataHandler

	HasNonTerminatedClubs query.HasNonTerminatedClubsHandler
}
