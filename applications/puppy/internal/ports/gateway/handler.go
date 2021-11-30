package gateway

import (
	"bytes"
	"context"
	"github.com/gorilla/sessions"
	"github.com/jensneuse/abstractlogger"
	"github.com/jensneuse/graphql-go-tools/pkg/subscription"
	"net"
	"net/http"
	"overdoll/libraries/passport"

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
	store sessions.Store,

) http.Handler {

	upgrader := &ws.DefaultHTTPUpgrader
	upgrader.Header = http.Header{}
	upgrader.Header.Add("Sec-Websocket-Protocol", "graphql-ws")

	return &GraphQLHTTPRequestHandler{
		schema:     schema,
		store:      store,
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
	store      sessions.Store
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

	// here, we do some passport logic
	// read it from our session store.
	// if there is a passport, add it to the request to be sent downstream to other services
	// also adds the current session ID to the passport so it can be used downstream
	if err := passport.AddToRequestFromSessionStore(r, g.store); err != nil {
		g.logger.Error("passport.Append", abstractlogger.Error(err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var gqlRequest graphql.Request
	if err := graphql.UnmarshalHttpRequest(r, &gqlRequest); err != nil {
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
	if err = g.engine.Execute(r.Context(), &gqlRequest, &resultWriter, graphql.WithAfterFetchHook(passport.NewAfterFetchHook(r, w, g.store, g.logger))); err != nil {
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
