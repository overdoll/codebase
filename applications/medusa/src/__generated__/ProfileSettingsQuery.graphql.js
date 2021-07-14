/**
 * @flow
 * @relayHash eb650c16a159b6ed8659f08df8a1248f
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
  +authentication: ?{|
    +account: ?{|
      +username: string
    |}
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
  authentication {
    account {
      username
    }
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
    "concreteType": "Authentication",
    "kind": "LinkedField",
    "name": "authentication",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": (v0/*: any*/),
        "storageKey": null
      }
    ],
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
    "id": "eb650c16a159b6ed8659f08df8a1248f",
    "metadata": {},
    "name": "ProfileSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'dd44c40556bff1d930b4b2bf7e165497';
module.exports = node;
