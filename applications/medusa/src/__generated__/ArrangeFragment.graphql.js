/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { ArrangeUploadsFragment$ref } from "./ArrangeUploadsFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ArrangeFragment$ref: FragmentReference;
declare export opaque type ArrangeFragment$fragmentType: ArrangeFragment$ref;
export type ArrangeFragment = {|
  +$fragmentRefs: ArrangeUploadsFragment$ref,
  +$refType: ArrangeFragment$ref,
|};
export type ArrangeFragment$data = ArrangeFragment;
export type ArrangeFragment$key = {
  +$data?: ArrangeFragment$data,
  +$fragmentRefs: ArrangeFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeUploadsFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'fa8991ab73a525285c1bdf548903f51b';
module.exports = node;
