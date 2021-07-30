/**
 * @flow
 * @relayHash 6a347d4a552aca6514c786c15ed7f55d
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { JoinFragment$ref } from "./JoinFragment.graphql";
import type { JoinRootFragment$ref } from "./JoinRootFragment.graphql";
import type { LobbyFragment$ref } from "./LobbyFragment.graphql";
import type { TokenFragment$ref } from "./TokenFragment.graphql";
export type JoinRootQueryVariables = {|
  token?: ?string
|};
export type JoinRootQueryResponse = {|
  +viewAuthenticationToken: ?{|
    +$fragmentRefs: JoinFragment$ref & TokenFragment$ref & LobbyFragment$ref & JoinRootFragment$ref
  |}
|};
export type JoinRootQuery = {|
  variables: JoinRootQueryVariables,
  response: JoinRootQueryResponse,
|};


/*
query JoinRootQuery(
  $token: String
) {
  viewAuthenticationToken(token: $token) {
    ...JoinFragment
    ...TokenFragment
    ...LobbyFragment
    ...JoinRootFragment
  }
}

fragment JoinFragment on AuthenticationToken {
  email
}

fragment JoinRootFragment on AuthenticationToken {
  verified
  sameSession
  accountStatus {
    registered
  }
}

fragment LobbyFragment on AuthenticationToken {
  email
}

fragment TokenFragment on AuthenticationToken {
  verified
  device
  location
  secure
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "token",
    "variableName": "token"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JoinRootQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TokenFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LobbyFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinRootFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JoinRootQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
        "plural": false,
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
            "name": "verified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "device",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "location",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "secure",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sameSession",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationTokenAccountStatus",
            "kind": "LinkedField",
            "name": "accountStatus",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "registered",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "6a347d4a552aca6514c786c15ed7f55d",
    "metadata": {},
    "name": "JoinRootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '12634b21a3f64b64fa6f93b348997adf';
module.exports = node;
