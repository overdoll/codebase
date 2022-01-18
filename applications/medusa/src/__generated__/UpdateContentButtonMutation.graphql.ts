/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash df51bbbed92255556ab2c5e699f05295 */

import { ConcreteRequest } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdatePostContentOrderInput = {
    id: string;
    contentIds: Array<string>;
};
export type UpdateContentButtonMutationVariables = {
    input: UpdatePostContentOrderInput;
};
export type UpdateContentButtonMutationResponse = {
    readonly updatePostContentOrder: {
        readonly post: {
            readonly id: string;
            readonly content: ReadonlyArray<{
                readonly id: string;
                readonly type: ResourceType;
                readonly processed: boolean;
                readonly urls: ReadonlyArray<{
                    readonly url: string;
                    readonly mimeType: string;
                }>;
            }>;
        } | null;
    } | null;
};
export type UpdateContentButtonMutation = {
    readonly response: UpdateContentButtonMutationResponse;
    readonly variables: UpdateContentButtonMutationVariables;
};



/*
mutation UpdateContentButtonMutation(
  $input: UpdatePostContentOrderInput!
) {
  updatePostContentOrder(input: $input) {
    post {
      id
      content {
        id
        type
        processed
        urls {
          url
          mimeType
        }
      }
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
    "concreteType": "UpdatePostContentOrderPayload",
    "kind": "LinkedField",
    "name": "updatePostContentOrder",
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Resource",
            "kind": "LinkedField",
            "name": "content",
            "plural": true,
            "selections": [
              (v1/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "urls",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mimeType",
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
    "name": "UpdateContentButtonMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UpdateContentButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "df51bbbed92255556ab2c5e699f05295",
    "metadata": {},
    "name": "UpdateContentButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '306bc32c87a2f82fcfa83513852288ad';
export default node;
