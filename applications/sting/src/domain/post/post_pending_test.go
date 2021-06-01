package post_test

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"overdoll/applications/sting/src/domain/post"
)

func TestPostPending_ConsumeCustomResources(t *testing.T) {
	t.Parallel()

	pst := post.UnmarshalPendingPostFromDatabase("id", string(post.Review), &post.Artist{}, "", nil, nil, nil, make(map[string]string), nil, nil, time.Now(), "")

	customCharacters := make(map[string]string)
	customCharacters["test_character"] = "test_media"

	var customCategories []string
	customCategories = append(customCategories, "test_category")

	var customMedia []string
	customMedia = append(customMedia, "test_media")

	var media []*post.Media

	pst.RequestResources(customCharacters, customCategories, customMedia)

	// consume, and make sure that they exist
	categories, characters, media := pst.ConsumeCustomResources(media)

	for _, cat := range categories {
		for _, target := range customCategories {
			assert.Equal(t, cat.Title(), target)
		}
	}

	for _, char := range characters {
		for target, _ := range customCharacters {
			assert.Equal(t, char.Name(), target)

			// TODO: nill pointer?
			// assert.Equal(t, char.Media().Title(), med)
		}
	}

	for _, med := range media {
		for _, target := range customMedia {
			assert.Equal(t, med.Title(), target)
		}
	}

}
