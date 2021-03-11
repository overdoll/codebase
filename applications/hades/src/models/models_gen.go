// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package models

type AuthListener struct {
	SameSession bool    `json:"sameSession"`
	Cookie      *Cookie `json:"cookie"`
}

type Authentication struct {
	Cookie *Cookie `json:"cookie"`
	User   *User   `json:"user"`
}

type AuthenticationInput struct {
	Email string `json:"email"`
}

type Category struct {
	ID        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Title     string `json:"title"`
}

type CategorySearchInput struct {
	Title string `json:"title"`
}

type Character struct {
	ID        string `json:"id"`
	Thumbnail string `json:"thumbnail"`
	Name      string `json:"name"`
	Media     Media `json:"media"`
}

type CharacterRequest struct {
	Name  string `json:"name"`
	Media string `json:"media"`
}

type CharacterSearchInput struct {
	Name string `json:"name"`
}

type Cookie struct {
	SameSession bool   `json:"sameSession"`
	Registered  bool   `json:"registered"`
	Redeemed    bool   `json:"redeemed"`
	Session     string `json:"session"`
	Email       string `json:"email"`
}

type Media struct {
	ID        string  `json:"id"`
	Thumbnail *string `json:"thumbnail"`
	Title     string  `json:"title"`
}

type PostInput struct {
	Images            []string            `json:"images"`
	Categories        []string            `json:"categories"`
	Characters        []string            `json:"characters"`
	MediaRequests     []string            `json:"mediaRequests"`
	CharacterRequests []*CharacterRequest `json:"characterRequests"`
	ArtistID          *string             `json:"artistId"`
	ArtistUsername    string              `json:"artistUsername"`
}

type PostResponse struct {
	Review     bool        `json:"review"`
	Validation *Validation `json:"validation"`
}

type RegisterInput struct {
	Username string `json:"username"`
}

type User struct {
	Username string `json:"username"`
}

type Validation struct {
	Code string `json:"code"`
}
