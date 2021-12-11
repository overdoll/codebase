/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SimpleProfileButtonFragment$ref: FragmentReference;
declare export opaque type SimpleProfileButtonFragment$fragmentType: SimpleProfileButtonFragment$ref;
export type SimpleProfileButtonFragment = {|
  +avatar: any,
  +$refType: SimpleProfileButtonFragment$ref,
|};
export type SimpleProfileButtonFragment$data = SimpleProfileButtonFragment;
export type SimpleProfileButtonFragment$key = {
  +$data?: SimpleProfileButtonFragment$data,
  +$fragmentRefs: SimpleProfileButtonFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SimpleProfileButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '07e37685487bc155776476279634d5fe';
module.exports = node;
