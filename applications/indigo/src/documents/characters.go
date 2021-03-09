package documents

var CharacterIndex = `{
    "mappings": {
      "character": {
        "dynamic":      "strict",
        "properties": {
          "id":         { "type": "keyword" },
          "thumbnail":  { "type": "keyword" },
          "name":      { "type": "text", "analyzer": "english" },
          "media":    {
			"type": "nested",
            "properties": {
				"id": { "type": "keyword" },
 				"thumbnail": { "type": "keyword" },
                "title": { "type": "text", "analyzer": "english" },
            }
          }
        }
      }
    }
}`
