/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type useSubmitPostFragment$ref: FragmentReference;
declare export opaque type useSubmitPostFragment$fragmentType: useSubmitPostFragment$ref;
export type useSubmitPostFragment = {|
  +id: string,
  +$refType: useSubmitPostFragment$ref,
|};
export type useSubmitPostFragment$data = useSubmitPostFragment;
export type useSubmitPostFragment$key = {
  +$data?: useSubmitPostFragment$data,
  +$fragmentRefs: useSubmitPostFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useSubmitPostFragment",
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
(node: any).hash = 'd1ae3e23e4bfdb82bc14b213dc3bf626';
module.exports = node;
