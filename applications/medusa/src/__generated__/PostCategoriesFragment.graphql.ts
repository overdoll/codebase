/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostCategoriesFragment = {
    readonly categories: ReadonlyArray<{
        readonly title: string;
    }>;
    readonly " $refType": "PostCategoriesFragment";
};
export type PostCategoriesFragment$data = PostCategoriesFragment;
export type PostCategoriesFragment$key = {
    readonly " $data"?: PostCategoriesFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostCategoriesFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCategoriesFragment",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'abeae0d445676c394ca5281e4589239e';
export default node;
