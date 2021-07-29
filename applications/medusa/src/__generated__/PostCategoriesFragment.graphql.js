/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostCategoriesFragment$ref: FragmentReference;
declare export opaque type PostCategoriesFragment$fragmentType: PostCategoriesFragment$ref;
export type PostCategoriesFragment = {|
  +categories: $ReadOnlyArray<{|
    +title: string
  |}>,
  +$refType: PostCategoriesFragment$ref,
|};
export type PostCategoriesFragment$data = PostCategoriesFragment;
export type PostCategoriesFragment$key = {
  +$data?: PostCategoriesFragment$data,
  +$fragmentRefs: PostCategoriesFragment$ref,
  ...
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
// prettier-ignore
(node: any).hash = 'abeae0d445676c394ca5281e4589239e';
module.exports = node;
