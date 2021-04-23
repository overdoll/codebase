package command

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/gocql/gocql"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/sting/src/domain/post"
	"overdoll/libraries/ksuid"
)

type PublishPostHandler struct {
}

func NewPublishPostHandler() PublishPostHandler {
	return PublishPostHandler{}
}

func (h PublishPostHandler) Handle(ctx context.Context, id string) (*post.PostPending, error) {
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
	err = s.events.BulkPublish(ctx, publishMap)

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
	err = s.events.Publish(ctx, "indigo.topic.create_document", &indigo.CreateDocument{Id: post.Id.String(), Index: "posts", Body: string(marshal)})

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
