/**
 * @generated SignedSource<<44945b4fe6e8e0fe64852deea3a09047>>
 * @relayHash 7d5775f4b3324c6ce5dd6d45a25c0768
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7d5775f4b3324c6ce5dd6d45a25c0768

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
export type UpdatePostCharactersModalMutation$variables = {
  input: UpdatePostCharactersInput;
  inputRequests: UpdatePostCharacterRequestsInput;
};
export type UpdatePostCharactersModalMutation$data = {
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
export type UpdatePostCharactersModalMutation = {
  response: UpdatePostCharactersModalMutation$data;
  variables: UpdatePostCharactersModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "inputRequests"
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
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "input",
      "variableName": "inputRequests"
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
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "CharacterRequest",
          "kind": "LinkedField",
          "name": "characterRequests",
          "plural": true,
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdatePostCharactersModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/)
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
        ],
        "storageKey": null
      },
      (v6/*: any*/)
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdatePostCharactersModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Series",
                    "kind": "LinkedField",
                    "name": "series",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/)
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
        ],
        "storageKey": null
      },
      (v6/*: any*/)
    ]
  },
  "params": {
    "id": "7d5775f4b3324c6ce5dd6d45a25c0768",
    "metadata": {},
    "name": "UpdatePostCharactersModalMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a211a50ae6d2115f632fdb8088868ad0";

export default node;
