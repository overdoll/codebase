/**
 * @generated SignedSource<<8b7ae9d3f32c0faca1232eb088170e26>>
 * @relayHash 74b60af6ff7abe2e65d9e1ba5d359ded
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 74b60af6ff7abe2e65d9e1ba5d359ded

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateClubValidation = "SLUG_TAKEN" | "%future added value";
export type CreateClubInput = {
  name: string;
  slug: string;
};
export type CreateClubFormMutation$variables = {
  input: CreateClubInput;
  connections: ReadonlyArray<string>;
};
export type CreateClubFormMutationVariables = CreateClubFormMutation$variables;
export type CreateClubFormMutation$data = {
  readonly createClub: {
    readonly club: {
      readonly id: string;
      readonly slug: string;
      readonly name: string;
      readonly owner: {
        readonly id: string;
      };
    } | null;
    readonly validation: CreateClubValidation | null;
  } | null;
};
export type CreateClubFormMutationResponse = CreateClubFormMutation$data;
export type CreateClubFormMutation = {
  variables: CreateClubFormMutationVariables;
  response: CreateClubFormMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
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
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "owner",
      "plural": false,
      "selections": [
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validation",
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
    "name": "CreateClubFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateClubPayload",
        "kind": "LinkedField",
        "name": "createClub",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateClubFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateClubPayload",
        "kind": "LinkedField",
        "name": "createClub",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "club",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "createClubPrimaryEdge"
              }
            ]
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "74b60af6ff7abe2e65d9e1ba5d359ded",
    "metadata": {},
    "name": "CreateClubFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "33855a7d8a07256d44cdffbcea7321fc";

export default node;
