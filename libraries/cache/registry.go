package cache

import "context"

type IndexConfig struct {
	Prefix   string
	Registry IndexRegistry
}

type IndexRegistry struct {
	registry map[string]string
	reindex  map[string]func(ctx context.Context) error
}

func NewIndexRegistry() IndexRegistry {
	return IndexRegistry{
		registry: make(map[string]string),
		reindex:  make(map[string]func(ctx context.Context) error),
	}
}

func (r IndexRegistry) Add(name, body string, reindex func(ctx context.Context) error) {
	r.registry[name] = body
	r.reindex[name] = reindex
}
