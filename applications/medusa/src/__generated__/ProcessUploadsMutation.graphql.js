/**
 * @flow
 * @relayHash 2e15b44f5346a5b4ffcf9d52789e7ef4
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type UpdatePostContentInput = {|
  id: string,
  content: $ReadOnlyArray<string>,
|};
export type ProcessUploadsMutationVariables = {|
  input: UpdatePostContentInput
|};
export type ProcessUploadsMutationResponse = {|
  +updatePostContent: ?{|
    +post: ?{|
      +id: string,
      +content: $ReadOnlyArray<{|
        +id: string,
        +type: ResourceType,
        +urls: $ReadOnlyArray<{|
          +url: any,
          +mimeType: string,
        |}>,
      |}>,
    |}
  |}
|};
export type ProcessUploadsMutation = {|
  variables: ProcessUploadsMutationVariables,
  response: ProcessUploadsMutationResponse,
|};


/*
mutation ProcessUploadsMutation(
  $input: UpdatePostContentInput!
) {
  updatePostContent(input: $input) {
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
    "concreteType": "UpdatePostContentPayload",
    "kind": "LinkedField",
    "name": "updatePostContent",
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
    "name": "ProcessUploadsMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProcessUploadsMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "2e15b44f5346a5b4ffcf9d52789e7ef4",
    "metadata": {},
    "name": "ProcessUploadsMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '90f291d8a24e708f204b7e749a7af8a3';
module.exports = node;
