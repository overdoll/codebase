/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 0d0c595adc294f1ff0e9093743976588 */

import { ConcreteRequest } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type AddPostContentInput = {
    id: string;
    content: Array<string>;
};
export type UpdateContentButtonMutationVariables = {
    input: AddPostContentInput;
};
export type UpdateContentButtonMutationResponse = {
    readonly addPostContent: {
        readonly post: {
            readonly id: string;
            readonly content: ReadonlyArray<{
                readonly id: string;
                readonly type: ResourceType;
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
  $input: AddPostContentInput!
) {
  addPostContent(input: $input) {
    post {
      id
      content {
        id
        type
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
    "concreteType": "AddPostContentPayload",
    "kind": "LinkedField",
    "name": "addPostContent",
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
    "id": "0d0c595adc294f1ff0e9093743976588",
    "metadata": {},
    "name": "UpdateContentButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'a3b310a46e811372dca41b050d6b541f';
export default node;
