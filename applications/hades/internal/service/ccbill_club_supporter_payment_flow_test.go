package service_test

import (
	"context"
	"github.com/PuerkitoBio/goquery"
	"github.com/shurcooL/graphql"
	"github.com/stretchr/testify/require"
	"net/http"
	"net/url"
	"os"
	"overdoll/applications/hades/internal/ports/graphql/types"
	"overdoll/libraries/graphql/relay"
	"overdoll/libraries/uuid"
	"testing"
)

type GenerateCCBillClubSupporterPaymentLink struct {
	GenerateCCBillClubSupporterPaymentLink *types.GenerateCCBillClubSupporterPaymentLinkPayload `graphql:"generateCCBillClubSupporterPaymentLink(input: $input)"`
}

type CCBillTransactionDetails struct {
	CCBillTransactionDetails *struct {
		Approved     bool
		DeclineError *types.CCBillDeclineError
		DeclineCode  *string
		DeclineText  *string
	} `graphql:"ccbillTransactionDetails(token: $token)"`
}

func TestCCBillClubSupporterPaymentFlow(t *testing.T) {
	t.Parallel()

	accountId := uuid.New().String()

	httpClient := http.Client{}

	// initialize gql client and make sure all the above variables exist
	gqlClient := getGraphqlClientWithAuthenticatedAccount(t, accountId)

	var generateCCBillClubSupporterPayment GenerateCCBillClubSupporterPaymentLink

	err := gqlClient.Mutate(context.Background(), &generateCCBillClubSupporterPayment, map[string]interface{}{
		"input": types.GenerateCCBillClubSupporterPaymentLinkInput{
			ClubID:                     relay.NewID(types.Club{}, uuid.New().String()),
			Currency:                   types.CurrencyUsd,
			SavePaymentDetailsForLater: false,
		},
	})

	require.NoError(t, err, "no error generating a ccbill club supporter payment link")

	urls := generateCCBillClubSupporterPayment.GenerateCCBillClubSupporterPaymentLink.PaymentLink.String()

	parsedUrl, err := url.Parse(urls)
	require.NoError(t, err, "no error parsing url")

	require.Equal(t, os.Getenv("APP_URL")+"/api/ccbill/payment-flow", parsedUrl.Path, "expected to have proper path")

	queryParameterPaymentToken := parsedUrl.Query().Get("overdollPaymentToken")
	require.NotEmptyf(t, queryParameterPaymentToken, "token should not be empty")

	// construct request to our local one because we run a local http server
	req, err := http.NewRequest("GET", HadesHttpCCBillPaymentFlowAddr+"?token="+queryParameterPaymentToken, nil)
	require.NoError(t, err, "no error creating a new request")

	res, err := httpClient.Do(req)
	require.NoError(t, err, "no error doing payment flow call")

	require.Equal(t, os.Getenv("CCBILL_FLEXFORMS_URL"), res.Request.URL.Path, "we are on a flexforms URL")
	require.Equal(t, 200, res.StatusCode, "200 response indicates we got a correct ccbill url")

	// now, do a callback for failed - build url
	callbackFailedAddressUrl, err := url.Parse(HadesHttpCCBillPaymentFlowCallbackAddr)
	require.NoError(t, err, "no error generating payment callback url")
	callbackFailedAddressUrl.Query().Add("ccbillDenialId", "0222056501000243638")
	callbackFailedAddressUrl.Query().Add("ccbillResponseDigest", "1962d623384d4cc4c04817c62def2e25")
	callbackFailedAddressUrl.Query().Add("ccbillDeclineCode", "BE-111")
	callbackFailedAddressUrl.Query().Add("ccbillSubscriptionId", "")
	callbackFailedAddressUrl.Query().Add("ccbillDeclineReason", "Timeout")
	callbackFailedAddressUrl.Query().Add("overdollPaymentToken", queryParameterPaymentToken)

	// construct request to our local one because we run a local http server
	callbackFailedReq, err := http.NewRequest("GET", callbackFailedAddressUrl.String(), nil)
	require.NoError(t, err, "no error creating a new callback failed request")

	callbackFailedResponse, err := httpClient.Do(callbackFailedReq)
	require.NoError(t, err, "no error doing error callback")

	require.Equal(t, 200, callbackFailedResponse.StatusCode, "200 response indicates we got a confirmed response")

	callbackFailedDocument, err := goquery.NewDocumentFromReader(callbackFailedResponse.Body)
	require.NoError(t, err, "no error for parsing html document failed response")

	callbackFailedToken := getTokenResponseFromDocument(callbackFailedDocument)

	ccbillTransactionDetailsFailure := getTransactionDetails(t, gqlClient, callbackFailedToken)

	require.False(t, ccbillTransactionDetailsFailure.CCBillTransactionDetails.Approved, "should not be approved")
	require.Equal(t, "BE-111", ccbillTransactionDetailsFailure.CCBillTransactionDetails.DeclineCode, "correct decline code")
	require.Equal(t, "Timeout", ccbillTransactionDetailsFailure.CCBillTransactionDetails.DeclineText, "correct decline text")
	require.Equal(t, types.CCBillDeclineErrorGeneralSystemError, ccbillTransactionDetailsFailure.CCBillTransactionDetails.DeclineError, "correct decline reason")

	// now, do a success callback
	callbackSuccessAddressUrl, err := url.Parse(HadesHttpCCBillPaymentFlowCallbackAddr)
	require.NoError(t, err, "no error generating payment callback url")
	callbackSuccessAddressUrl.Query().Add("ccbillDenialId", "")
	callbackSuccessAddressUrl.Query().Add("ccbillResponseDigest", "1962d623384d4cc4c04817c62def2e25")
	callbackSuccessAddressUrl.Query().Add("ccbillDeclineCode", "")
	callbackSuccessAddressUrl.Query().Add("ccbillSubscriptionId", "222059101000249429")
	callbackSuccessAddressUrl.Query().Add("ccbillDeclineReason", "")
	callbackSuccessAddressUrl.Query().Add("overdollPaymentToken", queryParameterPaymentToken)

	callbackSuccessReq, err := http.NewRequest("GET", callbackSuccessAddressUrl.String(), nil)
	require.NoError(t, err, "no error creating a new callback failed request")

	callbackSuccessResponse, err := httpClient.Do(callbackSuccessReq)
	require.NoError(t, err, "no error doing error callback")

	require.Equal(t, 200, callbackFailedResponse.StatusCode, "200 response indicates we got a confirmed response")

	callbackSuccessDocument, err := goquery.NewDocumentFromReader(callbackSuccessResponse.Body)
	require.NoError(t, err, "no error for parsing html document success response")

	callbackSuccessToken := getTokenResponseFromDocument(callbackSuccessDocument)

	ccbillTransactionDetailsSuccess := getTransactionDetails(t, gqlClient, callbackSuccessToken)

	require.Nil(t, ccbillTransactionDetailsSuccess.CCBillTransactionDetails.DeclineCode, "no error")
	require.True(t, ccbillTransactionDetailsFailure.CCBillTransactionDetails.Approved, "should be approved")
	require.Nil(t, ccbillTransactionDetailsSuccess.CCBillTransactionDetails.DeclineText, "no decline text")
	require.Nil(t, ccbillTransactionDetailsFailure.CCBillTransactionDetails.DeclineError, "no decline reason")

}

func getTokenResponseFromDocument(doc *goquery.Document) string {

	var token string

	doc.Find("meta").Each(func(i int, s *goquery.Selection) {
		if name, _ := s.Attr("name"); name == "overdoll-ccbill-flexforms-payment-flow-token" {
			token, _ = s.Attr("content")
		}
	})

	return token
}

func getTransactionDetails(t *testing.T, gqlClient *graphql.Client, token string) CCBillTransactionDetails {
	var ccbillTransactionDetailsFailure CCBillTransactionDetails

	err := gqlClient.Query(context.Background(), &ccbillTransactionDetailsFailure, map[string]interface{}{
		"token": graphql.String(token),
	})

	require.NoError(t, err, "no error grabbing transaction details token")
	require.NotNil(t, ccbillTransactionDetailsFailure.CCBillTransactionDetails, "transaction details exists")

	return ccbillTransactionDetailsFailure
}
