package server

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	pox "overdoll/applications/pox/proto"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/models"
	"overdoll/libraries/events"
)

type Server struct {
	session gocqlx.Session
	events  events.Connection
}

func CreateServer(session gocqlx.Session, events events.Connection) *Server {
	return &Server{
		session: session,
		events:  events,
	}
}

// SchedulePost - Create a pending post, and tell our processing service to process the images
func (s *Server) SchedulePost(ctx context.Context, post *sting.SchedulePostRequest) (*sting.Post, error) {

	// Do some UUID Validation
	artistUUID, err := gocql.ParseUUID(post.ArtistId)

	if err != nil {
		return nil, err
	}

	contributorId, err := gocql.ParseUUID(post.ContributorId)

	if err != nil {
		return nil, err
	}

	// Ensure we set up correct characters (DB entries exist)
	queryCharacters := qb.Select("characters").
		Where(qb.InLit("id", strings.Join(post.Characters, ","))).
		Query(s.session)

	var characters []models.Character

	if err := queryCharacters.Get(&characters); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if len(characters) != len(post.Characters) {
		return nil, fmt.Errorf("invalid character chosen")
	}

	// Ensure we set up correct categories (DB entries exist)
	queryCategories := qb.Select("categories").
		Where(qb.InLit("id", strings.Join(post.Categories, ","))).
		Query(s.session)

	var categories []models.Character

	if err := queryCategories.Get(&categories); err != nil {
		return nil, fmt.Errorf("select() failed: '%s", err)
	}

	if len(categories) != len(post.Categories) {
		return nil, fmt.Errorf("invalid category chosen")
	}

	// Create a post in the "pending" state - this is where we can do all of our backend work, such as image processing
	// before the post is ready for review
	pendingPost := &models.PostPending{
		Id:                  gocql.TimeUUID(),
		ArtistId:            artistUUID,
		ArtistUsername:      post.ArtistUsername,
		ContributorId:       contributorId,
		ContributorUsername: post.ContributorUsername,
		Images:              post.Images,
		Categories:          post.Categories,
		Characters:          post.Characters,
		PostedAt:            time.Now(),
		ReviewRequired:      post.ReviewRequired,
	}

	insertPost := qb.Insert("post_pending").
		Query(s.session).
		BindStruct(pendingPost)

	if err := insertPost.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	// Send a message to pox to process the images on this specific post
	err = s.events.Publish("pox.topic.posts_image_processing", &pox.PostProcessImageEvent{
		PostId: pendingPost.Id.String(),
		Images: pendingPost.Images,
	})

	if err != nil {
		return nil, err
	}

	return nil, nil
}

// ProcessPost - Process a post - our pox service will call this once it's finished processing the images
// to a public bucket
func (s *Server) ProcessPost(context.Context, *sting.SchedulePostRequest) (*sting.Post, error) {
	return nil, nil
}