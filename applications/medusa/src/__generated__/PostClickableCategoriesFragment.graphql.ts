/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostClickableCategoriesFragment = {
    readonly categories: ReadonlyArray<{
        readonly title: string;
        readonly thumbnail: {
            readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
        } | null;
    }>;
    readonly " $refType": "PostClickableCategoriesFragment";
};
export type PostClickableCategoriesFragment$data = PostClickableCategoriesFragment;
export type PostClickableCategoriesFragment$key = {
    readonly " $data"?: PostClickableCategoriesFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostClickableCategoriesFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostClickableCategoriesFragment",
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
          "name": "title",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "ResourceIconFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '67396ee9cbf35dc7f20976ec2f3282ff';
export default node;