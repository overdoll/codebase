/**
 * @generated SignedSource<<cc17acae396852da9efb9f29f0e44b7e>>
 * @relayHash bfbd21f33a9e3e96c00f46ef9cdb0a73
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID bfbd21f33a9e3e96c00f46ef9cdb0a73

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenValidation = "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenInput = {
  token: string;
};
export type GrantAuthenticationTokenJoinMutation$variables = {
  input: GrantAccountAccessWithAuthenticationTokenInput;
};
export type GrantAuthenticationTokenJoinMutation$data = {
  readonly grantAccountAccessWithAuthenticationToken: {
    readonly account: {
      readonly deleting: {
        readonly __typename: "AccountDeleting";
      } | null;
      readonly id: string;
      readonly isArtist: boolean;
      readonly isModerator: boolean;
      readonly isStaff: boolean;
      readonly isWorker: boolean;
      readonly lock: {
        readonly __typename: "AccountLock";
      } | null;
      readonly reference: string;
      readonly username: string;
      readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
    } | null;
    readonly revokedAuthenticationTokenId: string;
    readonly validation: GrantAccountAccessWithAuthenticationTokenValidation | null;
  } | null;
};
export type GrantAuthenticationTokenJoinMutation = {
  response: GrantAuthenticationTokenJoinMutation$data;
  variables: GrantAuthenticationTokenJoinMutation$variables;
};

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
  "kind": "ScalarField",
  "name": "validation",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "revokedAuthenticationTokenId",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
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
  "name": "isStaff",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isWorker",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isArtist",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v12 = [
  (v11/*: any*/)
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountDeleting",
  "kind": "LinkedField",
  "name": "deleting",
  "plural": false,
  "selections": (v12/*: any*/),
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountLock",
  "kind": "LinkedField",
  "name": "lock",
  "plural": false,
  "selections": (v12/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GrantAuthenticationTokenJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAccountAccessWithAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AccountIconFragment"
              }
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
    "name": "GrantAuthenticationTokenJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAccountAccessWithAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v13/*: any*/),
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "avatar",
                "plural": false,
                "selections": [
                  (v11/*: any*/),
                  (v4/*: any*/)
                ],
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
    "id": "bfbd21f33a9e3e96c00f46ef9cdb0a73",
    "metadata": {},
    "name": "GrantAuthenticationTokenJoinMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "08cb738c438d84f305767c71f221d3f2";

export default node;
