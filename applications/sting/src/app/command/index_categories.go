package command

import (
	"context"

	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/hades/src/models"
)

type IndexCategoriesHandler struct {
}

func NewIndexCategoriesHandler() IndexCategoriesHandler {
	return IndexCategoriesHandler{}
}

func (h IndexCategoriesHandler) Handle(ctx context.Context) error {
	err := s.store.DeleteIndex("categories")

	// In case it fails, we don't care since it should still create it
	if err != nil {

	}

	err = s.store.CreateIndex("categories", indexes.CategoryIndex)

	if err != nil {
		log.Fatalf("failed to create category index: %s", err)
	}

	err = s.store.CreateBulkIndex("categories")

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	var dbCat []models.Category

	qc := qb.Select("categories").Columns("id", "title", "thumbnail").Query(s.session)

	if err = qc.Select(&dbCat); err != nil {
		log.Fatalf("select() failed: %s", err)
	}

	// Now we can safely start creating our documents
	for _, category := range dbCat {

		data := &documents.Category{
			Id:        category.Id.String(),
			Thumbnail: category.Thumbnail.URL,
			Title:     category.Title,
		}

		err = s.store.AddToBulkIndex(data.Id, data)

		if err != nil {
			log.Fatalf("unexpected error: %s", err)
		}
	}

	if err := s.store.CloseBulkIndex(); err != nil {
		log.Fatalf("unexpected error: %s", err)
	}
}
