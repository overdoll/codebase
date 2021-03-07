package models

import (
	"time"

	"github.com/gocql/gocql"
	"overdoll/libraries/ksuid"
)

type Category struct {
	Id    ksuid.UUID `db:"id"`
	Title string     `db:"title"`
}

type Character struct {
	Id      ksuid.UUID `db:"id"`
	Title   string     `db:"title"`
	MediaId ksuid.UUID `db:"media_id"`
}

type Media struct {
	Id    gocql.UUID `db:"id"`
	Title string     `db:"title"`
}

type Post struct {
	Id            ksuid.UUID   `db:"id"`
	ArtistId      ksuid.UUID   `db:"artist_id"`
	ContributorId ksuid.UUID   `db:"contributor_id"`
	Images        []string     `db:"images"`
	Categories    []ksuid.UUID `db:"categories"`
	Characters    []ksuid.UUID `db:"characters"`
	PostedAt      time.Time    `db:"posted_at"`
}

type PostPendingState string

const (
	Processing PostPendingState = "processing"
	Review     PostPendingState = "review"
	Publishing PostPendingState = "publishing"
	Published  PostPendingState = "published"
)

type PostPending struct {
	Id                  ksuid.UUID          `db:"id"`
	State               PostPendingState    `db:"state"`
	ArtistId            ksuid.UUID          `db:"artist_id"`
	ArtistUsername      string              `db:"artist_username"`
	ContributorId       ksuid.UUID          `db:"contributor_id"`
	ContributorUsername string              `db:"contributor_username"`
	Images              []string            `db:"images"`
	Categories          []ksuid.UUID        `db:"categories"`
	Characters          []ksuid.UUID        `db:"characters"`
	CharactersRequests  map[string]string   `db:"characters_requests"`
	CategoriesRequests  []string            `db:"categories_requests"`
	MediaRequests       []string            `db:"media_requests"`
	PostedAt            time.Time           `db:"posted_at"`
	ReviewRequired      bool                `db:"review_required"`
	PublishedPostId     string              `db:"published_post_id"`
}
