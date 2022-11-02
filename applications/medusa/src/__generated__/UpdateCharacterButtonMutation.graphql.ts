/**
 * @generated SignedSource<<4b833d03f40126ab26dec7992d174905>>
 * @relayHash ac73623f10bc1dacec00da28ad5ab80a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ac73623f10bc1dacec00da28ad5ab80a

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdatePostCharactersInput = {
  characterIds: ReadonlyArray<string>;
  id: string;
};
export type UpdatePostCharacterRequestsInput = {
  characterRequests: ReadonlyArray<CharacterRequestInput>;
  id: string;
};
export type CharacterRequestInput = {
  name: string;
};
export type UpdateCharacterButtonMutation$variables = {
  characterRequestsInput: UpdatePostCharacterRequestsInput;
  charactersInput: UpdatePostCharactersInput;
};
export type UpdateCharacterButtonMutation$data = {
  readonly updatePostCharacterRequests: {
    readonly post: {
      readonly characterRequests: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
      }>;
      readonly id: string;
    } | null;
  } | null;
  readonly updatePostCharacters: {
    readonly post: {
      readonly characters: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly series: {
          readonly title: string;
        } | null;
        readonly slug: string;
      }>;
      readonly id: string;
    } | null;
  } | null;
};
export type UpdateCharacterButtonMutation = {
  response: UpdateCharacterButtonMutation$data;
  variables: UpdateCharacterButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "characterRequestsInput"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "charactersInput"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "charactersInput"
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "input",
      "variableName": "characterRequestsInput"
    }
  ],
  "concreteType": "UpdatePostCharacterRequestsPayload",
  "kind": "LinkedField",
  "name": "updatePostCharacterRequests",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
      "selections": [
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "CharacterRequest",
          "kind": "LinkedField",
          "name": "characterRequests",
          "plural": true,
          "selections": [
            (v3/*: any*/),
            (v4/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
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
    "name": "UpdateCharacterButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdatePostCharactersPayload",
        "kind": "LinkedField",
        "name": "updatePostCharacters",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v7/*: any*/)
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
    "name": "UpdateCharacterButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UpdatePostCharactersPayload",
        "kind": "LinkedField",
        "name": "updatePostCharacters",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      (v7/*: any*/)
    ]
  },
  "params": {
    "id": "ac73623f10bc1dacec00da28ad5ab80a",
    "metadata": {},
    "name": "UpdateCharacterButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "083436d9f10ea92c8e423fa656dc7901";

export default node;
