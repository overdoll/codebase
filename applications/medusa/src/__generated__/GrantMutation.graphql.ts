/**
 * @generated SignedSource<<63258e6d23ba73aaf679f0544ce4515a>>
 * @relayHash 6b5fe8de7b2e5bc0d83657d996b0b531
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6b5fe8de7b2e5bc0d83657d996b0b531

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenValidation = "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenInput = {
  token: string;
};
export type GrantMutation$variables = {
  input: GrantAccountAccessWithAuthenticationTokenInput;
};
export type GrantMutationVariables = GrantMutation$variables;
export type GrantMutation$data = {
  readonly grantAccountAccessWithAuthenticationToken: {
    readonly validation: GrantAccountAccessWithAuthenticationTokenValidation | null;
    readonly account: {
      readonly id: string;
      readonly username: string;
      readonly avatar: {
        readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment" | "ResourceItemFragment">;
      } | null;
    } | null;
  } | null;
};
export type GrantMutationResponse = GrantMutation$data;
export type GrantMutation = {
  variables: GrantMutationVariables;
  response: GrantMutation$data;
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GrantMutation",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "avatar",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ResourceIconFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ResourceItemFragment"
                  }
                ],
                "storageKey": null
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
    "name": "GrantMutation",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "avatar",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceUrl",
                    "kind": "LinkedField",
                    "name": "urls",
                    "plural": true,
                    "selections": [
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mimeType",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceUrl",
                    "kind": "LinkedField",
                    "name": "videoThumbnail",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "processed",
                    "storageKey": null
                  },
                  (v3/*: any*/)
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
    "id": "6b5fe8de7b2e5bc0d83657d996b0b531",
    "metadata": {},
    "name": "GrantMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e9362e4fe626132937417a45a358d2f9";

export default node;
