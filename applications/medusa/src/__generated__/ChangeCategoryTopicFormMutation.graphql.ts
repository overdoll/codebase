/**
 * @generated SignedSource<<8b24075f5e37b0d1b6dca3d04cf5ab30>>
 * @relayHash a2e00ea8bbd37e0ea5c7f0d9ff78599f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a2e00ea8bbd37e0ea5c7f0d9ff78599f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateCategoryTopicInput = {
  id: string;
  topicId: string;
};
export type ChangeCategoryTopicFormMutation$variables = {
  input: UpdateCategoryTopicInput;
};
export type ChangeCategoryTopicFormMutation$data = {
  readonly updateCategoryTopic: {
    readonly category: {
      readonly id: string;
      readonly topic: {
        readonly id: string;
        readonly title: string;
      } | null;
    } | null;
  } | null;
};
export type ChangeCategoryTopicFormMutation = {
  response: ChangeCategoryTopicFormMutation$data;
  variables: ChangeCategoryTopicFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateCategoryTopicPayload",
    "kind": "LinkedField",
    "name": "updateCategoryTopic",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Category",
        "kind": "LinkedField",
        "name": "category",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Topic",
            "kind": "LinkedField",
            "name": "topic",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
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
    "name": "ChangeCategoryTopicFormMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCategoryTopicFormMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "a2e00ea8bbd37e0ea5c7f0d9ff78599f",
    "metadata": {},
    "name": "ChangeCategoryTopicFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "d2214bdc1345be2528b970a970359c86";

export default node;
