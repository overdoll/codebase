package adapters

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"encoding/xml"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"overdoll/applications/ringer/internal/domain/paxum"
	"strconv"
	"strings"
)

type PaxumHttpClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type PaxumHttpCassandraRepository struct {
	client PaxumHttpClient
}

// NewPaxumHttpCassandraRepository https://www.paxum.com/developers/api-documentation/api/ docs
func NewPaxumHttpCassandraRepository(client PaxumHttpClient) PaxumHttpCassandraRepository {
	return PaxumHttpCassandraRepository{client: client}
}

func addSandboxDataToRequest(q url.Values) url.Values {
	if os.Getenv("PAXUM_SANDBOX") == "true" {
		q.Add("sandbox", "ON")
		q.Add("return", "00")
	}
	return q
}

type transferFundsResponse struct {
	XMLName             xml.Name `xml:"Response"`
	ResponseCode        string   `xml:"ResponseCode"`
	ResponseDescription string   `xml:"ResponseDescription"`
}

func (r PaxumHttpCassandraRepository) TransferFunds(ctx context.Context, transfer *paxum.Transfer) (*string, error) {

	// add sandbox data if this is a sandbox request
	q := addSandboxDataToRequest(url.Values{})

	formattedAmount := strconv.FormatFloat(transfer.Amount(), 'f', 2, 64)
	payoutNote := transfer.Note()

	q.Add("method", "transferFunds")
	q.Add("fromEmail", os.Getenv("PAXUM_FROM_EMAIL"))
	q.Add("toEmail", transfer.Email())
	q.Add("amount", formattedAmount)
	q.Add("currency", transfer.Currency())
	q.Add("firstName", transfer.FirstName())
	q.Add("lastName", transfer.LastName())
	q.Add("reference", transfer.PayoutId())
	q.Add("note", payoutNote)

	payoutBuilder := md5.New()
	payoutBuilder.Write([]byte(os.Getenv("PAXUM_SHARED_SECRET")))
	payoutBuilder.Write([]byte(transfer.Email()))
	payoutBuilder.Write([]byte(formattedAmount))
	payoutBuilder.Write([]byte(transfer.Currency()))
	payoutBuilder.Write([]byte(payoutNote))
	payoutBuilder.Write([]byte(transfer.FirstName()))
	payoutBuilder.Write([]byte(transfer.LastName()))
	payoutBuilder.Write([]byte(transfer.PayoutId()))

	// add our encryption key from Paxum
	q.Add("key", hex.EncodeToString(payoutBuilder.Sum(nil)[:]))

	req, err := http.NewRequest("POST", "https://secure.paxum.com/payment/api/paymentAPI.php", strings.NewReader(q.Encode()))

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	if err != nil {
		return nil, err
	}

	resp, err := r.client.Do(req)

	if err != nil {
		return nil, err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result transferFundsResponse

	if err := xml.Unmarshal(body, &result); err != nil {
		return nil, fmt.Errorf("failed to unmarshal xml: %s", err)
	}

	// non-successful response, send back an error
	if result.ResponseCode != "00" {
		s := fmt.Sprintf("paxum server error for payout. code #%s. response: ", result.ResponseCode) + result.ResponseDescription
		return &s, nil
	}

	// successful response, return nothing
	return nil, nil
}
