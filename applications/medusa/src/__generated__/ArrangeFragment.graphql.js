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
  +id: string,
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
(node: any).hash = '4a7a30ec90f287a7f4bb7d4aabecad69';
module.exports = node;
