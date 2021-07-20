package app

import (
	"overdoll/applications/sting/src/app/command"
	"overdoll/applications/sting/src/app/query"
)

type Application struct {
	Commands Commands
	Queries  Queries
}

type Commands struct {
	CreatePost command.CreatePendingPostHandler
	UpdatePost command.UpdatePostHandler

	StartDiscardPost command.StartDiscardPostHandler
	StartPublishPost command.StartPublishPostHandler
	StartUndoPost    command.StartUndoPostHandler
	RejectPost       command.RejectPostHandler

	IndexAllCategories command.IndexAllCategoriesHandler
	IndexAllCharacters command.IndexAllCharactersHandler
	IndexAllMedia      command.IndexAllMediaHandler
	IndexAllPosts      command.IndexAllPostsHandler

	NewPost             command.NewPostHandler
	PostCustomResources command.PostCustomResourcesHandler
	PublishPost         command.PublishPostHandler
	DiscardPost         command.DiscardPostHandler
	UndoPost            command.UndoPostHandler
	ReassignModerator   command.ReassignModeratorHandler
}

type Queries struct {
	SearchCategories   query.SearchCategoriesHandler
	SearchCharacters   query.SearchCharactersHandler
	SearchMedias       query.SearchMediasHandler
	SearchPosts        query.SearchPostsHandler
	PostsByModerator   query.PostsByModeratorAccountHandler
	PostsByContributor query.PostsByContributorAccountHandler
	PostsByArtist      query.PostsByArtistAccountHandler
	PostById           query.PostByIdHandler
	CharacterById      query.CharacterByIdHandler
	CategoryById       query.CategoryByIdHandler
	MediaById          query.MediaByIdHandler
	ArtistById         query.ArtistByIdHandler
}
