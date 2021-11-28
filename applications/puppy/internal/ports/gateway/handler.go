package gateway

import (
	"bytes"
	"context"
	"fmt"
	"github.com/jensneuse/abstractlogger"
	"github.com/jensneuse/graphql-go-tools/pkg/subscription"
	"net"
	"net/http"

	"github.com/gobwas/ws"

	"github.com/jensneuse/graphql-go-tools/pkg/graphql"
)

const (
	httpHeaderUpgrade              string = "Upgrade"
	httpHeaderContentType          string = "Content-Type"
	httpContentTypeApplicationJson string = "application/json"
)

func NewGraphqlHTTPHandler(
	schema *graphql.Schema,
	engine *graphql.ExecutionEngineV2,
	logger abstractlogger.Logger,
) http.Handler {

	upgrader := &ws.DefaultHTTPUpgrader
	upgrader.Header = http.Header{}
	upgrader.Header.Add("Sec-Websocket-Protocol", "graphql-ws")

	return &GraphQLHTTPRequestHandler{
		schema:     schema,
		engine:     engine,
		wsUpgrader: upgrader,
		logger:     logger,
	}
}

type GraphQLHTTPRequestHandler struct {
	logger     abstractlogger.Logger
	wsUpgrader *ws.HTTPUpgrader
	engine     *graphql.ExecutionEngineV2
	schema     *graphql.Schema
}

func (g *GraphQLHTTPRequestHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	isUpgrade := g.isWebsocketUpgrade(r)
	if isUpgrade {
		err := g.upgradeWithNewGoroutine(w, r)
		if err != nil {
			g.logger.Error("GraphQLHTTPRequestHandler.ServeHTTP",
				abstractlogger.Error(err),
			)
			w.WriteHeader(http.StatusBadRequest)
		}
		return
	}
	g.handleHTTP(w, r)
}

func (g *GraphQLHTTPRequestHandler) upgradeWithNewGoroutine(w http.ResponseWriter, r *http.Request) error {
	conn, _, _, err := g.wsUpgrader.Upgrade(r, w)
	if err != nil {
		return err
	}
	g.handleWebsocket(r.Context(), conn)
	return nil
}

func (g *GraphQLHTTPRequestHandler) isWebsocketUpgrade(r *http.Request) bool {
	for _, header := range r.Header[httpHeaderUpgrade] {
		if header == "websocket" {
			return true
		}
	}
	return false
}

// handleWebsocket will handle the websocket connection.
func (g *GraphQLHTTPRequestHandler) handleWebsocket(connInitReqCtx context.Context, conn net.Conn) {
	done := make(chan bool)
	errChan := make(chan error)

	executorPool := subscription.NewExecutorV2Pool(g.engine, connInitReqCtx)
	go HandleWebsocket(done, errChan, conn, executorPool, g.logger)
	select {
	case err := <-errChan:
		g.logger.Error("http.GraphQLHTTPRequestHandler.handleWebsocket()",
			abstractlogger.Error(err),
		)
	case <-done:
	}
}

func (g *GraphQLHTTPRequestHandler) handleHTTP(w http.ResponseWriter, r *http.Request) {
	var err error

	var gqlRequest graphql.Request
	if err = graphql.UnmarshalHttpRequest(r, &gqlRequest); err != nil {
		g.logger.Error("UnmarshalHttpRequest", abstractlogger.Error(err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	isIntrospection, err := gqlRequest.IsIntrospectionQuery()
	if err != nil {
		g.logger.Error("IsIntrospectionQuery", abstractlogger.Error(err))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if isIntrospection {
		if err = g.schema.IntrospectionResponse(w); err != nil {
			g.logger.Error("schema.IsIntrospectionQuery", abstractlogger.Error(err))
			w.WriteHeader(http.StatusInternalServerError)
		}

		return
	}

	buf := bytes.NewBuffer(make([]byte, 0, 4096))
	resultWriter := graphql.NewEngineResultWriterFromBuffer(buf)
	if err = g.engine.Execute(r.Context(), &gqlRequest, &resultWriter); err != nil {
		fmt.Println("error ")
		g.logger.Error("engine.Execute", abstractlogger.Error(err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Add(httpHeaderContentType, httpContentTypeApplicationJson)
	w.WriteHeader(http.StatusOK)
	if _, err = w.Write(buf.Bytes()); err != nil {
		g.logger.Error("write response", abstractlogger.Error(err))
		return
	}
}
