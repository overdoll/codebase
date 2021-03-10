package documents

type Post struct {
	Id            string   `json:"id"`
	ArtistId      string   `json:"artist_id"`
	ContributorId string   `json:"contributor_id"`
	Images        []string `json:"images"`
	Categories    []string `json:"categories"`
	Characters    []string `json:"characters"`
	PostedAt      string `json:"posted_at"`
}
