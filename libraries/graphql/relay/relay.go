package relay

import (
	"github.com/99designs/gqlgen/codegen/config"
	"github.com/99designs/gqlgen/plugin"
	"github.com/vektah/gqlparser/v2/ast"
)

var definitions = []*ast.ArgumentDefinition{
	{
		Description:  "Returns the elements in the list that come after the specified cursor.",
		Name:         "after",
		DefaultValue: nil,
		Type: &ast.Type{
			NamedType: "String",
			Elem:      nil,
			NonNull:   false,
			Position:  nil,
		},
		Directives: nil,
		Position:   nil,
	},
	{
		Description:  "Returns the elements in the list that come before the specified cursor.",
		Name:         "before",
		DefaultValue: nil,
		Type: &ast.Type{
			NamedType: "String",
			Elem:      nil,
			NonNull:   false,
			Position:  nil,
		},
		Directives: nil,
		Position:   nil,
	},
	{
		Description:  "Returns the first _n_ elements from the list.",
		Name:         "first",
		DefaultValue: nil,
		Type: &ast.Type{
			NamedType: "Int",
			Elem:      nil,
			NonNull:   false,
			Position:  nil,
		},
		Directives: nil,
		Position:   nil,
	},
	{
		Description:  "Returns the last _n_ elements from the list.",
		Name:         "last",
		DefaultValue: nil,
		Type: &ast.Type{
			NamedType: "Int",
			Elem:      nil,
			NonNull:   false,
			Position:  nil,
		},
		Directives: nil,
		Position:   nil,
	},
}

var BuiltIns = config.TypeMap{
	"Node": {
		Model: config.StringList{
			"overdoll/libraries/graphql/relay/relayruntime.Node",
		},
	},
	"ID": {
		Model: config.StringList{
			"overdoll/libraries/graphql/relay.ID",
		},
	},
	"PageInfo": {
		Model: config.StringList{
			"overdoll/libraries/graphql/relay.PageInfo",
		},
	},
}

type relay struct {
}

// Name returns the plugin name
func (f *relay) Name() string {
	return "relay"
}

// MutateConfig mutates the configuration
func (f *relay) MutateConfig(cfg *config.Config) error {
	cfg.Directives["cursor"] = config.DirectiveConfig{SkipRuntime: true}
	return nil
}

func (f *relay) InjectSourceEarly() *ast.Source {
	return &ast.Source{
		Name: "relay/directives.graphql",
		Input: `
interface Node {
  id: ID!
}

# Information about pagination in a connection.
type PageInfo {
  # When paginating forwards, are there more items?
  hasNextPage: Boolean!

  # When paginating backwards, are there more items?
  hasPreviousPage: Boolean!

  # When paginating backwards, the cursor to continue.
  startCursor: String

  # When paginating forwards, the cursor to continue.
  endCursor: String
}

directive @cursor on FIELD_DEFINITION
`,
		BuiltIn: true,
	}
}

// InjectSources creates a GraphQL Node type with all
// the fields that implement the Node interface
func (f *relay) InjectSourceLate(schema *ast.Schema) *ast.Source {
	f.setNodes(schema)
	return &ast.Source{
		Name:    "relay/node.graphql",
		BuiltIn: true,
		Input:   ``,
	}
}

// New returns a federation plugin that injects
// federated directives and types into the schema
func New() plugin.Plugin {
	return &relay{}
}

func (f *relay) setNodes(schema *ast.Schema) {
	for _, schemaType := range schema.Types {
		if schemaType.Kind == ast.Object {
			//interfaces := schemaType.Interfaces

			//foundNodeInterface := false
			//
			//// get any types that implement "Node"
			//for _, inter := range interfaces {
			//	if inter == "Node" {
			//		foundNodeInterface = true
			//	}
			//}

			for _, f := range schemaType.Fields {
				cursorDirective := f.Directives.ForName("cursor")
				if cursorDirective == nil {
					continue
				}

				if len(f.Arguments) > 0 {
					f.Arguments = append(definitions, f.Arguments...)
				} else {
					f.Arguments = definitions
				}
			}
		}
	}
}
