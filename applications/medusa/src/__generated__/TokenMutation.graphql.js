/**
 * @flow
 * @relayHash 53df926c95714e3cf000ae3be5dc0c9d
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AccountLockReason = "PostInfraction" | "%future added value";
export type MultiFactorType = "TOTP" | "%future added value";
export type VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput = {|
  authenticationTokenId: string
|};
export type TokenMutationVariables = {|
  input: VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput
|};
export type TokenMutationResponse = {|
  +verifyAuthenticationTokenAndAttemptAccountAccessGrant: ?{|
    +authenticationToken: ?{|
      +verified: boolean,
      +email: string,
      +session: string,
      +sameSession: boolean,
      +accountStatus: ?{|
        +registered: boolean,
        +authenticated: boolean,
        +multiFactor: ?$ReadOnlyArray<MultiFactorType>,
      |},
    |},
    +account: ?{|
      +username: string,
      +isStaff: boolean,
      +isArtist: boolean,
      +isModerator: boolean,
      +avatar: any,
      +lock: ?{|
        +reason: AccountLockReason,
        +expires: number,
      |},
    |},
  |}
|};
export type TokenMutation = {|
  variables: TokenMutationVariables,
  response: TokenMutationResponse,
|};


/*
mutation TokenMutation(
  $input: VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput!
) {
  verifyAuthenticationTokenAndAttemptAccountAccessGrant(input: $input) {
    authenticationToken {
      verified
      email
      session
      sameSession
      accountStatus {
        registered
        authenticated
        multiFactor
      }
    }
    account {
      username
      isStaff
      isArtist
      isModerator
      avatar
      lock {
        reason
        expires
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "AuthenticationToken",
  "kind": "LinkedField",
  "name": "authenticationToken",
  "plural": false,
  "selections": [
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
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "session",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "authenticated",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "multiFactor",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isStaff",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isArtist",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isModerator",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatar",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountLock",
  "kind": "LinkedField",
  "name": "lock",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reason",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "expires",
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
    "name": "TokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload",
        "kind": "LinkedField",
        "name": "verifyAuthenticationTokenAndAttemptAccountAccessGrant",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload",
        "kind": "LinkedField",
        "name": "verifyAuthenticationTokenAndAttemptAccountAccessGrant",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "53df926c95714e3cf000ae3be5dc0c9d",
    "metadata": {},
    "name": "TokenMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'd9d5b030112fcb5943a7ce7c511bea93';
module.exports = node;
