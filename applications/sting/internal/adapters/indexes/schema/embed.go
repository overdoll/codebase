package schema

import (
	_ "embed"
)

//go:embed audience.json
var AudienceSchema string

//go:embed categories.json
var CategoriesSchema string

//go:embed characters.json
var CharactersSchema string

//go:embed club_members.json
var ClubMembersSchema string

//go:embed clubs.json
var ClubsSchema string

//go:embed posts.json
var PostsSchema string

//go:embed search_history.json
var SearchHistorySchema string

//go:embed series.json
var SeriesSchema string

//go:embed topics.json
var TopicsSchema string
