package models

import (
	"time"

	"overdoll/libraries/ksuid"
)

type Category struct {
	Id        ksuid.UUID `db:"id"`
	Title     string     `db:"title"`
	Thumbnail string     `db:"thumbnail"`
}

type Character struct {
	Id        ksuid.UUID `db:"id"`
	Name      string     `db:"name"`
	Thumbnail string     `db:"thumbnail"`
	MediaId   ksuid.UUID `db:"media_id"`
}

type Media struct {
	Id        ksuid.UUID `db:"id"`
	Title     string     `db:"title"`
	Thumbnail string     `db:"thumbnail"`
}

type Artist struct {
	Id       ksuid.UUID `db:"user_id"`
	Username string     `db:"user_username"`
	Avatar   string     `db:"user_avatar"`
}

type Post struct {
	Id            ksuid.UUID   `db:"id"`
	ArtistId      ksuid.UUID   `db:"artist_id"`
	ContributorId ksuid.UUID   `db:"contributor_id"`
	Content       []string     `db:"content"`
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
	Id                  ksuid.UUID        `db:"id"`
	State               PostPendingState  `db:"state"`
	ArtistId            string            `db:"artist_id"`
	ArtistUsername      string            `db:"artist_username"`
	ContributorId       ksuid.UUID        `db:"contributor_id"`
	ContributorUsername string            `db:"contributor_username"`
	Content             []string          `db:"content"`
	Categories          []ksuid.UUID      `db:"categories"`
	Characters          []ksuid.UUID      `db:"characters"`
	CharactersRequests  map[string]string `db:"characters_requests"`
	CategoriesRequests  []string          `db:"categories_requests"`
	MediaRequests       []string          `db:"media_requests"`
	PostedAt            time.Time         `db:"posted_at"`
	ReviewRequired      bool              `db:"review_required"`
	PublishedPostId     string            `db:"published_post_id"`
}
