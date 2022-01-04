package app

import (
	command2 "overdoll/applications/stella/internal/app/command"
	query2 "overdoll/applications/stella/internal/app/query"
	"overdoll/applications/sting/internal/app/workflows/activities"
)

type Application struct {
	Commands   Commands
	Queries    Queries
	Activities *activities.Activities
}

type Commands struct {
	IndexAllClubs command2.IndexAllClubsHandler

	CreateClub                    command2.CreateClubHandler
	UpdateClubName                command2.UpdateClubNameHandler
	RemoveClubSlugAlias           command2.RemoveClubSlugAliasHandler
	AddClubSlugAlias              command2.AddClubSlugAliasHandler
	PromoteClubSlugAliasToDefault command2.PromoteClubSlugAliasToDefaultHandler
	BecomeClubMember              command2.BecomeClubMemberHandler
	WithdrawClubMembership        command2.WithdrawClubMembershipHandler
}

type Queries struct {
	SearchClubs                 query2.SearchClubsHandler
	ClubBySlug                  query2.ClubBySlugHandler
	ClubById                    query2.ClubByIdHandler
	ClubSlugAliasesLimit        query2.ClubSlugAliasesLimitHandler
	AccountClubMembershipsLimit query2.AccountClubMembershipsLimitHandler
	AccountClubMemberships      query2.AccountClubMembershipsHandler
	AccountClubMembershipsCount query2.AccountClubMembershipsCountHandler

	ClubMemberById    query2.ClubMemberByIdHandler
	ClubMembersByClub query2.ClubMembersByClubHandler
}
