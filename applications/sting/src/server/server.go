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
		State:               models.Processing,
		ArtistId:            artistUUID,
		ArtistUsername:      post.ArtistUsername,
		ContributorId:       contributorId,
		ContributorUsername: post.ContributorUsername,
		Images:              post.Images,
		Categories:          post.Categories,
		Characters:          post.Characters,
		PostedAt:            time.Now(),
		ReviewRequired:      post.ReviewRequired,
		PublishedPostId:     "",
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
func (s *Server) ProcessPost(ctx context.Context, process *sting.ProcessPostRequest) (*sting.Post, error) {

	// Get our post by this ID
	postPendingQuery := qb.Select("post_pending").
		Where(qb.EqLit("id", process.Id)).
		Query(s.session)

	var postPending models.PostPending

	if err := postPendingQuery.Get(&postPending); err != nil {
		return nil, err
	}

	postState := models.Review

	// If a review is required of this pending post, we don't tell pox to publish the images
	if !postPending.ReviewRequired {
		postState = models.Publishing
	}

	processedPost := &models.PostPending{
		Id:     postPending.Id,
		Images: process.Images,
		State:  postState,
	}

	// Update our post to reflect the new state
	updatePost := qb.Update("post_pending").
		Set("images", "state").
		Where(qb.Eq("id")).
		Query(s.session).
		BindStruct(processedPost)

	if err := updatePost.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	// Tell pox to publish our images
	if !postPending.ReviewRequired {
		err := s.events.Publish("pox.topic.posts_image_publishing", &pox.PostPublishImageEvent{
			PostId: postPending.Id.String(),
			Images: postPending.Images,
		})

		if err != nil {
			return nil, err
		}
	}

	return nil, nil
}

// PublishPost - Publish the post - create a new entry in Post table, and delete the pending post
func (s *Server) PublishPost(ctx context.Context, publish *sting.PublishPostRequest) (*sting.Post, error) {

	// Get our post by this ID - to make sure it's still valid
	postPendingQuery := qb.Select("post_pending").
		Where(qb.EqLit("id", publish.Id)).
		Query(s.session)

	var postPending models.PostPending

	if err := postPendingQuery.Get(&postPending); err != nil {
		return nil, err
	}

	// Insert our new post
	post := &models.Post{
		Id:            gocql.TimeUUID(),
		ArtistId:      postPending.ArtistId,
		ContributorId: postPending.ContributorId,
		Images:        publish.Images,
		Categories:    postPending.Categories,
		Characters:    postPending.Characters,
		PostedAt:      time.Now(),
	}

	insertPost := qb.Insert("posts").
		Query(s.session).
		BindStruct(post)

	if err := insertPost.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	// Update our pending post with the new state and link
	publishedPost := &models.PostPending{
		Id:              postPending.Id,
		PublishedPostId: post.Id.String(),
		State:           models.Published,
	}

	updatePost := qb.Update("post_pending").
		Set("published_post_id", "state").
		Where(qb.Eq("id")).
		Query(s.session).
		BindStruct(publishedPost)

	if err := updatePost.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	return nil, nil
}

// ReviewPost - Successfully review the post
func (s *Server) ReviewPost(ctx context.Context, review *sting.ReviewPostRequest) (*sting.Post, error) {

	// Get our post by this ID
	postReviewQuery := qb.Select("post_pending").
		Where(qb.EqLit("id", review.Id)).
		Query(s.session)

	var postReview models.PostPending

	if err := postReviewQuery.Get(&postReview); err != nil {
		return nil, err
	}

	// Update the state of our post
	processedPost := &models.PostPending{
		Id:    postReview.Id,
		State: models.Publishing,
	}

	// Update our post to reflect the new state - in publishing
	updatePost := qb.Update("post_pending").
		Set("state").
		Where(qb.Eq("id")).
		Query(s.session).
		BindStruct(processedPost)

	if err := updatePost.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	// Tell pox to publish the images - this will make the post public once this is finished
	err := s.events.Publish("pox.topic.posts_image_publishing", &pox.PostPublishImageEvent{
		PostId: postReview.Id.String(),
		Images: postReview.Images,
	})

	if err != nil {
		return nil, err
	}

	return &sting.Post{
		Id:            postReview.Id.String(),
		ArtistId:      postReview.ArtistId.String(),
		ContributorId: postReview.ContributorId.String(),
		Images:        postReview.Images,
		Categories:    postReview.Categories,
		Characters:    postReview.Characters,
	}, nil
}
