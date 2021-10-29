/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type CategoryFragment$ref: FragmentReference;
declare export opaque type CategoryFragment$fragmentType: CategoryFragment$ref;
export type CategoryFragment = {|
  +categories: $ReadOnlyArray<{|
    +id: string,
    +title: string,
  |}>,
  +$refType: CategoryFragment$ref,
|};
export type CategoryFragment$data = CategoryFragment;
export type CategoryFragment$key = {
  +$data?: CategoryFragment$data,
  +$fragmentRefs: CategoryFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryFragment",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'e8ae143182d555d010ecd63ef7f05697';
module.exports = node;
