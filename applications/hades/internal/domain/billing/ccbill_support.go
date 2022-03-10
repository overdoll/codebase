package billing

import "net/url"

type CCBillSupport struct {
	ccbillSubscriptionId string
	email                string
}

func (c *CCBillSupport) Email() string {
	return c.email
}

func (c *CCBillSupport) SubscriptionId() string {
	return c.ccbillSubscriptionId
}

func (c *CCBillSupport) LookupType() string {
	return "Credit Card"
}

func (c *CCBillSupport) GenerateUrl() string {

	urls, _ := url.Parse("https://support.ccbill.com/index.cgi")

	q := urls.Query()
	//q.Set("Email", c.email)
	q.Set("SubscriptionId", c.ccbillSubscriptionId)
	q.Set("lookupType", "creditcards")

	urls.RawQuery = q.Encode()

	return urls.String()
}
