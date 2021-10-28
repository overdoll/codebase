/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type useUpdateContentFragment$ref: FragmentReference;
declare export opaque type useUpdateContentFragment$fragmentType: useUpdateContentFragment$ref;
export type useUpdateContentFragment = {|
  +id: string,
  +$refType: useUpdateContentFragment$ref,
|};
export type useUpdateContentFragment$data = useUpdateContentFragment;
export type useUpdateContentFragment$key = {
  +$data?: useUpdateContentFragment$data,
  +$fragmentRefs: useUpdateContentFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUpdateContentFragment",
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
(node: any).hash = 'dd4d2de9ae9cbb4039f5b1d150c707e9';
module.exports = node;
