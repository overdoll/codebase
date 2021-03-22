package commands

import (
	"log"

	"github.com/scylladb/gocqlx/v2/qb"
	"github.com/spf13/cobra"
	"overdoll/applications/sting/src/models"
	"overdoll/applications/sting/src/search/documents"
	"overdoll/applications/sting/src/search/indexes"
)

var media = &cobra.Command{
	Use:   "media",
	Short: "Index the whole media table into elasticsearch",
	Run: func(cmd *cobra.Command, args []string) {
		CreateServer().IndexMedia()
	},
}

func init() {
	Root.AddCommand(media)
}

func (s *Server) IndexMedia() {

	err := s.store.DeleteIndex("media")

	// In case it fails, we don't care since it should still create it
	if err != nil {

	}

	err = s.store.CreateIndex("media", indexes.MediaIndex)

	if err != nil {
		log.Fatalf("failed to create media index: %s", err)
	}

	err = s.store.CreateBulkIndex("media")

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	var dbMed []models.Media

	qc := qb.Select("media").Columns("id", "title", "thumbnail").Query(s.session)

	if err = qc.Select(&dbMed); err != nil {
		log.Fatalf("select() failed: %s", err)
	}

	// Now we can safely start creating our documents
	for _, media := range dbMed {

		data := &documents.Media{
			Id:        media.Id.String(),
			Thumbnail: media.Thumbnail.URL,
			Title:     media.Title,
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
