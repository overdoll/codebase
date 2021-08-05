/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ModeratePostFragment$ref: FragmentReference;
declare export opaque type ModeratePostFragment$fragmentType: ModeratePostFragment$ref;
export type ModeratePostFragment = {|
  +id: string,
  +$refType: ModeratePostFragment$ref,
|};
export type ModeratePostFragment$data = ModeratePostFragment;
export type ModeratePostFragment$key = {
  +$data?: ModeratePostFragment$data,
  +$fragmentRefs: ModeratePostFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ModeratePostFragment",
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
(node: any).hash = '577a9ff35fd7b783ccdf28e9f7419d2c';
module.exports = node;
