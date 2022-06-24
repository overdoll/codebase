/**
 * @generated SignedSource<<07484e17e6ef28206d4fc5cf01da92d8>>
 * @relayHash fa7344770216d9d966352df15e03aabc
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fa7344770216d9d966352df15e03aabc

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateCharacterValidation = "SLUG_TAKEN" | "%future added value";
export type CreateCharacterInput = {
  name: string;
  seriesId: string;
  slug: string;
};
export type CreateCharacterFormMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateCharacterInput;
};
export type CreateCharacterFormMutation$data = {
  readonly createCharacter: {
    readonly character: {
      readonly id: string;
      readonly name: string;
      readonly slug: string;
    } | null;
    readonly validation: CreateCharacterValidation | null;
  } | null;
};
export type CreateCharacterFormMutation = {
  response: CreateCharacterFormMutation$data;
  variables: CreateCharacterFormMutation$variables;
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
  "concreteType": "Character",
  "kind": "LinkedField",
  "name": "character",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
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
    "name": "CreateCharacterFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateCharacterPayload",
        "kind": "LinkedField",
        "name": "createCharacter",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/)
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
    "name": "CreateCharacterFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateCharacterPayload",
        "kind": "LinkedField",
        "name": "createCharacter",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "character",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "createCharacterEdge"
              }
            ]
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "fa7344770216d9d966352df15e03aabc",
    "metadata": {},
    "name": "CreateCharacterFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "c35b54582f035fffd4b7f3afc6d17d96";

export default node;
