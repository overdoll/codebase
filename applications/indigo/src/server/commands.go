package server

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"sync/atomic"
	"time"

	"github.com/dustin/go-humanize"
	"github.com/elastic/go-elasticsearch/v7/esutil"
	"github.com/scylladb/gocqlx/v2/qb"
	"overdoll/applications/indigo/src/search/documents"
	"overdoll/applications/indigo/src/search/indexes"
	"overdoll/applications/sting/src/models"
)

func (s *Server) IndexAllCharacters() {

	err := s.store.CreateIndex("characters", indexes.CharacterIndex)

	if err != nil {
		log.Fatalf("failed to create characters index: %s", err)
	}

	bi, err := esutil.NewBulkIndexer(esutil.BulkIndexerConfig{
		Index:         "characters",        // The default index name
		Client:        s.store.GetClient(), // The Elasticsearch client
		NumWorkers:    5,                   // The number of worker goroutines
		FlushInterval: 30 * time.Second,    // The periodic flush interval
	})

	if err != nil {
		log.Fatalf("error creating bulk indexer: %s", err)
	}

	var dbChars []models.Character

	// Grab all of our characters
	// Doing a direct database query
	qc := qb.Select("sting.characters").Columns("id", "media_id", "name", "thumbnail").Query(s.session)

	if err = qc.Select(&dbChars); err != nil {
		log.Fatalf("select() failed: %s", err)
	}

	var medias []models.Media

	// Go through each character and grab the media ID, since we need this for the character document
	for _, char := range dbChars {
		medias = append(medias, models.Media{Id: char.MediaId})
	}

	// Get all the medias through a direct database query
	qm := qb.Select("sting.media").Columns("id", "thumbnail", "title").Query(s.session)

	if err = qm.Select(&medias); err != nil {
		log.Fatalf("select() failed: %s", err)
	}

	var countSuccessful uint64
	start := time.Now().UTC()

	// Now we can safely start creating our documents
	for _, character := range dbChars {

		var media models.Media

		for _, med := range medias {
			if med.Id == character.MediaId {
				media = med
			}
		}

		data := &documents.Character{
			Id:        character.Id.String(),
			Thumbnail: character.Thumbnail,
			Name:      character.Name,
			Media:     documents.Media{
				Id:        media.Id.String(),
				Thumbnail: media.Thumbnail,
				Title:     media.Title,
			},
		}

		dat, err := json.Marshal(data)

		if err != nil {
			log.Fatalf("cannot encode character %s: %s", data.Id, err)
		}

		err = bi.Add(
			context.Background(),
			esutil.BulkIndexerItem{
				// Action field configures the operation to perform (index, create, delete, update)
				Action: "index",

				// DocumentID is the (optional) document ID
				DocumentID: data.Id,

				// Body is an `io.Reader` with the payload
				Body: bytes.NewReader(dat),

				// OnSuccess is called for each successful operation
				OnSuccess: func(ctx context.Context, item esutil.BulkIndexerItem, res esutil.BulkIndexerResponseItem) {
					atomic.AddUint64(&countSuccessful, 1)
				},

				// OnFailure is called for each failed operation
				OnFailure: func(ctx context.Context, item esutil.BulkIndexerItem, res esutil.BulkIndexerResponseItem, err error) {
					if err != nil {
						log.Printf("ERROR: %s", err)
					} else {
						log.Printf("ERROR: %s: %s", res.Error.Type, res.Error.Reason)
					}
				},
			},
		)

		if err != nil {
			log.Fatalf("unexpected error: %s", err)
		}
	}

	if err := bi.Close(context.Background()); err != nil {
		log.Fatalf("unexpected error: %s", err)
	}

	biStats := bi.Stats()
	dur := time.Since(start)

	if biStats.NumFailed > 0 {
		log.Fatalf(
			"indexed [%s] documents with [%s] errors in %s (%s docs/sec)",
			humanize.Comma(int64(biStats.NumFlushed)),
			humanize.Comma(int64(biStats.NumFailed)),
			dur.Truncate(time.Millisecond),
			humanize.Comma(int64(1000.0/float64(dur/time.Millisecond)*float64(biStats.NumFlushed))),
		)
	} else {
		log.Printf(
			"sucessfuly indexed [%s] documents in %s (%s docs/sec)",
			humanize.Comma(int64(biStats.NumFlushed)),
			dur.Truncate(time.Millisecond),
			humanize.Comma(int64(1000.0/float64(dur/time.Millisecond)*float64(biStats.NumFlushed))),
		)
	}
}
