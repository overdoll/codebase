package search

import (
	"encoding/json"
	"fmt"
	"io"
	"strings"
)

// Search returns results matching a query, paginated by after.
func (s *Store) Search(index string, inter interface{}, query string, after ...string) (*SearchResults, error) {
	var results SearchResults

	res, err := s.es.Search(
		s.es.Search.WithIndex(index),
		s.es.Search.WithBody(s.BuildQuery(query, after...)),
	)
	if err != nil {
		fmt.Print(err)
		return &results, err
	}
	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			return &results, err
		}
		return &results, fmt.Errorf("[%s] %s: %s", res.Status(), e["error"].(map[string]interface{})["type"], e["error"].(map[string]interface{})["reason"])
	}

	type envelopeResponse struct {
		Took int
		Hits struct {
			Total struct {
				Value int
			}
			Hits []struct {
				ID         string          `json:"_id"`
				Source     json.RawMessage `json:"_source"`
			}
		}
	}

	var r envelopeResponse
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		return &results, err
	}

	results.Total = r.Hits.Total.Value

	if len(r.Hits.Hits) < 1 {
		results.Hits = []json.RawMessage{}
		return &results, nil
	}

	// Add our hits to response
	for _, hit := range r.Hits.Hits {
		results.Hits = append(results.Hits, hit.Source)
	}

	return &results, nil
}

func (s *Store) BuildQuery(query string, after ...string) io.Reader {
	var b strings.Builder

	b.WriteString("{\n")

	b.WriteString(query)

	if len(after) > 0 && after[0] != "" && after[0] != "null" {
		b.WriteString(",\n")
		b.WriteString(fmt.Sprintf(`	"search_after": %s`, after))
	}

	b.WriteString("\n}")

	// fmt.Printf("%s\n", b.String())
	return strings.NewReader(b.String())
}