/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type useUpdateCategoryFragment$ref: FragmentReference;
declare export opaque type useUpdateCategoryFragment$fragmentType: useUpdateCategoryFragment$ref;
export type useUpdateCategoryFragment = {|
  +id: string,
  +$refType: useUpdateCategoryFragment$ref,
|};
export type useUpdateCategoryFragment$data = useUpdateCategoryFragment;
export type useUpdateCategoryFragment$key = {
  +$data?: useUpdateCategoryFragment$data,
  +$fragmentRefs: useUpdateCategoryFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateCategoryFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'f3869d2b15ed158c7beabb496a95b627';
module.exports = node;
