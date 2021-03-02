package models

import (
	"time"

	"github.com/gocql/gocql"
)

type Category struct {
	Id    gocql.UUID `db:"id"`
	Title string     `db:"title"`
}

type Character struct {
	Id      gocql.UUID `db:"id"`
	Title   string     `db:"title"`
	MediaId gocql.UUID `db:"media_id"`
}

type Media struct {
	Id    gocql.UUID `db:"id"`
	Title string     `db:"title"`
}

type Post struct {
	Id            gocql.UUID `db:"id"`
	ArtistId      gocql.UUID `db:"artist_id"`
	ContributorId gocql.UUID `db:"contributor_id"`
	Images        []string   `db:"images"`
	Categories    []string   `db:"categories"`
	Characters    []string   `db:"characters"`
	PostedAt      time.Time  `db:"posted_at"`
}

type PostPending struct {
	Id                  gocql.UUID `db:"id"`
	ArtistId            gocql.UUID `db:"artist_id"`
	ArtistUsername      string     `db:"artist_username"`
	ContributorId       gocql.UUID `db:"contributor_id"`
	ContributorUsername string     `db:"contributor_username"`
	Images              []string   `db:"images"`
	Categories          []string   `db:"categories"`
	Characters          []string   `db:"characters"`
	PostedAt            time.Time  `db:"posted_at"`
	ReviewRequired      bool       `db:"review_required"`
}

type PostReview struct {
	Id                  gocql.UUID `db:"id"`
	ArtistId            gocql.UUID `db:"artist_id"`
	ArtistUsername      string     `db:"artist_username"`
	ContributorId       gocql.UUID `db:"contributor_id"`
	ContributorUsername string     `db:"contributor_username"`
	Images              []string   `db:"images"`
	Categories          []string   `db:"categories"`
	Characters          []string   `db:"characters"`
	PostedAt            time.Time  `db:"posted_at"`
	ProcessedAt         time.Time  `db:"posted_at"`
}
