/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
export type CategoryFragment = {
    readonly post: {
        readonly categories: ReadonlyArray<{
            readonly id: string;
            readonly title: string;
            readonly slug: string;
            readonly thumbnail: {
                readonly type: ResourceType;
                readonly urls: ReadonlyArray<{
                    readonly mimeType: string;
                    readonly url: unknown;
                }>;
            } | null;
        }>;
    } | null;
    readonly " $refType": "CategoryFragment";
};
export type CategoryFragment$data = CategoryFragment;
export type CategoryFragment$key = {
    readonly " $data"?: CategoryFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CategoryFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "reference"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "reference",
          "variableName": "reference"
        }
      ],
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Category",
          "kind": "LinkedField",
          "name": "categories",
          "plural": true,
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
              "kind": "ScalarField",
              "name": "slug",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Resource",
              "kind": "LinkedField",
              "name": "thumbnail",
              "plural": false,
              "selections": [
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
                      "name": "mimeType",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "url",
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
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'ad44029fa93644d546b7719996d4a935';
export default node;
