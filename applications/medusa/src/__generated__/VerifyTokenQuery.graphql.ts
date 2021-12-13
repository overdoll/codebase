/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash e9039055b45a00ad887447d612a44778 */

import { ConcreteRequest } from "relay-runtime";
export type VerifyTokenQueryVariables = {
    token: string;
    secret?: string | null | undefined;
};
export type VerifyTokenQueryResponse = {
    readonly viewAuthenticationToken: {
        readonly verified: boolean;
        readonly sameDevice: boolean;
        readonly location: {
            readonly city: string;
            readonly subdivision: string;
            readonly country: string;
        };
        readonly userAgent: string;
        readonly secure: boolean;
    } | null;
};
export type VerifyTokenQuery = {
    readonly response: VerifyTokenQueryResponse;
    readonly variables: VerifyTokenQueryVariables;
};



/*
query VerifyTokenQuery(
  $token: String!
  $secret: String
) {
  viewAuthenticationToken(token: $token, secret: $secret) {
    verified
    sameDevice
    location {
      city
      subdivision
      country
    }
    userAgent
    secure
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "secret"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "token"
},
v2 = [
  {
    "kind": "Variable",
    "name": "secret",
    "variableName": "secret"
  },
  {
    "kind": "Variable",
    "name": "token",
    "variableName": "token"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "verified",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sameDevice",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Location",
  "kind": "LinkedField",
  "name": "location",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "city",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "subdivision",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "country",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userAgent",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "secure",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "VerifyTokenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "VerifyTokenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "e9039055b45a00ad887447d612a44778",
    "metadata": {},
    "name": "VerifyTokenQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '25d879576cbd9b2b1c79757e070b1848';
export default node;
