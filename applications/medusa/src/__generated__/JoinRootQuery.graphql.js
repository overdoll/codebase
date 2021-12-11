/**
 * @flow
 * @relayHash a700502a60f6b8e09862f257b9816e58
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { GrantFragment$ref } from "./GrantFragment.graphql";
import type { JoinFragment$ref } from "./JoinFragment.graphql";
import type { JoinRootFragment$ref } from "./JoinRootFragment.graphql";
import type { LobbyFragment$ref } from "./LobbyFragment.graphql";
import type { MultiFactorFragment$ref } from "./MultiFactorFragment.graphql";
import type { RegisterFragment$ref } from "./RegisterFragment.graphql";
import type { TotpAuthenticationFragment$ref } from "./TotpAuthenticationFragment.graphql";
export type JoinRootQueryVariables = {|
  token: string
|};
export type JoinRootQueryResponse = {|
  +viewAuthenticationToken: ?{|
    +$fragmentRefs: LobbyFragment$ref & JoinRootFragment$ref & JoinFragment$ref & RegisterFragment$ref & MultiFactorFragment$ref & GrantFragment$ref & TotpAuthenticationFragment$ref
  |}
|};
export type JoinRootQuery = {|
  variables: JoinRootQueryVariables,
  response: JoinRootQueryResponse,
|};


/*
query JoinRootQuery(
  $token: String!
) {
  viewAuthenticationToken(token: $token) {
    ...LobbyFragment
    ...JoinRootFragment
    ...RegisterFragment
    ...MultiFactorFragment
    ...GrantFragment
    ...TotpAuthenticationFragment
    id
  }
}

fragment GrantFragment on AuthenticationToken {
  id
  token
}

fragment JoinRootFragment on AuthenticationToken {
  verified
  token
  sameDevice
  accountStatus {
    registered
    multiFactor {
      totp
    }
  }
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
}

fragment RegisterFragment on AuthenticationToken {
  id
  token
}

fragment TotpAuthenticationFragment on AuthenticationToken {
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
            "name": "LobbyFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinRootFragment"
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
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TotpAuthenticationFragment"
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
            "name": "token",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sameDevice",
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
              },
              {
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
              }
            ],
            "storageKey": null
          },
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
    "id": "a700502a60f6b8e09862f257b9816e58",
    "metadata": {},
    "name": "JoinRootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '2881dee4ce33d29801e9be80d03cbccb';
module.exports = node;
