package server

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/golang/protobuf/proto"
	"github.com/scylladb/gocqlx/v2"
	"github.com/scylladb/gocqlx/v2/qb"
	indigo "overdoll/applications/indigo/proto"
	pox "overdoll/applications/pox/proto"
	sting "overdoll/applications/sting/proto"
	"overdoll/applications/sting/src/helpers"
	"overdoll/applications/sting/src/models"
	"overdoll/applications/sting/src/search/documents"
	"overdoll/libraries/events"
	"overdoll/libraries/ksuid"
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

	contributorId, err := ksuid.Parse(post.ContributorId)

	if err != nil {
		return nil, err
	}

	characterIds, err := helpers.CheckIfCharactersAreValid(s.session, post.Characters)

	if err != nil {
		return nil, err
	}

	categoryIds, err := helpers.CheckIfCategoriesAreValid(s.session, post.Categories)

	if err != nil {
		return nil, err
	}

	// Create a post in the "pending" state - this is where we can do all of our backend work, such as image processing
	// before the post is ready for review
	pendingPost := &models.PostPending{
		Id:                  ksuid.New(),
		State:               models.Processing,
		ArtistId:            post.ArtistId,
		ArtistUsername:      post.ArtistUsername,
		ContributorId:       contributorId,
		ContributorUsername: post.ContributorUsername,
		Content:             post.Content,
		Categories:          categoryIds,
		Characters:          characterIds,
		CharactersRequests:  post.CharacterRequests,
		CategoriesRequests:  post.CategoriesRequests,
		MediaRequests:       post.MediaRequests,
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
	err = s.events.Publish("pox.topic.posts_content_processing", &pox.PostProcessContentEvent{
		PostId:  pendingPost.Id.String(),
		Content: pendingPost.Content,
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
		Id:      postPending.Id,
		Content: process.Content,
		State:   postState,
	}

	// Update our post to reflect the new state
	updatePost := qb.Update("post_pending").
		Set("content", "state").
		Where(qb.Eq("id")).
		Query(s.session).
		BindStruct(processedPost)

	if err := updatePost.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	// Tell pox to publish our images
	if !postPending.ReviewRequired {
		err := s.events.Publish("pox.topic.posts_content_publishing", &pox.PostPublishContentEvent{
			PostId:  postPending.Id.String(),
			Content: postPending.Content,
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

	artistId, err := ksuid.Parse(postPending.ArtistId)

	if err != nil {
		return nil, err
	}

	// Begin BATCH operation:
	// Will insert categories, characters, media
	batch := s.session.NewBatch(gocql.LoggedBatch)

	publishMap := make(map[string][]proto.Message)

	var newCategories []ksuid.UUID

	// Go through each category request
	for _, category := range postPending.CategoriesRequests {

		id := ksuid.New()

		newCategories = append(newCategories, id)

		// Create new categories query
		batch.Query(qb.Insert("categories").LitColumn("id", id.String()).LitColumn("title", category).ToCql())

		// Create a category document, which will be indexed
		document := &documents.Category{
			Id:        id.String(),
			Thumbnail: "",
			Title:     category,
		}

		marshal, err := json.Marshal(document)

		if err != nil {
			return nil, err
		}

		// Add to list of events that will be published later to index the categories
		publishMap["indigo.topic.create_document"] = append(publishMap["indigo.topic.create_document"], &indigo.CreateDocument{Id: id.String(), Index: "categories", Body: string(marshal)})
	}

	var newCharacters []ksuid.UUID

	// Go through each character request
	for character, media := range postPending.CharactersRequests {

		var exists = true
		var id ksuid.UUID
		var mediaName string
		characterId := ksuid.New()

		// Check if the requested media is a media in our list
		for _, requestedMedia := range postPending.MediaRequests {

			// If the media is on our list, then we create a new media, and append to array of events
			if media == requestedMedia {
				id = ksuid.New()
				mediaName = requestedMedia
				exists = false
				break
			}
		}

		batch.Query(
			qb.Insert("characters").
				LitColumn("id", characterId.String()).
				LitColumn("name", character).
				LitColumn("media_id", id.String()).
				ToCql(),
		)

		// Create a characters document, which will be indexed
		document := &documents.Character{
			Id:        characterId.String(),
			Thumbnail: "",
			Name:      character,
			Media: documents.Media{
				Thumbnail: "",
				Id:        id.String(),
				Title:     mediaName,
			},
		}

		marshal, err := json.Marshal(document)

		if err != nil {
			return nil, err
		}

		// Index for our characters
		publishMap["indigo.topic.create_document"] = append(publishMap["indigo.topic.create_document"], &indigo.CreateDocument{
			Id:    characterId.String(),
			Index: "characters",
			Body:  string(marshal),
		})

		// Media does not exist - we need to make a new one
		if !exists {
			batch.Query(qb.Insert("media").LitColumn("id", id.String()).LitColumn("title", mediaName).ToCql())

			// Create a media document, which will be indexed
			document := &documents.Media{
				Id:    id.String(),
				Title: mediaName,
			}

			marshal, err := json.Marshal(document)

			if err != nil {
				return nil, err
			}

			// Index for media
			publishMap["indigo.topic.create_document"] = append(publishMap["indigo.topic.create_document"], &indigo.CreateDocument{Id: id.String(), Index: "media", Body: string(marshal)})
		}
	}

	err = s.session.ExecuteBatch(batch)

	if err != nil {
		return nil, err
	}

	// Now that all of our new stuff was batch inserted, we need to tell indigo to index our new characters, categories and media
	// we bulk publish the events
	err = s.events.BulkPublish(publishMap)

	if err != nil {
		return nil, err
	}

	// Update our pending_post, to make sure that the user sees the updated data points
	err = qb.Update("post_pending").
		Set("characters", "categories", "media_requests", "character_requests", "categories_requests").
		Where(qb.Eq("id")).
		Query(s.session).
		BindStruct(&models.PostPending{
			Categories: append(postPending.Categories, newCategories...),
			Characters: append(postPending.Characters, newCharacters...),
			// No more requests - we processed them already
			CharactersRequests: nil,
			CategoriesRequests: nil,
			MediaRequests:      nil,
		}).
		ExecRelease()

	if err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	// Insert our new post
	post := &models.Post{
		Id:            ksuid.New(),
		ArtistId:      artistId,
		ContributorId: postPending.ContributorId,
		Content:       publish.Content,
		Categories:    append(postPending.Categories, newCategories...),
		Characters:    append(postPending.Characters, newCharacters...),
		PostedAt:      time.Now(),
	}

	insertPost := qb.Insert("posts").
		Query(s.session).
		BindStruct(post)

	if err := insertPost.ExecRelease(); err != nil {
		return nil, fmt.Errorf("ExecRelease() failed: '%s", err)
	}

	document := &documents.Post{
		Id:            post.Id.String(),
		ArtistId:      post.ArtistId.String(),
		ContributorId: post.ContributorId.String(),
		Content:       post.Content,
		Categories:    ksuid.ToStringArray(post.Categories),
		Characters:    ksuid.ToStringArray(post.Characters),
		PostedAt:      post.PostedAt.String(),
	}

	marshal, err := json.Marshal(document)

	if err != nil {
		return nil, err
	}

	// Tell indigo to index our post
	err = s.events.Publish("indigo.topic.create_document", &indigo.CreateDocument{Id: post.Id.String(), Index: "posts", Body: string(marshal)})

	if err != nil {
		return nil, err
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

	// Make sure our artistId is valid
	artistId, err := ksuid.Parse(review.ArtistId)

	if err != nil {
		return nil, err
	}

	characterIds, err := helpers.CheckIfCharactersAreValid(s.session, review.Characters)

	if err != nil {
		return nil, err
	}

	categoryIds, err := helpers.CheckIfCategoriesAreValid(s.session, review.Categories)

	if err != nil {
		return nil, err
	}

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
		Id:                 postReview.Id,
		State:              models.Publishing,
		ArtistId:           artistId.String(),
		ArtistUsername:     review.ArtistUsername,
		Characters:         characterIds,
		Categories:         categoryIds,
		MediaRequests:      review.MediaRequests,
		CharactersRequests: review.CharacterRequests,
		CategoriesRequests: review.CategoriesRequests,
	}

	// Update our post to reflect the new state - in publishing
	updatePost := qb.Update("post_pending").
		Set("state", "characters", "categories", "media_requests", "character_requests", "categories_requests", "artist_id", "artist_username").
		Where(qb.Eq("id")).
		Query(s.session).
		// Update must be replicated everywhere or else we risk that the PublishPost method isn't in sync with the
		// new settings we set up here
		Consistency(gocql.All).
		BindStruct(processedPost)

	if err := updatePost.ExecRelease(); err != nil {
		return nil, fmt.Errorf("update() failed: '%s", err)
	}

	// Tell pox to publish the images - this will make the post public & create all the required categories once this is finished
	err = s.events.Publish("pox.topic.posts_image_publishing", &pox.PostPublishContentEvent{
		PostId:  postReview.Id.String(),
		Content: postReview.Content,
	})

	if err != nil {
		return nil, err
	}

	return &sting.Post{
		Id:            postReview.Id.String(),
		ArtistId:      postReview.ArtistId,
		ContributorId: postReview.ContributorId.String(),
		Content:       postReview.Content,
		Categories:    ksuid.ToStringArray(postReview.Categories),
		Characters:    ksuid.ToStringArray(postReview.Characters),
	}, nil
}
