package search

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/elastic/go-elasticsearch/v7/esapi"
)

// CreateIndex creates a new index with mapping.
func (s *Store) CreateIndex(index string, mapping string) error {
	res, err := s.es.Indices.Create(index, s.es.Indices.Create.WithBody(strings.NewReader(mapping)))
	if err != nil {
		return err
	}
	if res.IsError() {
		return fmt.Errorf("error: %s", res)
	}
	return nil
}

// Create indexes a new document into store.
func (s *Store) Create(index string, id string, item interface{}) error {
	payload, err := json.Marshal(item)
	if err != nil {
		return err
	}

	res, err := esapi.CreateRequest{
		Index:      index,
		DocumentID: id,
		Body:       bytes.NewReader(payload),
	}.Do(s.ctx, s.es)

	if err != nil {
		return err
	}

	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			return err
		}
		return fmt.Errorf("[%s] %s: %s", res.Status(), e["error"].(map[string]interface{})["type"], e["error"].(map[string]interface{})["reason"])
	}

	return nil
}

// Exists returns true when a document with id already exists in the store.
func (s *Store) Exists(index string, id string) (bool, error) {
	res, err := s.es.Exists(index, id)
	if err != nil {
		return false, err
	}
	switch res.StatusCode {
	case 200:
		return true, nil
	case 404:
		return false, nil
	default:
		return false, fmt.Errorf("[%s]", res.Status())
	}
}