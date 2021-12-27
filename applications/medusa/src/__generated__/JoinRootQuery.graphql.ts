/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash b9a9f9a603e985afc8ffb99a6f646732 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type JoinRootQueryVariables = {
    token: string;
};
export type JoinRootQueryResponse = {
    readonly viewAuthenticationToken: {
        readonly verified: boolean;
        readonly token: string;
        readonly sameDevice: boolean;
        readonly accountStatus: {
            readonly registered: boolean;
            readonly multiFactor: {
                readonly totp: boolean;
            } | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"LobbyFragment" | "JoinFragment" | "RegisterFragment" | "MultiFactorFragment" | "GrantFragment">;
    } | null;
};
export type JoinRootQuery = {
    readonly response: JoinRootQueryResponse;
    readonly variables: JoinRootQueryVariables;
};



/*
query JoinRootQuery(
  $token: String!
) {
  viewAuthenticationToken(token: $token) {
    ...LobbyFragment
    ...RegisterFragment
    ...MultiFactorFragment
    ...GrantFragment
    verified
    token
    sameDevice
    accountStatus {
      registered
      multiFactor {
        totp
      }
    }
    id
  }
}

fragment GrantFragment on AuthenticationToken {
  id
  token
}

fragment LobbyFragment on AuthenticationToken {
  id
}

fragment MultiFactorFragment on AuthenticationToken {
  accountStatus {
    multiFactor {
      totp
    }
  }
  ...TotpSubmissionFragment
  ...RecoveryCodeFragment
}

fragment RecoveryCodeFragment on AuthenticationToken {
  token
}

fragment RegisterFragment on AuthenticationToken {
  id
  token
}

fragment TotpSubmissionFragment on AuthenticationToken {
  token
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "verified",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "token",
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
  "kind": "ScalarField",
  "name": "registered",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "MultiFactor",
  "kind": "LinkedField",
  "name": "multiFactor",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totp",
      "storageKey": null
    }
  ],
  "storageKey": null
};
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationTokenAccountStatus",
            "kind": "LinkedField",
            "name": "accountStatus",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LobbyFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RegisterFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MultiFactorFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GrantFragment"
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
            "name": "id",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationTokenAccountStatus",
            "kind": "LinkedField",
            "name": "accountStatus",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/),
          (v4/*: any*/),
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "b9a9f9a603e985afc8ffb99a6f646732",
    "metadata": {},
    "name": "JoinRootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'b6ab2a575167d026647e2fa71de653c0';
export default node;
