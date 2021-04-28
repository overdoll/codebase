package app

import (
	"overdoll/applications/hades/src/app/command"
	"overdoll/applications/hades/src/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	GetUserSession command.GetUserSessionHandler
	CreatePost     command.CreatePostHandler
	Authenticate   command.AuthenticateHandler
	Register       command.RegisterHandler
	Logout         command.LogoutHandler
	RedeemCookie   command.RedeemCookieHandler
	Authentication command.AuthenticationHandler
}

type Queries struct {
	SearchArtist         query.SearchArtistsHandler
	SearchCategories     query.SearchCategoriesHandler
	SearchCharacters     query.SearchCharactersHandler
	SearchMedias         query.SearchMediasHandler
	ListenAuthentication query.ListenAuthenticationHandler
}
