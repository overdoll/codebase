package main

import (
	"context"
	"fmt"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
)

const DIRECTORY = "applications/hades/"

const defaultPort = "8080"

type Cache struct {
	queries map[string]interface{}
}

func NewCache() (*Cache, error) {
	// Open our jsonFile
	jsonFile, err := os.Open(DIRECTORY + "queries.json")

	if err != nil {
		fmt.Println(err)
	}
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)

	return &Cache{queries: result}, nil
}

func (c *Cache) Get(ctx context.Context, key string) (interface{}, bool) {
	s := c.queries[key]
	return s, true
}

func (c *Cache) Add(ctx context.Context, key string, value interface{}) {
	log.Printf("query not found. please generate the queries.json file")
}
