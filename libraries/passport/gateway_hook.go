package passport

import (
	"fmt"
	"github.com/gorilla/sessions"
	"github.com/jensneuse/abstractlogger"
	"github.com/jensneuse/graphql-go-tools/pkg/engine/resolve"
	"net/http"
)

type fetchData struct {
	PassportString string `json:"passport"`
}

type AfterFetchHook struct {
	store  sessions.Store
	r      *http.Request
	w      http.ResponseWriter
	logger abstractlogger.Logger
}

func NewAfterFetchHook(r *http.Request, w http.ResponseWriter, store sessions.Store, logger abstractlogger.Logger) AfterFetchHook {
	return AfterFetchHook{store: store, r: r, w: w, logger: logger}
}

// this hook will grab any new passport data and pass it on
func (a AfterFetchHook) OnData(ctx resolve.HookContext, output []byte, singleFlight bool) {
	fmt.Println(string(output))

	//var payloadData *fetchData
	//
	//if err := json.Unmarshal(output, &payloadData); err != nil {
	//	a.logger.Error("passport.Unmarshal", abstractlogger.Error(err))
	//	return
	//}
	//
	//// no passport string, dont do anything
	//if payloadData.PassportString == "" {
	//	return
	//}
	//
	//pass := FromString(payloadData.PassportString)
	//
	//session, err := a.store.Get(a.r, "session")
	//
	//if err != nil {
	//	a.logger.Error("session.Get", abstractlogger.Error(err))
	//	return
	//}
	//
	//session.Values["passport"] = pass
	//
	//if err := session.Save(a.r, a.w); err != nil {
	//	a.logger.Error("session.Save", abstractlogger.Error(err))
	//	return
	//}
}

func (a AfterFetchHook) OnError(ctx resolve.HookContext, output []byte, singleFlight bool) {}

// helpers for passport to deal with session stores
func AddToRequestFromSessionStore(r *http.Request, store sessions.Store) error {

	session, err := store.Get(r, "session")

	if err != nil {
		return err
	}

	// new sessions obviously don't have a passport
	if session.IsNew {
		return nil
	}

	if val, ok := session.Values["passport"]; ok {

		passResult := FromString(val.(string))
		passResult.setSessionId(session.ID)

		if err := AddToRequest(r, passResult); err != nil {
			return err
		}
	}

	return nil
}
