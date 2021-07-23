/**
 * @flow
 * @relayHash 56027daea69761bfeba11ec29b5fd4f9
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AccountEmailStatusEnum = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
export type ProfileSettingsQueryVariables = {||};
export type ProfileSettingsQueryResponse = {|
  +accountSettings: {|
    +accountId: string,
    +general: {|
      +emails: $ReadOnlyArray<{|
        +email: string,
        +status: AccountEmailStatusEnum,
      |}>,
      +usernames: $ReadOnlyArray<{|
        +username: string
      |}>,
    |},
  |},
  +authenticatedAccount: ?{|
    +username: string
  |},
|};
export type ProfileSettingsQuery = {|
  variables: ProfileSettingsQueryVariables,
  response: ProfileSettingsQueryResponse,
|};


/*
query ProfileSettingsQuery {
  accountSettings {
    accountId
    general {
      emails {
        email
        status
      }
      usernames {
        username
      }
    }
  }
  authenticatedAccount {
    username
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "AccountSettings",
    "kind": "LinkedField",
    "name": "accountSettings",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accountId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountGeneralSettings",
        "kind": "LinkedField",
        "name": "general",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountEmail",
            "kind": "LinkedField",
            "name": "emails",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountUsername",
            "kind": "LinkedField",
            "name": "usernames",
            "plural": true,
            "selections": (v0/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "Account",
    "kind": "LinkedField",
    "name": "authenticatedAccount",
    "plural": false,
    "selections": (v0/*: any*/),
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileSettingsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProfileSettingsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "56027daea69761bfeba11ec29b5fd4f9",
    "metadata": {},
    "name": "ProfileSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'e8630eb729855fe77bfdaa18e1a37dfc';
module.exports = node;
