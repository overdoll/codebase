/**
 * @generated SignedSource<<f616ae0adff7556eb88b049199e39800>>
 * @relayHash d4fa142f35ebf6263643b7e8b4750012
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID d4fa142f35ebf6263643b7e8b4750012

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateCancellationReasonTitleInput = {
  cancellationReasonId: string;
  locale: string;
  title: string;
};
export type ChangeCancellationReasonTitleFormMutation$variables = {
  input: UpdateCancellationReasonTitleInput;
};
export type ChangeCancellationReasonTitleFormMutation$data = {
  readonly updateCancellationReasonTitle: {
    readonly cancellationReason: {
      readonly id: string;
      readonly title: string;
      readonly titleTranslations: ReadonlyArray<{
        readonly language: {
          readonly locale: string;
          readonly name: string;
        };
        readonly text: string;
      }>;
    } | null;
  } | null;
};
export type ChangeCancellationReasonTitleFormMutation = {
  response: ChangeCancellationReasonTitleFormMutation$data;
  variables: ChangeCancellationReasonTitleFormMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateCancellationReasonTitlePayload",
    "kind": "LinkedField",
    "name": "updateCancellationReasonTitle",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CancellationReason",
        "kind": "LinkedField",
        "name": "cancellationReason",
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Translation",
            "kind": "LinkedField",
            "name": "titleTranslations",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Language",
                "kind": "LinkedField",
                "name": "language",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "locale",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeCancellationReasonTitleFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCancellationReasonTitleFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "d4fa142f35ebf6263643b7e8b4750012",
    "metadata": {},
    "name": "ChangeCancellationReasonTitleFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a9f07ddad9b3e9c20fe2043282f4315c";

export default node;
