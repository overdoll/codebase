/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type useUpdateBrandFragment$ref: FragmentReference;
declare export opaque type useUpdateBrandFragment$fragmentType: useUpdateBrandFragment$ref;
export type useUpdateBrandFragment = {|
  +id: string,
  +$refType: useUpdateBrandFragment$ref,
|};
export type useUpdateBrandFragment$data = useUpdateBrandFragment;
export type useUpdateBrandFragment$key = {
  +$data?: useUpdateBrandFragment$data,
  +$fragmentRefs: useUpdateBrandFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateBrandFragment",
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
(node: any).hash = '96a904e44032abd131b5b4cc395ebc17';
module.exports = node;
