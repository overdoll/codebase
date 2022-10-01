/**
 * @generated SignedSource<<09d8f7aa3a74aa0727f1e3c4a282038c>>
 * @relayHash 4abe129ee2395539e77f71f24f8a1259
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4abe129ee2395539e77f71f24f8a1259

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GrantAuthenticationTokenInput = {
  email: string;
};
export type EmptyJoinMutation$variables = {
  input: GrantAuthenticationTokenInput;
};
export type EmptyJoinMutation$data = {
  readonly grantAuthenticationToken: {
    readonly authenticationToken: {
      readonly email: string | null;
      readonly id: string;
      readonly sameDevice: boolean;
      readonly token: string;
      readonly " $fragmentSpreads": FragmentRefs<"ViewAuthenticationTokenJoinFragment">;
    } | null;
  } | null;
};
export type EmptyJoinMutation = {
  response: EmptyJoinMutation$data;
  variables: EmptyJoinMutation$variables;
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
  "name": "id",
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EmptyJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAuthenticationToken",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationToken",
            "kind": "LinkedField",
            "name": "authenticationToken",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ViewAuthenticationTokenJoinFragment"
              },
              (v5/*: any*/)
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
    "name": "EmptyJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAuthenticationToken",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationToken",
            "kind": "LinkedField",
            "name": "authenticationToken",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
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
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "4abe129ee2395539e77f71f24f8a1259",
    "metadata": {},
    "name": "EmptyJoinMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "7739672a752490057c8e97dff3925812";

export default node;
