// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package types

type Artist struct {
	ID       string `json:"id"`
	Avatar   string `json:"avatar"`
	Username string `json:"username"`
}

type Category struct {
	ID        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}

type Character struct {
	ID        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Name      string `json:"name"`
	Media     *Media `json:"media"`
}

type CharacterRequest struct {
	Name  string `json:"name"`
	Media string `json:"media"`
}

type CharacterRequestType struct {
	Name  string `json:"name"`
	Media string `json:"media"`
}

type Contributor struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Avatar   string `json:"avatar"`
}

type Media struct {
	ID        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}

type PendingPost struct {
	ID                string                  `json:"id"`
	Moderator         string                  `json:"moderator"`
	Contributor       *Contributor            `json:"contributor"`
	Content           []string                `json:"content"`
	Categories        []*Category             `json:"categories"`
	Characters        []*Character            `json:"characters"`
	MediaRequests     []string                `json:"mediaRequests"`
	CharacterRequests []*CharacterRequestType `json:"characterRequests"`
	ArtistID          *string                 `json:"artistId"`
	ArtistUsername    string                  `json:"artistUsername"`
}

type PostInput struct {
	Content           []string            `json:"content"`
	Categories        []string            `json:"categories"`
	Characters        []string            `json:"characters"`
	MediaRequests     []string            `json:"mediaRequests"`
	CharacterRequests []*CharacterRequest `json:"characterRequests"`
	ArtistID          *string             `json:"artistId"`
	ArtistUsername    string              `json:"artistUsername"`
}

type PostResponse struct {
	ID         string      `json:"id"`
	Review     bool        `json:"review"`
	Validation *Validation `json:"validation"`
}

type PostUpdateResponse struct {
	Validation *Validation `json:"validation"`
}

type SearchInput struct {
	Search string `json:"search"`
}

type User struct {
	ID           string         `json:"id"`
	PendingPosts []*PendingPost `json:"pendingPosts"`
}

func (User) IsEntity() {}

type Validation struct {
	Code string `json:"code"`
}
