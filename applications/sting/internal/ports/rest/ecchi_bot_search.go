package rest

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"overdoll/applications/sting/internal/app"
	"overdoll/applications/sting/internal/app/query"
	"overdoll/applications/sting/internal/domain/club"
	"overdoll/libraries/links"
	"overdoll/libraries/sentry_support"
)

type EcchiSearchResult struct {
	Id   string `json:"id"`
	Link string `json:"link"`
}

func GetEcchiSearch(app *app.Application) func(*gin.Context) {
	return func(c *gin.Context) {

		ctx := c.Request.Context()

		seed := c.Query("seed")

		results, err := app.Queries.EcchiSearch.Handle(ctx, query.EcchiSearch{
			Query: c.Query("query"),
			Seed:  &seed,
		})

		if err != nil {
			sentry_support.CaptureException(ctx, err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		var clubIds []string
		var ecchiResults []*EcchiSearchResult

		for _, result := range results {
			clubIds = append(clubIds, result.ClubId())
		}

		clubs, err := app.Queries.ClubsByIds.Handle(ctx, query.ClubsByIds{ClubIds: clubIds})

		if err != nil {
			sentry_support.CaptureException(ctx, err)
			c.AbortWithStatus(http.StatusInternalServerError)
			return
		}

		for _, result := range results {

			var clb *club.Club

			for _, targetClub := range clubs {
				if targetClub.ID() == result.ClubId() {
					clb = targetClub
					break
				}
			}

			if clb == nil {
				continue
			}

			link, err := links.CreateViewPostUrl(clb.Slug(), result.ID())

			if err != nil {
				sentry_support.CaptureException(ctx, err)
				c.AbortWithStatus(http.StatusInternalServerError)
				return
			}

			ecchiResults = append(ecchiResults, &EcchiSearchResult{
				Id:   result.ID(),
				Link: link.String(),
			})
		}

		if len(ecchiResults) == 0 {
			c.JSON(http.StatusOK, gin.H{
				"data": []string{},
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": ecchiResults,
		})
	}
}
