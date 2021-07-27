/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TopRightMenuFragment$ref: FragmentReference;
declare export opaque type TopRightMenuFragment$fragmentType: TopRightMenuFragment$ref;
export type TopRightMenuFragment = {|
  +username: string,
  +avatar: any,
  +$refType: TopRightMenuFragment$ref,
|};
export type TopRightMenuFragment$data = TopRightMenuFragment;
export type TopRightMenuFragment$key = {
  +$data?: TopRightMenuFragment$data,
  +$fragmentRefs: TopRightMenuFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopRightMenuFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
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
(node: any).hash = '950b7c0efb61dfc19d01907032423568';
module.exports = node;
